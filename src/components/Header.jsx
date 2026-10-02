import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Menu, 
  X, 
  ShieldAlert, 
  Home, 
  Newspaper, 
  Users, 
  Layers, 
  PhoneCall, 
  Search,
  Phone
} from 'lucide-react';
import { authService } from '../services/auth';

export default function Header({ currentView, setView, user, setUser, schoolInfo, setSearchQuery, lang = 'th', setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'
  const [contrastMode, setContrastMode] = useState('normal'); // 'normal', 'yellow-black', 'white-black'
  const [headerSearch, setHeaderSearch] = useState('');

  const isEn = lang === 'en';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeFontSize = (size) => {
    setFontSize(size);
    if (size === 'small') {
      document.documentElement.style.fontSize = '14px';
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  };

  const changeContrast = (mode) => {
    setContrastMode(mode);
    if (mode === 'yellow-black') {
      document.body.classList.add('high-contrast-yb');
      document.body.classList.remove('high-contrast-wb');
    } else if (mode === 'white-black') {
      document.body.classList.add('high-contrast-wb');
      document.body.classList.remove('high-contrast-yb');
    } else {
      document.body.classList.remove('high-contrast-yb', 'high-contrast-wb');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setView('home');
    setIsOpen(false);
  };

  const handleNav = (view) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      if (setSearchQuery) {
        setSearchQuery(headerSearch.trim());
      }
      handleNav('news');
    }
  };

  const isActive = (view) => currentView === view ? 'nav-tab active-obec-tab' : 'nav-tab';

  return (
    <header className={`obec-school-header ${scrolled ? 'scrolled' : ''}`}>
      
      {/* 1. TOP UTILITY BAR (Deep Green / MoE Government Style - Clean No-Text Icons) */}
      <div className="obec-top-bar">
        <div className="container obec-top-content">
          
          {/* Left: Accessibility Controls (Contrast & Font Resizer - Pure Clean Icon Buttons) */}
          <div className="obec-access-group">
            
            {/* Contrast Color Buttons (White, Black/White, Black/Yellow) */}
            <div className="contrast-pills">
              <button 
                type="button"
                className={`contrast-pill c-default ${contrastMode === 'normal' ? 'active' : ''}`}
                onClick={() => changeContrast('normal')}
                title={isEn ? "Default Colors" : "สีปกติ"}
                aria-label="Default colors"
              >
                ก
              </button>
              <button 
                type="button"
                className={`contrast-pill c-wb ${contrastMode === 'white-black' ? 'active' : ''}`}
                onClick={() => changeContrast('white-black')}
                title={isEn ? "White on Black" : "ขาว-ดำ"}
                aria-label="White on black"
              >
                ก
              </button>
              <button 
                type="button"
                className={`contrast-pill c-yb ${contrastMode === 'yellow-black' ? 'active' : ''}`}
                onClick={() => changeContrast('yellow-black')}
                title={isEn ? "Yellow on Black" : "เหลือง-ดำ"}
                aria-label="Yellow on black"
              >
                ก
              </button>
            </div>

            <div className="top-divider-small"></div>

            {/* Font Size Buttons: (-) (ก) (+) */}
            <div className="font-size-pills">
              <button 
                type="button"
                className={`font-pill ${fontSize === 'small' ? 'active' : ''}`}
                onClick={() => changeFontSize('small')}
                title={isEn ? "Decrease Font Size" : "ลดขนาดตัวอักษร"}
                aria-label="Decrease font size"
              >
                -
              </button>
              <button 
                type="button"
                className={`font-pill ${fontSize === 'normal' ? 'active' : ''}`}
                onClick={() => changeFontSize('normal')}
                title={isEn ? "Normal Font Size" : "ขนาดตัวอักษรปกติ"}
                aria-label="Normal font size"
              >
                ก
              </button>
              <button 
                type="button"
                className={`font-pill ${fontSize === 'large' ? 'active' : ''}`}
                onClick={() => changeFontSize('large')}
                title={isEn ? "Increase Font Size" : "เพิ่มขนาดตัวอักษร"}
                aria-label="Increase font size"
              >
                +
              </button>
            </div>

          </div>

          {/* Right: Language Switcher & Contact / Social Icons */}
          <div className="obec-top-right">
            
            {/* Interactive TH / EN Language Switcher */}
            <div className="lang-switcher">
              <button 
                type="button"
                className={`lang-btn ${lang === 'th' ? 'active' : ''}`}
                onClick={() => setLang && setLang('th')}
                title="ภาษาไทย (Thai)"
              >
                TH
              </button>
              <button 
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang && setLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            <span className="top-divider"></span>

            {/* Social & Phone Links */}
            <div className="top-social-group d-none-sm">
              <a 
                href="https://www.facebook.com/profile.php?id=100057502268064" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="top-social-link"
                title="Facebook โรงเรียน"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={`tel:${schoolInfo?.phone || '0-5578-0246'}`}
                className="top-phone-link"
                title={isEn ? "Call School" : "โทรศัพท์ติดต่อ"}
              >
                <Phone size={13} className="phone-icon" />
                <span>{schoolInfo?.phone || '0-5578-0246'}</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 2. MIDDLE BRANDING ROW (Pure White Background) */}
      <div className="obec-brand-row">
        <div className="container brand-row-container">
          <div 
            className="brand-logo-unit" 
            onClick={() => handleNav('home')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="school-logo-frame">
              <img 
                src={schoolInfo && schoolInfo.logoUrl ? schoolInfo.logoUrl : 'logo.jpg'} 
                alt="ตราสัญลักษณ์โรงเรียน" 
                className="school-logo-img" 
              />
            </div>
            <div className="school-text-unit">
              <h1 className="school-main-name">
                {isEn ? (schoolInfo?.nameEn || 'Ban Wang Hua Waen Phatthana School') : (schoolInfo?.name || 'โรงเรียนบ้านวังหัวแหวนพัฒนา')}
              </h1>
              <p className="school-org-name">
                {isEn ? 'Kamphaeng Phet Primary Educational Service Area Office 2' : (schoolInfo?.region || 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษากำแพงเพชร เขต 2')}
              </p>
              <p className="school-en-name">
                {isEn ? 'Office of the Basic Education Commission • Ministry of Education' : 'Ban Wang Hua Waen Phatthana School'}
              </p>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-hamburger-btn" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="เปิดเมนูนำทาง"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION BAR (Signature OBEC Gold Active Tab) */}
      <nav className="obec-main-navbar">
        <div className="container nav-row-container">
          
          {/* Desktop Links with OBEC Gold Active Tab */}
          <div className="desktop-menu-list">
            <button onClick={() => handleNav('home')} className={isActive('home')}>
              <Home size={16} /> {isEn ? 'Home' : 'หน้าหลัก'}
            </button>
            <button onClick={() => handleNav('news')} className={isActive('news')}>
              <Newspaper size={16} /> {isEn ? 'News & Announcements' : 'ข่าวประชาสัมพันธ์'}
            </button>
            <button onClick={() => handleNav('staff')} className={isActive('staff')}>
              <Users size={16} /> {isEn ? 'Staff Directory' : 'ทำเนียบบุคลากรทางการศึกษา'}
            </button>
            <button onClick={() => handleNav('campus')} className={isActive('campus')}>
              <Layers size={16} /> {isEn ? 'Campus Map' : 'แผนผังสถานศึกษา'}
            </button>
            <button onClick={() => handleNav('contact')} className={isActive('contact')}>
              <PhoneCall size={16} /> {isEn ? 'Contact Us' : 'ติดต่อราชการ'}
            </button>

            {user && (
              <div className="admin-chip-group">
                <button onClick={() => handleNav('admin')} className={isActive('admin')}>
                  <ShieldAlert size={16} /> {isEn ? 'Admin Portal' : 'ระบบบริหารจัดการข้อมูล'}
                </button>
                <button onClick={handleLogout} className="btn-logout-chip" title={isEn ? "Logout" : "ออกจากระบบงาน"}>
                  <LogOut size={14} /> {isEn ? 'Logout' : 'ออกจากระบบ'}
                </button>
              </div>
            )}
          </div>

          {/* Quick Search Box (สไตล์ สพฐ. กรอกคำค้นหา + ปุ่มแว่นขยายสีทอง) */}
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder={isEn ? "Search announcements..." : "ระบุข้อความเพื่อสืบค้น..."} 
              className="header-search-input"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
            />
            <button type="submit" className="header-search-btn" title={isEn ? "Search" : "สืบค้น"}>
              <Search size={16} />
            </button>
          </form>

        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {isOpen && (
        <div className="obec-mobile-drawer animate-fade-in">
          
          {/* Mobile Language Switcher */}
          <div className="mobile-lang-row mb-3">
            <span className="mobile-lang-label">{isEn ? 'Language:' : 'ภาษา:'}</span>
            <div className="lang-switcher">
              <button 
                type="button"
                className={`lang-btn ${lang === 'th' ? 'active' : ''}`}
                onClick={() => setLang && setLang('th')}
              >
                TH
              </button>
              <button 
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang && setLang('en')}
              >
                EN
              </button>
            </div>
          </div>

          <form className="mobile-search-form mb-3" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder={isEn ? "Search announcements..." : "ระบุข้อความเพื่อสืบค้น..."} 
              className="header-search-input w-100"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
            />
            <button type="submit" className="header-search-btn">
              <Search size={16} />
            </button>
          </form>

          <button onClick={() => handleNav('home')} className={isActive('home')}>
            <Home size={18} /> {isEn ? 'Home' : 'หน้าหลัก'}
          </button>
          <button onClick={() => handleNav('news')} className={isActive('news')}>
            <Newspaper size={18} /> {isEn ? 'News & Announcements' : 'ข่าวประชาสัมพันธ์'}
          </button>
          <button onClick={() => handleNav('staff')} className={isActive('staff')}>
            <Users size={18} /> {isEn ? 'Staff Directory' : 'ทำเนียบบุคลากรทางการศึกษา'}
          </button>
          <button onClick={() => handleNav('campus')} className={isActive('campus')}>
            <Layers size={18} /> {isEn ? 'Campus Map' : 'แผนผังสถานศึกษา'}
          </button>
          <button onClick={() => handleNav('contact')} className={isActive('contact')}>
            <PhoneCall size={18} /> {isEn ? 'Contact Us' : 'ติดต่อราชการ'}
          </button>

          {user && (
            <div className="mobile-admin-actions mt-3">
              <div className="mobile-user-tag">
                {isEn ? 'Admin:' : 'ผู้ดูแลระบบ:'} <strong>{user.name}</strong>
              </div>
              <button onClick={() => handleNav('admin')} className="admin-mobile-nav-btn">
                <ShieldAlert size={16} /> {isEn ? 'Admin Portal' : 'ระบบบริหารจัดการข้อมูลสถานศึกษา'}
              </button>
              <button onClick={handleLogout} className="logout-mobile-nav-btn">
                <LogOut size={16} /> {isEn ? 'Logout' : 'ออกจากระบบงาน'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Scoped CSS for OBEC Header Style */}
      <style>{`
        .obec-school-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          font-family: var(--font-heading);
        }

        /* 1. Top Bar */
        .obec-top-bar {
          background-color: #063b27; /* Deep Educational Forest Green / MoE Tone */
          color: #ffffff;
          font-size: 0.8rem;
          padding: 6px 0;
          border-bottom: 2px solid #eab308;
        }

        .obec-top-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .obec-access-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .top-divider-small {
          width: 1px;
          height: 16px;
          background-color: rgba(255, 255, 255, 0.25);
        }

        .font-size-pills, .contrast-pills {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .font-pill {
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .font-pill:hover, .font-pill.active {
          background: #eab308;
          color: #000000;
          border-color: #eab308;
        }

        .contrast-pill {
          width: 25px;
          height: 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: transform 0.15s ease;
        }

        .contrast-pill:hover {
          transform: scale(1.1);
        }

        .contrast-pill.c-default { background: #ffffff; color: #000000; }
        .contrast-pill.c-wb { background: #000000; color: #ffffff; }
        .contrast-pill.c-yb { background: #000000; color: #fde047; border-color: #fde047; }
        .contrast-pill.active { outline: 2px solid #eab308; outline-offset: 1px; }

        .obec-top-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .lang-switcher {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .lang-btn {
          padding: 3px 9px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #ffffff;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .lang-btn.active {
          background-color: #eab308;
          color: #000000;
        }

        .top-divider {
          width: 1px;
          height: 16px;
          background-color: rgba(255, 255, 255, 0.25);
        }

        .top-social-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .top-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          transition: all 0.15s ease;
        }

        .top-social-link:hover {
          background: #eab308;
          color: #000000;
        }

        .top-phone-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #f1f5f9;
          font-size: 0.82rem;
          font-weight: 500;
          transition: color 0.15s ease;
        }

        .top-phone-link:hover {
          color: #eab308;
        }

        .phone-icon {
          color: #eab308;
        }

        /* 2. Brand Row */
        .obec-brand-row {
          background-color: #ffffff;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .brand-row-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand-logo-unit {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .school-logo-frame {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #eab308;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
          background: #ffffff;
        }

        .school-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .school-text-unit {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .school-main-name {
          font-size: 1.55rem;
          font-weight: 800;
          color: #0b2545; /* Deep Navy */
          margin: 0;
          line-height: 1.25;
          letter-spacing: -0.2px;
        }

        .school-org-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
          margin: 0;
          line-height: 1.3;
        }

        .school-en-name {
          font-size: 0.74rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .mobile-hamburger-btn {
          display: none;
          background: none;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
          color: #0b2545;
        }

        /* 3. Primary Navbar */
        .obec-main-navbar {
          background-color: #ffffff;
          border-top: 1px solid #e2e8f0;
          border-bottom: 3px solid #eab308; /* Signature Gold Stripe */
        }

        .nav-row-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .desktop-menu-list {
          display: flex;
          align-items: stretch;
          gap: 2px;
        }

        .nav-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 13px 18px;
          font-size: 0.96rem;
          font-weight: 600;
          color: #1e293b;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          border-bottom: 3px solid transparent;
          margin-bottom: -3px;
        }

        .nav-tab:hover {
          color: #063b27;
          background-color: #f8fafc;
        }

        .nav-tab.active-obec-tab {
          background-color: #eab308 !important;
          color: #000000 !important;
          font-weight: 800 !important;
          border-bottom: 3px solid #ca8a04;
          box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);
        }

        .admin-chip-group {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: 8px;
          padding-left: 8px;
          border-left: 1px solid #e2e8f0;
        }

        .btn-logout-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #dc2626;
          background: #fee2e2;
          border: 1px solid #fca5a5;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Search Form in Navbar */
        .header-search-form {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 9999px;
          padding: 3px 4px 3px 14px;
          width: 250px;
          transition: all 0.2s ease;
        }

        .header-search-form:focus-within {
          background: #ffffff;
          border-color: #eab308;
          box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.2);
        }

        .header-search-input {
          border: none;
          background: transparent;
          font-size: 0.85rem;
          color: #1e293b;
          width: 100%;
          outline: none;
          font-family: var(--font-heading);
        }

        .header-search-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #eab308;
          color: #000000;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s ease;
        }

        .header-search-btn:hover {
          background-color: #ca8a04;
        }

        /* 4. Mobile Drawer */
        .obec-mobile-drawer {
          display: none;
          padding: 16px 20px;
          background-color: #ffffff;
          border-bottom: 2px solid #eab308;
        }

        .mobile-lang-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
        }

        .mobile-lang-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0b2545;
        }

        .obec-mobile-drawer .nav-tab {
          display: flex;
          width: 100%;
          padding: 12px 14px;
          border-radius: 6px;
          margin-bottom: 4px;
        }

        .mobile-search-form {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 9999px;
          padding: 6px 12px;
        }

        .mobile-admin-actions {
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-user-tag {
          font-size: 0.85rem;
          color: #475569;
        }

        .admin-mobile-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          background: #0b2545;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .logout-mobile-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fca5a5;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 992px) {
          .desktop-menu-list {
            display: none;
          }
          .header-search-form {
            display: none;
          }
          .mobile-hamburger-btn {
            display: block;
          }
          .obec-mobile-drawer {
            display: block;
          }
          .school-main-name {
            font-size: 1.25rem;
          }
          .school-org-name {
            font-size: 0.78rem;
          }
          .school-en-name {
            display: none;
          }
          .school-logo-frame {
            width: 52px;
            height: 52px;
          }
          .d-none-sm {
            display: none !important;
          }
        }
      `}</style>

    </header>
  );
}
