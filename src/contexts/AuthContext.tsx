"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  avatar?: string;
  phone?: string;
  joinDate: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean };

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
} | null>(null);

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

// User database - only one admin account
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    email: "ashmverma@gmail.com",
    password: "admin123",
    firstName: "Ashm",
    lastName: "Verma",
    phone: "(763) 607-7480",
    role: "admin",
    joinDate: "2023-01-01"
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading true while we check localStorage
    error: null
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("ashm-user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("ashm-user");
      }
    }
    // Set loading to false after checking localStorage
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  // Save user to localStorage whenever authenticated state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("ashm-user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("ashm-user");
    }
  }, [state.user]);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user in mock database
      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = user;

      dispatch({ type: "LOGIN_SUCCESS", payload: userWithoutPassword });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error instanceof Error ? error.message : "Login failed"
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: "REGISTER_START" });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        throw new Error("An account with this email already exists");
      }

      // Create new user - always as customer, never admin
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "customer", // All new registrations are customers
        joinDate: new Date().toISOString()
      };

      // Add to mock database
      mockUsers.push({ ...newUser, password: data.password });

      dispatch({ type: "REGISTER_SUCCESS", payload: newUser });
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error instanceof Error ? error.message : "Registration failed"
      });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!state.user) throw new Error("No user logged in");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Prevent role changes unless it's the authorized admin
      if (data.role && state.user.email !== 'ashmverma@gmail.com') {
        throw new Error("Unauthorized to change role");
      }

      // Update user in mock database
      const userIndex = mockUsers.findIndex(u => u.id === state.user!.id);
      if (userIndex !== -1) {
        Object.assign(mockUsers[userIndex], data);
      }

      dispatch({ type: "UPDATE_PROFILE", payload: data });
    } catch (error) {
      throw new Error("Failed to update profile");
    }
  };

  return (
    <AuthContext.Provider value={{
      state,
      dispatch,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export type { User, AuthState, RegisterData };
