import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import NewsCard from '../components/NewsCard';
import { 
  BookOpen, 
  Users, 
  Compass, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function Home({ schoolInfo, setView, setCurrentNewsItem, lang = 'th' }) {
  const [latestNews, setLatestNews] = useState([]);
  const [directorInfo, setDirectorInfo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isEn = lang === 'en';

  // Base URL helper for images
  const resolveImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) return img;
    const clean = img.replace(/^\/+/, '');
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    return `${base}${clean}`;
  };

  // 3 Featured Slides with real, authentic school photos
  const heroSlides = [
    {
      id: 1,
      image: resolveImageUrl('news/fb_lunch_donation.jpg'),
      tagTh: "สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน • กระทรวงศึกษาธิการ",
      tagEn: "OFFICE OF THE BASIC EDUCATION COMMISSION • MINISTRY OF EDUCATION",
      titleTh: "โรงเรียนบ้านวังหัวแหวนพัฒนา",
      titleEn: "Ban Wang Hua Waen Phatthana School",
      subtitleTh: "สำนักงานเขตพื้นที่การศึกษาประถมศึกษากำแพงเพชร เขต 2 • กระทรวงศึกษาธิการ",
      subtitleEn: "Kamphaeng Phet Primary Educational Service Area Office 2 • Ministry of Education",
      descTh: "“ปัญญา นรานัง รัตนัง : ปัญญาเป็นดวงแก้วของนรชน” มุ่งมั่นพัฒนาการศึกษา สร้างเสริมคุณธรรม สู่ความเป็นเลิศ",
      descEn: "“Good Education, Disciplined, Eager to Learn, High Morals” Empowering students through quality education.",
      primaryBtnTh: "แผนผังบริเวณสถานศึกษา",
      primaryBtnEn: "Explore Campus",
      primaryAction: () => setView('campus'),
      secondaryBtnTh: "ข่าวประชาสัมพันธ์",
      secondaryBtnEn: "Latest News",
      secondaryAction: () => setView('news')
    },
    {
      id: 2,
      image: resolveImageUrl('news/school_award_honor.jpg'),
      tagTh: "รางวัลเชิดชูเกียรติ สพฐ. • ความภาคภูมิใจของสถานศึกษา",
      tagEn: "OBEC EXCELLENCE AWARD • ACADEMIC PRESTIGE",
      titleTh: "สถานศึกษาต้นแบบการนิเทศภายใน (ISMS Award) ระดับยอดเยี่ยม",
      titleEn: "Internal Supervision Model School (ISMS) Excellence Award",
      subtitleTh: "รางวัลระดับยอดเยี่ยม สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) ประจำปีการศึกษา 2568",
      subtitleEn: "Excellence Recognition from the Office of the Basic Education Commission",
      descTh: "“มุ่งมั่นพัฒนาการศึกษา สร้างเสริมคุณธรรม สู่ความเป็นเลิศ” ยกระดับคุณภาพการเรียนรู้และการบริหารจัดการอย่างยั่งยืน",
      descEn: "“Committed to Educational Quality and Excellence” Elevating instructional supervision and student learning.",
      primaryBtnTh: "รายละเอียดเกียรติประวัติ",
      primaryBtnEn: "Read Award Details",
      primaryAction: () => setView('news'),
      secondaryBtnTh: "ทำเนียบข้าราชการครูและบุคลากร",
      secondaryBtnEn: "Staff Directory",
      secondaryAction: () => setView('staff')
    },
    {
      id: 3,
      image: resolveImageUrl('news/school_teachers_group.jpg'),
      tagTh: "ข้าราชการครูและบุคลากร • มุ่งมั่นพัฒนาคุณภาพผู้เรียน",
      tagEn: "FACULTY & STAFF • DEDICATED EDUCATORS",
      titleTh: "คณะครูและบุคลากรทางการศึกษา โรงเรียนบ้านวังหัวแหวนพัฒนา",
      titleEn: "Faculty & Staff of Ban Wang Hua Waen Phatthana School",
      subtitleTh: "ร่วมเสริมสร้างศักยภาพผู้เรียน ปลูกฝังคุณธรรมและวินัย สู่ความเป็นเลิศทางวิชาการ",
      subtitleEn: "Empowering young minds with care, discipline, and modern 21st-century knowledge.",
      descTh: "มุ่งเน้นการจัดการเรียนรู้เชิงรุก (Active Learning) ปลูกฝังระเบียบวินัย และพัฒนาทักษะชีวิตรอบด้านของนักเรียนทุกคน",
      descEn: "Focusing on active learning strategies, moral character, and essential life skills for every student.",
      primaryBtnTh: "ทำเนียบบุคลากรทางการศึกษา",
      primaryBtnEn: "Meet Our Teachers",
      primaryAction: () => setView('staff'),
      secondaryBtnTh: "ข้อมูลการติดต่อราชการ",
      secondaryBtnEn: "Contact School",
      secondaryAction: () => setView('contact')
    }
  ];

  // Auto advance slides every 5.5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="home-view animate-fade-in">
      
      {/* 1. MAJESTIC OBEC HERO SHOWCASE BANNER & SLIDER (ดึงรูปจริงมาแสดงอย่างสวยงามที่สุด) */}
      <section 
        className="obec-hero-slider-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container">
          
          <div className="obec-slider-frame">
            {/* Traditional Thai Golden Corner Accents */}
            <div className="gold-corner corner-top-left"></div>
            <div className="gold-corner corner-top-right"></div>
            <div className="gold-corner corner-bottom-left"></div>
            <div className="gold-corner corner-bottom-right"></div>

            {/* Slide Background Images with Crossfade */}
            {heroSlides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`slider-bg-layer ${index === currentSlide ? 'active-layer' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slider-gradient-overlay"></div>
              </div>
            ))}

            {/* Slide Foreground Content */}
            <div className="slider-content-wrap">
              <div className="slider-badge-pill">
                <span className="badge-glow-dot"></span>
                <span>{isEn ? currentHero.tagEn : currentHero.tagTh}</span>
              </div>

              <h2 className="slider-title">
                {isEn ? currentHero.titleEn : currentHero.titleTh}
              </h2>

              <p className="slider-subtitle">
                {isEn ? currentHero.subtitleEn : currentHero.subtitleTh}
              </p>

              <div className="slider-desc-box">
                <p className="slider-desc">
                  {isEn ? currentHero.descEn : currentHero.descTh}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="slider-btn-group">
                <button 
                  type="button" 
                  className="btn-slider-primary"
                  onClick={currentHero.primaryAction}
                >
                  {isEn ? currentHero.primaryBtnEn : currentHero.primaryBtnTh}
                  <ChevronRight size={18} />
                </button>
                <button 
                  type="button" 
                  className="btn-slider-secondary"
                  onClick={currentHero.secondaryAction}
                >
                  {isEn ? currentHero.secondaryBtnEn : currentHero.secondaryBtnTh}
                </button>
              </div>
            </div>

            {/* Prev / Next Navigation Arrows */}
            <button 
              type="button" 
              className="slider-arrow-btn arrow-prev" 
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              type="button" 
              className="slider-arrow-btn arrow-next" 
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicator Dots */}
            <div className="slider-indicators">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* 2. 4 QUICK ACCESS PORTAL CARDS (การ์ดทางลัด 4 ระบบ คลีน สว่าง สบายตา) */}
      <section className="obec-portals-section">
        <div className="container">
          <div className="obec-portals-grid">
            
            <div className="obec-portal-card card-hover-lift" onClick={() => setView('campus')}>
              <div className="portal-icon-circle icon-bg-blue">
                <Layers size={24} />
              </div>
              <div className="portal-info-box">
                <h4 className="portal-heading">{isEn ? 'Campus Map' : 'แผนผังบริเวณสถานศึกษา'}</h4>
                <p className="portal-subheading">{isEn ? 'Explore buildings & facilities' : 'ข้อมูลอาคารสถานที่และแหล่งเรียนรู้'}</p>
              </div>
              <ChevronRight size={18} className="portal-chevron" />
            </div>

            <div className="obec-portal-card card-hover-lift" onClick={() => setView('news')}>
              <div className="portal-icon-circle icon-bg-gold">
                <BookOpen size={24} />
              </div>
              <div className="portal-info-box">
                <h4 className="portal-heading">{isEn ? 'News & Announcements' : 'ข่าวประชาสัมพันธ์'}</h4>
                <p className="portal-subheading">{isEn ? 'Official notices & activities' : 'ประกาศทางราชการและกิจกรรมสถานศึกษา'}</p>
              </div>
              <ChevronRight size={18} className="portal-chevron" />
            </div>

            <div className="obec-portal-card card-hover-lift" onClick={() => setView('staff')}>
              <div className="portal-icon-circle icon-bg-green">
                <Users size={24} />
              </div>
              <div className="portal-info-box">
                <h4 className="portal-heading">{isEn ? 'Staff Directory' : 'ทำเนียบบุคลากร'}</h4>
                <p className="portal-subheading">{isEn ? 'Administrators & faculty members' : 'ผู้บริหารสถานศึกษาและคณะครูอาจารย์'}</p>
              </div>
              <ChevronRight size={18} className="portal-chevron" />
            </div>

            <div className="obec-portal-card card-hover-lift" onClick={() => setView('contact')}>
              <div className="portal-icon-circle icon-bg-teal">
                <PhoneCall size={24} />
              </div>
              <div className="portal-info-box">
                <h4 className="portal-heading">{isEn ? 'Contact School' : 'ติดต่อราชการ'}</h4>
                <p className="portal-subheading">{isEn ? 'Location & official inquiries' : 'ข้อมูลที่ตั้งและการติดต่อราชการ'}</p>
              </div>
              <ChevronRight size={18} className="portal-chevron" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. STATS RIBBON (ข้อมูลสถิติพื้นฐาน) */}
      <section className="stats-ribbon-section">
        <div className="container">
          <div className="stats-ribbon-card">
            <div className="stat-item">
              <div className="stat-icon-circle bg-primary-soft">
                <Users size={28} className="text-primary" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{schoolInfo?.stats ? schoolInfo.stats.students : 65}<span className="stat-plus">+</span></h3>
                <p className="stat-label">{isEn ? 'Enrolled Students' : 'จำนวนนักเรียนทั้งหมด'}</p>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <div className="stat-icon-circle bg-gold-soft">
                <GraduationCap size={28} className="text-secondary" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{schoolInfo?.stats ? schoolInfo.stats.teachers : 5}</h3>
                <p className="stat-label">{isEn ? 'Teachers & Educational Personnel' : 'ข้าราชการครูและบุคลากรทางการศึกษา'}</p>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <div className="stat-icon-circle bg-emerald-soft">
                <BookOpen size={28} className="text-success" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">8</h3>
                <p className="stat-label">{isEn ? 'Grade Levels (K.2 - G.6)' : 'ระดับชั้นการศึกษาที่เปิดสอน (อนุบาล 2 - ประถมศึกษาปีที่ 6)'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. DIRECTOR'S PRESIDENTIAL GREETING (สารจากผู้อำนวยการสถานศึกษา) */}
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
                        src={resolveImageUrl(directorInfo.imageUrl)} 
                        alt={schoolInfo?.directorName} 
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
                  <h4 className="dir-name">{schoolInfo?.directorName}</h4>
                  <p className="dir-position">{isEn ? 'School Director' : schoolInfo?.directorPosition}</p>
                </div>
              </div>

              {/* Right Column: Presidential Message */}
              <div className="greeting-content-side">
                <div className="section-tag-gold mb-2 d-inline-block">
                  {isEn ? 'EXECUTIVE MESSAGE' : 'สารจากผู้บริหารสถานศึกษา'}
                </div>
                <h3 className="section-title text-left mb-2">
                  {isEn ? 'Message from the School Director' : 'สารจากผู้อำนวยการสถานศึกษา'}
                </h3>
                <div className="title-gold-bar mb-3"></div>

                <blockquote className="director-quote-text">
                  “{schoolInfo?.directorMsg}”
                </blockquote>

                <div className="director-formal-sign mt-4">
                  <div className="sign-line"></div>
                  <p className="sign-author">({schoolInfo?.directorName})</p>
                  <p className="sign-rank">{isEn ? 'Director of Ban Wang Hua Waen Phatthana School' : schoolInfo?.directorPosition}</p>
                  <p className="sign-org">{isEn ? 'Kamphaeng Phet Primary Educational Service Area Office 2' : 'โรงเรียนบ้านวังหัวแหวนพัฒนา'}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* 5. COMMITMENTS & IDENTITY (วิสัยทัศน์ พันธกิจ และเป้าประสงค์) */}
      <section className="section-padding vision-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag-gold d-inline-block mb-2">
              {isEn ? 'OUR COMMITMENTS' : 'วิสัยทัศน์ พันธกิจ และเป้าประสงค์'}
            </span>
            <h3 className="section-title">
              {isEn ? 'Vision, Mission & Goals' : 'วิสัยทัศน์ พันธกิจ และอัตลักษณ์สถานศึกษา'}
            </h3>
            <div className="school-divider">
              <span className="school-divider-dot"></span>
            </div>
            <p className="section-subtitle">
              {isEn 
                ? 'Dedicated to high-quality education and character building for every student.' 
                : 'ความมุ่งมั่นในการขับเคลื่อนคุณภาพการศึกษาและการบริหารจัดการสถานศึกษาอย่างมีประสิทธิภาพ'}
            </p>
          </div>

          <div className="grid-3 bento-commitments">
            <div className="bento-card card-hover-lift">
              <div className="bento-icon bg-primary">
                <Compass size={24} className="text-white" />
              </div>
              <h4 className="bento-title">{isEn ? 'Vision' : 'วิสัยทัศน์ (Vision)'}</h4>
              <p className="bento-desc">
                {schoolInfo?.vision || 'มุ่งพัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐานการศึกษา สร้างเสริมคุณธรรมนำความรู้ ควบคู่เทคโนโลยี ร่วมใจสืบสานวัฒนธรรมไทย ใส่ใจสิ่งแวดล้อม น้อมนำปรัชญาของเศรษฐกิจพอเพียง'}
              </p>
            </div>

            <div className="bento-card card-hover-lift">
              <div className="bento-icon bg-gold">
                <Award size={24} className="text-white" />
              </div>
              <h4 className="bento-title">{isEn ? 'Mission' : 'พันธกิจ (Mission)'}</h4>
              <p className="bento-desc">
                {schoolInfo?.mission || 'จัดการศึกษาตั้งแต่ระดับปฐมวัยถึงประถมศึกษาอย่างทั่วถึง พัฒนาระบบการเรียนรู้ เน้นผู้เรียนเป็นสำคัญ ส่งเสริมบุคลากรให้มีคุณภาพ และบริหารจัดการโดยชุมชนมีส่วนร่วม'}
              </p>
            </div>

            <div className="bento-card card-hover-lift">
              <div className="bento-icon bg-emerald">
                <Users size={24} className="text-white" />
              </div>
              <h4 className="bento-title">{isEn ? 'Identity' : 'อัตลักษณ์สถานศึกษา (Identity)'}</h4>
              <p className="bento-desc">
                {schoolInfo?.identity || 'ยิ้มง่าย ไหว้สวย รวยน้ำใจ มีวินัยใฝ่การศึกษา ซึ่งเป็นจุดเน้นการหล่อหลอมพฤติกรรมพื้นฐานของเยาวชนและนักเรียนโรงเรียนบ้านวังหัวแหวนพัฒนาทุกคน'}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 6. LATEST NEWS HIGHLIGHTS (ข่าวประชาสัมพันธ์และประกาศทางราชการ) */}
      <section className="section-padding news-highlights">
        <div className="container">
          <div className="flex-between-title mb-4">
            <div>
              <span className="section-tag-gold d-inline-block mb-1">
                {isEn ? 'NEWS & ANNOUNCEMENTS' : 'ข่าวประชาสัมพันธ์'}
              </span>
              <h3 className="section-title text-left mb-1">
                {isEn ? 'Latest Announcements' : 'ข่าวประชาสัมพันธ์และกิจกรรมล่าสุด'}
              </h3>
              <p className="text-muted">
                {isEn 
                  ? 'Keep up to date with events, achievements, and notifications.' 
                  : 'ติดตามข้อมูลข่าวสาร กิจกรรมการเรียนรู้ และประกาศทางราชการของสถานศึกษา'}
              </p>
            </div>
            <button className="btn btn-outline" onClick={() => setView('news')}>
              {isEn ? 'View All News' : 'ดูข่าวประชาสัมพันธ์ทั้งหมด'} <ChevronRight size={16} />
            </button>
          </div>

          {latestNews.length > 0 ? (
            <div className="grid-3 news-grid">
              {latestNews.map((item) => (
                <NewsCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => handleNewsClick(item)}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state text-center py-5">
              <p className="text-muted">{isEn ? 'No news available at the moment.' : 'ขณะนี้ยังไม่มีข้อมูลข่าวประชาสัมพันธ์ในระบบ'}</p>
            </div>
          )}
        </div>
      </section>


      {/* Scoped CSS for Clean OBEC Layout with Dynamic Image Slider */}
      <style>{`
        /* Hero Slider Section */
        .obec-hero-slider-section {
          background-color: #f1f5f9;
          padding: 24px 0 16px;
        }

        .obec-slider-frame {
          position: relative;
          height: 480px;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid #eab308; /* Signature Gold Frame */
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          background-color: #061527;
        }

        /* Traditional Thai Golden Corners */
        .gold-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          z-index: 10;
          pointer-events: none;
        }

        .corner-top-left {
          top: 8px;
          left: 8px;
          border-top: 3px solid #fde047;
          border-left: 3px solid #fde047;
        }

        .corner-top-right {
          top: 8px;
          right: 8px;
          border-top: 3px solid #fde047;
          border-right: 3px solid #fde047;
        }

        .corner-bottom-left {
          bottom: 8px;
          left: 8px;
          border-bottom: 3px solid #fde047;
          border-left: 3px solid #fde047;
        }

        .corner-bottom-right {
          bottom: 8px;
          right: 8px;
          border-bottom: 3px solid #fde047;
          border-right: 3px solid #fde047;
        }

        /* Slider Background Layer with Crossfade */
        .slider-bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.8s ease-in-out, transform 6s ease-out;
          transform: scale(1.02);
          z-index: 1;
        }

        .slider-bg-layer.active-layer {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        .slider-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg, 
            rgba(6, 21, 39, 0.92) 0%, 
            rgba(6, 21, 39, 0.78) 45%, 
            rgba(6, 21, 39, 0.4) 100%
          );
        }

        /* Slider Foreground Content */
        .slider-content-wrap {
          position: relative;
          z-index: 5;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 60px;
          max-width: 780px;
          color: #ffffff;
        }

        .slider-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(234, 179, 8, 0.2);
          border: 1px solid rgba(253, 224, 71, 0.6);
          color: #fde047;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
          align-self: flex-start;
          backdrop-filter: blur(4px);
        }

        .badge-glow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #fde047;
          box-shadow: 0 0 8px #fde047;
        }

        .slider-title {
          font-size: 2.35rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin-bottom: 8px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
          letter-spacing: -0.3px;
        }

        .slider-subtitle {
          font-size: 1.05rem;
          color: #e2e8f0;
          font-weight: 600;
          margin-bottom: 14px;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
        }

        .slider-desc-box {
          background: rgba(0, 0, 0, 0.35);
          border-left: 3px solid #eab308;
          padding: 10px 16px;
          border-radius: 0 6px 6px 0;
          margin-bottom: 24px;
          backdrop-filter: blur(6px);
        }

        .slider-desc {
          font-size: 0.96rem;
          color: #f8fafc;
          line-height: 1.6;
          margin: 0;
          font-style: italic;
        }

        .slider-btn-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-slider-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eab308;
          color: #000000;
          padding: 11px 22px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(234, 179, 8, 0.4);
        }

        .btn-slider-primary:hover {
          background: #facc15;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(234, 179, 8, 0.6);
        }

        .btn-slider-secondary {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }

        .btn-slider-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Prev / Next Buttons */
        .slider-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slider-arrow-btn:hover {
          background: #eab308;
          color: #000000;
          border-color: #eab308;
        }

        .arrow-prev { left: 16px; }
        .arrow-next { right: 16px; }

        /* Indicators */
        .slider-indicators {
          position: absolute;
          bottom: 18px;
          right: 24px;
          z-index: 10;
          display: flex;
          gap: 8px;
        }

        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .indicator-dot.active {
          width: 32px;
          border-radius: 9999px;
          background: #eab308;
          border-color: #eab308;
        }

        /* 4 Quick Access Portal Cards */
        .obec-portals-section {
          background-color: #f1f5f9;
          padding: 8px 0 28px;
        }

        .obec-portals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
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
          .obec-slider-frame { height: 420px; }
          .slider-content-wrap { padding: 30px; }
          .slider-title { font-size: 1.85rem; }
          .obec-portals-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 576px) {
          .obec-slider-frame { height: 380px; }
          .slider-content-wrap { padding: 20px; }
          .slider-title { font-size: 1.4rem; }
          .slider-subtitle { font-size: 0.88rem; }
          .slider-desc-box { display: none; }
          .obec-portals-grid { grid-template-columns: 1fr; }
        }

        /* Stats Ribbon */
        .stats-ribbon-section {
          padding: 16px 0;
          background: #ffffff;
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
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
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

        /* Director Executive Card */
        .greeting-section {
          background-color: #f8fafc;
        }

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
        .vision-section {
          background-color: #ffffff;
        }

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
          background: #f8fafc;
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
