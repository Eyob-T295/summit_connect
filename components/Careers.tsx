import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Upload, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  experience: string;
  usHours: string;
  education: string;
  challenge: string;
  file: File | null;
}

const Careers: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    experience: '',
    usHours: '',
    education: '',
    challenge: '',
    file: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.experience) newErrors.experience = 'Experience details are required';
    if (!formData.usHours) newErrors.usHours = 'Please select your availability';
    if (!formData.challenge) newErrors.challenge = 'This field is required';
    if (!formData.file) newErrors.file = 'Please upload your introductory video or recording';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
      if (errors.file) setErrors({ ...errors, file: undefined });
    }
  };

  return (
    <section id="careers" className="relative py-24 bg-black overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Careers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase italic"
          >
            Apply to Join Our <br />
            <span className="text-blue-500">Appointment Setting Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            We are looking for disciplined, high-performance appointment setters who are comfortable working U.S. hours and thrive in structured, performance-driven environments.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-white/60 uppercase tracking-widest">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> {errors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-white/60 uppercase tracking-widest">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-white/60 uppercase tracking-widest">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                </div>

                {/* Previous Experience */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-white/60 uppercase tracking-widest">Previous Experience *</label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={4}
                    className={`w-full bg-white/5 border ${errors.experience ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none`}
                    placeholder="Describe your previous roles in call centers or appointment setting..."
                  />
                  {errors.experience && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> {errors.experience}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* U.S. Hours Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-white/60 uppercase tracking-widest">Willing to work U.S. business hours? *</label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, usHours: option })}
                          className={`flex-1 py-4 rounded-xl border transition-all font-bold uppercase tracking-widest text-xs ${
                            formData.usHours === option
                              ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                              : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.usHours && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> {errors.usHours}</p>}
                  </div>

                  {/* Education Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-white/60 uppercase tracking-widest">Highest Level of Education</label>
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-900">Select Education</option>
                      <option value="High School" className="bg-slate-900">High School</option>
                      <option value="Associate Degree" className="bg-slate-900">Associate Degree</option>
                      <option value="Bachelor's Degree" className="bg-slate-900">Bachelor's Degree</option>
                      <option value="Master's Degree" className="bg-slate-900">Master's Degree</option>
                      <option value="PhD" className="bg-slate-900">PhD</option>
                    </select>
                  </div>
                </div>

                {/* Personal Challenge */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-white/60 uppercase tracking-widest">What is one challenge you face in becoming the best version of yourself? *</label>
                  <textarea
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    rows={4}
                    className={`w-full bg-white/5 border ${errors.challenge ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none`}
                    placeholder="Be honest and reflective..."
                  />
                  {errors.challenge && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> {errors.challenge}</p>}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-white/60 uppercase tracking-widest">Introductory Video or Voice Recording (2 min) *</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed ${errors.file ? 'border-red-500/30' : 'border-white/10'} rounded-2xl p-8 text-center cursor-pointer hover:bg-white/5 transition-all group`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="video/*,audio/*"
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                        <Upload size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-white uppercase tracking-widest">
                          {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-white/40">MP4, MOV, WAV, or MP3 (Max 50MB)</p>
                      </div>
                    </div>
                  </div>
                  {errors.file && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> {errors.file}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.3em] text-xs py-6 rounded-xl shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <CheckCircle2 className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-8 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tight">Application Received</h3>
                <p className="text-slate-400 max-w-md mx-auto font-light leading-relaxed mb-8">
                  Thank you for your interest in joining our team. Our recruitment specialists will review your application and introductory video. We will be in touch shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-blue-500 font-bold uppercase tracking-widest text-xs hover:text-blue-400 transition-colors"
                >
                  Submit another application
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;
