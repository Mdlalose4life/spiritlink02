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
            const response = await customAxios.post('user/login', userData)
            setUser(response.user);
            // Stores the token to the local storage
            localStorage.setItem('UserToken', response.data.token);  
        } catch (error) {
            // Handle login errors
            console.error('Login failed', error);
        }
    };

    async function SignupUser(userData){
        try {
            const response = await customAxios.post('user/register', userData);
            setUser(response.user);
            // Stor the user token on the local state.
            localStorage.setItem('UserToken', response.data.token)
        } catch (error) {
            console.error('Signup fail', error);
        }
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
