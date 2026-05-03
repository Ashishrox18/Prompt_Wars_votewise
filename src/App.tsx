import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Vote, Menu, X, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Timeline from './pages/Timeline';
import MyJourney from './pages/MyJourney';
import FindPolling from './pages/FindPolling';
import EligibilityCheck from './pages/EligibilityCheck';
import BallotExplainer from './pages/BallotExplainer';
import Glossary from './pages/Glossary';
import { LoginModal } from './components/ui/LoginModal';
import { useAuthStore } from './store/authStore';

const NavLink = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`relative px-1 py-2 text-sm font-bold tracking-wide transition-all duration-300 ${
        isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(26,86,219,0.3)]" />
      )}
    </Link>
  );
};

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body text-gray-900 bg-gray-50 selection:bg-primary/10">
      {/* Navbar */}
      <nav className={`px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 font-display font-black text-2xl text-gray-900 group">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform duration-300">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <span>Vote<span className="text-primary">Wise</span></span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/chat">Assistant</NavLink>
            <NavLink to="/find-polling">Polling Station</NavLink>
            <NavLink to="/timeline">Timeline</NavLink>
            <NavLink to="/eligibility-check">Eligibility</NavLink>
            <NavLink to="/ballot-explainer">Decoder</NavLink>
            <NavLink to="/glossary">Glossary</NavLink>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition-all border border-gray-100 bg-white pr-3"
              >
                <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" />
                <span className="text-xs font-black text-gray-700 hidden sm:block uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-3">
                  <div className="px-5 py-3 border-b border-gray-50 mb-2">
                    <p className="text-sm font-black text-gray-900 font-display">{user.name}</p>
                    <p className="text-[10px] font-mono text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link 
                    to="/my-journey" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-primary transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-blue-400" /> My Voter Journey
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsProfileDropdownOpen(false); }}
                    className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="hidden sm:flex items-center gap-2 text-sm font-black bg-gray-900 text-white hover:bg-primary px-8 py-3 rounded-full transition-all shadow-xl shadow-gray-200 hover:shadow-blue-200 uppercase tracking-widest"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2.5 text-gray-600 bg-white border border-gray-100 rounded-xl shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-white/95 backdrop-blur-xl z-40 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 overflow-y-auto">
           <NavLink to="/chat" onClick={() => setIsMobileMenuOpen(false)}>AI Assistant</NavLink>
           <NavLink to="/find-polling" onClick={() => setIsMobileMenuOpen(false)}>Find Polling Station</NavLink>
           <NavLink to="/timeline" onClick={() => setIsMobileMenuOpen(false)}>Election Timeline</NavLink>
           <NavLink to="/eligibility-check" onClick={() => setIsMobileMenuOpen(false)}>Eligibility Wizard</NavLink>
           <NavLink to="/ballot-explainer" onClick={() => setIsMobileMenuOpen(false)}>Ballot Decoder</NavLink>
           <NavLink to="/glossary" onClick={() => setIsMobileMenuOpen(false)}>Civics Glossary</NavLink>
           {!isAuthenticated && (
             <button 
               onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }}
               className="w-full mt-8 text-sm font-black bg-primary text-white py-4 rounded-2xl shadow-xl shadow-blue-100 uppercase tracking-widest"
             >
               Sign In
             </button>
           )}
        </div>
      )}
      
      <main className="flex-1 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/my-journey" element={<MyJourney />} />
          <Route path="/find-polling" element={<FindPolling />} />
          <Route path="/eligibility-check" element={<EligibilityCheck />} />
          <Route path="/ballot-explainer" element={<BallotExplainer />} />
          <Route path="/glossary" element={<Glossary />} />
        </Routes>
      </main>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
