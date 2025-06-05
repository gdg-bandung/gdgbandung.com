import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useScroll } from "~/hooks/use-scroll";
import { cn } from "~/lib/utils";
import { Link, useLocation } from "react-router";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";
import handleHashNavigation from "~/helper/handleHashNavigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#events", label: "Events" },
  { href: "/#about", label: "About" },
  { href: "/#partnership", label: "Partnership" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScroll();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu when changing location
  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-white"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-4 flex justify-between items-center",
          scrolled ? "py-2" : "py-3"
        )}
      >
        <Link to="/" className="flex items-center">
          <img
            src="/full-logo.svg"
            alt="GDG Bandung Logo"
            className="h-10"
            fetchPriority="high"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.href.includes("#") ? (
                  <a
                    href={item.href}
                    className="font-medium text-gray-800 hover:text-gdg-blue transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashNavigation(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="font-medium text-gray-800 hover:text-gdg-blue transition"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <Drawer
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        direction="right"
      >
        <DrawerContent>
          <DrawerHeader>
            <div className="container mx-auto px-4 flex justify-between items-center mb-4">
              <Link to="/" className="flex items-center">
                <img
                  src="/full-logo.svg"
                  alt="GDG Bandung Logo"
                  className="h-10"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 container mx-auto px-4 ">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block font-medium text-gray-800 hover:text-gdg-blue transition py-2"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
