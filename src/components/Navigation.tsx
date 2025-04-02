
import { Link, useLocation } from "react-router-dom";
import { Home, Activity, Video, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <nav className="flex justify-around items-center h-16">
        <Link
          to="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/dashboard") ? "text-sportBlue" : "text-gray-500"
          )}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link
          to="/tests"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/tests") ? "text-sportBlue" : "text-gray-500"
          )}
        >
          <Activity size={24} />
          <span className="text-xs mt-1">Tests</span>
        </Link>

        <Link
          to="/profile"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/profile") ? "text-sportBlue" : "text-gray-500"
          )}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
