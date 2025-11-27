import React, { useState } from 'react';
import { Download, Plus, Trash2, ArrowLeft } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useAgentStore } from '@/store/useAgentStore';

export const DataAnalysisModule = () => {
  const { setSelectedAgent } = useAgentStore();
  const [columns, setColumns] = useState<string[]>(['', '前结构', '单点结构', '多点结构', '关联结构', '抽象拓展结构']);
  const [data, setData] = useState<any[]>([
    { '': '第一次', '前结构': '4%', '单点结构': '63%', '多点结构': '10%', '关联结构': '23%', '抽象拓展结构': '0%' },
    { '': '第二次', '前结构': '5%', '单点结构': '57%', '多点结构': '25%', '关联结构': '10%', '抽象拓展结构': '2%' },
    { '': '第三次', '前结构': '3%', '单点结构': '65%', '多点结构': '30%', '关联结构': '12%', '抽象拓展结构': '5%' },
  ]);

  const handleAddRow = () => {
    const newRow: any = {};
    columns.forEach(col => newRow[col] = '');
    setData([...data, newRow]);
  };

  const handleAddColumn = () => {
    const name = prompt("请输入新列名");
    if (name && !columns.includes(name)) {
      setColumns([...columns, name]);
      setData(data.map(row => ({ ...row, [name]: '' })));
    }
  };

  const handleCellChange = (rowIndex: number, col: string, value: string) => {
    const newData = [...data];
    newData[rowIndex][col] = value;
    setData(newData);
  };

  const handleDeleteRow = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data, { header: columns });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "教研数据");
    XLSX.writeFile(wb, `教研数据分析_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6 bg-white/50 backdrop-blur-sm overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedAgent(null)} 
              className="p-2 rounded-full hover:bg-white/60 text-gray-500 hover:text-purple-700 transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">数据汇析模块</h2>
                <p className="text-sm text-gray-500 mt-1">输入并管理教研数据，支持一键导出</p>
            </div>
        </div>
        <div className="flex gap-3">
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

      <div className="flex-1 overflow-auto bg-white rounded-xl border border-gray-200 shadow-sm relative">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="border-b border-r border-gray-200 px-4 py-3 text-left font-medium text-gray-600 last:border-r-0">
                  {col}
                </th>
              ))}
              <th className="border-b border-gray-200 px-4 py-3 w-16 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="group hover:bg-blue-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="border-b border-r border-gray-100 last:border-r-0 p-0">
                    <input 
                       type="text"
                       value={row[col] || ''}
                       onChange={(e) => handleCellChange(rowIndex, col, e.target.value)}
                       className="w-full h-full px-4 py-3 bg-transparent border-none focus:ring-2 focus:ring-inset focus:ring-blue-200 focus:bg-white outline-none"
                    />
                  </td>
                ))}
                <td className="border-b border-gray-100 px-2 py-2 text-center">
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
               <td colSpan={columns.length + 1} className="p-2">
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
