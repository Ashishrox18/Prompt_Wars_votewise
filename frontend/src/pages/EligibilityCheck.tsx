import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

const EligibilityCheck: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps + 1) setStep(step + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-display mb-2">Eligibility Wizard</h1>
        <p className="text-gray-600">Answer a few questions to see if you can vote.</p>
      </div>

      {step <= totalSteps ? (
        <Card className="border-t-4 border-t-[var(--primary)]">
          <CardHeader>
            <div className="text-sm font-bold text-gray-400 mb-2 tracking-widest uppercase">
              Step {step} of {totalSteps}
            </div>
            <CardTitle>
              {step === 1 && "Are you a citizen of this country?"}
              {step === 2 && "Will you be 18 years or older on Election Day?"}
              {step === 3 && "Are you currently serving a sentence for a felony conviction?"}
              {step === 4 && "Have you lived at your current address for at least 30 days?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="secondary" className="justify-between" onClick={handleNext}>
                Yes <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" className="justify-between" onClick={handleNext}>
                No <ChevronRight className="w-4 h-4" />
              </Button>
              {step === 3 && (
                <p className="text-xs text-gray-500 mt-2 flex gap-1">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  Laws vary widely by state regarding felony convictions. We will check your state's specific rules.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-t-4 border-t-[var(--success)] text-center py-8">
          <CardContent>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-[var(--success)]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">You are eligible to vote!</h2>
            <p className="text-gray-600 mb-8">Based on your answers, you meet the requirements to register.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 border border-gray-200">
              <h3 className="font-bold text-sm mb-2 text-gray-700">Next Steps:</h3>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>1. Complete your voter registration online.</li>
                <li>2. Find your polling station.</li>
                <li>3. Learn what's on your ballot.</li>
              </ul>
            </div>
            
            <Button size="lg" className="w-full">Register to Vote Now</Button>
            <Button variant="ghost" className="w-full mt-2" onClick={() => setStep(1)}>Start Over</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EligibilityCheck;
