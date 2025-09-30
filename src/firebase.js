import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAvAyVcQetTRmJ97omWj8ttuMW8Qqnr9WQ",
  authDomain: "netflix-clone-86028.firebaseapp.com",
  projectId: "netflix-clone-86028",
  storageBucket: "netflix-clone-86028.firebasestorage.app",
  messagingSenderId: "26099808603",
  appId: "1:26099808603:web:08fb2136b7fb245d17827e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email,password);

    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};