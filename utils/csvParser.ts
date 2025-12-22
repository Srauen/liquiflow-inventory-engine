
export interface InventoryItem {
  sku: string;
  title: string;
  cost_price: number;
  selling_price: number;
  qty_on_hand: number;
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

      // Normalize headers
      const headers = lines[0].split(',').map(h => 
        h.trim().toLowerCase().replace(/['"]+/g, '').replace(/\s+/g, '_')
      );

      const items: InventoryItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        // Skip empty rows
        if (currentLine.length < 2) continue;

        const item: any = {};
        const errors: string[] = [];

        headers.forEach((header, index) => {
          let value = currentLine[index]?.trim();
          if (!value) return;
          
          // Sanitization: Remove quotes
          value = value.replace(/['"]+/g, '');

          // Schema Mapping
          if (header === 'sku') item.sku = value;
          if (header === 'title' || header === 'name' || header === 'product_name') item.title = value;
          if (header === 'category') item.category = value;
          
          // Numeric Parsing
          if (header.includes('cost')) {
            item.cost_price = parseFloat(value.replace(/[^0-9.-]+/g,""));
          }
          if (header.includes('selling') || header.includes('price')) {
            item.selling_price = parseFloat(value.replace(/[^0-9.-]+/g,""));
          }
          if (header.includes('qty') || header.includes('quantity') || header.includes('on_hand')) {
            item.qty_on_hand = parseInt(value.replace(/[^0-9-]+/g,""), 10);
          }
        });

        // Default values if missing
        if (!item.selling_price) item.selling_price = 0;
        if (!item.category) item.category = 'Uncategorized';

        // Validation Logic
        if (!item.sku) errors.push('Missing SKU');
        if (isNaN(item.cost_price) || item.cost_price < 0) errors.push('Invalid Cost');
        if (isNaN(item.qty_on_hand) || item.qty_on_hand < 0) errors.push('Invalid Quantity');

        if (errors.length > 0) {
          item.__errors = errors;
        }

        // Only add if it has at least some data
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
