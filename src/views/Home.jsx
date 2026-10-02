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
  ArrowRight,
  ShieldCheck
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
      
      {/* 1. CLEAN OFFICIAL OBEC PORTAL HERO BANNER */}
      <section className="obec-hero-section">
        <div className="container">
          
          <div className="obec-welcome-card">
            {/* Top gold accent line */}
            <div className="obec-gold-accent-bar"></div>

            <div className="obec-welcome-content">
              {/* Official Seal / Badge tag */}
              <div className="obec-hero-badge">
                <span className="badge-seal-dot"></span>
                <span>สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) • กระทรวงศึกษาธิการ</span>
              </div>

              {/* School Main Names */}
              <h1 className="obec-hero-title">
                {schoolInfo.name}
              </h1>
              <p className="obec-hero-org">
                {schoolInfo.region || 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษากำแพงเพชร เขต 2'}
              </p>
              <p className="obec-hero-sub">
                {schoolInfo.nameEn || 'BAN WANG HUA WAEN PHATTHANA SCHOOL'}
              </p>
              
              {/* Formal Slogan Card */}
              <div className="obec-slogan-card">
                <span className="slogan-badge-label">ปรัชญา / คำขวัญประจำโรงเรียน</span>
                <p className="obec-slogan-text">“{schoolInfo.slogan}”</p>
              </div>

              <div className="obec-location-tag">
                <MapPin size={16} className="text-primary" />
                <span>{schoolInfo.address || 'ตำบลพานทอง อำเภอไทรงาม จังหวัดกำแพงเพชร'}</span>
              </div>
            </div>

            {/* 4 Quick Access Portal Cards (Clean, Easy to read, Dignified) */}
            <div className="obec-portals-grid">
              
              <div className="obec-portal-card card-hover-lift" onClick={() => setView('campus')}>
                <div className="portal-icon-circle icon-bg-blue">
                  <Layers size={24} />
                </div>
                <div className="portal-info-box">
                  <h4 className="portal-heading">แผนผังโรงเรียน</h4>
                  <p className="portal-subheading">สำรวจ 14 อาคารและสิ่งอำนวยความสะดวก</p>
                </div>
                <ChevronRight size={18} className="portal-chevron" />
              </div>

              <div className="obec-portal-card card-hover-lift" onClick={() => setView('news')}>
                <div className="portal-icon-circle icon-bg-gold">
                  <BookOpen size={24} />
                </div>
                <div className="portal-info-box">
                  <h4 className="portal-heading">ข่าวสาร & กิจกรรม</h4>
                  <p className="portal-subheading">ประกาศสำคัญ ข่าวสาร และกิจกรรมนักเรียน</p>
                </div>
                <ChevronRight size={18} className="portal-chevron" />
              </div>

              <div className="obec-portal-card card-hover-lift" onClick={() => setView('staff')}>
                <div className="portal-icon-circle icon-bg-green">
                  <Users size={24} />
                </div>
                <div className="portal-info-box">
                  <h4 className="portal-heading">ทำเนียบบุคลากร</h4>
                  <p className="portal-subheading">คณะผู้บริหารและข้าราชการครูผู้สอน</p>
                </div>
                <ChevronRight size={18} className="portal-chevron" />
              </div>

              <div className="obec-portal-card card-hover-lift" onClick={() => setView('contact')}>
                <div className="portal-icon-circle icon-bg-teal">
                  <PhoneCall size={24} />
                </div>
                <div className="portal-info-box">
                  <h4 className="portal-heading">ติดต่อ & สมัครเรียน</h4>
                  <p className="portal-subheading">ข้อมูลติดต่อ สอบถาม และที่ตั้งโรงเรียน</p>
                </div>
                <ChevronRight size={18} className="portal-chevron" />
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* 2. STATS RIBBON (ข้อมูลสถิติพื้นฐาน) */}
      <section className="stats-ribbon-section">
        <div className="container">
          <div className="stats-ribbon-card">
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
          </div>
        </div>
      </section>


      {/* 3. DIRECTOR'S PRESIDENTIAL GREETING (สารจากผู้อำนวยการ) */}
      <section className="section-padding greeting-section">
        <div className="container">
          <div className="director-executive-wrapper">
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
                <h3 className="section-title text-left mb-2">สารจากผู้อำนวยการโรงเรียน</h3>
                <div className="title-gold-bar mb-3"></div>

                <blockquote className="director-quote-text">
                  “{schoolInfo.directorMsg}”
                </blockquote>

                <div className="director-formal-sign mt-4">
                  <div className="sign-line"></div>
                  <p className="sign-author">({schoolInfo.directorName})</p>
                  <p className="sign-rank">{schoolInfo.directorPosition}</p>
                  <p className="sign-org">โรงเรียนบ้านวังหัวแหวนพัฒนา</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* 4. COMMITMENTS & IDENTITY (วิสัยทัศน์ พันธกิจ อัตลักษณ์) */}
      <section className="section-padding vision-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag-gold d-inline-block mb-2">OUR COMMITMENTS</span>
            <h3 className="section-title">วิสัยทัศน์และพันธกิจ</h3>
            <div className="school-divider">
              <span className="school-divider-dot"></span>
            </div>
            <p className="section-subtitle">ความมุ่งมั่นในการขับเคลื่อนการศึกษาที่มีคุณภาพ เพื่อลูกหลานชาวบ้านวังหัวแหวนพัฒนา</p>
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


      {/* 5. LATEST NEWS HIGHLIGHTS */}
      <section className="section-padding news-highlights">
        <div className="container">
          <div className="flex-between-title mb-4">
            <div>
              <span className="section-tag-gold d-inline-block mb-1">NEWS & ANNOUNCEMENTS</span>
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


      {/* Scoped CSS for Clean OBEC Layout */}
      <style>{`
        /* Hero Section (Clean OBEC Style) */
        .obec-hero-section {
          background-color: #f8fafc;
          padding: 36px 0 44px;
          border-bottom: 1px solid #e2e8f0;
        }

        .obec-welcome-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          position: relative;
        }

        .obec-gold-accent-bar {
          height: 6px;
          background: linear-gradient(90deg, #063b27 0%, #eab308 50%, #0b2545 100%);
        }

        .obec-welcome-content {
          padding: 44px 36px 28px;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .obec-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 6px 18px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-family: var(--font-heading);
          font-weight: 600;
          margin-bottom: 18px;
        }

        .badge-seal-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #16a34a;
        }

        .obec-hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0b2545;
          margin-bottom: 8px;
          line-height: 1.25;
          letter-spacing: -0.3px;
        }

        .obec-hero-org {
          font-size: 1.12rem;
          font-weight: 600;
          color: #063b27;
          margin-bottom: 4px;
        }

        .obec-hero-sub {
          font-size: 0.84rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.8px;
          margin-bottom: 24px;
        }

        .obec-slogan-card {
          background: #fffdf5;
          border: 1px solid #fde68a;
          border-left: 4px solid #eab308;
          padding: 14px 24px;
          border-radius: 8px;
          margin: 0 auto 20px;
          display: inline-block;
          text-align: center;
        }

        .slogan-badge-label {
          display: block;
          font-size: 0.76rem;
          font-weight: 700;
          color: #b45309;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .obec-slogan-text {
          font-size: 1.15rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          font-style: italic;
        }

        .obec-location-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
        }

        /* 4 Quick Access Portal Cards */
        .obec-portals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding: 12px 32px 36px;
        }

        .obec-portal-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 18px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          text-align: left;
        }

        .obec-portal-card:hover {
          border-color: #eab308;
          background: #fffefb;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px -5px rgba(234, 179, 8, 0.15);
        }

        .portal-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #ffffff;
        }

        .icon-bg-blue { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); }
        .icon-bg-gold { background: linear-gradient(135deg, #ca8a04 0%, #eab308 100%); }
        .icon-bg-green { background: linear-gradient(135deg, #166534 0%, #22c55e 100%); }
        .icon-bg-teal { background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); }

        .portal-info-box {
          flex: 1;
        }

        .portal-heading {
          font-size: 0.98rem;
          font-weight: 700;
          color: #0b2545;
          margin-bottom: 2px;
        }

        .portal-subheading {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
          line-height: 1.35;
        }

        .portal-chevron {
          color: #cbd5e1;
          transition: transform 0.15s ease, color 0.15s ease;
        }

        .obec-portal-card:hover .portal-chevron {
          color: #eab308;
          transform: translateX(3px);
        }

        @media (max-width: 992px) {
          .obec-portals-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 12px 20px 28px;
          }
          .obec-hero-title { font-size: 2rem; }
          .obec-welcome-content { padding: 32px 20px 20px; }
        }

        @media (max-width: 576px) {
          .obec-portals-grid {
            grid-template-columns: 1fr;
            padding: 8px 16px 24px;
          }
          .obec-hero-title { font-size: 1.6rem; }
        }

        /* Stats Ribbon */
        .stats-ribbon-section {
          margin-top: -24px;
          position: relative;
          z-index: 10;
        }

        .stats-ribbon-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 24px 36px;
          border-radius: 12px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 20px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 768px) {
          .stats-ribbon-card {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }
          .stat-divider { display: none; }
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-primary-soft { background: rgba(11, 37, 69, 0.08); }
        .bg-gold-soft { background: rgba(234, 179, 8, 0.15); }
        .bg-emerald-soft { background: rgba(16, 185, 129, 0.12); }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #0b2545;
          line-height: 1.1;
          margin-bottom: 2px;
          font-family: var(--font-heading);
        }

        .stat-plus {
          color: #eab308;
          font-size: 1.5rem;
        }

        .stat-label {
          font-size: 0.88rem;
          color: #64748b;
          font-weight: 600;
        }

        .stat-divider {
          width: 1px;
          height: 48px;
          background: #e2e8f0;
        }

        /* Director Executive Card (Clean Official Style) */
        .director-executive-wrapper {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-top: 5px solid #eab308;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
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
          border-radius: 8px;
          padding: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .gold-frame-accent {
          position: absolute;
          inset: 4px;
          border: 2px solid #eab308;
          border-radius: 6px;
          pointer-events: none;
        }

        .portrait-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 4px;
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
          color: #0b2545;
          margin-bottom: 2px;
        }

        .dir-position {
          font-size: 0.88rem;
          color: #64748b;
          font-weight: 500;
        }

        .section-tag-gold {
          font-size: 0.78rem;
          font-weight: 700;
          color: #ca8a04;
          letter-spacing: 0.8px;
          font-family: var(--font-heading);
        }

        .title-gold-bar {
          width: 50px;
          height: 4px;
          background: #eab308;
          border-radius: 2px;
        }

        .director-quote-text {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #1e293b;
          font-style: italic;
          border-left: 3px solid #eab308;
          padding-left: 18px;
          margin-bottom: 20px;
        }

        .director-formal-sign {
          text-align: right;
          padding-right: 16px;
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
          color: #0b2545;
        }

        .sign-rank {
          font-size: 0.85rem;
          color: #64748b;
        }

        .sign-org {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* Bento Commitments */
        .bento-commitments {
          margin-top: 24px;
        }

        .bento-card {
          background: white;
          padding: 32px 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }

        .bento-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
        }

        .bento-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .bento-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0b2545;
          margin-bottom: 10px;
        }

        .bento-desc {
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.7;
        }

        /* News Highlights */
        .news-highlights {
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
        }

        .flex-between-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .flex-between-title {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
