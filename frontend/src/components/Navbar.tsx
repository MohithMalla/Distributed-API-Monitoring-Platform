import { Search, Bell, HelpCircle, Grid } from "lucide-react";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css"; // Import the custom CSS file

const Navbar = () => {
  const { user } = useAuth();
  
  // Create a dynamic avatar URL based on the user's name, fallback to "Alex Rivera" to match mockups if empty
  const displayName = user?.name || "Alex Rivera";
  const displayEmail = user?.email || "Admin Access";
  const avatarName = encodeURIComponent(displayName);
  const avatarUrl = `https://ui-avatars.com/api/?name=${avatarName}&background=0D8ABC&color=fff&rounded=true`;

  return (
    <header className="navbar">
      
      {/* Search Bar */}
      <div className="search-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search monitors or logs..."
          className="search-input"
        />
      </div>

      {/* Actions & Profile */}
      <div className="nav-actions">
        
        <button className="nav-btn icon-btn" aria-label="Notifications">
          <Bell size={20} strokeWidth={2} />
          <span className="notification-dot"></span>
        </button>
        
        <button className="nav-btn icon-btn" aria-label="Help">
          <HelpCircle size={20} strokeWidth={2} />
        </button>
        
        <button className="nav-btn icon-btn" aria-label="Apps">
          <Grid size={20} strokeWidth={2} />
        </button>

        {/* User Profile Block */}
        <div className="profile-wrapper">
          <div className="profile-text">
            <h3 className="profile-name">
              {displayName}
            </h3>
            <p className="profile-role">
              {displayEmail}
            </p>
          </div>
          <img
            src={avatarUrl}
            alt={displayName}
            className="profile-avatar"
          />
        </div>
        
      </div>
    </header>
  );
};

export default Navbar;