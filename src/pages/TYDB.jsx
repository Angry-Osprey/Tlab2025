// src/pages/TYDB.jsx
// -----------------------------------------------------------------------------
// CHANGE TO /* */ format this is ugly
//
// HL7 FHIR-ish Patient DB mock UI
// - Lookup/search bar
// - Input form with multi-entry sections (diagnoses, medications)
// - Simple in-memory state for now (swap for Firestore)
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//  File is getting "long" af idiot... look into moving most of the js to a helper file that stores the code separate from the HTML if that's even possible.
// -----------------------------------------------------------------------------

import React, { useMemo, useState } from "react";
import { Search, Plus, Trash2, ChevronDown, FileText } from "lucide-react";

// -----------------------------------------------------------------------------
// MultiEntry
// Helper to manage a dynamic list of inputs (e.g., diagnoses/meds).
// It expects:
//   - value: array of strings
//   - onChange: updater that receives the whole new array
// UX: add row, edit row, remove row. <- no idea if this is how its done irl google was unhelpful and im lost on more features.
// Consider finding an example on github similar to the boilerplate used here.
// Its 3AM and im starting to fade... there has to be a way to get ai to write these for me... 
// -----------------------------------------------------------------------------
function MultiEntry({ label = "Items", value, onChange, placeholder = "Item" }) {
    // add a new empty item
    const add = () => onChange([...value, ""]);
    // update item at index i
    const update = (i, v) => onChange(value.map((x, idx) => (idx === i ? v : x)));
    // remove item at index i
    const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-3 ">
            {/* Label for the section */}
            <label className="text-sm font-medium text-gray-300">{label}</label>

            {/* Existing rows */}
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

            {/* Add new row */}
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

// -----------------------------------------------------------------------------
// TYDB 
// Top table + search + input panel. Uses local state as a stub.
// replace state with Firestore ... easier said than done lost most of my night to this - past Ty. Hey future me figure it out.
// -----------------------------------------------------------------------------
export default function TYDB() {
    // Seed data (pretend these came from your DB)
    const [rows, setRows] = useState([
        {
            id: "1",
            resourceType: "Patient",
            identifier: "P001234",
            familyName: "Smith",
            givenName: "John",
            birthDate: "1985-03-15",
            gender: "male",
            status: "active",
            diagnoses: ["Type 2 Diabetes", "Hypertension"],
            medications: ["Metformin 500mg", "Lisinopril 10mg"],
        },
        {
            id: "2",
            resourceType: "Patient",
            identifier: "P002345",
            familyName: "Johnson",
            givenName: "Sarah",
            birthDate: "1992-07-22",
            gender: "female",
            status: "active",
            diagnoses: ["Asthma"],
            medications: ["Albuterol Inhaler"],
        },
    ]);

    // Search query for the lookup bar
    const [query, setQuery] = useState("");

    // Form state (this drives the "Add New Patient Record" panel)
    const [form, setForm] = useState({
        resourceType: "Patient", // you can swap to other FHIR types later if you want to expand
        identifier: "",
        familyName: "",
        givenName: "",
        birthDate: "",
        gender: "unknown",
        status: "active",
        diagnoses: [],
        medications: [],
    });

    // ---------------------------------------------------------------------------
    // Filtering logic
    // Use useMemo so we only recompute when rows or query change.
    // We keep it simple: check identifier/name/diagnoses/meds for substring matches.
    // ---------------------------------------------------------------------------
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return rows;

        return rows.filter(
            (r) =>
                r.identifier.toLowerCase().includes(q) ||
                r.familyName.toLowerCase().includes(q) ||
                r.givenName.toLowerCase().includes(q) ||
                r.diagnoses.some((d) => d.toLowerCase().includes(q)) ||
                r.medications.some((m) => m.toLowerCase().includes(q))
        );
    }, [rows, query]);

    // Generic form change handler
    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // ---------------------------------------------------------------------------
    // Submit handler
    // - Validates minimal required fields (identifier, family, given)
    // - Generates simple UUID
    // - Adds to top of the results table
    // - Clears the form
    // Swap this for Actual DB call
    // ---------------------------------------------------------------------------
    const handleSubmit = () => {
        // Soft validation — keep it light for now.
        if (!form.identifier || !form.familyName || !form.givenName) return;

        const id = crypto.randomUUID();
        const newRow = { ...form, id };
        setRows((prev) => [newRow, ...prev]);

        // Reset form for the next entry
        setForm({
            resourceType: "Patient",
            identifier: "",
            familyName: "",
            givenName: "",
            birthDate: "",
            gender: "unknown",
            status: "active",
            diagnoses: [],
            medications: [],
        });
    };

    // ---------------------------------------------------------------------------
    // Render
    // Layout notes:
    // - Top section: title + tiny subtitle
    // - Search bar (lookup)
    // - Results table
    // - Add New Patient Record form 
    // - READ ME SECTION <----- This needs to be done asap, preferably by the end of the week. you will forget about this.
    // ---------------------------------------------------------------------------
    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 lg:space-y-12">
                {/*  Page title & subtitle */}
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                        HL7 FHIR Patient Database
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400">
                        Fast Healthcare Interoperability Resources (FHIR) compliant interface [ THIS IS A WORK IN PROGRESS AND THUS FAR HAS NO DATABASE ATTACHED -Ty ] local storage only 
                    </p>
                </div>

                {/*  Lookup/search bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by identifier, name, diagnosis, or medication..."
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                </div>

                {/* Results table */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-semibold">
                            Patient Records ({filtered.length})
                        </h2>
                    </div>

                    {/* Table shell 
                     The Identifier being inputted manually seems like a cop out to me... 
                     consider making it auto assigned based off of actual input order <-- this is likely generated on the client side application would feed into this IRL
                    */}
                    <div className="overflow-x-auto bg-gray-900/30 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <table className="w-full text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-gray-900/80 text-gray-300">
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold">Identifier</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold">Family Name</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold">Given Name</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden md:table-cell">Birth Date</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden lg:table-cell">Gender</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden xl:table-cell">Status</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden xl:table-cell">Diagnoses</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden xl:table-cell">Medication</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800">
                                {/* Render each row */}
                                {filtered.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-800/40 transition-colors">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-blue-400">{r.identifier}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4">{r.familyName}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4">{r.givenName}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell text-gray-400">{r.birthDate}</td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                                            <span className="capitalize">{r.gender}</span>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${r.status === "active"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-gray-500/20 text-gray-400"
                                                    }`}
                                            >
                                                {r.status}
                                            </span>
                                        </td>

                                        {/* Diagnoses preview (first two only) 
                                            - add some kind of indicator for patients with more than 2 */}
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden xl:table-cell">
                                            {r.diagnoses.slice(0, 2).join(", ")}
                                            {r.diagnoses.length > 2 && ` +${r.diagnoses.length - 2}`}
                                        </td>

                                        {/* Medications preview (first two only) */}
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden xl:table-cell">
                                            {r.medications.slice(0, 2).join(", ")}
                                            {r.medications.length > 2 && ` +${r.medications.length - 2}`}
                                        </td>
                                    </tr>
                                ))}

                                {/* Empty state 
                                    - after testing for a bit i think you should keep status as a column even on empty 
                                */}
                                {filtered.length === 0 && (
                                    <tr>
                                        {/* Keep colspan in sync with the number of columns in the header */}
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>No patient records found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/*  Input panel  */}
                <section className="space-y-4">
                    <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-semibold">
                        Add New Patient Record
                    </h2>

                    {/* Card wrapper for the form — spacing and borders */}
                    <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 backdrop-blur-sm">
                        {/* ResourceType + Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Resource type (stubbed for now) */}
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Resource Type</label>
                                <div className="relative">
                                    <select
                                        name="resourceType"
                                        value={form.resourceType}
                                        onChange={onChange}
                                        className="w-full appearance-none bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                    >
                                        <option value="Patient">Patient</option>
                                        <option value="Observation">Observation</option>
                                        <option value="Condition">Condition</option>
                                        <option value="Procedure">Procedure</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Status</label>
                                <div className="relative">
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={onChange}
                                        className="w-full appearance-none bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="entered-in-error">Entered in Error</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Identifier */}
                        <div>
                            <label className="text-sm font-medium text-gray-300 mb-2 block">Patient Identifier</label>
                            <input
                                name="identifier"
                                value={form.identifier}
                                onChange={onChange}
                                placeholder="e.g., P003456"
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            />
                        </div>

                        {/* Names */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Family Name</label>
                                <input
                                    name="familyName"
                                    value={form.familyName}
                                    onChange={onChange}
                                    placeholder="Last name"
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Given Name</label>
                                <input
                                    name="givenName"
                                    value={form.givenName}
                                    onChange={onChange}
                                    placeholder="First name"
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* DOB + Gender */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Birth Date</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={form.birthDate}
                                    onChange={onChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Administrative Gender</label>
                                <div className="relative">
                                    <select
                                        name="gender"
                                        value={form.gender}
                                        onChange={onChange}
                                        className="w-full appearance-none bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                    >
                                        <option value="unknown">Unknown</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Multi-entry sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <MultiEntry
                                label="Diagnoses / Conditions"
                                value={form.diagnoses}
                                onChange={(diagnoses) => setForm((f) => ({ ...f, diagnoses }))}
                                placeholder="Diagnosis"
                            />

                            <MultiEntry
                                label="Medications"
                                value={form.medications}
                                onChange={(medications) => setForm((f) => ({ ...f, medications }))}
                                placeholder="Medication"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                            >
                                <Plus className="w-5 h-5" />
                                Add Patient Record
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* -----------------------------------------------------------------------

            [REMOVE BEFORE FLIGHT]
         I forgot you could make comment blocks without // every line maybe im not cut out for this...
         anyway here's your notes for the day future me.

         Step one find a better source for react or spend some time in the docs.
         DEV NOTES
         - This page uses local state only.  Tried to integrate Firestore with no avail... 
         - Switch to Firestore:
             • Replace rows/useState with a useEffect that subscribes (onSnapshot).
             • Swap handleSubmit for something useful.
             • Consider a schema validator <-- youtube mention this check watch history. look into what they do 
             • Add handling for success/failure.
         - Big table, look at windowing (react-virtualized/react-aria-components) <- saw this in a yt video check watch history 
           if you start feeling laggy with lots of rows.

         ACCESSIBILITY
         - Inputs have labels.
         - People with limited vision exist <-- im fairly certain this is a non issue because of the labels but worth looking into.
         - Add some kind of keyboard support for adding/removing multi-entry rows. <- maybe waste of time just get this finished first b4 job fair.

         FUTURE IDEAS
         - Inline row expanders for full patient details.
         - CSV import/export.
         - Audit log for changes.
         - Role-based access.

         -----------------------------------------------------------------------
         TODO: README
         - Write a short README in /src/pages/TYDB.md or project README:
             • What this page does <- not everyone works in tech keep it simple stupid
             • How to add/edit records
             • Expected data
             • How to hook up Firestore <---PRIORITY 1
             • Known limitations
             • Future roadmap
         - Look up proper ways to implement... i feel like im typing so much for each element.
         - READ FHIR DOCS TO ENSURE THIS IS ACTUALLY COMPLIANT!!!!
         - START MAKING REGULAR COMMITS TO DEV INSTEAD OF PUSHING AT THE END OF THE DAY. THIS WILL COME BACK TO HAUNT YOU <-- also get some help, 
           you cant expect to every work on a team of people making massive pushes like you are now. its not just unprofessional its sloppy 
         --------------------------------------------------------------------- */}
        </div>
    );
}
