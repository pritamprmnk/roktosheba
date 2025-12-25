import React, { useEffect, useState } from 'react';
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { updateProfile } from "firebase/auth";
import axios from 'axios';

const updateUserProfile = (name, photoURL) => {
  if(auth.currentUser) {
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL });
  }
  return Promise.reject("No user logged in");
}


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);
    const [role, setRole] = useState("");
    const [userStatus, setUserStatus] = useState("")

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }



    useEffect(()=>{
        if(!user) return;
             axios.get(`https://rokto-sheba-server-mauve.vercel.app/users/role/${user.email}`)
        .then(res=>{
            setRole(res.data.role)
            setUserStatus(res.data.status)
            setRoleLoading(false)
        })
    },[user])


useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        console.log("current user in auth state change", currentUser)
        setUser(currentUser)
        setLoading(false);


        

    })


    return () =>{
        unsubscribe();
    }
}, [])






    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUserProfile,
        role,
        roleLoading,
        userStatus,
        

        
    }



    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
);

};

export default AuthProvider;