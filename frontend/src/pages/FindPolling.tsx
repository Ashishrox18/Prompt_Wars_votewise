import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Search, Navigation, Clock, Phone, AlertCircle, Accessibility } from 'lucide-react';
import { mapsService, PollingStation } from '../services/maps';

const FindPolling: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [address, setAddress] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stations, setStations] = useState<PollingStation[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      setIsLoading(true);
      try {
        const results = await mapsService.findNearestPollingStations(address);
        setStations(results);
        setHasSearched(true);
      } catch (error) {
        console.error("Error finding stations:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Search Bar */}
      <div className="bg-white p-6 border-b border-[var(--border)] z-20 shadow-sm relative">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <MapPin className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl leading-tight" id="locator-title">Polling Locator</h2>
              <p className="text-xs text-gray-500 font-mono">Powered by Google Maps API</p>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              id="polling-address"
              type="text"
              placeholder="Enter your registered home address (e.g. 123 Main St, Anytown)..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3.5 pl-12 pr-32 focus:outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-50 transition-all text-base"
              aria-label="Address to find polling station"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Button 
              type="submit" 
              className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg px-6"
              disabled={isLoading || !address.trim()}
            >
              {isLoading ? "Searching..." : "Find"}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        {/* Sidebar / Results */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div 
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-full md:w-[450px] bg-gray-50 border-r border-[var(--border)] overflow-y-auto z-10 shadow-xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <h2 className="font-bold text-xl text-gray-900">Nearest Locations</h2>
                <p className="text-sm text-gray-500 mt-1">Based on: <span className="font-medium text-gray-700">{address}</span></p>
              </div>
              
              <div className="p-6 space-y-6 flex-1">
                {stations.map((station, i) => (
                  <motion.div 
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={station.id || i}
                  >
                    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${station.isPrimary ? 'border-[var(--primary)] border-2 ring-4 ring-blue-50' : 'border border-gray-200 hover:border-blue-300'}`}>
                      {station.isPrimary && (
                        <div className="bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest text-center py-1.5">
                          ★ Your Assigned Primary Polling Place
                        </div>
                      )}
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-gray-900 leading-tight">{station.name}</h3>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${station.wait === 'No wait' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                            {station.wait} wait
                          </span>
                        </div>
                        
                        <div className="space-y-3 mb-5">
                          <div className="flex items-start gap-2.5 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p>{station.address}</p>
                              <p className="text-xs text-gray-400 mt-0.5 font-medium">{station.distance}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <p className="font-medium">{station.hours}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-5">
                          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Accessibility Features</p>
                          <div className="flex flex-wrap gap-2">
                            {station.accessibility.map((feature, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100">
                                {feature.includes('Wheelchair') && <Accessibility className="w-3 h-3" />}
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button size="sm" className="flex-1 shadow-sm">
                            <Navigation className="w-4 h-4 mr-2" /> Directions
                          </Button>
                          <Button variant="secondary" size="sm" className="px-3 shadow-sm" aria-label="Call Location">
                            <Phone className="w-4 h-4 text-gray-500" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Placeholder */}
        <div className="flex-1 bg-gray-200 relative overflow-hidden bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=37.7749,-122.4194&zoom=13&size=1000x1000&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:landscape|element:all|color:f2f2f2')] bg-cover bg-center">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
          
          <div className="absolute inset-0 flex items-center justify-center z-10 p-6">
            {hasSearched ? (
              <motion.div 
                initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-[var(--primary)] rounded-full opacity-20 animate-ping"></div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-[var(--primary)] relative z-10">
                  <MapPin className="w-8 h-8 text-[var(--primary)]" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={shouldReduceMotion ? { opacity: 1 } : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center bg-white/90 p-10 rounded-3xl shadow-2xl backdrop-blur-md max-w-md border border-white"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-display text-gray-900">Find Your Polling Place</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">Enter your residential address above to see exact polling stations near you on the interactive map.</p>
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-left border border-blue-100">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 font-medium">Your polling location may have changed since the last election. Always verify before election day.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPolling;
