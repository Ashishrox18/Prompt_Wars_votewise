import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Wand2, Upload, HelpCircle, Loader2 } from 'lucide-react';
import { askVoteWise } from '../services/gemini';
import { sanitizeInput } from '../services/utils';
import DOMPurify from 'dompurify';

const BallotExplainer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [text, setText] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<null | {
    summary: string;
    yesMeans: string;
    noMeans: string;
  }>(null);

  const exampleMeasures = [
    {
      title: "Prop 1A: Transit Funding",
      text: "Shall there be an amendment to the state constitution to authorize the legislature to issue general obligation bonds not to exceed $2,500,000,000 for the purpose of funding the expansion of regional light rail systems and establishing dedicated bus rapid transit corridors, to be repaid through a 0.5% increase in the state sales tax?"
    },
    {
      title: "Measure 2B: Education Budget",
      text: "A measure to amend the city charter to require that a minimum of 15% of all unrestricted general fund revenues be allocated annually to the public school district for the purpose of increasing teacher salaries and reducing class sizes in elementary schools."
    }
  ];

  const handleExplain = async () => {
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText) return;
    setIsExplaining(true);
    setExplanation(null);
    
    try {
      const prompt = `Explain this ballot measure in plain English. Provide a concise summary, and clearly state what a "Yes" vote means and what a "No" vote means. 
      Format the response as JSON with keys: summary, yesMeans, noMeans.
      
      Measure text: ${sanitizedText}`;
      
      const result = await askVoteWise(prompt);
      
      // Clean the response text if it contains markdown code blocks
      const cleanText = result.text.replace(/```json\n?|\n?```/g, '').trim();
      
      let parsed;
      try {
        parsed = JSON.parse(cleanText);
      } catch (error) {
        console.error("Failed to parse AI response as JSON:", cleanText);
        throw new Error("Invalid response format from AI", { cause: error });
      }
      
      // Sanitize AI outputs before setting state
      setExplanation({
        summary: DOMPurify.sanitize(parsed.summary || 'No summary available.'),
        yesMeans: DOMPurify.sanitize(parsed.yesMeans || 'No information provided.'),
        noMeans: DOMPurify.sanitize(parsed.noMeans || 'No information provided.')
      });
    } catch (error) {
      console.error("Error explaining measure:", error);
      // You could set an error state here to show to the user
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 py-16">
      <motion.div 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
          <Wand2 className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900">Ballot Measure Decoder</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
          Confused by legal jargon on your ballot? Paste the text below or upload a photo, and our AI will translate it into plain English.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full flex flex-col shadow-lg border-0">
            <CardContent className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="measure-text" className="font-bold text-gray-900 text-lg cursor-pointer">Paste Measure Text</label>
                <Button variant="ghost" size="sm" className="text-sm font-bold bg-gray-50">
                  <Upload className="w-4 h-4 mr-2" /> Photo Upload
                </Button>
              </div>
              
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 hide-scrollbar">
                <span className="text-sm text-gray-500 py-1.5 whitespace-nowrap font-bold">Try an example:</span>
                {exampleMeasures.map((measure, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setText(measure.text)}
                    className="text-xs font-bold bg-blue-50 text-[var(--primary)] px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors whitespace-nowrap border border-blue-200"
                  >
                    {measure.title}
                  </button>
                ))}
              </div>

              <textarea
                id="measure-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the confusing legal text here... e.g. 'Shall there be an amendment to the constitution authorizing the legislature to...'"
                className="flex-1 w-full p-5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-50 resize-none min-h-[250px] text-lg leading-relaxed transition-all"
                aria-label="Ballot measure text to decode"
              ></textarea>
              
              <Button 
                onClick={handleExplain} 
                size="lg"
                className="mt-6 w-full text-lg shadow-md"
                disabled={!text.trim() || isExplaining}
              >
                {isExplaining ? (
                  <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Decoding Legal Jargon...</>
                ) : (
                  <><Wand2 className="w-5 h-5 mr-3" /> Translate to Plain English</>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.4 }}
        >
          <Card className={`h-full border-t-4 shadow-lg ${explanation ? 'border-t-[var(--accent)] bg-white' : 'border-t-gray-200 bg-gray-50/50'}`}>
            <CardContent className="p-8 h-full flex flex-col">
              <h3 className="font-bold text-2xl text-gray-900 mb-6 flex items-center gap-3 font-display">
                <FileText className="w-7 h-7 text-[var(--accent)]" aria-hidden="true" /> Plain English Translation
              </h3>
              
              {isExplaining ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
                   <div className="relative w-20 h-20 mb-6">
                     <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-[var(--primary)] rounded-full border-t-transparent animate-spin"></div>
                     <Wand2 className="absolute inset-0 m-auto w-8 h-8 text-[var(--primary)] animate-pulse" />
                   </div>
                   <p className="text-xl font-medium text-gray-600">VoteWise AI is analyzing...</p>
                   <p className="text-sm text-gray-400 mt-2">Checking state laws and legal precedents</p>
                 </div>
              ) : explanation ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)]"></div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">AI Summary</h4>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {explanation.summary}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50/50 p-6 rounded-2xl border border-green-200 shadow-sm relative overflow-hidden group hover:bg-green-50 transition-colors">
                      <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                      <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center">✓</span>
                        A "Yes" Vote Means
                      </h4>
                      <p className="text-base text-green-900 leading-relaxed">{explanation.yesMeans}</p>
                    </div>
                    
                    <div className="bg-red-50/50 p-6 rounded-2xl border border-red-200 shadow-sm relative overflow-hidden group hover:bg-red-50 transition-colors">
                      <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                      <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-red-200 text-red-800 flex items-center justify-center">✗</span>
                        A "No" Vote Means
                      </h4>
                      <p className="text-base text-red-900 leading-relaxed">{explanation.noMeans}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                  <HelpCircle className="w-20 h-20 text-gray-400 mb-6" />
                  <p className="text-xl text-gray-500 font-medium max-w-xs">Awaiting your input.</p>
                  <p className="text-base text-gray-400 mt-2 max-w-xs">The simplified explanation will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BallotExplainer;
