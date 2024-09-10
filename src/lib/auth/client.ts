import { auth } from '@/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { fireStore } from '@/firebase'; // Cấu hình Firestore của bạn

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};

export const register = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });

  // Lưu thông tin người dùng vào Firestore
  const userDocRef = doc(fireStore, 'users', userCredential.user.uid);
  await setDoc(userDocRef, {
    name,
    email,
    createdAt: new Date(),
  });

  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Save user info to Firestore if it doesn't exist
  const userDocRef = doc(fireStore, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      name: user.displayName,
      avatar:user.photoURL,
      email: user.email,
      createdAt: new Date(),
    });
  }

  return user;
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
