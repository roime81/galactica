'use client';

import { useState } from 'react';
import { getSilverSummary, getGoldAnswer } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Sparkles, Wand2, Bot, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MlAiLayer() {
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [qaError, setQaError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    setSummary('');
    const { summary: result, error } = await getSilverSummary();
    if (error) {
      setSummaryError(error);
    } else if (result) {
      setSummary(result);
    }
    setSummaryLoading(false);
  };

  const handleQuestionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQaLoading(true);
    setAnswer('');
    setQaError(null);
    const { answer: result, error } = await getGoldAnswer(question);
    if (error) {
      setQaError(error);
    } else if (result) {
      setAnswer(result);
    }
    setQaLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          ML & AI Integration
        </h2>
        <p className="text-muted-foreground">
          Leverage GenAI to unlock insights and automate tasks with your data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-500" />
              Auto-Summarize Silver Data
            </CardTitle>
            <CardDescription>
              Use an LLM to automatically generate a summary of a curated dataset from the Silver Layer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {summaryLoading ? (
              <div className="flex items-center justify-center h-24">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : summaryError ? (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{summaryError}</AlertDescription>
                </Alert>
            ) : summary ? (
              <div className="p-4 bg-muted rounded-md text-sm">
                <p>{summary}</p>
              </div>
            ) : (
              <div className="p-4 bg-muted/50 rounded-md text-center text-sm text-muted-foreground border border-dashed">
                Click the button to generate a summary.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSummarize} disabled={summaryLoading}>
              {summaryLoading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles />}
              Generate Summary
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              LLM-Powered Q&A on Gold Data
            </CardTitle>
            <CardDescription>
              Ask natural language questions about your business-ready Gold Layer data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <form onSubmit={handleQuestionSubmit} className="flex gap-2">
                <Input 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., What are the key insights?"
                    disabled={qaLoading}
                />
                <Button type="submit" disabled={qaLoading}>
                    {qaLoading ? <Loader2 className="animate-spin" /> : 'Ask'}
                </Button>
             </form>
             {qaLoading ? (
              <div className="flex items-center justify-center h-24">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : qaError ? (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{qaError}</AlertDescription>
                </Alert>
            ) : answer ? (
                <div className="p-4 bg-muted rounded-md text-sm space-y-2">
                    <p className="font-semibold text-foreground">Answer:</p>
                    <p>{answer}</p>
                </div>
            ) : (
                <div className="p-4 bg-muted/50 rounded-md text-center text-sm text-muted-foreground border border-dashed">
                    Your answer will appear here.
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
