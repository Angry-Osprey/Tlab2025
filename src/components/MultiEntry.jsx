import React from "react";
import { Plus, Trash2 } from "lucide-react";

/* 
  MultiEntry
  Reusable dynamic list input (e.g., diagnoses/meds).
  Props:
    - label: section title
    - value: array of strings
    - onChange: callback(newArray)
    - placeholder: string for input hint
*/
export default function MultiEntry({ label = "Items", value, onChange, placeholder = "Item" }) {
    const add = () => onChange([...value, ""]);
    const update = (i, v) => onChange(value.map((x, idx) => (idx === i ? v : x)));
    const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">{label}</label>

            <div className="space-y-2">
                {value.map((item, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            value={item}
                            onChange={(e) => update(i, e.target.value)}
                            className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            placeholder={`${placeholder} ${i + 1}`}
                        />
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            className="p-2.5 border border-gray-700 rounded-lg hover:bg-red-500/10 hover:border-red-500/50 transition-all"
                            aria-label="Remove item"
                            title="Remove"
                        >
                            <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={add}
                className="flex items-center gap-2 text-sm border border-gray-700 rounded-lg px-4 py-2 hover:bg-gray-800 transition-all"
            >
                <Plus className="w-4 h-4" />
                Add {placeholder}
            </button>
        </div>
    );
}
