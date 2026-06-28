import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  Monitor,
  AlertCircle,
  Settings,
  LogOut,
} from "lucide-react";
import "../styles/sidebar.css"; // Import the custom CSS file

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Projects", icon: Folder, path: "/projects" },
  { name: "Monitors", icon: Monitor, path: "/monitors" },
  { name: "Incidents", icon: AlertCircle, path: "/incidents", badge: 2 },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        
        {/* Logo Section */}
        <div className="sidebar-header">
          <h1 className="brand-title">Distributed Api Monitor</h1>
          <p className="brand-subtitle">Production Environment</p>
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-nav">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <div className="nav-link-content">
                  <Icon size={20} strokeWidth={2} className="nav-icon" />
                  <span>{item.name}</span>
                </div>
                
                {item.badge && (
                  <span className="nav-badge">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Status & Logout */}
      <div className="sidebar-footer">
        
        <div className="status-widget">
          <p className="status-label">Status</p>
          <div className="status-indicator">
            <div className="status-dot"></div>
            <p className="status-text">All systems operational</p>
          </div>
        </div>

        <button className="logout-btn">
          <LogOut size={20} strokeWidth={2} />
          <span>Logout</span>
        </button>
        
      </div>
    </aside>
  );
};

export default Sidebar;