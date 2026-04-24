import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants';
import Button from './Button';

interface User {
  name: string;
  email: string;
}

interface NavbarProps {
  onLogin?: () => void;
  onLogout?: () => void;
  onContact?: () => void;
  onSearch?: (query: string) => void;
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, onLogout, onContact, onSearch, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href.startsWith('/')) {
      // Allow navigation to other pages
      window.location.href = href;
      return;
    }

    if (href === '#contact') {
      onContact?.();
      return;
    }

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(searchQuery);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - Simple & Professional */}
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-md group-hover:bg-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 leading-none tracking-tight">BIM & Digital Twin <span className="text-brand-blue">VN</span></span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Cổng thông tin Pháp lý</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-600 hover:text-brand-blue font-medium transition-colors text-sm py-2 border-b-2 border-transparent hover:border-brand-blue"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-brand-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Tìm kiếm văn bản, quy trình..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:bg-white w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden lg:block">
                  <div className="text-sm font-bold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">Thành viên</div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Dropdown User Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform z-50 border border-gray-100">
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Tính năng Hồ sơ cá nhân đang được phát triển!'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hồ sơ cá nhân</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Tính năng Dự án của tôi đang được phát triển!'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dự án của tôi</a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Đăng xuất</button>
                  </div>
                </div>
              </div>
            ) : (
              <Button variant="secondary" size="sm" onClick={onLogin}>Đăng nhập</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-600 hover:text-brand-blue font-medium px-2 py-1 rounded hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <div className="font-bold text-gray-900 px-2">{user.name}</div>
                    <button onClick={onLogout} className="text-left text-red-600 font-medium px-2 py-1 rounded hover:bg-gray-50">Đăng xuất</button>
                  </div>
                ) : (
                  <Button variant="secondary" className="w-full" onClick={onLogin}>Đăng nhập</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;