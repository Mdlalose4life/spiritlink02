import { createContext, useContext, useState } from 'react';
import customAxios from '../customAxios/axiosUser'

const UserContext = createContext();

export function useUserContext(){
    return useContext(UserContext);
} 

export function UserProvider({ children }) {
    // Initialize the user state to null
    const [ user, setUser ] = useState(null)

    async function LoginUser(userData) {
        //console.log('userData', userData)
        //console.log('userData.user', userData.user)
        setUser(userData.user);
        localStorage.setItem('UserToken', userData.token);
        
    };

    async function SignupUser(userData) {
        setUser(userData.user);
        localStorage.setItem('UserToken', userData.token)
    }

    async function logoutUser(){
        try {
        // Sending the request to logout to the backend.
        await customAxios.post('/logout');
        // clean the state up.
        setUser(null);
        // deletes the tocan from local storage
        localStorage.removeItem('UserToken');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    return (
        <UserContext.Provider value={{ user, LoginUser, logoutUser, SignupUser}}>
            {children}
        </UserContext.Provider>
    )
}
