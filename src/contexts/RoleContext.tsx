import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  useEffect(() => {
    // First check URL path for role
    const pathSegments = location.pathname.split('/');
    if (pathSegments.includes('dashboard')) {
      const roleIndex = pathSegments.indexOf('dashboard') + 1;
      if (roleIndex < pathSegments.length) {
        const urlRole = pathSegments[roleIndex];
        if (urlRole === 'trainer' || urlRole === 'athlete') {
          setRole(urlRole);
          // Also update localStorage for consistency
          localStorage.setItem('userRole', urlRole);
          return;
        }
      }
    }
    
    // Fallback to localStorage if no role in URL
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
  }, [location.pathname]);

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
