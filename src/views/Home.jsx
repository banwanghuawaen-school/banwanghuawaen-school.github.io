import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import NewsCard from '../components/NewsCard';
import { 
  BookOpen, 
  Users, 
  Compass, 
  Award, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  PhoneCall, 
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Home({ schoolInfo, setView, setCurrentNewsItem }) {
  const [latestNews, setLatestNews] = useState([]);
  const [directorInfo, setDirectorInfo] = useState(null);

  useEffect(() => {
    const loadData = () => {
      const news = dbService.getNews().filter(item => item.status === 'published').slice(0, 3);
      setLatestNews(news);
      
      const staff = dbService.getStaff();
      if (staff && staff.director) {
        setDirectorInfo(staff.director);
      }
    };

    loadData();
    window.addEventListener('school_db_updated', loadData);
    return () => window.removeEventListener('school_db_updated', loadData);
  }, []);

  const handleNewsClick = (news) => {
    setCurrentNewsItem(news);
    setView('news-detail');
  };

  return (
    <div className="home-view animate-fade-in">
      
      {/* 1. ULTRA-PREMIUM HERO BANNER */}
      <section className="hero-banner">
        {/* Animated Background Mesh & Star Glow */}
        <div className="hero-ambient-glow glow-1"></div>
        <div className="hero-ambient-glow glow-2"></div>
        <div className="hero-grid-overlay"></div>

        {schoolInfo.heroBgUrl && (
          <div 
            className="hero-bg-image-fade" 
            style={{ 
              backgroundImage: `url(${schoolInfo.heroBgUrl})`,
              position: 'absolute',
              inset: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.35,
              zIndex: 0,
              filter: 'brightness(0.3) contrast(1.2)'
            }}
          />
        )}

        <div className="container hero-content">
          <div className="hero-badge-pill animate-float">
            <Sparkles size={14} className="text-secondary" />
            <span>เว็บไซต์อย่างเป็นทางการ • สพป.กำแพงเพชร เขต 2</span>
          </div>

          <h1 className="hero-title">
            {schoolInfo.name}
          </h1>
          <p className="hero-subtitle">{schoolInfo.nameEn}</p>
          
          <div className="hero-slogan-card glass-panel-dark">
            <span className="quote-mark">“</span>
            <p className="hero-slogan-text">{schoolInfo.slogan}</p>
            <span className="quote-mark">”</span>
          </div>

          <p className="hero-region-tag">
            <MapPin size={15} className="text-secondary" /> {schoolInfo.region}
          </p>

          {/* 4 Quick Access Portal Cards */}
          <div className="hero-portals-grid mt-4">
            <div className="portal-glass-card" onClick={() => setView('campus')}>
              <div className="portal-icon-box bg-purple">
                <Layers size={24} />
              </div>
              <div className="portal-text">
                <h4>แผนผังโรงเรียน 2.5D</h4>
                <p>สำรวจ 14 อาคารและสนามกีฬาเสมือนจริง</p>
              </div>
              <ChevronRight size={18} className="portal-arrow" />
            </div>

            <div className="portal-glass-card" onClick={() => setView('news')}>
              <div className="portal-icon-box bg-gold">
                <BookOpen size={24} />
              </div>
              <div className="portal-text">
                <h4>ข่าวประกาศ & กิจกรรม</h4>
                <p>อัปเดตข่าวสารสำคัญและกิจกรรมนักเรียน</p>
              </div>
              <ChevronRight size={18} className="portal-arrow" />
            </div>

            <div className="portal-glass-card" onClick={() => setView('staff')}>
              <div className="portal-icon-box bg-blue">
                <Users size={24} />
              </div>
              <div className="portal-text">
                <h4>ทำเนียบบุคลากร</h4>
                <p>คณะผู้บริหารและข้าราชการครูผู้สอน</p>
              </div>
              <ChevronRight size={18} className="portal-arrow" />
            </div>

            <div className="portal-glass-card" onClick={() => setView('contact')}>
              <div className="portal-icon-box bg-emerald">
                <PhoneCall size={24} />
              </div>
              <div className="portal-text">
                <h4>ติดต่อ & สมัครเรียน</h4>
                <p>ข้อมูลติดต่อ สอบถาม และที่ตั้งโรงเรียน</p>
              </div>
              <ChevronRight size={18} className="portal-arrow" />
            </div>
          </div>
        </div>
      </section>


      {/* 2. STATS RIBBON (ข้อมูลสถิติพื้นฐาน) */}
      <section className="stats-ribbon-section">
        <div className="container">
          <div className="stats-ribbon-card glass-panel">
            <div className="stat-item">
              <div className="stat-icon-circle bg-primary-soft">
                <Users size={28} className="text-primary" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{schoolInfo.stats ? schoolInfo.stats.students : 65}<span className="stat-plus">+</span></h3>
                <p className="stat-label">จำนวนนักเรียนคุณภาพ</p>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <div className="stat-icon-circle bg-gold-soft">
                <GraduationCap size={28} className="text-secondary" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{schoolInfo.stats ? schoolInfo.stats.teachers : 5}</h3>
                <p className="stat-label">ข้าราชการครูและบุคลากร</p>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <div className="stat-icon-circle bg-emerald-soft">
                <BookOpen size={28} className="text-success" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">8</h3>
                <p className="stat-label">ระดับชั้นเรียน (อ.2 - ป.6)</p>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <div className="stat-icon-circle bg-purple-soft">
                <Award size={28} className="text-purple" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">100<span className="stat-plus">%</span></h3>
                <p className="stat-label">Smart Classroom ทุกชั้น</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. DIRECTOR'S PRESIDENTIAL GREETING */}
      <section className="section-padding greeting-section">
        <div className="container">
          <div className="director-executive-wrapper glass-panel">
            <div className="grid-2 align-items-center">
              
              {/* Left Column: Formal Executive Frame */}
              <div className="director-visual">
                <div className="director-portrait-box">
                  <div className="gold-frame-accent"></div>
                  <div className="portrait-inner">
                    {directorInfo && directorInfo.imageUrl ? (
                      <img 
                        src={directorInfo.imageUrl} 
                        alt={schoolInfo.directorName} 
                        className="director-img" 
                      />
                    ) : (
                      <svg viewBox="0 0 100 100" className="director-svg-executive">
                        <rect x="0" y="0" width="100" height="100" fill="#f8fafc" />
                        <circle cx="50" cy="38" r="18" fill="var(--color-primary)" opacity="0.9" />
                        <path d="M 50 15 L 50 10 L 45 10 M 50 10 L 55 10" fill="none" stroke="var(--color-secondary)" strokeWidth="2" />
                        <path d="M 20 84 C 20 58, 30 54, 50 54 C 70 54, 80 58, 80 84 Z" fill="var(--color-primary)" />
                        <path d="M 24 62 Q 30 60 36 64 M 76 62 Q 70 60 64 64" fill="none" stroke="var(--color-secondary)" strokeWidth="3" />
                        <rect x="47" y="54" width="6" height="14" fill="var(--color-secondary)" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="director-official-badge">
                  <h4 className="dir-name">{schoolInfo.directorName}</h4>
                  <p className="dir-position">{schoolInfo.directorPosition}</p>
                </div>
              </div>

              {/* Right Column: Presidential Message */}
              <div className="greeting-content-side">
                <div className="section-tag-gold mb-2 d-inline-block">WELCOME MESSAGE</div>
                <h3 className="section-title text-left mb-3">สารจากผู้อำนวยการโรงเรียน</h3>
                <div className="title-gold-bar mb-4"></div>

                <blockquote className="director-quote-text">
                  “{schoolInfo.directorMsg}”
                </blockquote>

                <div className="director-formal-sign mt-4">
                  <div className="sign-line"></div>
                  <p className="sign-author">({schoolInfo.directorName})</p>
                  <p className="sign-rank">{schoolInfo.directorPosition}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* 4. INTERACTIVE 2.5D CAMPUS MAP SHOWCASE CALLOUT */}
      <section className="section-padding campus-callout-section">
        <div className="container">
          <div className="campus-feature-card glass-panel-dark">
            <div className="feature-card-content">
              <div className="badge-tag-purple mb-2">CAMPUS MASTER PLAN 2.5D</div>
              <h3 className="feature-title">
                สำรวจแผนผังและบรรยากาศโรงเรียนเสมือนจริง
              </h3>
              <p className="feature-desc">
                ระบบแผนผังจำลองเชิงสถาปัตยกรรม 2.5D จัดวางตามตำแหน่งจริง 14 โซน ทั้งอาคาร 1, อาคาร 2, อนุบาล, สนามฟุตบอลมาตรฐาน, สนามเด็กเล่น BBL และกลุ่มบ้านพักครู พร้อมสลับโหมดกลางวัน-กลางคืนได้
              </p>
              <div className="feature-badges-row mb-4">
                <span className="f-badge"><CheckCircle2 size={14} className="text-secondary" /> จำลอง 14 โซนอาคารจริง</span>
                <span className="f-badge"><CheckCircle2 size={14} className="text-secondary" /> โหมดกลางวัน / ราตรี (Day & Night)</span>
                <span className="f-badge"><CheckCircle2 size={14} className="text-secondary" /> รายละเอียดห้องเรียน & สนามกีฬา</span>
              </div>
              <button className="btn btn-secondary btn-lg" onClick={() => setView('campus')}>
                <Layers size={18} /> เข้าสู่แผนผังโรงเรียน 2.5D <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* 5. COMMITMENTS & IDENTITY (วิสัยทัศน์ พันธกิจ อัตลักษณ์) */}
      <section className="section-padding vision-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag-gold d-inline-block mb-2">OUR COMMITMENTS</span>
            <h3 className="section-title">วิสัยทัศน์และพันธกิจ</h3>
            <p className="section-subtitle">ความมุ่งมั่นในการขับเคลื่อนการศึกษาที่มีคุณภาพ เพื่อลูกหลานชาววังหามแห</p>
          </div>

          <div className="grid-3 bento-commitments">
            <div className="bento-card card-hover-lift">
              <div className="bento-icon bg-primary">
                <Compass size={24} className="text-white" />
              </div>
              <h4 className="bento-title">วิสัยทัศน์ (Vision)</h4>
              <p className="bento-desc">
                {schoolInfo.vision || 'มุ่งพัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐานการศึกษา สร้างเสริมคุณธรรมนำความรู้ ควบคู่เทคโนโลยี ร่วมใจสืบสานวัฒนธรรมไทย ใส่ใจสิ่งแวดล้อม น้อมนำปรัชญาของเศรษฐกิจพอเพียง'}
              </p>
            </div>

            <div className="bento-card card-hover-lift">
              <div className="bento-icon bg-gold">
                <Award size={24} className="text-white" />
              </div>
              <h4 className="bento-title">พันธกิจ (Mission)</h4>
              <p className="bento-desc">
                {schoolInfo.mission || 'จัดการศึกษาตั้งแต่ระดับปฐมวัยถึงประถมศึกษาอย่างทั่วถึง พัฒนาระบบการเรียนรู้ เน้นผู้เรียนเป็นสำคัญ ส่งเสริมบุคลากรให้มีคุณภาพ และบริหารจัดการโดยชุมชนมีส่วนร่วม'}
              </p>
            </div>

            <div className="bento-card card-hover-lift">
              <div className="bento-icon bg-emerald">
                <Users size={24} className="text-white" />
              </div>
              <h4 className="bento-title">อัตลักษณ์ (Identity)</h4>
              <p className="bento-desc">
                {schoolInfo.identity || 'ยิ้มง่าย ไหว้สวย รวยน้ำใจ มีวินัยใฝ่การศึกษา ซึ่งเป็นจุดเน้นการหล่อหลอมพฤติกรรมพื้นฐานของเยาวชนและนักเรียนโรงเรียนบ้านวังหัวแหวนพัฒนาทุกคน'}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 6. LATEST NEWS HIGHLIGHTS */}
      <section className="section-padding news-highlights bg-white">
        <div className="container">
          <div className="flex-between-title mb-4">
            <div>
              <span className="section-tag-gold d-inline-block mb-2">NEWS & ANNOUNCEMENTS</span>
              <h3 className="section-title text-left mb-1">ข่าวประชาสัมพันธ์ล่าสุด</h3>
              <p className="text-muted">ติดตามข่าวสาร กิจกรรม และประกาศสำคัญของโรงเรียนบ้านวังหัวแหวนพัฒนา</p>
            </div>
            <button className="btn btn-outline" onClick={() => setView('news')}>
              ดูข่าวสารทั้งหมด <ChevronRight size={16} />
            </button>
          </div>

          {latestNews.length > 0 ? (
            <div className="grid-3 news-grid">
              {latestNews.map((item) => (
                <NewsCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => handleNewsClick(item)} 
                />
              ))}
            </div>
          ) : (
            <div className="empty-state text-center py-5">
              <p className="text-muted">ขณะนี้ยังไม่มีข้อมูลข่าวประชาสัมพันธ์ประกาศในระบบ</p>
            </div>
          )}
        </div>
      </section>


      {/* Scoped Styling for Luxury Home Page */}
      <style>{`
        /* Hero Banner */
        .hero-banner {
          position: relative;
          background: linear-gradient(135deg, #061527 0%, #0b2545 60%, #0a1f38 100%);
          color: white;
          padding: 90px 0 100px;
          text-align: center;
          overflow: hidden;
        }

        .hero-ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          opacity: 0.25;
        }

        .glow-1 {
          top: -100px;
          left: -100px;
          background: #e5b326;
        }

        .glow-2 {
          bottom: -150px;
          right: -100px;
          background: #3b82f6;
        }

        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(229, 179, 38, 0.15) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 960px;
          margin: 0 auto;
        }

        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(229, 179, 38, 0.4);
          color: #fde047;
          padding: 6px 18px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-family: var(--font-heading);
          font-weight: 600;
          margin-bottom: 20px;
          backdrop-filter: blur(8px);
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 900;
          color: white;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
          text-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 2.5px;
          font-family: var(--font-heading);
          font-weight: 600;
          margin-bottom: 24px;
        }

        .hero-slogan-card {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: var(--radius-full);
          margin-bottom: 20px;
        }

        .hero-slogan-text {
          font-size: 1.25rem;
          font-family: var(--font-heading);
          color: #fde047;
          font-weight: 600;
          font-style: italic;
          margin: 0;
        }

        .quote-mark {
          font-size: 1.6rem;
          color: var(--color-secondary);
          opacity: 0.7;
          line-height: 1;
        }

        .hero-region-tag {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.75);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* 4 Quick Access Portal Cards */
        .hero-portals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 36px;
        }

        @media (max-width: 992px) {
          .hero-portals-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-title { font-size: 2.4rem; }
        }

        @media (max-width: 576px) {
          .hero-portals-grid {
            grid-template-columns: 1fr;
          }
          .hero-title { font-size: 1.8rem; }
        }

        .portal-glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-lg);
          padding: 18px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-align: left;
        }

        .portal-glass-card:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--color-secondary);
          transform: translateY(-5px);
          box-shadow: 0 16px 28px -10px rgba(0, 0, 0, 0.5);
        }

        .portal-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        .bg-purple { background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); }
        .bg-gold { background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); }
        .bg-blue { background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%); }
        .bg-emerald { background: linear-gradient(135deg, #34d399 0%, #059669 100%); }

        .portal-text h4 {
          font-size: 0.95rem;
          color: white;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .portal-text p {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.3;
        }

        .portal-arrow {
          margin-left: auto;
          color: rgba(255, 255, 255, 0.4);
          transition: transform 0.2s ease;
        }

        .portal-glass-card:hover .portal-arrow {
          transform: translateX(4px);
          color: var(--color-secondary);
        }

        /* Stats Ribbon */
        .stats-ribbon-section {
          margin-top: -36px;
          position: relative;
          z-index: 10;
        }

        .stats-ribbon-card {
          padding: 24px 32px;
          border-radius: var(--radius-lg);
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 20px;
          box-shadow: 0 16px 36px -10px rgba(11, 37, 69, 0.15);
        }

        @media (max-width: 768px) {
          .stats-ribbon-card {
            flex-direction: column;
            gap: 24px;
          }
          .stat-divider { display: none; }
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon-circle {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-primary-soft { background: rgba(11, 37, 69, 0.08); }
        .bg-gold-soft { background: rgba(229, 179, 38, 0.12); }
        .bg-emerald-soft { background: rgba(16, 185, 129, 0.12); }
        .bg-purple-soft { background: rgba(168, 85, 247, 0.12); }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1.1;
          margin-bottom: 2px;
          font-family: var(--font-heading);
        }

        .stat-plus {
          color: var(--color-secondary);
          font-size: 1.5rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .stat-divider {
          width: 1px;
          height: 48px;
          background: var(--color-border);
        }

        /* Director Executive Card */
        .director-executive-wrapper {
          padding: 40px;
          border-radius: var(--radius-lg);
          border-top: 6px solid var(--color-secondary);
        }

        .director-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .director-portrait-box {
          position: relative;
          width: 240px;
          height: 300px;
          background: white;
          border-radius: var(--radius-md);
          padding: 10px;
          box-shadow: var(--shadow-lg);
        }

        .gold-frame-accent {
          position: absolute;
          inset: 6px;
          border: 2px solid var(--color-secondary);
          border-radius: 4px;
          pointer-events: none;
        }

        .portrait-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .director-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .director-svg-executive {
          width: 100%;
          height: 100%;
        }

        .director-official-badge {
          margin-top: 14px;
          text-align: center;
        }

        .dir-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 2px;
        }

        .dir-position {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .title-gold-bar {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, var(--color-secondary) 0%, transparent 100%);
          border-radius: 2px;
        }

        .director-quote-text {
          font-size: 1.08rem;
          line-height: 1.85;
          color: var(--color-text-main);
          font-style: italic;
          border-left: 3px solid var(--color-secondary);
          padding-left: 20px;
          margin-bottom: 24px;
        }

        .director-formal-sign {
          text-align: right;
          padding-right: 20px;
        }

        .sign-line {
          width: 140px;
          height: 1px;
          background: #cbd5e1;
          margin-left: auto;
          margin-bottom: 8px;
        }

        .sign-author {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .sign-rank {
          font-size: 0.84rem;
          color: var(--color-text-muted);
        }

        /* Campus Callout Banner */
        .campus-callout-section {
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }

        .campus-feature-card {
          padding: 48px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, #0b2545 0%, #173f6f 100%);
          box-shadow: 0 20px 35px -10px rgba(11, 37, 69, 0.3);
        }

        .badge-tag-purple {
          display: inline-block;
          background: rgba(168, 85, 247, 0.2);
          color: #c084fc;
          border: 1px solid rgba(168, 85, 247, 0.4);
          padding: 4px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          font-family: var(--font-heading);
          letter-spacing: 0.8px;
        }

        .feature-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: white;
          margin-bottom: 14px;
        }

        .feature-desc {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 720px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .feature-badges-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .f-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: white;
          font-size: 0.88rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.08);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Bento Commitments */
        .bento-commitments {
          margin-top: 32px;
        }

        .bento-card {
          background: white;
          padding: 36px 28px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }

        .bento-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .bento-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 12px;
        }

        .bento-desc {
          font-size: 0.95rem;
          color: var(--color-text-main);
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}
