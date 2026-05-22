import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { submitQuote } from "@/lib/api";
import { validators, validateAll, openWhatsApp } from "@/lib/forms";
import { TextField, TextAreaField, SelectField } from "@/components/FormFields";
import { PRODUCTS } from "@/data/site";

const initial = { name: "", phone: "", email: "", company: "", product: "", quantity: "", location: "", message: "" };

const SCHEMA = {
  name: validators.name,
  phone: validators.phone,
  email: validators.email,
  product: (v) => validators.required(v, "Product"),
  message: (v) => {
    const t = (v || "").trim();
    if (!t) return "Project details are required.";
    if (t.length < 10) return "Please share at least 10 characters of detail.";
    return "";
  },
};

export default function QuoteForm({ defaultProduct = "" }) {
  const [data, setData] = useState({ ...initial, product: defaultProduct });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    const v = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setData((d) => ({ ...d, [name]: v }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const errs = validateAll(data, SCHEMA);
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error("Please fix the errors in the form.");
      return;
    }
    setErrors({});
    setLoading(true);
    const payload = {
      ...data,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: `+91${data.phone}`,
      message: data.message.trim(),
    };
    try {
      await submitQuote(payload);
      openWhatsApp("quote", payload);
      toast.success("Quote request received. WhatsApp opened — tap send to deliver.");
      setDone(true);
      setData({ ...initial });
    } catch {
      openWhatsApp("quote", payload);
      toast.error("Could not save to server — WhatsApp opened as fallback. Tap send.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[#B0B7C3] rounded-2xl p-8 text-center" data-testid="quote-success">
        <CheckCircle2 className="w-12 h-12 text-[#072B61] mx-auto" />
        <div className="font-display font-black text-2xl text-[#072B61] mt-4">Request Submitted</div>
        <p className="text-[#475569] mt-2">Thank you. Our sales team will get back to you within 24 hours.</p>
        <button onClick={() => setDone(false)} className="mt-6 text-sm font-bold text-[#072B61]" data-testid="quote-new-request">Submit another →</button>
      </motion.div>
    );
  }

  const productOptions = [...PRODUCTS.map((p) => p.name), "Other / Custom"];

  return (
    <form onSubmit={submit} noValidate className="bg-white border border-[#B0B7C3] rounded-2xl p-6 md:p-8 space-y-5" data-testid="quote-form">
      <div className="grid md:grid-cols-2 gap-5">
        <TextField label="Your Name" name="name" required value={data.name} onChange={update} error={errors.name} placeholder="e.g. Anand Joshi" testid="quote-name" />
        <TextField label="Phone Number" name="phone" required value={data.phone} onChange={update} error={errors.phone} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} testid="quote-phone" />
        <TextField label="Email Address" name="email" type="email" required value={data.email} onChange={update} error={errors.email} placeholder="you@example.com" testid="quote-email" />
        <TextField label="Company / Site" name="company" value={data.company} onChange={update} placeholder="(Optional)" testid="quote-company" />
        <SelectField label="Product" name="product" required value={data.product} onChange={update} error={errors.product} options={productOptions} placeholder="Select a product" testid="quote-product" />
        <TextField label="Quantity" name="quantity" value={data.quantity} onChange={update} placeholder="e.g. 5,000 sqm" testid="quote-quantity" />
        <TextField label="Site Location" name="location" value={data.location} onChange={update} placeholder="City / Pincode" testid="quote-location" />
      </div>
      <TextAreaField label="Project Details" name="message" required value={data.message} onChange={update} error={errors.message} placeholder="Tell us about your project, timelines, specifications…" rows={4} testid="quote-message" />

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={loading}
          data-testid="quote-submit"
          className="inline-flex items-center justify-center gap-2 bg-[#072B61] hover:bg-[#051E47] text-white px-8 py-4 font-bold rounded-full disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {loading ? "Submitting…" : "Submit Quote Request"}
        </button>
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <MessageCircle className="w-4 h-4 text-[#072B61]" />
          Sends to email & opens WhatsApp automatically
        </div>
      </div>
    </form>
  );
}
