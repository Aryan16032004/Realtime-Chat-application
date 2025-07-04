import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5001'; 

export const useAuthStore = create((set,get) => ({
    authUser : null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkauth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.error("Error checking authentication:", error);
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (userData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', userData);
            console.log("Signup response:", res.data);
            
            set({ authUser: res.data});
            toast.success("Signup successful!");
            get().connectSocket()
        } catch (error) {
            console.error("Error during signup:", error);
        }
        finally{
            set({isSigningUp:false});
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true});
        try {
            await axiosInstance.post('/auth/login',data);
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
            toast.success("Login successful!");
            get().connectSocket()
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed!");   
        }
        finally{
            set({isLoggingIn:false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully!");
            get().disconnectSocket()
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Logout failed!");
        }
    },
    
    updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

   connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(SOCKET_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}))