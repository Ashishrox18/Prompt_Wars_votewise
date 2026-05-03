import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Search, BookMarked, Filter } from 'lucide-react';

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Voting', 'Legislation', 'Elections', 'Offices'];

  const terms = [
    { term: "Absentee Voting", category: "Voting", definition: "Voting by mail or before election day, often requiring a requested ballot. Rules vary strictly by state." },
    { term: "Ballot Measure", category: "Legislation", definition: "A proposed law, constitutional amendment, or issue placed on a ballot for voters to decide directly." },
    { term: "Caucus", category: "Elections", definition: "A local meeting of supporters or members of a specific political party to determine delegates or candidates." },
    { term: "Electoral College", category: "Elections", definition: "The system used in the US to elect the president. Each state has electoral votes equal to its total representatives in Congress." },
    { term: "Incumbent", category: "Offices", definition: "The current holder of a political office running for re-election." },
    { term: "Primary Election", category: "Elections", definition: "An election held to choose a party's candidate for a general election." },
    { term: "Provisional Ballot", category: "Voting", definition: "A ballot used to record a vote when there are questions about a given voter's eligibility." },
    { term: "Gerrymandering", category: "Elections", definition: "The manipulation of an electoral constituency's boundaries so as to favor one party or class." },
    { term: "Referendum", category: "Legislation", definition: "A direct vote in which an entire electorate is invited to vote on a particular proposal." },
    { term: "Filibuster", category: "Legislation", definition: "A political procedure where one or more members of a legislative body prolong debate on proposed legislation to delay or entirely prevent a decision." },
    { term: "Gubernatorial", category: "Offices", definition: "Relating to a state governor or the office of state governor." },
    { term: "Early Voting", category: "Voting", definition: "A process by which voters in a public election can vote prior to the scheduled election day." },
  ];

  const filteredTerms = terms.filter(t => {
    const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) || t.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'All' || t.category === activeFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="max-w-6xl mx-auto p-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center mb-12"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 border-4 border-white shadow-sm">
          <BookMarked className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900">Civics Glossary</h1>
        <p className="text-xl text-gray-600 max-w-2xl font-body">Demystify the jargon. Search and filter through essential civic terms to understand exactly what you are voting on.</p>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for a term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-gray-100 rounded-full py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-50 shadow-sm transition-all text-lg"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeFilter === cat ? 'bg-[var(--primary)] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTerms.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={item.term}
            >
              <Card className="h-full hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 border border-gray-100">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-[var(--primary)] font-display">{item.term}</h3>
                    <span className="text-[10px] uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-bold">{item.category}</span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed flex-1">{item.definition}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredTerms.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-20 bg-white rounded-3xl border border-dashed border-gray-300"
        >
          <BookMarked className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-600">No terms found matching "{searchTerm}"</p>
          <p className="text-sm mt-2">Try clearing your search or filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
            className="mt-6 text-[var(--primary)] font-bold hover:underline"
          >
            Clear Search
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Glossary;
