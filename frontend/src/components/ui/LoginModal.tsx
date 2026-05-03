import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, isLoading, isAuthenticated } = useAuthStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-[100]"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto border border-gray-100"
            >
              <div className="flex justify-between items-center p-8 border-b border-gray-50">
                <h2 id="modal-title" className="text-3xl font-black font-display text-gray-900">Sign In</h2>
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                <p className="text-gray-500 mb-10 text-center font-body text-lg leading-relaxed">
                  Join **VoteWise** to save your journey, track deadlines, and get personalized civic guidance.
                </p>

                <div className="space-y-4">
                  <Button 
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    fullWidth
                    size="lg"
                    className="relative bg-white text-gray-900 border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 shadow-none hover:shadow-md transition-all h-16 rounded-2xl"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        <span className="font-black uppercase tracking-widest text-sm">Continue with Google</span>
                      </div>
                    )}
                  </Button>

                  <div className="relative flex items-center py-6">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em]">OR</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>

                  <Button 
                    variant="secondary"
                    fullWidth
                    size="lg"
                    className="h-16 rounded-2xl border-2 border-gray-100 text-gray-500 hover:text-gray-900 bg-white shadow-none"
                  >
                    <Mail className="w-5 h-5 mr-3 opacity-50" />
                    <span className="font-black uppercase tracking-widest text-sm">Use Email Address</span>
                  </Button>
                </div>

                <p className="mt-10 text-[10px] text-center text-gray-400 font-bold leading-relaxed uppercase tracking-widest">
                  Securely powered by Firebase Authentication. <br/>
                  We never share your personal data with candidates.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
