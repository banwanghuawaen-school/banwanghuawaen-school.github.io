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
      setScrolled(window.scrollY > 30);
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

  const isActive = (view) => currentView === view ? 'nav-tab active-portal-tab' : 'nav-tab';

  return (
    <header className={`portal-school-header ${scrolled ? 'scrolled' : ''}`}>
      
      {/* 1. TOP UTILITY BAR (Deep Royal Navy with Accessibility, Language, Phone & Social) */}
      <div className="portal-top-bar">
        <div className="container portal-top-content">
          
          {/* Left: Official Regional Identifier */}
          <div className="portal-top-left-info">
            <span className="top-org-badge">
              {isEn 
                ? 'Ban Wang Hua Waen Phatthana School • Kamphaeng Phet Primary ESAO 2' 
                : 'โรงเรียนบ้านวังหัวแหวนพัฒนา • สพป.กำแพงเพชร เขต 2'}
            </span>
          </div>

          {/* Right: Accessibility Controls, Language, Phone & Social */}
          <div className="portal-top-right">
            
            {/* Contrast Color Buttons */}
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

            <div className="top-divider-small"></div>

            {/* Language Switcher */}
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

            <div className="top-divider-small d-none-sm"></div>

            {/* Social & Contact */}
            <div className="top-social-group d-none-sm">
              <a 
                href="https://www.facebook.com/profile.php?id=100057502268064" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="top-social-link"
                title="เพจเฟซบุ๊กโรงเรียนบ้านวังหัวแหวนพัฒนา"
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

      {/* 2. MIDDLE BRANDING ROW (Modern Clean Institutional Identity) */}
      <div className="portal-brand-row">
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
                {isEn ? 'Ban Wang Hua Waen Phatthana School • Educational Portal' : 'Ban Wang Hua Waen Phatthana School'}
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

      {/* 3. PRIMARY NAVIGATION BAR (Signature Royal Navy with Radiant School Gold Tab) */}
      <nav className="portal-main-navbar">
        <div className="container nav-row-container">
          
          {/* Desktop Navigation Links */}
          <div className="desktop-menu-list">
            <button onClick={() => handleNav('home')} className={isActive('home')}>
              <Home size={16} /> <span>{isEn ? 'Home' : 'หน้าหลัก'}</span>
            </button>
            <button onClick={() => handleNav('news')} className={isActive('news')}>
              <Newspaper size={16} /> <span>{isEn ? 'News & Announcements' : 'ข่าวประชาสัมพันธ์'}</span>
            </button>
            <button onClick={() => handleNav('staff')} className={isActive('staff')}>
              <Users size={16} /> <span>{isEn ? 'Staff Directory' : 'ทำเนียบบุคลากร'}</span>
            </button>
            <button onClick={() => handleNav('campus')} className={isActive('campus')}>
              <Layers size={16} /> <span>{isEn ? 'Campus Map' : 'แผนผังสถานศึกษา'}</span>
            </button>
            <button onClick={() => handleNav('contact')} className={isActive('contact')}>
              <PhoneCall size={16} /> <span>{isEn ? 'Contact Us' : 'ติดต่อราชการ'}</span>
            </button>

            {user && (
              <div className="admin-chip-group">
                <button onClick={() => handleNav('admin')} className={isActive('admin')}>
                  <ShieldAlert size={16} /> <span>{isEn ? 'Admin' : 'ระบบบริหารข้อมูล'}</span>
                </button>
                <button onClick={handleLogout} className="btn-logout-chip" title={isEn ? "Logout" : "ออกจากระบบ"}>
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Quick Search Form */}
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder={isEn ? "Search portal..." : "ค้นหาข้อมูลข่าวสาร..."} 
              className="header-search-input"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
            />
            <button type="submit" className="header-search-btn" title={isEn ? "Search" : "ค้นหา"}>
              <Search size={15} />
            </button>
          </form>

        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {isOpen && (
        <div className="portal-mobile-drawer animate-fade-in">
          
          {/* Mobile Search Form */}
          <form className="mobile-search-form mb-3" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder={isEn ? "Search portal..." : "ค้นหาข้อมูลข่าวสาร..."} 
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
                {isEn ? 'Signed in as:' : 'เข้าสู่ระบบในชื่อ:'} <strong>{user.name}</strong>
              </div>
              <button onClick={() => handleNav('admin')} className="admin-mobile-nav-btn">
                <ShieldAlert size={16} /> {isEn ? 'Admin Portal' : 'ระบบบริหารข้อมูลสถานศึกษา'}
              </button>
              <button onClick={handleLogout} className="logout-mobile-nav-btn">
                <LogOut size={16} /> {isEn ? 'Logout' : 'ออกจากระบบงาน'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Scoped CSS for Bespoke Modern School Colors (เหลือง - กรม) */}
      <style>{`
        .portal-school-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          font-family: var(--font-heading);
          transition: all 0.25s ease;
        }

        /* 1. Top Bar */
        .portal-top-bar {
          background-color: #07172b; /* Deep Obsidian Navy */
          color: #ffffff;
          font-size: 0.8rem;
          padding: 8px 0;
          border-bottom: 1px solid rgba(245, 158, 11, 0.25); /* Subtle Golden Accent Line */
        }

        .portal-top-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .portal-top-left-info {
          display: flex;
          align-items: center;
        }

        .top-org-badge {
          font-size: 0.82rem;
          font-weight: 500;
          color: #cbd5e1;
          letter-spacing: 0.3px;
        }

        /* Top Right Group */
        .portal-top-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .top-divider-small {
          width: 1px;
          height: 14px;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .font-size-pills, .contrast-pills {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .font-pill {
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .font-pill:hover, .font-pill.active {
          background: #f59e0b;
          color: #07172b;
          border-color: #f59e0b;
        }

        .contrast-pill {
          width: 23px;
          height: 23px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .c-default { background: #ffffff; color: #07172b; border: 1px solid #cbd5e1; }
        .c-wb { background: #000000; color: #ffffff; border: 1px solid #ffffff; }
        .c-yb { background: #000000; color: #fde047; border: 1px solid #fde047; }

        .contrast-pill.active {
          box-shadow: 0 0 0 2px #f59e0b;
        }

        /* Language Switcher */
        .lang-switcher {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          padding: 2px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .lang-btn {
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .lang-btn.active {
          background: #f59e0b;
          color: #07172b;
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
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          transition: all 0.2s ease;
        }

        .top-social-link:hover {
          background: #1877F2;
          transform: translateY(-1px);
        }

        .top-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #e2e8f0;
          font-size: 0.8rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .top-phone-link:hover {
          color: #fde047;
        }

        /* 2. Middle Branding Row */
        .portal-brand-row {
          background: #ffffff;
          padding: 14px 0;
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
          width: 58px;
          height: 58px;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          border: 2px solid #f59e0b; /* Signature School Gold Rim */
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .school-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .school-main-name {
          font-size: 1.45rem;
          font-weight: 800;
          color: #0b2545; /* Deep Royal Navy */
          line-height: 1.2;
          margin-bottom: 2px;
          letter-spacing: -0.3px;
        }

        .school-org-name {
          font-size: 0.86rem;
          color: #475569;
          font-weight: 500;
          margin-bottom: 1px;
        }

        .school-en-name {
          font-size: 0.76rem;
          color: #94a3b8;
          font-weight: 500;
          margin: 0;
        }

        .mobile-hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          color: #0b2545;
          cursor: pointer;
        }

        /* 3. Main Navbar: Deep Royal Navy with Radiant School Yellow Active Tab */
        .portal-main-navbar {
          background: #08192e; /* Signature Deep Royal Navy */
          border-bottom: 3px solid #f59e0b; /* Signature Gold Border */
          padding: 5px 0;
          box-shadow: 0 4px 16px rgba(7, 23, 43, 0.2);
        }

        .nav-row-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .desktop-menu-list {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: none;
          color: #cbd5e1;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-tab:hover {
          color: #fde047;
          background: rgba(255, 255, 255, 0.08);
        }

        /* Active Tab in School Gold with Deep Navy Text */
        .active-portal-tab {
          background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%) !important;
          color: #07172b !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.45) !important;
        }

        .admin-chip-group {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 8px;
          padding-left: 8px;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-logout-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-logout-chip:hover {
          background: #ef4444;
          color: #ffffff;
        }

        /* Search Form */
        .header-search-form {
          position: relative;
          width: 220px;
        }

        .header-search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 7px 32px 7px 12px;
          border-radius: 9999px;
          font-size: 0.84rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .header-search-input::placeholder {
          color: #94a3b8;
        }

        .header-search-input:focus {
          background: rgba(255, 255, 255, 0.18);
          border-color: #f59e0b;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3);
          width: 250px;
        }

        .header-search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: #f59e0b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-search-btn:hover {
          color: #fbbf24;
        }

        /* Mobile Drawer */
        .portal-mobile-drawer {
          background: #07172b;
          padding: 20px;
          border-top: 1px solid rgba(245, 158, 11, 0.3);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .portal-mobile-drawer .nav-tab {
          width: 100%;
          justify-content: flex-start;
          padding: 12px 14px;
        }

        .mobile-admin-actions {
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-user-tag {
          font-size: 0.82rem;
          color: #94a3b8;
        }

        .admin-mobile-nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%);
          color: #07172b;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .logout-mobile-nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .desktop-menu-list, .header-search-form {
            display: none;
          }
          .mobile-hamburger-btn {
            display: block;
          }
          .d-none-sm {
            display: none !important;
          }
          .school-main-name {
            font-size: 1.15rem;
          }
        }
      `}</style>

    </header>
  );
}
