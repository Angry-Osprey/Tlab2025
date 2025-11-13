import React from "react";
import PatientRow from "@/components/PatientRow";

export default function PatientTable({ patients, onUpdate }) {
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

      <tbody className="divide-y divide-gray-800">
        {patients.map((p) => (
          <PatientRow key={p.id ?? p.identifier} patient={p} onUpdate={onUpdate} />
        ))}

        {patients.length === 0 && (
          <tr>
            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
              No patient records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
