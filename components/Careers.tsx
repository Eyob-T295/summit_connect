import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Upload, AlertCircle, Loader2, X, User, Phone, Mail, Briefcase, GraduationCap, FileText } from 'lucide-react';

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

interface CareersProps {
  isOpen: boolean;
  onClose: () => void;
}

const Careers: React.FC<CareersProps> = ({ isOpen, onClose }) => {
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

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    
    const appId = Date.now().toString();
    let fileData = null;
    if (formData.file) {
      try {
        // Only attempt to store if file is reasonably small (e.g. < 2MB) to avoid localStorage limits
        if (formData.file.size < 2 * 1024 * 1024) {
          fileData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({
              name: formData.file!.name,
              size: formData.file!.size,
              type: formData.file!.type,
              url: reader.result
            });
            reader.readAsDataURL(formData.file!);
          });
        } else {
          // For larger files, create an object URL for in-session preview and store metadata
          const objectUrl = URL.createObjectURL(formData.file);
          // Save object URL to sessionStorage so the dashboard can access it for playback during this session
          try {
            sessionStorage.setItem(`summit_job_app_file_${appId}`, objectUrl);
          } catch (err) {
            console.warn('Could not persist object URL to sessionStorage', err);
          }
          fileData = {
            name: formData.file.name,
            size: formData.file.size,
            type: formData.file.type,
            url: objectUrl,
            tooLarge: true
          };
        }
      } catch (err) {
        console.error("Failed to process file", err);
      }
    }

    // Save to localStorage
    const application = {
      id: appId,
      ...formData,
      file: fileData,
      submittedAt: new Date().toISOString(),
      status: 'pending' as const,
    };

    const existingApps = JSON.parse(localStorage.getItem('summit_job_apps') || '[]');
    localStorage.setItem('summit_job_apps', JSON.stringify([application, ...existingApps]));

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B1F3A] border border-white/10 rounded-[2.5rem] shadow-2xl no-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12 relative">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10 pointer-events-none"></div>

              <div className="text-center mb-16">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Recruitment Portal
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
                  Now Hiring <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">Appointment Setters</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed text-base md:text-lg border-l-2 border-blue-500/30 pl-6 italic">
                  We are looking for disciplined, high performance appointment setters who are comfortable working U.S. hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-10"
                  >
                    {/* Bento Grid Layout */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Full Name - Bento Card */}
                      <div className="md:col-span-2 space-y-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                          <User size={12} className="text-blue-500" /> Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full bg-transparent border-b-2 ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} py-3 text-xl text-white focus:outline-none focus:border-blue-500 transition-all font-black placeholder:text-white/10`}
                          placeholder="John Doe"
                        />
                        {errors.fullName && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-2"><AlertCircle size={12} /> {errors.fullName}</p>}
                      </div>

                      {/* Phone Number - Bento Card */}
                      <div className="space-y-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                          <Phone size={12} className="text-blue-500" /> Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full bg-transparent border-b-2 ${errors.phone ? 'border-red-500/50' : 'border-white/10'} py-3 text-xl text-white focus:outline-none focus:border-blue-500 transition-all font-black placeholder:text-white/10`}
                          placeholder="+251 ..."
                        />
                        {errors.phone && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-2"><AlertCircle size={12} /> {errors.phone}</p>}
                      </div>

                      {/* Email Address - Bento Card */}
                      <div className="md:col-span-3 space-y-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                          <Mail size={12} className="text-blue-500" /> Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-transparent border-b-2 ${errors.email ? 'border-red-500/50' : 'border-white/10'} py-3 text-xl text-white focus:outline-none focus:border-blue-500 transition-all font-black placeholder:text-white/10`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-2"><AlertCircle size={12} /> {errors.email}</p>}
                      </div>

                      {/* Experience - Bento Card */}
                      <div className="md:col-span-2 space-y-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                          <Briefcase size={12} className="text-blue-500" /> Have you previously worked in a call center or appointment-setting role? 
                        </label>
                        <textarea
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          rows={4}
                          className={`w-full bg-transparent border-2 ${errors.experience ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none font-bold placeholder:text-white/10`}
                          placeholder="Describe your previous roles..."
                        />
                        {errors.experience && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-2"><AlertCircle size={12} /> {errors.experience}</p>}
                      </div>

                      {/* U.S. Hours & Education - Bento Card */}
                      <div className="space-y-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">willing to work in U.S. Hours? *</label>
                          <div className="flex gap-2">
                            {['Yes', 'No'].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setFormData({ ...formData, usHours: option })}
                                className={`flex-1 py-3 rounded-xl border transition-all font-black uppercase tracking-widest text-[10px] ${
                                  formData.usHours === option
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {errors.usHours && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.usHours}</p>}
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <GraduationCap size={12} className="text-blue-500" /> Education
                          </label>
                          <select
                            value={formData.education}
                            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer font-bold text-xs"
                          >
                            <option value="" className="bg-[#0B1F3A]">Select Level</option>
                            <option value="High School" className="bg-[#0B1F3A]">High School</option>
                            <option value="Associate Degree" className="bg-[#0B1F3A]">Associate Degree</option>
                            <option value="Bachelor's Degree" className="bg-[#0B1F3A]">Bachelor's Degree</option>
                            <option value="Master's Degree" className="bg-[#0B1F3A]">Master's Degree</option>
                            <option value="PhD" className="bg-[#0B1F3A]">PhD</option>
                          </select>
                        </div>
                      </div>

                      {/* Personal Challenge - Bento Card */}
                      <div className="md:col-span-3 space-y-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                          <FileText size={12} className="text-blue-500" /> What is something you face as a challenge ?
                        </label>
                        <textarea
                          value={formData.challenge}
                          onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                          rows={3}
                          className={`w-full bg-transparent border-2 ${errors.challenge ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none font-bold placeholder:text-white/10`}
                          placeholder="What is one challenge you face in becoming the best version of yourself?"
                        />
                        {errors.challenge && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-2"><AlertCircle size={12} /> {errors.challenge}</p>}
                      </div>

                      {/* File Upload - Bento Card */}
                      <div className="md:col-span-3 space-y-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all group">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Introductory Video or Voice Recording (2 min) *</label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-full border-2 border-dashed ${errors.file ? 'border-red-500/30' : 'border-white/10'} rounded-2xl p-10 text-center cursor-pointer hover:bg-white/5 transition-all group relative overflow-hidden`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="video/*,audio/*"
                          />
                          <div className="flex flex-col items-center gap-4 relative z-10">
                            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                              <Upload size={32} />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-black text-white uppercase tracking-widest">
                                {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                              </p>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest">MP4, MOV, WAV, or MP3 (Max 50MB)</p>
                            </div>
                          </div>
                        </div>
                        {errors.file && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-2"><AlertCircle size={12} /> {errors.file}</p>}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.4em] text-xs py-8 rounded-[2rem] shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-4 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing Application...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <CheckCircle2 className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" size={20} />
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
                    <p className="text-slate-400 max-w-md mx-auto font-medium leading-relaxed mb-10 text-sm">
                      Thank you for your interest. Our recruitment specialists will review your application and introductory video. We will be in touch shortly.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-12 py-5 bg-white text-[#0B1F3A] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl"
                    >
                      Close Portal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Careers;
