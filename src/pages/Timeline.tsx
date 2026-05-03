import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Calendar, Flag, AlertTriangle, Box, MailOpen } from 'lucide-react';

const Timeline: React.FC = () => {
  const events = [
    { 
      date: 'Aug 1, 2026', 
      title: 'Primary Election Results Certified', 
      phase: 'Preparation',
      icon: <Box className="w-5 h-5" />,
      color: 'bg-gray-500',
      textColor: 'text-gray-500'
    },
    { 
      date: 'Sep 15, 2026', 
      title: 'National Voter Registration Day', 
      phase: 'Registration',
      icon: <Flag className="w-5 h-5" />,
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      description: 'A nationwide, nonpartisan day of action to ensure everyone has the opportunity to vote.'
    },
    { 
      date: 'Oct 5, 2026', 
      title: 'Voter Registration Deadline (Online/Mail)', 
      phase: 'Deadline',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'bg-red-600',
      textColor: 'text-red-600',
      description: 'This is the final day to register to vote online or postmark your mail-in registration.'
    },
    { 
      date: 'Oct 15, 2026', 
      title: 'Mail-in Ballots Sent Out', 
      phase: 'Voting',
      icon: <MailOpen className="w-5 h-5" />,
      color: 'bg-orange-600',
      textColor: 'text-orange-600'
    },
    { 
      date: 'Oct 20, 2026', 
      title: 'Early In-Person Voting Begins', 
      phase: 'Voting',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-emerald-600',
      textColor: 'text-emerald-600',
      description: 'Beat the crowds. Polling stations open early in most jurisdictions.'
    },
    { 
      date: 'Nov 3, 2026', 
      title: 'Election Day', 
      phase: 'Election Day',
      icon: <Flag className="w-5 h-5" />,
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
      isToday: true,
      description: 'Polls are open from 7:00 AM to 8:00 PM. If you are in line by 8:00 PM, you have the right to vote.'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6 font-display text-gray-900 tracking-tight">Election Timeline</h1>
          <p className="text-gray-600 font-body text-xl max-w-2xl mx-auto leading-relaxed">
            Stay ahead of the democratic process. We track every major deadline and event in the electoral cycle for you.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative border-l-2 border-gray-200 ml-6 md:ml-12 space-y-12 pb-10"
        >
          {events.map((event, index) => (
            <motion.div variants={itemVariants} key={index} className="relative pl-10 md:pl-16">
              
              {/* Timeline Node */}
              <div className={`absolute -left-[11px] top-7 w-5 h-5 rounded-full border-4 border-gray-50 ${event.isToday ? 'bg-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.15)] animate-pulse' : event.color}`}></div>
              
              <Card className={`group transition-all duration-500 border-0 shadow-premium hover:shadow-xl ${event.isToday ? 'ring-2 ring-orange-500/20 bg-white' : 'bg-white'}`}>
                <CardHeader className="pb-4 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className={`flex items-center gap-2 text-xs font-mono font-black mb-2 uppercase tracking-[0.2em] ${event.isToday ? 'text-orange-500' : 'text-gray-400'}`}>
                      {event.date}
                    </div>
                    <CardTitle className="text-2xl font-display text-gray-900">{event.title}</CardTitle>
                  </div>
                  <div className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${event.isToday ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                    {event.phase}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {event.description && (
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{event.description}</p>
                  )}
                  {event.isToday && (
                    <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
                         <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold mb-1">Your assigned action is today.</p>
                        <p className="text-gray-600 text-sm">Review your ballot and locate your polling place in the 'Find Polling' section.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;
