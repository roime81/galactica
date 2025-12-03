'use client';

import { Dashboard } from '@/components/dashboard';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { LakeIcon } from '@/components/icons';

export default function Home() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
         <div className="flex justify-center items-center gap-4 mb-4">
            <LakeIcon className="w-16 h-16 text-primary" />
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Galactica
            </h1>
          </div>
        <p className="mb-8 text-lg text-muted-foreground">
          Please log in to continue.
        </p>
        <Button asChild size="lg">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Dashboard />
    </div>
  );
}
