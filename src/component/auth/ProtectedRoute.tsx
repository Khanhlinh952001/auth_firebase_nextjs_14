"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/sign-in');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <div>Loading...</div>; // Show a loading spinner or message while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
