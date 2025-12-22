
export interface InventoryItem {
  sku: string;
  title: string;
  cost_price: number;
  selling_price: number;
  qty_on_hand: number;
  liquidity_score: number;
  status: string;
  category: string;
  __errors?: string[]; // Internal validation flags
}

export const parseCSV = async (file: File): Promise<InventoryItem[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      
      if (lines.length < 2) {
        resolve([]);
        return;
      }

      // Normalize headers to identify schema mapping
      const headers = lines[0].split(',').map(h => 
        h.trim().toLowerCase().replace(/['"]+/g, '').replace(/\s+/g, '_')
      );

      const items: InventoryItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        if (currentLine.length < 2) continue;

        const item: any = {
          category: 'Uncategorized'
        };
        const errors: string[] = [];

        headers.forEach((header, index) => {
          let value = currentLine[index]?.trim();
          if (!value) return;
          
          value = value.replace(/['"]+/g, '');

          // Schema Mapping for the "SYSTEM INGESTION PROTOCOL"
          if (header === 'sku') item.sku = value;
          if (header === 'product_name' || header === 'title' || header === 'name') item.title = value;
          
          // Value Mapping with sanitization (Removes non-numeric chars except . and -)
          if (header === 'unit_cost' || header.includes('selling') || header.includes('price')) {
            const num = parseFloat(value.replace(/[^0-9.-]+/g,""));
            item.selling_price = isNaN(num) ? 0 : num;
            item.cost_price = item.selling_price * 0.4; // Default cost assumption if not provided
          }
          
          if (header === 'quantity_on_hand' || header.includes('qty') || header.includes('on_hand')) {
            const num = parseInt(value.replace(/[^0-9-]+/g,""), 10);
            item.qty_on_hand = isNaN(num) ? 0 : num;
          }

          if (header === 'liquidity_index' || header.includes('score')) {
            const num = parseInt(value.replace(/[^0-9-]+/g,""), 10);
            item.liquidity_score = isNaN(num) ? 50 : Math.max(0, Math.min(100, num));
          }

          if (header === 'status') {
            item.status = value.toLowerCase();
          }

          if (header === 'category') {
            item.category = value;
          }
        });

        // Validation Logic
        if (!item.sku) errors.push('Missing SKU');
        if (typeof item.qty_on_hand !== 'number') errors.push('Invalid Quantity');
        if (typeof item.selling_price !== 'number') errors.push('Invalid Cost');

        if (errors.length > 0) {
          item.__errors = errors;
        }

        if (item.sku || item.title) {
          items.push(item as InventoryItem);
        }
      }
      resolve(items);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
