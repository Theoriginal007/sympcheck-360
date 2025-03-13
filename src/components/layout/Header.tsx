
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Menu, X, Heart, Activity, Video, BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Symptom Checker', href: '/symptom-checker', icon: <Heart className="w-5 h-5" /> },
    { name: 'Health Dashboard', href: '/dashboard', icon: <Activity className="w-5 h-5" /> },
    { name: 'Consultations', href: '/consultations', icon: <Video className="w-5 h-5" /> },
    { name: 'Health Education', href: '/education', icon: <BookOpen className="w-5 h-5" /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md py-4 border-b',
        isScrolled ? 'bg-white/80 border-gray-200/20' : 'bg-transparent border-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-display text-2xl font-semibold text-health-primary"
          >
            <div className="w-10 h-10 rounded-full bg-health-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="animate-fade-in">HealthSphere</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  isActive(link.href)
                    ? 'bg-health-primary text-white'
                    : 'text-health-text hover:bg-gray-100'
                )}
              >
                <span className="flex items-center space-x-1.5">
                  {link.icon}
                  <span>{link.name}</span>
                </span>
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="rounded-full" onClick={() => navigate('/sign-in')}>
              Sign In
            </Button>
            <Button className="rounded-full bg-health-primary hover:bg-health-primary/90" onClick={() => navigate('/get-started')}>
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 animate-slide-down shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3',
                    isActive(link.href)
                      ? 'bg-health-primary/10 text-health-primary'
                      : 'text-health-text hover:bg-gray-100'
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/sign-in')}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full justify-start bg-health-primary hover:bg-health-primary/90"
                  onClick={() => navigate('/get-started')}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
