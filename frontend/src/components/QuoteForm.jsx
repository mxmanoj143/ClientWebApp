import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { submitQuote } from "@/lib/api";
import { PRODUCTS } from "@/data/site";

const initial = { name: "", email: "", phone: "", company: "", product: "", quantity: "", location: "", message: "" };

export default function QuoteForm({ defaultProduct = "" }) {
  const [data, setData] = useState({ ...initial, product: defaultProduct });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone || !data.product) {
      toast.error("Please fill the required fields.");
      return;
    }
    try {
      setLoading(true);
      await submitQuote(data);
      setDone(true);
      toast.success("Quote request received. Our team will reach out within 24 hours.");
      setData({ ...initial });
    } catch (err) {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 text-center" data-testid="quote-success">
        <CheckCircle2 className="w-12 h-12 text-[#EA580C] mx-auto" />
        <div className="font-display font-black text-2xl text-[#0F172A] mt-4">Request Submitted</div>
        <p className="text-[#475569] mt-2">Thank you. Our sales team will get back to you within 24 hours.</p>
        <button onClick={() => setDone(false)} className="mt-6 text-sm font-bold text-[#EA580C]" data-testid="quote-new-request">Submit another →</button>
      </motion.div>
    );
  }

  const Field = ({ label, name, type = "text", required, ...rest }) => (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">{label}{required && " *"}</span>
      <input
        type={type}
        name={name}
        value={data[name]}
        onChange={onChange}
        required={required}
        data-testid={`quote-${name}`}
        className="mt-2 w-full bg-white border border-[#E2E8F0] focus:border-[#EA580C] outline-none px-4 py-3 text-[#0F172A] rounded-lg transition-colors"
        {...rest}
      />
    </label>
  );

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-8 space-y-5" data-testid="quote-form">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" required />
        <Field label="Phone" name="phone" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Company / Site" name="company" />
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">Product *</span>
          <select
            name="product"
            value={data.product}
            onChange={onChange}
            required
            data-testid="quote-product"
            className="mt-2 w-full bg-white border border-[#E2E8F0] focus:border-[#EA580C] outline-none px-4 py-3 text-[#0F172A] rounded-lg"
          >
            <option value="">Select a product</option>
            {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            <option value="Other">Other / Custom</option>
          </select>
        </label>
        <Field label="Quantity" name="quantity" placeholder="e.g. 5,000 sqm" />
        <Field label="Site Location" name="location" placeholder="City / Pincode" />
      </div>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">Project Details</span>
        <textarea
          name="message"
          value={data.message}
          onChange={onChange}
          rows={4}
          data-testid="quote-message"
          className="mt-2 w-full bg-white border border-[#E2E8F0] focus:border-[#EA580C] outline-none px-4 py-3 text-[#0F172A] rounded-lg"
          placeholder="Tell us about your project, timelines, specifications…"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        data-testid="quote-submit"
        className="inline-flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-4 font-bold tracking-wide rounded-full disabled:opacity-60 transition-colors"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        {loading ? "Submitting…" : "Submit Quote Request"}
      </button>
    </form>
  );
}
