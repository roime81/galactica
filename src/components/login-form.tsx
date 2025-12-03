'use client';

import { useRouter } from 'next/navigation';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome } from 'lucide-react';

export function LoginForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

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
      console.error('Error signing in with Google: ', error);
      // Optionally, show an error to the user
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
