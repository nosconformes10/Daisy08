import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6W-AY8YWYwjpNtqSLOUWFyupNjMwRYR4",
  authDomain: "daisy-08.firebaseapp.com",
  projectId: "daisy-08",
  storageBucket: "daisy-08.firebasestorage.app",
  messagingSenderId: "753362157561",
  appId: "1:753362157561:web:8605ad7ec7181e81378728"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
