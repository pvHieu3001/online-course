import { useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ContextType } from '@/common/types.interface'
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Cookie, 
  FileText, 
  Mail, 
  Globe, 
  Users, 
  Bell, 
  ExternalLink 
} from 'lucide-react'

export default function PagePrivacyPolicy() {
  const { setIsShowRecommendBooks } = useOutletContext<ContextType>()

  useEffect(() => {
    setIsShowRecommendBooks(false)
  }, [setIsShowRecommendBooks])

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Wise Owl</title>
        <meta
          name="description"
          content="At Wise Owl, we value your privacy and are committed to protecting your personal information. Read our comprehensive Privacy Policy."
        />
        <link rel="canonical" href="https://wiseowl.com/privacy-policy/" />
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
              <li className="text-slate-900 font-semibold">Privacy Policy</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal & Transparency
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Welcome to <strong className="text-slate-800">Wise Owl</strong> (&quot;Wise Owl,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). 
              At Wise Owl, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit our website.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-500 gap-4">
              <span>Last updated & effective: <strong>October 2026</strong></span>
              <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-700 font-medium">
                Standard Reading Time: 4 mins
              </span>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed">
            <div className="bg-blue-50/60 border-l-4 border-blue-600 p-4 rounded-r-lg text-sm text-blue-900">
              By using <strong>Wiseowl.com</strong>, you agree to the collection and use of information in accordance with this Privacy Policy.
            </div>

            {/* Section 1 */}
            <section className="scroll-mt-20" id="info-we-collect">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Information We Collect</h2>
              </div>
              <p className="mb-4">We may collect the following types of information when you interact with our platform:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Information You Provide
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">You voluntarily provide details when you:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                    <li>Contact our editorial or support teams</li>
                    <li>Subscribe to our newsletters or feeds</li>
                    <li>Submit comments on articles</li>
                    <li>Send feedback or news tips</li>
                    <li>Participate in surveys, polls, or promotions</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
                    This may include: <strong>Name, email address</strong>, and any voluntary message content.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-600" />
                    Automatically Collected Info
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">Recorded routinely by servers & analytics:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                    <li>IP address and approximate geographic location</li>
                    <li>Browser type, version, and language</li>
                    <li>Device model and operating system</li>
                    <li>Pages visited, time spent, and scroll behavior</li>
                    <li>Referring URL and exit pages</li>
                    <li>Timestamp and visit frequency</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
                    Used exclusively to maintain stability, security, and optimize reader experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="scroll-mt-20" id="cookies">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Cookies and Tracking Technologies</h2>
              </div>
              <p className="mb-4">
                We utilize standard cookies, web beacons, and related tracking scripts to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                <li className="flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-500 flex-shrink-0" /> Remember your reading preferences
                </li>
                <li className="flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-500 flex-shrink-0" /> Boost website load speed & performance
                </li>
                <li className="flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-500 flex-shrink-0" /> Analyze overall website traffic patterns
                </li>
                <li className="flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-500 flex-shrink-0" /> Measure audience engagement with stories
                </li>
                <li className="flex items-center gap-2 sm:col-span-2">
                  <Cookie className="w-4 h-4 text-amber-500 flex-shrink-0" /> Deliver non-intrusive, relevant advertisements
                </li>
              </ul>
              <p className="text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <strong>Cookie Control:</strong> You can choose to disable or block cookies through your individual browser settings. 
                Please note that blocking cookies may affect the interactive functionality or responsiveness of certain pages.
              </p>
            </section>

            {/* Section 3 */}
            <section className="scroll-mt-20" id="how-we-use">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How We Use Your Information</h2>
              </div>
              <p className="mb-3">We collect and process your information for the following legitimate purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
                <li>Operate, maintain, and enhance the features of Wiseowl.com.</li>
                <li>Improve editorial content, articles, and topic coverage according to reader trends.</li>
                <li>Promptly respond to inquiries, news tips, feedback, and user support requests.</li>
                <li>Deliver curated newsletters (strictly with your opt-in consent).</li>
                <li>Analyze aggregate website usage and monitor performance metrics.</li>
                <li>Prevent cyber attacks, fraud, spam comments, and terms violations.</li>
                <li>Display relevant advertising partners and programmatic ads.</li>
                <li>Comply with applicable legal, regulatory, and auditing obligations.</li>
              </ul>
            </section>

            {/* Section 4 & 5 & 6 */}
            <section className="scroll-mt-20" id="third-party">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Third-Party Services & Advertising</h2>
              </div>
              <p className="mb-4">
                We partner with reputable third-party vendors and content networks to power our online operations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-900">Analytics Providers:</span> Google Analytics to understand reader demographics and engagement.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-900">Security & CDN:</span> Cloudflare and CDNs to provide DDoS protection, caching, and SSL security.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-900">Ad Networks:</span> Google AdSense and programmatic exchange partners for ad monetization.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-900">Email Marketing:</span> Secure platforms managing newsletter subscriptions and digest delivery.
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2">Google AdSense & DoubleClick</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Google uses cookies (including the DoubleClick cookie) to serve advertisements to visitors based upon their visit to Wiseowl.com and other websites across the Internet.
                </p>
                <p className="text-sm text-slate-600">
                  Users can view and manage their Google Advertising personalization settings by visiting the official 
                  <a 
                    href="https://policies.google.com/technologies/ads" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 ml-1 font-medium"
                  >
                    Google Advertising Privacy Policy <ExternalLink className="w-3.5 h-3.5" />
                  </a>.
                </p>
              </div>
            </section>

            {/* Section 7 & 8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  7. Data Security
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We employ rigorous technical, administrative, and physical safeguards (including SSL/TLS encryption and strict access controls) 
                  to protect your information against unauthorized access, loss, alteration, or disclosure. 
                  However, no internet transmission is 100% invulnerable, and we cannot promise absolute security.
                </p>
              </section>

              <section className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  8. Children&apos;s Privacy
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Wiseowl.com is intended for general audiences and is not directed at children under the age of 13. 
                  We do not knowingly collect personal identifiable information from minors. 
                  If you believe a child has provided us with personal data, please contact us immediately for prompt deletion.
                </p>
              </section>
            </div>

            {/* Section 9 */}
            <section className="scroll-mt-20" id="external-links">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  9
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">External Links</h2>
              </div>
              <p className="text-sm text-slate-600">
                Our articles and news stories frequently reference external sources, government documents, studies, or third-party websites. 
                Wise Owl has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites. 
                We encourage you to review the privacy statement of every external destination you visit.
              </p>
            </section>

            {/* Section 10 & 11 */}
            <section className="scroll-mt-20" id="privacy-rights">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  10
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Privacy Rights & Data Retention</h2>
              </div>
              <p className="mb-3 text-sm">
                Depending on your country or jurisdiction (such as GDPR in Europe or CCPA/CPRA in the US), you hold statutory rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong>Right to Access:</strong> Request a copy of personal information we maintain about you.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong>Right to Rectification:</strong> Request correction of incomplete or outdated data.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong>Right to Erasure (&quot;Be Forgotten&quot;):</strong> Request deletion of your personal details.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong>Right to Withdraw Consent:</strong> Unsubscribe from marketing communications at any time.
                </div>
              </div>
              <p className="text-sm text-slate-600">
                <strong>Data Retention:</strong> We retain collected information only as long as strictly necessary to fulfill the operational, 
                editorial, and legal requirements outlined in this policy.
              </p>
            </section>

            {/* Section 12 & 13 */}
            <section className="scroll-mt-20 pt-6 border-t border-slate-200" id="policy-updates">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                We reserve the right to revise or update this Privacy Policy at our discretion to reflect evolving legal requirements or site enhancements. 
                Any modifications will be posted here with an updated Effective Date. Continued use of Wiseowl.com after updates constitutes your agreement to the revised terms.
              </p>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  13. Contact Us Regarding Your Privacy
                </h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  If you have questions, concerns, or wish to exercise any of your data rights under this policy, please reach out to our privacy team:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
                  <a 
                    href="mailto:contact@wiseowl.com" 
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4" /> contact@wiseowl.com
                  </a>
                  <Link 
                    to="/contact-us" 
                    className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" /> Go to Contact Form
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
