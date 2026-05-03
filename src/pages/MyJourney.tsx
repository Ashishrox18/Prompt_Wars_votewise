import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

const MyJourney: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm">
          <Trophy className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-display">My Voter Journey</h1>
          <p className="text-gray-600">Track your civic readiness and earn badges.</p>
        </div>
      </div>

      <Card className="mb-8 border-[var(--primary)] border-t-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-700">YOUR VOTER READINESS</span>
            <span className="font-bold text-[var(--primary)] text-xl">40%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-[var(--primary)] h-4 rounded-full transition-all duration-1000" style={{ width: '40%' }}></div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 text-green-900 rounded-lg border border-green-100">
              <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
              <span className="font-medium">Registered to vote</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 text-green-900 rounded-lg border border-green-100">
              <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
              <span className="font-medium">Learned about local candidates</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white text-gray-600 rounded-lg border border-[var(--border)]">
              <Circle className="w-6 h-6 text-gray-300" />
              <span className="font-medium">Found your polling station</span>
              <Button size="sm" variant="ghost" className="ml-auto">Find Now</Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white text-gray-600 rounded-lg border border-[var(--border)]">
              <Circle className="w-6 h-6 text-gray-300" />
              <span className="font-medium">Added election day reminder</span>
              <Button size="sm" variant="ghost" className="ml-auto">Add</Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white text-gray-600 rounded-lg border border-[var(--border)]">
              <Circle className="w-6 h-6 text-gray-300" />
              <span className="font-medium">Checked your sample ballot</span>
              <Button size="sm" variant="ghost" className="ml-auto">Check</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Button size="lg" className="px-10">Continue your journey →</Button>
      </div>
    </div>
  );
};

export default MyJourney;
