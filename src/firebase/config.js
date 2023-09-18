import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCzyh8_mi4-M-F2nqAfuWxMZVRZcSg98fc",
  authDomain: "e-learning-hyf.firebaseapp.com",
  projectId: "e-learning-hyf",
  storageBucket: "e-learning-hyf.appspot.com",
  messagingSenderId: "276041151225",
  appId: "1:276041151225:web:4243d2c7cc0776c9e9a828"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence, sendPasswordResetEmail };
