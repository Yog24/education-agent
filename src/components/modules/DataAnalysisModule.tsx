import React, { useState } from 'react';
import { Download, Plus, Trash2, ArrowLeft, FileDown, Sheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useAgentStore } from '@/store/useAgentStore';
import { cn } from '@/lib/utils';

// Define types for our multi-sheet data structure
interface SheetData {
  name: string;
  columns: string[];
  data: any[];
}

const INITIAL_SHEETS: SheetData[] = [
  {
    name: '后测',
    columns: ['维度', '第一次', '第二次'],
    data: [
      { '维度': '水平一', '第一次': '23.12%', '第二次': '19.51%' },
      { '维度': '水平二', '第一次': '59.96%', '第二次': '63.89%' },
      { '维度': '水平三', '第一次': '12.50%', '第二次': '14.20%' },
      { '维度': '水平四', '第一次': '4.42%', '第二次': '2.40%' },
    ]
  },
  {
    name: '课堂结构与互动模式',
    columns: ['模式类型', '第一次', '第二次'],
    data: [
      { '模式类型': '交互教学', '第一次': '6%', '第二次': '32%' },
      { '模式类型': '探究学习', '第一次': '31%', '第二次': '59%' },
      { '模式类型': '直接讲授', '第一次': '45%', '第二次': '5%' },
      { '模式类型': '小组合作', '第一次': '18%', '第二次': '4%' },
    ]
  },
  {
    name: '学生参与度与学习行为',
    columns: ['指标', '第一次', '第二次'],
    data: [
      { '指标': '平均抬头率', '第一次': '64%', '第二次': '58%' },
      { '指标': '平均举手率', '第一次': '34%', '第二次': '32%' },
      { '指标': '互动响应率', '第一次': '45%', '第二次': '78%' },
      { '指标': '练习完成率', '第一次': '88%', '第二次': '95%' },
    ]
  },
  {
    name: '提问策略有效性',
    columns: ['次数', '记忆', '理解', '应用', '分析', '评价', '创造'],
    data: [
      { '次数': '第一次', '记忆': '2%', '理解': '30%', '应用': '20%', '分析': '46%', '评价': '2%', '创造': '0%' },
      { '次数': '第二次', '记忆': '4%', '理解': '42%', '应用': '50%', '分析': '23%', '评价': '5%', '创造': '2%' },
    ]
  }
];

export const DataAnalysisModule = () => {
  const { setSelectedAgent } = useAgentStore();
  
  const [sheets, setSheets] = useState<SheetData[]>(INITIAL_SHEETS);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const activeSheet = sheets[activeSheetIndex];

  const handleAddRow = () => {
    const newRow: any = {};
    activeSheet.columns.forEach(col => newRow[col] = '');
    
    const newSheets = [...sheets];
    newSheets[activeSheetIndex] = {
      ...activeSheet,
      data: [...activeSheet.data, newRow]
    };
    setSheets(newSheets);
  };

  const handleAddColumn = () => {
    const name = prompt("请输入新列名");
    if (name && !activeSheet.columns.includes(name)) {
      const newSheets = [...sheets];
      const currentSheet = newSheets[activeSheetIndex];
      
      currentSheet.columns = [...currentSheet.columns, name];
      currentSheet.data = currentSheet.data.map(row => ({ ...row, [name]: '' }));
      
      setSheets(newSheets);
    }
  };

  const handleCellChange = (rowIndex: number, col: string, value: string) => {
    const newSheets = [...sheets];
    const currentSheet = newSheets[activeSheetIndex];
    const newData = [...currentSheet.data];
    newData[rowIndex] = { ...newData[rowIndex], [col]: value };
    currentSheet.data = newData;
    setSheets(newSheets);
  };

  const handleDeleteRow = (index: number) => {
    const newSheets = [...sheets];
    const currentSheet = newSheets[activeSheetIndex];
    currentSheet.data = currentSheet.data.filter((_, i) => i !== index);
    setSheets(newSheets);
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    
    sheets.forEach(sheet => {
       const ws = XLSX.utils.json_to_sheet(sheet.data, { header: sheet.columns });
       XLSX.utils.book_append_sheet(wb, ws, sheet.name);
    });
    
    XLSX.writeFile(wb, `教研数据分析_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleDownloadTemplate = () => {
    // Create a link and click it to download the file from public folder
    const link = document.createElement('a');
    link.href = '/templates/template.xlsx';
    link.download = '数据水平分析模版.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white/50 backdrop-blur-sm overflow-hidden">
      {/* Top Bar */}
      <div className="p-6 pb-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedAgent(null)} 
              className="p-2 rounded-full hover:bg-white/60 text-gray-500 hover:text-purple-700 transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">数据汇析模块</h2>
                <p className="text-sm text-gray-500 mt-1">多维教研数据分析与管理</p>
            </div>
        </div>
        <div className="flex gap-3">
           <button 
              onClick={handleDownloadTemplate}
              className="px-4 py-2 bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 flex items-center gap-2 shadow-sm transition-all"
           >
             <FileDown size={16} />
             下载模版
           </button>
           <button 
              onClick={handleAddColumn}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-all"
           >
             <Plus size={16} />
             新增列
           </button>
           <button 
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-sm transition-all"
           >
             <Download size={16} />
             导出 Excel
           </button>
        </div>
      </div>

      {/* Sheet Tabs */}
      <div className="px-6 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-gray-200/50">
        {sheets.map((sheet, idx) => (
            <button
                key={idx}
                onClick={() => setActiveSheetIndex(idx)}
                className={cn(
                    "px-4 py-2 text-sm font-medium rounded-t-lg transition-all flex items-center gap-2 whitespace-nowrap",
                    activeSheetIndex === idx 
                        ? "bg-white text-purple-700 border-t border-l border-r border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.02)]" 
                        : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-white/40"
                )}
            >
                <Sheet size={14} />
                {sheet.name}
            </button>
        ))}
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto bg-white p-0 shadow-sm relative">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {activeSheet.columns.map((col, idx) => (
                <th key={idx} className="border-b border-r border-gray-200 px-4 py-3 text-left font-medium text-gray-600 last:border-r-0 min-w-[100px]">
                  {col}
                </th>
              ))}
              <th className="border-b border-gray-200 px-4 py-3 w-16 text-center sticky right-0 bg-gray-50">操作</th>
            </tr>
          </thead>
          <tbody>
            {activeSheet.data.map((row, rowIndex) => (
              <tr key={rowIndex} className="group hover:bg-blue-50/50 transition-colors">
                {activeSheet.columns.map((col, colIndex) => (
                  <td key={colIndex} className="border-b border-r border-gray-100 last:border-r-0 p-0">
                    <input 
                       type="text"
                       value={row[col] || ''}
                       onChange={(e) => handleCellChange(rowIndex, col, e.target.value)}
                       className="w-full h-full px-4 py-3 bg-transparent border-none focus:ring-2 focus:ring-inset focus:ring-blue-200 focus:bg-white outline-none"
                    />
                  </td>
                ))}
                <td className="border-b border-gray-100 px-2 py-2 text-center sticky right-0 bg-white group-hover:bg-blue-50/50">
                  <button 
                     onClick={() => handleDeleteRow(rowIndex)}
                     className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
               <td colSpan={activeSheet.columns.length + 1} className="p-2">
                 <button 
                    onClick={handleAddRow}
                    className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
                 >
                    <Plus size={16} />
                    添加一行数据
                 </button>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
