import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useFilter } from "../context/FilterContext";
import TransactionEditModal from "./TransactionEditModal.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const filterParams = (ctx) => ({
  type: ctx.type,
  category: ctx.category,
  startDate: ctx.startDate,
  endDate: ctx.endDate,
  minAmount: ctx.minAmount,
  maxAmount: ctx.maxAmount,
});

function DestructiveConfirm({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
  loading,
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <h3
          id="confirm-title"
          className="text-lg font-semibold text-gray-900 sm:text-xl"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const History = () => {
  const {
    type,
    setType,
    category,
    setCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    frequency,
    setFrequency,
    table,
    refreshTransactions,
  } = useFilter();

  const [selectedIds, setSelectedIds] = useState([]);
  const [editingTxn, setEditingTxn] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [banner, setBanner] = useState(null);
  const headerCheckboxRef = useRef(null);

  const formatDate = (txn) => new Date(txn.date).toLocaleDateString();

  const reset = () => {
    setType("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setMinAmount("");
    setMaxAmount("");
    setFrequency("");
  };

  const handleFrequencyChange = (value) => {
    setFrequency(value);
    const today = new Date();

    switch (value) {
      case "lastWeek": {
        const start = new Date(today);
        start.setDate(today.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        setStartDate(start.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
        break;
      }
      case "lastMonth": {
        const firstThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastPrev = new Date(firstThisMonth);
        lastPrev.setDate(0);
        const firstPrev = new Date(lastPrev.getFullYear(), lastPrev.getMonth(), 1);
        setStartDate(firstPrev.toISOString().split("T")[0]);
        setEndDate(lastPrev.toISOString().split("T")[0]);
        break;
      }
      case "custom":
        setStartDate("");
        setEndDate("");
        break;
      default:
        setStartDate("");
        setEndDate("");
    }
  };

  useEffect(() => {
    const valid = new Set(table.map((t) => String(t._id)));
    setSelectedIds((prev) => prev.filter((id) => valid.has(id)));
  }, [table]);

  const rowIds = useMemo(() => table.map((t) => String(t._id)), [table]);
  const allSelected =
    rowIds.length > 0 && selectedIds.length === rowIds.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  useEffect(() => {
    const el = headerCheckboxRef.current;
    if (el) el.indeterminate = someSelected;
  }, [someSelected]);

  const toggleOne = (id) => {
    const s = String(id);
    setSelectedIds((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds([...rowIds]);
  };

  const showBanner = (typeKey, text) => {
    setBanner({ type: typeKey, text });
    window.setTimeout(() => setBanner(null), 5000);
  };

  const ctxForParams = {
    type,
    category,
    startDate,
    endDate,
    minAmount,
    maxAmount,
  };

  const runConfirmedAction = async () => {
    if (!confirm) return;
    setActionLoading(true);
    const token = localStorage.getItem("token");
    try {
      if (confirm.kind === "one") {
        const res = await axios.delete(
          `${BACKEND_URL}/transaction/delete/${confirm.id}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (!res.data?.success) {
          showBanner("error", res.data?.message || "Delete failed");
          return;
        }
        showBanner("success", "Transaction deleted.");
        setSelectedIds((p) => p.filter((x) => x !== String(confirm.id)));
      } else if (confirm.kind === "bulk") {
        const res = await axios.post(
          `${BACKEND_URL}/transaction/delete-bulk`,
          { ids: confirm.ids },
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (!res.data?.success) {
          showBanner("error", res.data?.message || "Delete failed");
          return;
        }
        showBanner(
          "success",
          `Deleted ${res.data.deletedCount ?? confirm.ids.length} transaction(s).`
        );
        setSelectedIds([]);
      } else if (confirm.kind === "filtered") {
        const res = await axios.delete(`${BACKEND_URL}/transaction/filtered`, {
          headers: { authorization: `Bearer ${token}` },
          params: filterParams(ctxForParams),
        });
        if (!res.data?.success) {
          showBanner("error", res.data?.message || "Delete failed");
          return;
        }
        showBanner(
          "success",
          `Deleted ${res.data.deletedCount ?? 0} transaction(s) matching filters.`
        );
        setSelectedIds([]);
      }
      refreshTransactions();
      setConfirm(null);
    } catch (err) {
      showBanner(
        "error",
        err.response?.data?.message || err.message || "Request failed"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const hasActiveFilters =
    Boolean(type) ||
    Boolean(category) ||
    Boolean(startDate) ||
    Boolean(endDate) ||
    Boolean(minAmount) ||
    Boolean(maxAmount);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 sm:gap-4">
      <div className="flex-shrink-0 rounded-lg border border-gray-100 bg-white p-3 shadow-md sm:p-4 lg:p-5">
        <h2 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg lg:text-xl">
          Filter transactions
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs font-medium text-gray-700 sm:text-sm">
              Transaction type
            </label>
            <select
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All types</option>
              <option value="credit">Credit</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs font-medium text-gray-700 sm:text-sm">
              Category
            </label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All categories</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="utilities">Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs font-medium text-gray-700 sm:text-sm">
              Time period
            </label>
            <select
              name="frequency"
              onChange={(e) => handleFrequencyChange(e.target.value)}
              value={frequency}
              className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All time</option>
              <option value="lastWeek">Last week</option>
              <option value="lastMonth">Last month</option>
              <option value="custom">Custom range</option>
            </select>
          </div>

          {frequency === "custom" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  End date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Min amount (₹)
            </label>
            <input
              type="number"
              placeholder="0"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Max amount (₹)
            </label>
            <input
              type="number"
              placeholder="∞"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={reset}
              className="w-full rounded-md bg-gray-100 p-2 font-medium text-gray-800 transition-colors hover:bg-gray-200"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="flex-shrink-0 space-y-3 border-b border-gray-200 p-3 sm:p-4">
          <div>
            <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
              Transaction history
            </h3>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
              Showing {table.length} transaction{table.length !== 1 ? "s" : ""}
              {selectedIds.length > 0
                ? ` · ${selectedIds.length} selected`
                : ""}
            </p>
          </div>

          {banner && (
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                banner.type === "success"
                  ? "border border-green-200 bg-green-50 text-green-800"
                  : "border border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {banner.text}
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() =>
                setConfirm({
                  kind: "bulk",
                  ids: [...selectedIds],
                  title: "Delete selected?",
                  description: `Permanently delete ${selectedIds.length} selected transaction${selectedIds.length !== 1 ? "s" : ""}? This cannot be undone.`,
                })
              }
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-left text-sm font-medium text-red-800 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Delete selected
              {selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
            </button>
            <button
              type="button"
              disabled={table.length === 0}
              onClick={() =>
                setConfirm({
                  kind: "filtered",
                  title: "Delete all matching filters?",
                  description: hasActiveFilters
                    ? `This will permanently delete all ${table.length} transaction${table.length !== 1 ? "s" : ""} that match your current filters (same list you see in the table).`
                    : `No filters are applied. This will permanently delete all ${table.length} transaction${table.length !== 1 ? "s" : ""} in your account.`,
                })
              }
              className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-left text-sm font-medium text-amber-900 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Delete all in current view
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
          <div className="min-w-full">
            <table className="min-w-[42rem] w-full">
              <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 shadow-sm">
                <tr>
                  <th className="w-10 p-2 sm:w-12 sm:p-2.5">
                    <span className="sr-only">Select row</span>
                    <input
                      ref={headerCheckboxRef}
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      disabled={table.length === 0}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      aria-label="Select all transactions"
                    />
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">
                    Date
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">
                    Type
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">
                    Category
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">
                    Amount
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">
                    Note
                  </th>
                  <th className="p-2 text-right text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-6 text-center text-sm text-gray-500 sm:p-8"
                    >
                      No transactions found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  table.map((txn) => {
                    const id = String(txn._id);
                    const checked = selectedIds.includes(id);
                    return (
                      <tr
                        key={id}
                        className={`transition-colors duration-150 hover:bg-gray-50 ${
                          txn.type === "expense" ? "bg-red-50/80" : "bg-green-50/80"
                        }`}
                      >
                        <td className="p-2 sm:p-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOne(id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            aria-label={`Select transaction ${id}`}
                          />
                        </td>
                        <td className="whitespace-nowrap p-2 text-xs text-gray-900 sm:text-sm">
                          {formatDate(txn)}
                        </td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
                              txn.type === "expense"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {txn.type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap p-2 text-xs capitalize text-gray-900 sm:text-sm">
                          {txn.category}
                        </td>
                        <td className="whitespace-nowrap p-2 text-xs font-semibold text-gray-900 sm:text-sm">
                          ₹{txn.amount}
                        </td>
                        <td
                          className="max-w-[6rem] truncate p-2 text-xs text-gray-600 sm:max-w-[10rem] md:max-w-[14rem]"
                          title={txn.note}
                        >
                          {txn.note}
                        </td>
                        <td className="whitespace-nowrap p-2 text-right">
                          <div className="inline-flex flex-wrap justify-end gap-1 sm:gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingTxn(txn)}
                              className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50 sm:px-2.5 sm:text-sm"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirm({
                                  kind: "one",
                                  id,
                                  title: "Delete transaction?",
                                  description:
                                    "This transaction will be permanently removed.",
                                })
                              }
                              className="rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 sm:px-2.5 sm:text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DestructiveConfirm
        open={Boolean(confirm)}
        title={confirm?.title}
        description={confirm?.description}
        confirmLabel="Delete permanently"
        loading={actionLoading}
        onCancel={() => !actionLoading && setConfirm(null)}
        onConfirm={runConfirmedAction}
      />

      <TransactionEditModal
        transaction={editingTxn}
        onClose={() => setEditingTxn(null)}
        onSaved={() => {
          refreshTransactions();
          showBanner("success", "Transaction updated.");
        }}
      />
    </div>
  );
};

export default History;
