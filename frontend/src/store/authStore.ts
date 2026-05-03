import { create } from 'zustand';
import type { User as FirebaseUser } from "firebase/auth";
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: FirebaseUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start loading to check auth state

  loginWithGoogle: async () => {
    set({ isLoading: true });
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Auth Error", error);
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error", error);
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  setUser: (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      set({
        user: {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Voter',
          email: firebaseUser.email || '',
          avatarUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${firebaseUser.email || firebaseUser.uid}`
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

// Initialize auth listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});
