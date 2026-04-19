import { Link } from 'react-router-dom'
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  YoutubeOutlined, 
  InstagramOutlined,
  LinkedinOutlined 
} from '@ant-design/icons'

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 font-sans">
      <div className="max-w-[1300px] mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <div className='flex items-center gap-3 mb-5 group cursor-pointer w-max'>
              <svg width='40' height='40' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg' className='drop-shadow-[0_4px_10px_rgba(37,99,235,0.3)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-300'>
                 <defs>
                   <linearGradient id="owlFooterGrad" x1="0" y1="0" x2="120" y2="120">
                     <stop offset="0%" stopColor="#38bdf8" />
                     <stop offset="100%" stopColor="#4f46e5" />
                   </linearGradient>
                 </defs>
                 <circle cx="60" cy="60" r="60" fill="url(#owlFooterGrad)" />
                 <path d="M24 44 L42 78 L60 44 L78 78 L96 44" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className='text-white text-2xl font-black tracking-widest uppercase group-hover:text-blue-200 transition-colors'>Wise Owl</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Global News, Profound Insights, and Lifelong Learning. Your trusted source for independent and comprehensive reporting worldwide.
            </p>
            <div className="flex items-center gap-3">
               <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-blue-500/50 hover:-translate-y-1">
                 <FacebookOutlined style={{ fontSize: '16px' }} />
               </a>
               <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-sky-500/50 hover:-translate-y-1">
                 <TwitterOutlined style={{ fontSize: '16px' }} />
               </a>
               <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-rose-500/50 hover:-translate-y-1">
                 <InstagramOutlined style={{ fontSize: '16px' }} />
               </a>
               <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-500/50 hover:-translate-y-1">
                 <YoutubeOutlined style={{ fontSize: '16px' }} />
               </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>
               Categories
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li><Link to="/chung-khoan" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Business & Finance</Link></li>
              <li><Link to="/crypto" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Technology & Crypto</Link></li>
              <li><Link to="/thu-thuat-huu-ich" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Life & Health</Link></li>
              <li><Link to="/bang-gia-chung-khoan" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Market Data</Link></li>
              <li><Link to="/tat-ca-khoa-hoc" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Books & Education</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-cyan-400 block"></span>
               Company
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Editorial Guidelines</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 hover:pl-1 transition-all">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1 border-t border-slate-800 pt-6 lg:border-t-0 lg:pt-0">
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-purple-500 block"></span>
               Newsletter
            </h3>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              Subscribe to get the latest news and insights delivered straight to your inbox daily.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email address..." 
                className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm shadow-inner placeholder-slate-500"
              />
              <button 
                type="button" 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">
              &copy; {new Date().getFullYear()} Wise Owl News. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 tracking-wider">
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
