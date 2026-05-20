import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Send, Briefcase, Mail, Clock, Users } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { submitCareer } from "@/lib/api";
import { COMPANY } from "@/data/site";

const initial = { name: "", email: "", phone: "", position: "", experience: "", message: "" };

export default function Careers() {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      await submitCareer(data);
      toast.success("Application received. We will be in touch.");
      setDone(true);
      setData(initial);
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="careers-page">
      <PageHeader
        overline="Careers"
        title="Build a career as solid as concrete."
        subtitle="No openings advertised right now — but we are always meeting talented engineers, supervisors and operators. Drop your details and we will reach out when a fit opens up."
        image="https://images.unsplash.com/photo-1759395162292-728a3279b926?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            {[
              { icon: Briefcase, title: "Roles we hire for", desc: "Production engineers, QC chemists, mould fabricators, site supervisors, logistics and sales." },
              { icon: Users, title: "What we look for", desc: "Discipline, ownership and an eye for finish. We can teach concrete — we cannot teach craft." },
              { icon: Clock, title: "How it works", desc: "Drop your CV. Our HR team reviews monthly and reaches out when an opening matches your profile." },
              { icon: Mail, title: "Direct mail", desc: COMPANY.emails[0] },
            ].map((c) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 product-card-hover"
              >
                <c.icon className="w-6 h-6 text-[#B0B7C3]" />
                <div className="font-display font-black text-lg text-[#072B61] mt-3">{c.title}</div>
                <p className="text-[#475569] text-sm mt-2">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-7">
            {done ? (
              <div className="glass rounded-2xl p-10 text-center" data-testid="career-success">
                <CheckCircle2 className="w-12 h-12 text-[#B0B7C3] mx-auto" />
                <div className="font-display font-black text-2xl text-[#072B61] mt-4">Application Received</div>
                <p className="text-[#475569] mt-2">Thanks for your interest in joining Revanth. We will reach out when a suitable role opens.</p>
                <button onClick={() => setDone(false)} className="mt-6 text-sm font-bold text-[#B0B7C3]" data-testid="career-new">Submit another →</button>
              </div>
            ) : (
              <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-8 space-y-5" data-testid="career-form">
                <div className="text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">Apply</div>
                <h2 className="font-display font-black text-3xl text-[#072B61]">Tell us about yourself.</h2>

                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    ["Full Name *", "name", true, "text"],
                    ["Phone *", "phone", true, "text"],
                    ["Email *", "email", true, "email"],
                    ["Position of Interest", "position", false, "text"],
                    ["Years of Experience", "experience", false, "text"],
                  ].map(([label, name, req, type]) => (
                    <label key={name} className="block">
                      <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">{label}</span>
                      <input
                        type={type}
                        name={name}
                        value={data[name]}
                        onChange={onChange}
                        required={req}
                        data-testid={`career-${name}`}
                        className="mt-2 w-full bg-white border border-[#E2E8F0] focus:border-[#B0B7C3] outline-none px-4 py-3 text-[#072B61] rounded-lg"
                      />
                    </label>
                  ))}
                </div>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#475569]">Message / Resume Link</span>
                  <textarea
                    name="message"
                    value={data.message}
                    onChange={onChange}
                    rows={4}
                    data-testid="career-message"
                    className="mt-2 w-full bg-white border border-[#E2E8F0] focus:border-[#B0B7C3] outline-none px-4 py-3 text-[#072B61] rounded-lg"
                    placeholder="Paste your resume link, brief bio, or notable projects."
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="career-submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#072B61] hover:bg-[#072B61] text-white px-8 py-4 font-bold rounded-full disabled:opacity-60 transition-colors"
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
