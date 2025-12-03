'use client';

import { useRouter } from 'next/navigation';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, type FirebaseError } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export function LoginForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user && firestore) {
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
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error('Error signing in with Google: ', firebaseError.code, firebaseError.message);

      if (firebaseError.code === 'auth/operation-not-allowed') {
        toast({
          variant: 'destructive',
          title: 'Login Method Disabled',
          description: (
            <div>
              <p>
                Google Sign-In is not enabled for this project. Please enable
                it in your Firebase console.
              </p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link
                  href="https://console.firebase.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to Firebase Console
                </Link>
              </Button>
            </div>
          ),
          duration: 9000,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your login request.',
        });
      }
    }
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={handleSignIn}>
          <Chrome className="mr-2" />
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
}
