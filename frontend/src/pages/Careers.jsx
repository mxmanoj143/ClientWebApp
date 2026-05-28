import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Send, Briefcase, Mail, MapPin, GraduationCap, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { submitCareer } from "@/lib/api";
import { validators, validateAll, openWhatsApp } from "@/lib/forms";
import { TextField, TextAreaField } from "@/components/FormFields";
import { COMPANY } from "@/data/site";

const initial = { name: "", phone: "", email: "", position: "", experience: "", message: "" };

const SCHEMA = {
  name: validators.name,
  phone: validators.phone,
  email: validators.email,
};

const OPENINGS = [
  {
    id: "sales-executive",
    title: "Sales Executive",
    location: "Pune (Travelling as required)",
    type: "Full-Time",
    requirements: [
      "Graduate (any stream)",
      "1–2 years of sales experience",
      "Basic knowledge of precast concrete products",
      "Good communication & client-handling skills",
    ],
  },
  {
    id: "operations-executive",
    title: "Operations Executive",
    location: "Pune",
    type: "Full-Time",
    requirements: [
      "Graduate in Commerce / Accounting",
      "1–2 years of accounting experience",
      "Working knowledge of GST, taxes & challans",
      "Proficient in Tally / Excel",
    ],
  },
];

export default function Careers() {
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
    const payload = { ...data, name: data.name.trim(), email: data.email.trim(), phone: `+91${data.phone}` };
    try {
      await submitCareer(payload);
      openWhatsApp("career", payload);
      toast.success("Application received. WhatsApp opened — tap send to deliver.");
      setDone(true);
      setData(initial);
    } catch {
      openWhatsApp("career", payload);
      toast.error("Could not save to server — WhatsApp opened as fallback. Tap send.");
    } finally {
      setLoading(false);
    }
  };

  const applyTo = (title) => {
    setData((d) => ({ ...d, position: title }));
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-testid="careers-page">
      <PageHeader
        overline="Careers"
        title="Build a career as solid as concrete."
        subtitle="Join a growing precast manufacturer where engineering precision meets industrial scale. Below are our current openings — apply directly or drop your resume for future roles."
        image="/assets/about.png"
      />

      {/* Openings */}
      <section className="px-6 md:px-12 lg:px-24 pt-20">
        <div className="text-xs uppercase tracking-[0.3em] text-[#072B61] font-bold">Current Openings</div>
        <h2 className="font-display font-black text-3xl md:text-4xl text-[#072B61] mt-3 leading-[1.05]">We are hiring.</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {OPENINGS.map((o, i) => (
            <motion.article
              key={o.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-[#B0B7C3] rounded-2xl p-7 product-card-hover h-full flex flex-col"
              data-testid={`opening-${o.id}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 bg-[#072B61] rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#072B61] bg-[#F5F7FA] border border-[#B0B7C3] px-3 py-1.5 rounded-full">{o.type}</span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#072B61] mt-5 leading-tight">{o.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-sm text-[#475569]">
                <MapPin className="w-3.5 h-3.5 text-[#B0B7C3]" />
                {o.location}
              </div>

              <div className="mt-5 pt-5 border-t border-[#F5F7FA]">
                <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#475569] mb-3 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" /> Requirements
                </div>
                <ul className="space-y-1.5">
                  {o.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-[#072B61]">
                      <span className="w-1.5 h-1.5 bg-[#072B61] rounded-full mt-2 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => applyTo(o.title)}
                data-testid={`apply-btn-${o.id}`}
                className="mt-auto pt-6"
              >
                <span className="inline-flex items-center gap-2 bg-[#072B61] hover:bg-[#051E47] text-white px-5 py-2.5 text-sm font-bold rounded-full transition-colors">
                  Apply for this role <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="px-6 md:px-12 lg:px-24 py-20 scroll-mt-32">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.3em] text-[#072B61] font-bold">Apply</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-[#072B61] mt-3 leading-[1.05]">Tell us about yourself.</h2>
            <p className="text-[#475569] mt-5 leading-relaxed">
              Don't see a role that matches? Send your details anyway — we keep a talent pool and reach out when openings emerge.
            </p>
            <div className="mt-6 bg-white border border-[#B0B7C3] rounded-2xl p-5">
              <div className="flex items-center gap-3 text-[#072B61]">
                <Mail className="w-5 h-5 text-[#B0B7C3]" />
                <a href={`mailto:${COMPANY.emails[0]}`} className="font-bold text-sm break-all hover:underline">{COMPANY.emails[0]}</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {done ? (
              <div className="bg-white border border-[#B0B7C3] rounded-2xl p-10 text-center" data-testid="career-success">
                <CheckCircle2 className="w-12 h-12 text-[#072B61] mx-auto" />
                <div className="font-display font-black text-2xl text-[#072B61] mt-4">Application Received</div>
                <p className="text-[#475569] mt-2">Thanks for your interest in joining Revanth. Our HR team will reach out when a suitable role opens.</p>
                <button onClick={() => setDone(false)} className="mt-6 text-sm font-bold text-[#072B61]" data-testid="career-new">Submit another →</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="bg-white border border-[#B0B7C3] rounded-2xl p-6 md:p-8 space-y-5" data-testid="career-form">
                <div className="grid md:grid-cols-2 gap-5">
                  <TextField label="Full Name" name="name" required value={data.name} onChange={update} error={errors.name} placeholder="e.g. Priya Patil" testid="career-name" />
                  <TextField label="Phone Number" name="phone" required value={data.phone} onChange={update} error={errors.phone} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} testid="career-phone" />
                  <TextField label="Email Address" name="email" type="email" required value={data.email} onChange={update} error={errors.email} placeholder="you@example.com" testid="career-email" />
                  <TextField label="Position of Interest" name="position" value={data.position} onChange={update} placeholder="e.g. Sales Executive" testid="career-position" />
                  <TextField label="Years of Experience" name="experience" value={data.experience} onChange={update} placeholder="e.g. 2 years" testid="career-experience" />
                </div>
                <TextAreaField label="Message / Resume Link" name="message" value={data.message} onChange={update} placeholder="Paste your resume link, brief bio, or notable projects." rows={4} testid="career-message" />
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="career-submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#072B61] hover:bg-[#051E47] text-white px-8 py-4 font-bold rounded-full disabled:opacity-60 transition-colors"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
