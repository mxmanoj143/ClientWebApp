// Reusable, stable form field — defined OUTSIDE any parent component to keep focus
import { AlertCircle } from "lucide-react";

export function TextField({ label, name, type = "text", required, value, onChange, error, placeholder, inputMode, maxLength, testid }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">
        {label}{required && <span className="text-red-600"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete="off"
        placeholder={placeholder}
        data-testid={testid || `field-${name}`}
        className={`mt-2 w-full bg-white outline-none px-4 py-3 text-[#072B61] rounded-lg transition-colors border ${
          error ? "border-red-500 focus:border-red-600" : "border-[#B0B7C3] focus:border-[#072B61]"
        }`}
      />
      {error && (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600" data-testid={`error-${name}`}>
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </span>
      )}
    </label>
  );
}

export function TextAreaField({ label, name, required, value, onChange, error, placeholder, rows = 4, testid }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">
        {label}{required && <span className="text-red-600"> *</span>}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={placeholder}
        data-testid={testid || `field-${name}`}
        className={`mt-2 w-full bg-white outline-none px-4 py-3 text-[#072B61] rounded-lg transition-colors border ${
          error ? "border-red-500 focus:border-red-600" : "border-[#B0B7C3] focus:border-[#072B61]"
        }`}
      />
      {error && (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600" data-testid={`error-${name}`}>
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </span>
      )}
    </label>
  );
}

export function SelectField({ label, name, required, value, onChange, error, options, placeholder = "Select an option", testid }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">
        {label}{required && <span className="text-red-600"> *</span>}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={testid || `field-${name}`}
        className={`mt-2 w-full bg-white outline-none px-4 py-3 text-[#072B61] rounded-lg border ${
          error ? "border-red-500 focus:border-red-600" : "border-[#B0B7C3] focus:border-[#072B61]"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600" data-testid={`error-${name}`}>
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </span>
      )}
    </label>
  );
}
