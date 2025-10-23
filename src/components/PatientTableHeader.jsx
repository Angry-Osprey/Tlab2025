import React from "react";

export default function PatientTableHeader() {
  return (
    <table className="min-w-full table-fixed text-xs sm:text-sm">
      <colgroup>
        <col className="w-[22%]" />
        <col className="w-[22%]" />
        <col className="w-[18%]" />
        <col className="w-[18%]" />
        <col className="w-[12%]" />
        <col className="w-[8%]" />
      </colgroup>

      <thead className="bg-gray-900/60 uppercase tracking-wider text-gray-400">
        <tr className="text-gray-300">
          <th className="px-6 py-3 text-left font-semibold">Identifier</th>
          <th className="px-6 py-3 text-left font-semibold">Family</th>
          <th className="px-6 py-3 text-left font-semibold">Given</th>
          <th className="px-6 py-3 text-left font-semibold">DOB</th>
          <th className="px-6 py-3 text-left font-semibold hidden md:table-cell">Status</th>
          <th className="px-6 py-3 text-right font-semibold">Expand</th>
        </tr>
      </thead>
    </table>
  );
}
