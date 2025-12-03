"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getSilverSummary, getGoldAnswer } from "@/app/actions";
import { BrainCircuit, Loader2, Sparkles, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type AIResult = {
  content: string | null;
  error: string | null;
  timestamp: Date | null;
};

export function LlmInteraction() {
  const [isPending, startTransition] = useTransition();
  const [question, setQuestion] = useState("");
  const [summaryResult, setSummaryResult] = useState<AIResult>({ content: null, error: null, timestamp: null });
  const [qaResult, setQaResult] = useState<AIResult>({ content: null, error: null, timestamp: null });

  const handleGenerateSummary = () => {
    startTransition(async () => {
      setSummaryResult({ content: "Generating summary...", error: null, timestamp: new Date() });
      const result = await getSilverSummary();
      setSummaryResult({ content: result.summary, error: result.error, timestamp: new Date() });
    });
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setQaResult({ content: "Thinking...", error: null, timestamp: new Date() });
      const result = await getGoldAnswer(question);
      setQaResult({ content: result.answer, error: result.error, timestamp: new Date() });
    });
  };

  const ResultDisplay = ({ result }: { result: AIResult }) => {
    if (!result.timestamp) return null;
    
    if (result.error) {
      return (
        <Alert variant="destructive" className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{result.error}</AlertDescription>
        </Alert>
      );
    }
    
    return (
      <Card className="mt-4 bg-secondary/50">
        <CardContent className="p-4">
          <pre className="text-sm whitespace-pre-wrap font-body">
            {result.content}
          </pre>
        </CardContent>
      </Card>
    );
  };


  return (
    <Card id="ai-interaction">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/20 rounded-full">
            <BrainCircuit className="w-8 h-8 text-accent" />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl md:text-3xl">
              LLM-Powered Intelligence
            </CardTitle>
            <CardDescription>
              Interact with your data using natural language.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="silver-summary">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="silver-summary">
              <Sparkles className="mr-2 h-4 w-4" /> Silver Layer Summary
            </TabsTrigger>
            <TabsTrigger value="gold-qa">
              <BrainCircuit className="mr-2 h-4 w-4" /> Gold Layer Q&amp;A
            </TabsTrigger>
          </TabsList>
          <TabsContent value="silver-summary" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Automatically generate a summary of the curated Silver layer
                data (using a sample of patient records).
              </p>
              <Button onClick={handleGenerateSummary} disabled={isPending}>
                {isPending && summaryResult.content?.startsWith("Generating") ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Summary
              </Button>
              <ResultDisplay result={summaryResult} />
            </div>
          </TabsContent>
          <TabsContent value="gold-qa" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ask a question about your analytics-ready Gold layer data
                (using sample KPIs).
              </p>
              <form onSubmit={handleAskQuestion} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="e.g., What is the total number of patients?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isPending}
                />
                <Button type="submit" disabled={isPending || !question}>
                  {isPending && qaResult.content?.startsWith("Thinking") ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Ask"
                  )}
                </Button>
              </form>
              <ResultDisplay result={qaResult} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
