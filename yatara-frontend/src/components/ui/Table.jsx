import React from 'react';

const Table = ({ headers, rows, className = '', emptyMessage = 'No data available' }) => {
  return (
    <div className={`glass-surface overflow-hidden rounded-[20px] ${className}`}>
      <table className="min-w-full divide-y divide-[#10B981]/20">
        <thead className="bg-[#052E2B]/60">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#E6F4F1]/75"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#10B981]/10 bg-transparent">
          {rows.length > 0 ? (
            rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-[#10B981]/10">
                {row.cells.map((cell, cellIdx) => (
                  <td key={cellIdx} className="whitespace-nowrap px-6 py-4 text-sm text-[#E6F4F1]/85">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-12 text-center text-sm text-[#E6F4F1]/70" colSpan={headers.length}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
