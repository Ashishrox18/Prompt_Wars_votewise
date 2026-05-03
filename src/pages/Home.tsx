import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle, CardHeader } from '../components/ui/Card';
import { MapPin, CalendarPlus, CheckCircle2, Vote, ArrowRight, ShieldCheck, Users } from 'lucide-react';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-32 flex flex-col items-center w-full max-w-7xl mx-auto">
        {/* Modern Background Gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_-100px,rgba(26,86,219,0.08),transparent)]"></div>
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-[120px]"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-primary font-bold text-sm mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Election 2026 Readiness Platform
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-8 font-display tracking-tight text-gray-900 text-center leading-[1.1]"
        >
          Democracy, <br/>
          <span className="text-gradient">Demystified.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl text-center font-body leading-relaxed"
        >
          The AI-powered guide that translates complex election rules into simple, actionable steps for every citizen.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <Link to="/chat" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg px-10 shadow-xl shadow-blue-200">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-10 border-gray-200 shadow-sm">
            Watch Overview
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-sm text-gray-500 font-semibold"
        >
          <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500"/> Non-Partisan AI</div>
          <div className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-500"/> 500k+ Users</div>
          <div className="flex items-center gap-2 font-mono text-[10px] bg-gray-100 px-3 py-1 rounded-md">VERIFIED SOURCES ONLY</div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-gray-200 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="text-2xl font-black font-display tracking-tighter">CIVIC ALLIANCE</div>
           <div className="text-2xl font-black font-display tracking-tighter">VOTE.ORG PARTNER</div>
           <div className="text-2xl font-black font-display tracking-tighter">FEDERAL GUIDELINES</div>
           <div className="text-2xl font-black font-display tracking-tighter">OPEN GOV DATA</div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6">Designed for clarity.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">We've rebuilt the voter experience from the ground up to be accessible, fast, and reliable.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-10"
          >
            <Card className="group hover:border-primary transition-all duration-500 border-gray-100 shadow-premium p-8">
              <CardHeader className="p-0 mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-display text-gray-900">Polling Station AI</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-lg leading-relaxed">
                Smart routing that considers traffic, accessibility features, and real-time reported wait times.
              </CardContent>
            </Card>

            <Card className="group hover:border-orange-400 transition-all duration-500 border-gray-100 shadow-premium p-8">
              <CardHeader className="p-0 mb-8">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <CalendarPlus className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-display text-gray-900">Deadline Guardian</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-lg leading-relaxed">
                Personalized reminders for registration, mail-in requests, and early voting specific to your zip code.
              </CardContent>
            </Card>

            <Card className="group hover:border-emerald-400 transition-all duration-500 border-gray-100 shadow-premium p-8">
              <CardHeader className="p-0 mb-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-display text-gray-900">Eligibility Wizard</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-lg leading-relaxed">
                Interactive logic trees that help students, residents, and new citizens understand their rights.
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold font-display text-gray-900 mb-8 leading-tight">Civic intelligence at your fingertips.</h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Ask the Assistant", text: "Speak naturally. 'How do I vote by mail in Florida?' or 'What is Prop 1A about?'" },
                  { step: "02", title: "Review Citations", text: "Our AI provides answers backed by direct links to .gov and official state portals." },
                  { step: "03", title: "Take Action", text: "One-click registration, calendar syncing, and map routing to complete your journey." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    <div className="text-4xl font-black text-gray-200 font-display">{item.step}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-lg">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-blue-400 rounded-[2.5rem] opacity-10 blur-2xl"></div>
              <Card className="relative bg-white border-0 shadow-2xl rounded-[2rem] overflow-hidden">
                <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-sm text-sm font-medium shadow-lg max-w-[80%]">
                      Can I register to vote online in Ohio?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-5 rounded-2xl rounded-tl-sm text-sm leading-relaxed max-w-[85%] border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 text-primary font-bold mb-2">
                        <Vote className="w-4 h-4" /> VoteWise AI
                      </div>
                      Yes! Ohio offers online registration. You will need your OH Driver's License or ID and the last 4 digits of your SSN. The deadline is October 5th.
                      <div className="mt-4 flex gap-2">
                        <div className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-[10px] font-bold text-primary cursor-pointer hover:bg-gray-50 transition-colors">REGISTER NOW</div>
                        <div className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">ADD REMINDER</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-gray-900 p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-8">Ready to cast your vote <br className="hidden md:block"/> with confidence?</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Join thousands of citizens using VoteWise to navigate the democratic process without the noise.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-10 h-16 text-lg">Start Chatting Now</Button>
              <Button variant="secondary" size="lg" className="px-10 h-16 text-lg bg-white/5 border-white/10 text-white hover:bg-white/10">View Glossary</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-display font-black text-2xl text-primary">
            <Vote className="w-6 h-6" /> VoteWise
          </div>
          <div className="flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="text-gray-400 text-xs font-mono">
            © 2026 VoteWise Platform. Non-Partisan & Independent.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
