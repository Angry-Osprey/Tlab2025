import React from "react";
import { Edit2 } from "lucide-react";
import { fhirMultiSections } from "@/lib/fhirSectionsArray"; // keep your path/name

export default function PatientDetails({ patient, onEdit }) {
    // build label lookup once
    const labelByKey = React.useMemo(() => {
        const m = {};
        for (const { key, label } of fhirMultiSections) m[key] = label;
        return m;
    }, []);

    // sections that actually have values
    const populated = React.useMemo(
        () =>
            fhirMultiSections
                .filter(({ key }) => Array.isArray(patient[key]) && patient[key].length > 0)
                .map(({ key }) => ({ key, label: labelByKey[key], values: patient[key] })),
        [patient, labelByKey]
    );

    return (
        <div className="space-y-4 text-sm text-gray-200">

            {/* CORE INFO - one compact table */}
            <div className="rounded-xl border border-gray-800 overflow-hidden">
                <div className="bg-gray-900/60 px-4 py-2 font-semibold text-gray-300">
                    Core Demographics
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody className="[&_tr:nth-child(even)]:bg-gray-900/30">
                            <KV label="Identifier" value={patient.identifier || "—"} />
                            <KV label="Status" value={patient.status || "—"} />
                            <KV label="Family Name" value={patient.familyName || "—"} />
                            <KV label="Given Name" value={patient.givenName || "—"} />
                            <KV label="Birth Date" value={patient.birthDate || "—"} />
                            <KV label="Gender" value={patient.gender || "—"} />
                            {/* add more simple fields later as KVs */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MULTI-ENTRY SECTIONS - each as its own little table */}
            {populated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {populated.map(({ key, label, values }) => (
                        <SectionTable key={key} title={`${label} (${values.length})`} rows={values} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No additional clinical entries.</p>
            )}


            <div className="flex justify-end">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 text-sm hover:bg-gray-800"
                >
                    <Edit2 className="w-4 h-4" /> Edit
                </button>
            </div>
        </div>
    );
}

/* -------- helpers -------- */

function KV({ label, value }) {
    return (
        <tr className="border-b border-gray-800 last:border-b-0">
            <th className="w-48 text-left px-4 py-2 text-gray-400 font-medium align-top">
                {label}
            </th>
            <td className="px-4 py-2 text-gray-200 break-words">{String(value)}</td>
        </tr>
    );
}

function SectionTable({ title, rows }) {
    return (
        <div className="rounded-xl border border-gray-800 overflow-hidden">
            <div className="bg-gray-900/60 px-4 py-2 font-semibold text-gray-300">
                {title}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-fixed"> {/* fixed layout for consistent widths */}
                    {/* Define columns explicitly to avoid layout drift */}
                    <colgroup>
                        <col className="w-14" />    {/* index column */}
                        <col />                      {/* entry column */}
                    </colgroup>

                    <tbody className="text-gray-200 text-left">
                        {rows.map((v, i) => (
                            <tr
                                key={i}
                                className="border-t border-gray-800 odd:bg-gray-950/40 even:bg-transparent"
                            >
                                <td className="px-4 py-2 font-mono text-gray-400 align-top">
                                    {i + 1}
                                </td>
                                <td className="px-4 py-2 break-words align-top">
                                    {String(v)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

