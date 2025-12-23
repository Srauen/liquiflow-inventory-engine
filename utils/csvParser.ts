
export interface InventoryItem {
  sku: string;
  product_name: string;
  unit_cost: number;
  quantity_on_hand: number;
  liquidity_index: number;
  status: string;
  __errors?: string[]; 
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

      // Normalize headers: remove quotes, spaces to underscores, lowercase
      const headers = lines[0].split(',').map(h => 
        h.trim().toLowerCase().replace(/['"]+/g, '').replace(/\s+/g, '_')
      );

      const items: InventoryItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        if (currentLine.length < 2) continue;

        const item: any = {
          sku: '',
          product_name: '',
          unit_cost: 0,
          quantity_on_hand: 0,
          liquidity_index: 50,
          status: 'active'
        };
        
        headers.forEach((header, index) => {
          let value = currentLine[index]?.trim() || '';
          value = value.replace(/['"]+/g, ''); // Sanitization

          if (header === 'sku') item.sku = value;
          if (header === 'product_name' || header === 'title' || header === 'name') item.product_name = value;
          
          // Numerical Integrity: strip currency symbols and commas
          const numericValue = value.replace(/[^0-9.-]+/g, "");
          const parsedNum = parseFloat(numericValue);
          
          if (header === 'unit_cost' || header.includes('cost')) {
            item.unit_cost = isNaN(parsedNum) ? 0 : parsedNum;
          }
          if (header === 'quantity_on_hand' || header.includes('qty') || header.includes('on_hand')) {
            item.quantity_on_hand = isNaN(parsedNum) ? 0 : Math.floor(parsedNum);
          }
          if (header === 'liquidity_index' || header.includes('liquidity')) {
            item.liquidity_index = isNaN(parsedNum) ? 50 : Math.min(100, Math.max(0, parsedNum));
          }
          if (header === 'status') {
            item.status = value.toLowerCase() || 'active';
          }
        });

        if (item.sku || item.product_name) {
          items.push(item as InventoryItem);
        }
      }
      resolve(items);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
