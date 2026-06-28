import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      {/* Sidebar remains fixed on the left */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Navbar stays at the top */}
        <Navbar />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 pb-8">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default MainLayout;