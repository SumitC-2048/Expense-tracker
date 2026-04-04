import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CATEGORIES = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities", label: "Utilities" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const toInputDate = (dateVal) => {
  const d = new Date(dateVal);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

const TransactionEditModal = ({ transaction, onClose, onSaved }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!transaction) return;
    setDate(toInputDate(transaction.date));
    setAmount(String(transaction.amount ?? ""));
    setType(transaction.type || "expense");
    setCategory(transaction.category || "other");
    setNote(transaction.note || "");
    setError("");
  }, [transaction]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!transaction) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BACKEND_URL}/transaction/edit/${transaction._id}`,
        {
          date,
          amount: Number(amount),
          type,
          category,
          note,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!response.data.success) {
        setError(response.data.message || "Update failed");
        return;
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-txn-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex max-h-[min(92dvh,100%)] w-full max-w-md flex-col rounded-t-2xl bg-white shadow-xl sm:max-h-[90dvh] sm:rounded-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <h2
            id="edit-txn-title"
            className="text-lg font-semibold text-gray-900 sm:text-xl"
          >
            Edit transaction
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
            Update details and save. Press Esc to cancel.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-3 sm:px-5 sm:py-4"
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Amount (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="credit">Credit</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Note
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={50}
                className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Optional"
              />
            </div>
          </div>

          {error && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionEditModal;
