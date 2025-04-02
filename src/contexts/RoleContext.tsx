
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'trainer' | 'athlete' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isTrainer: boolean;
  isAthlete: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    // Load role from localStorage on initial render
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('userRole', newRole);
    } else {
      localStorage.removeItem('userRole');
    }
  };

  const value = {
    role,
    setRole: handleSetRole,
    isTrainer: role === 'trainer',
    isAthlete: role === 'athlete',
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
