"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only Careers dropdown items remain
  const careersDropdown = [
    {
      name: "Training Programs",
      href: "/training-programs",
      description: "Professional development opportunities",
    },
    {
      name: "Current Openings",
      href: "/current-openings",
      description: "Join our talented team",
    },
  ];

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/portfolio", label: "Portfolio" },
    {
      href: "/careers",
      label: "Careers",
      hasDropdown: true,
      dropdown: careersDropdown,
    },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "#");
  };

  // Hover handlers (only used for items with dropdown)
  const handleMenuHover = (href: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      setActiveDropdown(href);
    }
  };

  const handleMenuLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleDropdownItemClick = (href: string) => {
    setActiveDropdown(null);
    router.push(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-lg shadow-2xl py-2"
          : "bg-white/95 backdrop-blur-md shadow-lg py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group relative z-50"
            onMouseEnter={() => setActiveDropdown(null)}
          >
            <Image
              src="/images/jefcomlogo.svg"
              alt="JEFCOM Logo"
              width={100}
              height={100}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 relative">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() =>
                  handleMenuHover(link.href, link.hasDropdown)
                }
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden group flex items-center gap-1 ${
                    isActiveLink(link.href)
                      ? "bg-orange-600 text-white shadow-lg"
                      : "text-green-800 hover:bg-green-50 hover:text-green-900"
                  }`}
                  // Only prevent default & toggle for dropdown items
                  onClick={(e) => {
                    if (link.hasDropdown) {
                      e.preventDefault();
                      setActiveDropdown(
                        activeDropdown === link.href ? null : link.href
                      );
                    }
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 relative z-10 transition-transform duration-300 ${
                        activeDropdown === link.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                </Link>

                {/* Dropdown Menu - Careers */}
                {link.hasDropdown && activeDropdown === link.href && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-white/98 backdrop-blur-lg rounded-xl shadow-2xl border border-green-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {link.dropdown?.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDropdownItemClick(item.href)}
                        className="w-full px-5 py-3 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 transition-all duration-200 group"
                      >
                        <div className="font-semibold text-green-800 group-hover:text-orange-600 text-sm mb-1 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
                          {item.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Get Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-green-800 hover:bg-green-50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 bg-white/95 backdrop-blur-md border-t border-green-200">
          {navLinks.map((link, index) => (
            <div key={index} className="mb-2">
              <Link
                href={link.href}
                onClick={(e) => {
                  if (!link.hasDropdown) {
                    setIsMobileMenuOpen(false);
                  } else {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === link.href ? null : link.href
                    );
                  }
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
                  isActiveLink(link.href)
                    ? "bg-orange-600 text-white"
                    : "text-green-800 hover:bg-green-50"
                }`}
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === link.href ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Mobile Dropdown - Careers */}
              {link.hasDropdown && activeDropdown === link.href && (
                <div className="mt-2 ml-4 space-y-1">
                  {link.dropdown?.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 rounded-lg text-sm text-green-700 hover:bg-green-50 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block mt-4 px-4 py-3 bg-orange-600 text-white text-center rounded-lg font-bold hover:bg-orange-700 transition-colors"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;