import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from 'firebase/firestore';
import { collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

import { getStorage } from "firebase/storage";
import { ref, getDownloadURL } from "firebase/storage";

import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`
};

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);

    this.provider = new GoogleAuthProvider();
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  getNow = () => this.db.Timestamp.now();
  
  // Auth
  authUser = () => this.auth.currentUser;
  doSignIn = () => signInWithPopup(this.auth, this.provider);
  doSignOut = () => {
    signOut(this.auth);
    useNavigate()('/');
  }

  // Firestore
  getDocument = (col, item) => getDoc(doc(this.db, col, item));
  addDocument = (col, data) => addDoc(collection(this.db, col), data);
  setDocument = (col, item, data) => setDoc(doc(this.db, col, item), data, { merge: true });
  deleteDocument = (col, item) => deleteDoc(doc(this.db, col, item));

  getUser = uid => this.getDocument('users', uid);
  getCurrentUser = () => this.auth.currentUser ? this.getUser(this.auth.currentUser.uid) : Promise.reject("User Unknown");
  setCurrentUserData = data => this.setDocument('users', this.auth.currentUser.uid, data);

  getCampaigns = () => getDocs(collection(this.db, 'campaigns'));
  getSystems = () => getDocs(collection(this.db, 'systems'));
  getSystem = system => this.getDocument('systems', system);

  addCampaign = (data) => this.addDocument('campaigns', data);
  updateCampaign = (id, data) => this.setDocument('campaigns', id, data);
  updateGMName = (uid, name) => this.setDocument('users', uid, { name: name });

  // Storage
  getFile = path => getDownloadURL(ref(this.storage, path));
  getSystemImage = system => this.getSystem(system).then(doc => getDownloadURL(ref(this.storage, doc.data().logo)));
  //updateFile = (refFile, file) => ref((this.storage,refFile).put(file).then(() => console.log("fini"));
}

export default Firebase;
