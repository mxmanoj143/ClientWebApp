import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";
import { validators, validateAll, openWhatsApp } from "@/lib/forms";
import { TextField, TextAreaField } from "@/components/FormFields";

const initial = { name: "", phone: "", email: "", subject: "", message: "" };

const SCHEMA = {
  name: validators.name,
  phone: validators.phone,
  email: validators.email,
  message: validators.message,
};

export default function ContactForm() {
  const [data, setData] = useState(initial);
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
      subject: data.subject.trim(),
      message: data.message.trim(),
    };
    try {
      await submitContact(payload);
      openWhatsApp("contact", payload);
      toast.success("Message sent. WhatsApp opened — tap send to deliver.");
      setDone(true);
      setData(initial);
    } catch {
      // Even if backend fails, still open WhatsApp so customer reach is preserved
      openWhatsApp("contact", payload);
      toast.error("Could not save to server — WhatsApp opened as fallback. Tap send.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[#B0B7C3] rounded-2xl p-8 text-center" data-testid="contact-success">
        <CheckCircle2 className="w-12 h-12 text-[#072B61] mx-auto" />
        <div className="font-display font-black text-2xl text-[#072B61] mt-4">Message Sent</div>
        <p className="text-[#475569] mt-2">We saved your enquiry and opened WhatsApp for instant delivery. Our team will reply within one business day.</p>
        <button onClick={() => setDone(false)} className="mt-6 text-sm font-bold text-[#072B61]" data-testid="contact-send-another">Send another →</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="bg-white border border-[#B0B7C3] rounded-2xl p-6 md:p-8 space-y-5" data-testid="contact-form">
      <div className="grid md:grid-cols-2 gap-5">
        <TextField label="Your Name" name="name" required value={data.name} onChange={update} error={errors.name} placeholder="e.g. Anand Joshi" testid="contact-name" />
        <TextField label="Phone Number" name="phone" required value={data.phone} onChange={update} error={errors.phone} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} testid="contact-phone" />
        <TextField label="Email Address" name="email" type="email" required value={data.email} onChange={update} error={errors.email} placeholder="you@example.com" testid="contact-email" />
        <TextField label="Subject" name="subject" value={data.subject} onChange={update} placeholder="(Optional)" testid="contact-subject" />
      </div>
      <TextAreaField label="Message" name="message" required value={data.message} onChange={update} error={errors.message} placeholder="How can we help?" rows={5} testid="contact-message" />

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={loading}
          data-testid="contact-submit"
          className="inline-flex items-center justify-center gap-2 bg-[#072B61] hover:bg-[#051E47] text-white px-8 py-4 font-bold rounded-full disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? "Sending…" : "Send Message"}
        </button>
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <MessageCircle className="w-4 h-4 text-[#072B61]" />
          Sends to email & opens WhatsApp automatically
        </div>
      </div>
    </form>
  );
}
