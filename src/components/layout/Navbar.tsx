import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Timer, BarChart2, Trophy, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    navigate("/");
  };

  const navItems = [
    { path: "/meditate", icon: Timer, label: "Meditate" },
    { path: "/progress", icon: BarChart2, label: "Progress" },
    { path: "/achievements", icon: Trophy, label: "Achievements" },
  ];

  const NavLinks = ({ onClick = () => {} }) => (
    <>
      {navItems.map((item) => (
        <Link key={item.path} to={item.path} onClick={onClick}>
          <Button
            variant={location.pathname === item.path ? "default" : "ghost"}
            className="flex items-center gap-2 w-full justify-start"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/meditate"
              className="flex items-center text-xl font-bold text-blue-600"
            >
              Mindful
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-10 items-center space-x-4">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[280px]">
                <div className="flex flex-col gap-4 py-4">
                  <NavLinks onClick={() => setIsOpen(false)} />
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 justify-start"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
