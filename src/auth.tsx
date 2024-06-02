import { createContext, useContext, useState, useEffect, FC, ReactNode } from 'react';
import { parseJwt } from './jwt';


//TypeScript interface
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    //console.log("Validating");
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = parseJwt(token);
      if (parsedToken && parsedToken.exp && parsedToken.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  //console.log("Context is: ", context)
  return context;
};
