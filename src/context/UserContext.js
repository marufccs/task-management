import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/firebase.init';

export const AuthContext = createContext();

const UserContext = ({children}) => {

    const auth = getAuth(app);

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    //sign in a new user
    const signInNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //update a user
    const updateUser = (userInfo) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    }

    //sign in a user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //log out the user
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    },[])



    const authInfo = {signInNewUser, updateUser, signInUser, user, logOut, loading};
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
        {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;