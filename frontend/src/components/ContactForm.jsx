import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone || !data.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      await submitContact(data);
      toast.success("Message sent. We will reply shortly.");
      setDone(true);
      setData(initial);
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 text-center" data-testid="contact-success">
        <CheckCircle2 className="w-12 h-12 text-[#94A3B8] mx-auto" />
        <div className="font-display font-black text-2xl text-[#1E3A8A] mt-4">Message Sent</div>
        <p className="text-[#475569] mt-2">Thanks for reaching out. We will get back to you within one business day.</p>
        <button onClick={() => setDone(false)} className="mt-6 text-sm font-bold text-[#94A3B8]" data-testid="contact-send-another">Send another →</button>
      </motion.div>
    );
  }

  const Field = ({ label, name, type = "text", required }) => (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">{label}{required && " *"}</span>
      <input
        type={type}
        name={name}
        value={data[name]}
        onChange={onChange}
        required={required}
        data-testid={`contact-${name}`}
        className="mt-2 w-full bg-white border border-[#E2E8F0] focus:border-[#94A3B8] outline-none px-4 py-3 text-[#1E3A8A] rounded-lg"
      />
    </label>
  );

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-8 space-y-5" data-testid="contact-form">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Your Name" name="name" required />
        <Field label="Phone" name="phone" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Subject" name="subject" />
      </div>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">Message *</span>
        <textarea
          name="message"
          value={data.message}
          onChange={onChange}
          rows={5}
          required
          data-testid="contact-message"
          className="mt-2 w-full bg-white border border-[#E2E8F0] focus:border-[#94A3B8] outline-none px-4 py-3 text-[#1E3A8A] rounded-lg"
          placeholder="How can we help?"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        data-testid="contact-submit"
        className="inline-flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#94A3B8] text-white px-8 py-4 font-bold tracking-wide rounded-full disabled:opacity-60 transition-colors"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
