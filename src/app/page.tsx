'use client';

import { useRouter } from 'next/navigation';
import { useAuth, useFirestore, setDocumentNonBlocking, useUser } from '@/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  type FirebaseError,
} from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Dashboard } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Loader2, Chrome } from 'lucide-react';
import { GalacticaIcon } from '@/components/icons';
import Link from 'next/link';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    if (!auth || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Firebase not initialized',
        description: 'The Firebase service is not available. Please try again later.',
      });
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(firestore, 'users', user.uid);
      const userData = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastSignInTime: new Date().toISOString(),
        creationTime: user.metadata.creationTime || new Date().toISOString(),
      };
      setDocumentNonBlocking(userRef, userData, { merge: true });
      router.push('/');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error('Error signing in with Google: ', firebaseError);

      if (firebaseError.code === 'auth/operation-not-allowed') {
        toast({
          variant: 'destructive',
          title: 'Login Method Disabled',
          description: (
            <div>
              Google Sign-In is not enabled for this project. Please{' '}
              <a
                href="https://console.firebase.google.com/project/_/authentication/providers"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                enable it in the Firebase console
              </a>
              .
            </div>
          ),
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: firebaseError.message || 'There was a problem with your login request.',
        });
      }
    }
  };

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
         <div className="flex justify-center items-center gap-4 mb-8">
            <GalacticaIcon className="w-16 h-16 text-primary" />
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Galactica
            </h1>
          </div>
        <Button onClick={handleGoogleSignIn} size="lg">
          <Chrome className="mr-2" />
          Login using Google
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
