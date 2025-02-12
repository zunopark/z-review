
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0lavNnzkJVlIFamjrTt-1W4KE1WduH6A",
  authDomain: "z-review-fd79f.firebaseapp.com",
  projectId: "z-review-fd79f",
  storageBucket: "z-review-fd79f.firebasestorage.app",
  messagingSenderId: "755388197300",
  appId: "1:755388197300:web:ba342a811b51f4e8732ae1",
  measurementId: "G-MLH1XC7RLJ"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

