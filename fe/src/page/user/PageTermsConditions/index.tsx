import { useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ContextType } from '@/common/types.interface'
import { 
  FileCheck2, 
  AlertTriangle, 
  Scale, 
  ExternalLink, 
  HelpCircle, 
  Mail, 
  CheckCircle2, 
  Ban, 
  ShieldAlert,
  FileText
} from 'lucide-react'

export default function PageTermsConditions() {
  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendBooks(false)
  }, [setIsShowRecommendBooks])

  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Wise Owl</title>
        <meta
          name="description"
          content="Review the Terms and Conditions for accessing and using Wise Owl (wiseowl.com). Outlining user rights, editorial standards, and legal agreements."
        />
        <link rel="canonical" href="https://wiseowl.com/terms-and-conditions/" />
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-900 font-semibold">Terms and Conditions</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              Terms of Service
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Terms and Conditions
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Welcome to <strong className="text-slate-800">Wiseowl.com</strong>. By accessing, browsing, or using this website, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, please stop using the website immediately.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-500 gap-4">
              <span>Effective Date: <strong>October 2026</strong></span>
              <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-700 font-medium">
                Binding Legal Agreement
              </span>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed">
            {/* Section 1 */}
            <section className="scroll-mt-20" id="use-of-website">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Use of the Website</h2>
              </div>
              <p className="mb-4">
                Wiseowl.com provides daily news, feature articles, investigative reporting, editorial commentary, and general informational media.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Ban className="w-4 h-4 text-rose-500" />
                  Prohibited Conduct &amp; Restrictions:
                </p>
                <p className="text-sm text-slate-600 mb-3">
                  You agree to use this website only for legitimate, lawful purposes and agree <strong>NOT</strong> to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                  <li>Violate any local, national, or international laws or regulations.</li>
                  <li>Copy, scrape, crawl, mirror, or republish our editorial materials without express written authorization.</li>
                  <li>Attempt to compromise server security, inject malicious code, launch DDoS attacks, or disrupt platform infrastructure.</li>
                  <li>Post or transmit spam, abusive, defamatory, harassing, obscene, or legally actionable content.</li>
                  <li>Misuse or overwhelm our comment sections, contact forms, or editorial inquiry channels.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="scroll-mt-20" id="content-disclaimer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Content Disclaimer</h2>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                The content published on Wiseowl.com is delivered for general informational, educational, and editorial purposes only.
              </p>
              <p className="text-sm text-slate-600">
                While our editorial staff strives for accuracy and timely updates, we make no warranties or representations of any kind—express or implied—regarding the completeness, accuracy, reliability, or timeliness of any published material. 
                News stories evolve continuously, and information can become outdated rapidly.
              </p>
            </section>

            {/* Section 3 */}
            <section className="scroll-mt-20" id="intellectual-property">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Intellectual Property Rights</h2>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                All original materials featured on Wiseowl.com—including text, editorial articles, graphics, logos, brand emblems, photographic layouts, and website styling—are the exclusive property of <strong>Wiseowl.com</strong> or licensed third-party contributors, protected by copyright and intellectual property legislation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                  <span className="font-bold text-rose-900 flex items-center gap-2 mb-1">
                    <Ban className="w-4 h-4 text-rose-600" /> What You Cannot Do
                  </span>
                  <p className="text-rose-800 text-xs leading-relaxed">
                    You may not reproduce, syndicate, sell, modify, or commercially distribute full articles or multimedia assets without prior written consent.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="font-bold text-emerald-900 flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Permitted Sharing
                  </span>
                  <p className="text-emerald-800 text-xs leading-relaxed">
                    You are welcome to share headline excerpts and direct URL links on social media platforms, search indices, and academic references.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 & 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  4. Third-Party Content &amp; Links
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Wiseowl.com contains external hyperlinks, embedded media, and sponsored advertisements. 
                  We do not endorse and are not liable for the content, privacy standards, or transactions on third-party domains. Visiting external destinations is at your sole discretion.
                </p>
              </section>

              <section className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-indigo-600" />
                  5. User-Generated Content
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Users contributing comments, letters to the editor, or community feedback retain ownership but grant us a royalty-free, perpetual license to display, moderate, or remove that material. 
                  We reserve the right to delete defamatory or offensive posts without prior notice.
                </p>
              </section>
            </div>

            {/* Section 6 & 7 */}
            <section className="scroll-mt-20" id="disclosures">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Advertising &amp; Affiliate Disclosure</h2>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Wiseowl.com displays programmatic advertising from networks including Google AdSense. 
                Certain articles may contain affiliate links or sponsored mentions. When you click on affiliate links, third parties may receive referral data, 
                and we may earn a modest commission at no additional cost to you.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-amber-900 text-sm mb-1 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  7. No Professional Advice (Medical, Legal, Financial)
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Content published on this website must not be construed as financial, legal, medical, or investment counsel. 
                  Always seek the professional advice of certified specialists before undertaking significant lifestyle or financial actions.
                </p>
              </div>
            </section>

            {/* Section 8 & 9 */}
            <section className="scroll-mt-20" id="liability">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  8
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Limitation of Liability &amp; Availability</h2>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                To the fullest extent permissible by governing law, Wiseowl.com, its directors, editors, writers, and affiliates shall not be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 mb-4">
                <li>Your access to or inability to reach the website.</li>
                <li>Inadvertent factual errors, typos, or omissions in reporting.</li>
                <li>Transactions, products, or services encountered on external advertiser sites.</li>
                <li>Temporary downtime caused by routine maintenance, hosting outages, or network interruptions.</li>
              </ul>
              <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <strong>Website Availability:</strong> We strive to ensure continuous uptime, but do not guarantee uninterrupted access. 
                We reserve the right to revise or suspend features at any time without advance warning.
              </p>
            </section>

            {/* Section 10 */}
            <section className="scroll-mt-20" id="dmca">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  10
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Copyright Infringement Notice (DMCA)</h2>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                We respect intellectual property rights. If you believe your copyrighted work has been utilized on our site without authorization, please submit a formal notice containing:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-1.5">
                <div>&bull; Your full legal name, organization, and verifiable contact details.</div>
                <div>&bull; Identification of the copyrighted work claimed to have been infringed.</div>
                <div>&bull; Direct URL link(s) where the allegedly infringing material is located on our site.</div>
                <div>&bull; A statement confirming your good-faith belief that the use is unauthorized.</div>
                <div>&bull; Physical or verified electronic signature of the copyright owner or authorized representative.</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Send DMCA notifications directly to: <a href="mailto:copyright@wiseowl.com" className="text-blue-600 hover:underline font-semibold">copyright@wiseowl.com</a>.
              </p>
            </section>

            {/* Section 11, 12, 13 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-2">11. Privacy</h3>
                <p className="text-xs text-slate-600">
                  Your website usage is additionally governed by our <Link to="/privacy-policy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>, which details our data handling procedures.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-2">12. Changes to Terms</h3>
                <p className="text-xs text-slate-600">
                  We reserve the right to revise these Terms at our sole discretion. Any updates become effective immediately upon publication on this page.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-2">13. Governing Law</h3>
                <p className="text-xs text-slate-600">
                  These Terms and Conditions shall be governed by and interpreted in accordance with applicable governing laws, without regard to conflict of law principles.
                </p>
              </div>
            </div>

            {/* Section 14: Contact */}
            <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 mt-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-400" />
                14. Contact &amp; Legal Inquiries
              </h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                If you have questions, feedback, or require clarification regarding these Terms and Conditions, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
                <a 
                  href="mailto:contact@wiseowl.com" 
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" /> contact@wiseowl.com
                </a>
                <Link 
                  to="/contact-us" 
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4" /> Editorial Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
