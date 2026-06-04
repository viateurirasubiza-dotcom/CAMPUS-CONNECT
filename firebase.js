import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// AUTH
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// FIRESTORE (chat + users + groups)
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// STORAGE (files: PDF, images)
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXiSzCHJl5Wz7xACFmlZ-1TitHMIEzQTI",
  authDomain: "campus-connect-8f254.firebaseapp.com",
  projectId: "campus-connect-8f254",
  storageBucket: "campus-connect-8f254.appspot.com",
  messagingSenderId: "96856208431",
  appId: "1:96856208431:web:ba6e5b910944d4217a42da"
};

// INIT FIREBASE
const app = initializeApp(firebaseConfig);

// EXPORT SERVICES
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
