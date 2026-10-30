import { useState, useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { message } from 'antd'
import { ContextType } from '@/common/types.interface'
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  Flame, 
  CheckCircle2, 
  ShieldAlert, 
  Megaphone, 
  HelpCircle, 
  PenTool, 
  Globe2 
} from 'lucide-react'

export default function PageContactUs() {
  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'general',
    subject: '',
    message: ''
  })

  useEffect(() => {
    setIsShowRecommendBooks(false)
  }, [setIsShowRecommendBooks])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      message.error('Please fill in all required fields.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      message.success('Thank you! Your message has been sent to our editorial desk.')
      setFormData({
        name: '',
        email: '',
        department: 'general',
        subject: '',
        message: ''
      })
    }, 800)
  }

  const departments = [
    {
      title: 'General Inquiries',
      email: 'contact@bicnews.com',
      desc: 'For general questions or comments about our publication and site features.',
      icon: <Mail className="w-5 h-5 text-blue-600" />,
      color: 'border-blue-200 bg-blue-50/50'
    },
    {
      title: 'News Tips & Breaking',
      email: 'news@bicnews.com',
      desc: 'Have a breaking news story or lead? We welcome credible suggestions and docs.',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      color: 'border-amber-200 bg-amber-50/50'
    },
    {
      title: 'Corrections & Editorial',
      email: 'corrections@bicnews.com',
      desc: 'Accuracy is paramount. Report factual errors with URLs and supporting proof.',
      icon: <PenTool className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-200 bg-emerald-50/50'
    },
    {
      title: 'Advertising & Business',
      email: 'business@bicnews.com',
      desc: 'For media kits, sponsored campaigns, and strategic brand partnerships.',
      icon: <Megaphone className="w-5 h-5 text-purple-600" />,
      color: 'border-purple-200 bg-purple-50/50'
    },
    {
      title: 'Copyright Concerns (DMCA)',
      email: 'copyright@bicnews.com',
      desc: 'Send formal notices of intellectual property claims or takedown requests.',
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
      color: 'border-rose-200 bg-rose-50/50'
    },
    {
      title: 'Technical Support',
      email: 'support@bicnews.com',
      desc: 'Encountered broken links, display issues, or account access errors?',
      icon: <HelpCircle className="w-5 h-5 text-cyan-600" />,
      color: 'border-cyan-200 bg-cyan-50/50'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - BIC News</title>
        <meta
          name="description"
          content="Get in touch with the BIC News editorial staff, tip line, advertising desk, and reader support. We would love to hear from you."
        />
        <link rel="canonical" href="https://bicnews.com/contact-us/" />
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-900 font-semibold">Contact Us</li>
            </ol>
          </nav>

          {/* Hero Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-lg mb-10">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Globe2 className="w-3.5 h-3.5" /> Direct Editorial Access
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                We&apos;d Love to Hear From You
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Whether you have a breaking news tip, feedback on an article, a business partnership proposal, or technical inquiries, the BIC News team is here to assist.
              </p>
            </div>
          </div>

          {/* Department Directory Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Direct Department Contacts</h2>
                <p className="text-sm text-slate-500">Reach the specific team responsible for your inquiry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {departments.map((dept, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md bg-white ${dept.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100">
                      {dept.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{dept.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed min-h-[36px]">
                    {dept.desc}
                  </p>
                  <a 
                    href={`mailto:${dept.email}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" /> {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form & Office Info Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Direct Message</h2>
              <p className="text-sm text-slate-500 mb-6">
                Fill in the form below and your inquiry will be automatically routed to the proper desk.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-emerald-900">
                    <p className="font-semibold">Message successfully received!</p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Our editorial team will review your message and reply via email within 1–3 business days.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition bg-white"
                    >
                      <option value="general">General Inquiries</option>
                      <option value="news">News Tips &amp; Story Pitch</option>
                      <option value="corrections">Corrections &amp; Editorial</option>
                      <option value="business">Advertising &amp; Partnerships</option>
                      <option value="copyright">Copyright (DMCA)</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Brief topic summary..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide full context, story details, article URLs, or inquiry details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending Message...' : 'Submit Message'}
                </button>
              </form>
            </div>

            {/* Side Information Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Working Hours & Tip Line */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  Editorial Desk Hours
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Operating Hours</p>
                      <p className="text-xs text-slate-500">Monday – Friday: 9:00 AM – 6:00 PM (UTC+7)</p>
                      <p className="text-xs text-slate-400 mt-0.5">Weekend coverage reserved for urgent breaking news.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">News Tip Line</p>
                      <p className="text-sm font-mono text-emerald-700 font-bold">(777) 625-7647</p>
                      <p className="text-xs text-slate-400">Available for confidential news alerts and tips.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Standard Response Time</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        While we strive to respond promptly, average inquiry handling time is 1–3 business days depending on message volume.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Contacting */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-cyan-400" />
                  Submitting News &amp; Corrections
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed mb-4">
                  When submitting news stories or requesting corrections on existing articles, please ensure you include:
                </p>
                <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-4 mb-4">
                  <li>Exact URL of the affected article</li>
                  <li>Clear description of the factual error or story pitch</li>
                  <li>Primary documentation, links, or verifiable sources</li>
                </ul>
                <div className="pt-3 border-t border-blue-800/80 text-xs text-blue-200">
                  Thank you for helping us maintain journalistic excellence and reader trust.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
