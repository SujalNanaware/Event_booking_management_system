import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const SnackbarContext = createContext(null);

let _addSnack = null;

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (ctx) return ctx;
  // fallback for usage outside provider
  return { addSnack: _addSnack || (() => {}) };
};

let snackId = 0;

const SnackbarProvider = ({ children }) => {
  const [snacks, setSnacks] = useState([]);

  const addSnack = useCallback((message, type = "info", duration = 3500) => {
    const id = ++snackId;
    setSnacks((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setSnacks((prev) => prev.filter((s) => s.id !== id)), duration);
  }, []);

  _addSnack = addSnack;

  const removeSnack = (id) => setSnacks((prev) => prev.filter((s) => s.id !== id));

  return (
    <SnackbarContext.Provider value={{ addSnack }}>
      {children}
      <div className="snackbar">
        {snacks.map((snack) => (
          <div key={snack.id} className={`snackbar-item ${snack.type}`}>
            {snack.type === "success" && <CheckCircle size={18} color="var(--success)" />}
            {snack.type === "error" && <XCircle size={18} color="var(--danger)" />}
            {snack.type === "info" && <Info size={18} color="var(--secondary)" />}
            <span style={{ flex: 1 }}>{snack.message}</span>
            <button
              onClick={() => removeSnack(snack.id)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
export default SnackbarProvider;
