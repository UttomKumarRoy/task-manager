import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from 'firebase/auth'
  import React, { createContext, useEffect, useState } from 'react'
  import app from '../firebase/firebase.init'
  
  const auth = getAuth(app)
  export const AuthContext = createContext()
  
  const UserContext = ({ children }) => {
    const googleProvider = new GoogleAuthProvider()
  
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
  
    //1. Create User
    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }
  
    //   2. Update Name
  
    const updateName = (name, photo) => {
      setLoading(true)
      return updateProfile(auth.currentUser, { displayName: name, photoURL:photo})
    }
  
   
  
    // 3. Google Signin
  
    const signInWithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }

    
  
    // 4. Logout
    const logout = () => {
      setLoading(true)
      return signOut(auth)
    }
  
    //5. Login with Password
    const signIn = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }
  
    
  
    useEffect(() => {
      //this part will execute once the component is mounted.
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoading(false)
      })
  
      return () => {
        //this part will execute once the component is unmounted.
        unsubscribe()
      }
    }, [])
  
    const authInfo = {
      user,
      createUser,
      updateName,
      signInWithGoogle,
      logout,
      signIn,
      loading,
      setLoading
    }
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
  }
  
  export default UserContext
  