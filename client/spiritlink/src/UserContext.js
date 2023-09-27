import { createContext, useContext, useState } from 'react';
import customAxios from './axiosUser'



const UserContext = createContext();

export function useUserContext(){
    return useContext(UserContext);
} 

export function UserProvider({ children }) {
    // Initialize the user state to null
    const [ user, setUser ] = useState(null)

    async function LoginUser(userData) {
        try { 
            //Using axios, to send the information to the backend.
            const response = await customAxios.post('auth/login', userData)
            setUser(response.user);    
        } catch (error) {
            // Handle login errors
            console.error('Login failed', error);
        }
    };
    async function logoutUser(){
        try {
        // Sending the request to logout to the backend.
        await customAxios.post('/logout');
        // clean the state up.
        setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    return (
        <UserContext.Provider value={{ user, LoginUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}
