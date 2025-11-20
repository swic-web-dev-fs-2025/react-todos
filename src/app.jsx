import confetti from "canvas-confetti";

import useSubmit from "./use-submit";

const CONFETTI_OPTIONS = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

const FORM_FIELDS = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  {
    label: "Message",
    name: "message",
    type: "textarea",
    required: true,
    rows: 4,
  },
];

export default function App() {
  const [submittedData, setSubmittedData] = useSubmit();

  const handleSubmit = (formData) => {
    setSubmittedData(Object.fromEntries(formData));

    confetti(CONFETTI_OPTIONS);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Contact Form</h1>

      <form
        action={handleSubmit}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        {FORM_FIELDS.map((field) => (
          <Input key={field.name} {...field} />
        ))}

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-green-900">
            Submission Received
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {submittedData.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {submittedData.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Message:</span>{" "}
              {submittedData.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, name, type = "text", required = false, rows = 4 }) {
  const isTextarea = type === "textarea";
  const baseClasses =
    "w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={rows}
          className={baseClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
}
