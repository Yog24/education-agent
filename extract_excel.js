const XLSX = require('xlsx');

try {
  const workbook = XLSX.readFile('template/数据水平分析.xlsx');
  const sheetNames = workbook.SheetNames;

  const result = {};
  sheetNames.forEach(name => {
    const sheet = workbook.Sheets[name];
    // Use sheet_to_json without header:1 to get object array which skips empty rows automatically usually, 
    // or use header:1 and filter.
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, blankrows: false });
    
    // Filter out completely empty rows
    const contentRows = json.filter(row => row.some(cell => cell !== null && cell !== ""));
    
    result[name] = contentRows.slice(0, 5); // Show first 5 non-empty rows
  });

  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error(e);
}
