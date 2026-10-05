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
  Calendar,
  ExternalLink,
  Activity,
  HeartHandshake
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

  // 4 Featured Slides with real, strictly matched school photos
  const heroSlides = [
    {
      id: 1,
      image: resolveImageUrl('news/school_teachers_group.jpg'),
      tagTh: "ยินดีต้อนรับสู่สถานศึกษา • องค์กรแห่งการเรียนรู้",
      tagEn: "WELCOME TO BAN WANG HUA WAEN PHATTHANA SCHOOL",
      titleTh: "โรงเรียนบ้านวังหัวแหวนพัฒนา",
      titleEn: "Ban Wang Hua Waen Phatthana School",
      subtitleTh: "สำนักงานเขตพื้นที่การศึกษาประถมศึกษากำแพงเพชร เขต 2",
      subtitleEn: "Kamphaeng Phet Primary Educational Service Area Office 2",
      descTh: "“ปัญญา นรานัง รัตนัง : ปัญญาเป็นดวงแก้วของนรชน” มุ่งมั่นพัฒนาคุณภาพการศึกษา ปลูกฝังคุณธรรม นำความรู้ สู่สากล",
      descEn: "“Good Education, Disciplined, Eager to Learn, High Morals” Empowering every student through quality education.",
      primaryBtnTh: "สำรวจแผนผังสถานศึกษา",
      primaryBtnEn: "Explore Campus",
      primaryAction: () => setView('campus'),
      secondaryBtnTh: "ทำเนียบข้าราชการครู",
      secondaryBtnEn: "Faculty Directory",
      secondaryAction: () => setView('staff')
    },
    {
      id: 2,
      image: resolveImageUrl('news/school_award_honor.jpg'),
      tagTh: "รางวัลเชิดชูเกียรติยศ • ความภาคภูมิใจของสถานศึกษา",
      tagEn: "OBEC EXCELLENCE AWARD • ACADEMIC PRESTIGE",
      titleTh: "สถานศึกษาต้นแบบการนิเทศภายใน (ISMS Award) ระดับยอดเยี่ยม",
      titleEn: "Internal Supervision Model School (ISMS) Excellence Award",
      subtitleTh: "รางวัลระดับยอดเยี่ยม สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)",
      subtitleEn: "Excellence Recognition from the Office of the Basic Education Commission",
      descTh: "ยกระดับคุณภาพการจัดการเรียนรู้เชิงรุก (Active Learning) และพัฒนานวัตกรรมการบริหารสถานศึกษาอย่างยั่งยืน",
      descEn: "Elevating active learning methodologies and instructional leadership for sustainable educational success.",
      primaryBtnTh: "อ่านรายละเอียดเกียรติประวัติ",
      primaryBtnEn: "Read Award Story",
      primaryAction: () => setView('news'),
      secondaryBtnTh: "ข่าวประชาสัมพันธ์ทั้งหมด",
      secondaryBtnEn: "All Announcements",
      secondaryAction: () => setView('news')
    },
    {
      id: 3,
      image: resolveImageUrl('news/fb_lunch_donation.jpg'),
      tagTh: "ส่งเสริมสุขอนามัยและโภชนาการ • พลังความร่วมมือจากชุมชน",
      tagEn: "STUDENT NUTRITION & WELL-BEING • COMMUNITY SUPPORT",
      titleTh: "มุ่งมั่นพัฒนาคุณภาพชีวิต และเสริมสร้างภาวะโภชนาการแก่นักเรียน",
      titleEn: "Holistic Student Well-being and Nutritional Excellence",
      subtitleTh: "อาหารกลางวันคุณภาพ ถูกหลักโภชนาการ และการสนับสนุนจากผู้ใหญ่ใจดี",
      subtitleEn: "Nutritious balanced meals and benevolent community partnerships",
      descTh: "ส่งเสริมสุขภาพกายและสุขภาพจิตของผู้เรียน เพื่อให้เด็กทุกคนเติบโตอย่างสมวัย มีความสุข และพร้อมต่อการเรียนรู้ในทุกวัน",
      descEn: "Fostering physical and cognitive vitality so every young learner thrives in a joyful and caring environment.",
      primaryBtnTh: "อ่านข่าวกิจกรรมอาหารกลางวัน",
      primaryBtnEn: "View Nutrition Story",
      primaryAction: () => setView('news'),
      secondaryBtnTh: "ติดต่อราชการ",
      secondaryBtnEn: "Contact Us",
      secondaryAction: () => setView('contact')
    },
    {
      id: 4,
      image: resolveImageUrl('news/fb_1560176759242385.jpg'),
      tagTh: "ความร่วมมือองค์กรปกครองส่วนท้องถิ่น • อบต.วังหามแห",
      tagEn: "LOCAL GOVERNMENT PARTNERSHIP • WANG HAM HAE SAO",
      titleTh: "ประสานพลังเครือข่าย พัฒนาสถานศึกษาและชุมชนอย่างยั่งยืน",
      titleEn: "Strengthening Partnerships for School & Community Development",
      subtitleTh: "ขอขอบคุณ อบต.วังหามแห ที่สนับสนุนรถน้ำอุปโภคบริโภคช่วยเหลือสถานศึกษา",
      subtitleEn: "Gratitude to Wang Ham Hae SAO for dedicated municipal service and campus support",
      descTh: "การบูรณาการความร่วมมือระหว่างโรงเรียน ชุมชน และองค์กรปกครองส่วนท้องถิ่น เพื่อประโยชน์และความปลอดภัยของนักเรียน",
      descEn: "Strong integration between school, community, and local administration for student welfare.",
      primaryBtnTh: "อ่านข่าวกิจกรรม",
      primaryBtnEn: "Read More",
      primaryAction: () => setView('news'),
      secondaryBtnTh: "แผนผังสถานศึกษา",
      secondaryBtnEn: "Campus Map",
      secondaryAction: () => setView('campus')
    }
  ];

  // Auto advance slides every 6s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
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
      
      {/* 1. ULTRA-MODERN CINEMATIC HERO SHOWCASE */}
      <section 
        className="bespoke-hero-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="hero-stage">
          
          {/* Background Images with Smooth Crossfade */}
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`hero-bg-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-mesh-overlay"></div>
            </div>
          ))}

          {/* Hero Foreground Content */}
          <div className="container hero-content-container">
            <div className="hero-glass-card">
              
              <div className="hero-badge-pill">
                <span className="pulse-indicator-dot"></span>
                <span>{isEn ? currentHero.tagEn : currentHero.tagTh}</span>
              </div>

              <h1 className="hero-headline">
                {isEn ? currentHero.titleEn : currentHero.titleTh}
              </h1>

              <p className="hero-subheadline">
                {isEn ? currentHero.subtitleEn : currentHero.subtitleTh}
              </p>

              <div className="hero-quote-card">
                <p className="hero-quote-text">
                  {isEn ? currentHero.descEn : currentHero.descTh}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="hero-actions">
                <button 
                  type="button" 
                  className="btn-hero-primary"
                  onClick={currentHero.primaryAction}
                >
                  <span>{isEn ? currentHero.primaryBtnEn : currentHero.primaryBtnTh}</span>
                  <ArrowRight size={18} />
                </button>
                <button 
                  type="button" 
                  className="btn-hero-secondary"
                  onClick={currentHero.secondaryAction}
                >
                  {isEn ? currentHero.secondaryBtnEn : currentHero.secondaryBtnTh}
                </button>
              </div>

            </div>

            {/* Slider Navigation Arrows */}
            <div className="hero-nav-controls">
              <button 
                type="button" 
                className="hero-arrow-btn" 
                onClick={prevSlide}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={22} />
              </button>
              
              <div className="hero-progress-group">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`hero-progress-pill ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  >
                    <span className="pill-fill"></span>
                  </button>
                ))}
              </div>

              <button 
                type="button" 
                className="hero-arrow-btn" 
                onClick={nextSlide}
                aria-label="Next Slide"
              >
                <ChevronRight size={22} />
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* 2. BESPOKE BENTO PORTAL GRID (ไม่ใช่กล่องสี่เหลี่ยมธรรมดาแบบ สพฐ.) */}
      <section className="bento-portal-section">
        <div className="container">
          
          <div className="section-header-modern text-center mb-5">
            <span className="section-pill-tag">
              <Sparkles size={14} /> {isEn ? 'DIGITAL CAMPUS HUB' : 'ศูนย์บริการข้อมูลและระบบสารสนเทศสถานศึกษา'}
            </span>
            <h2 className="section-heading-modern">
              {isEn ? 'Explore Ban Wang Hua Waen Phatthana' : 'มิติใหม่แห่งการเรียนรู้ โรงเรียนบ้านวังหัวแหวนพัฒนา'}
            </h2>
            <p className="section-sub-modern">
              {isEn 
                ? 'Seamlessly access academic portals, faculty directory, official announcements, and student activities.' 
                : 'เข้าถึงข้อมูลสถานศึกษา ทำเนียบครู แผนผังอาคารสถานที่ และข่าวสารทางการได้อย่างสะดวกรวดเร็ว'}
            </p>
          </div>

          <div className="bento-grid-modern">
            
            {/* Bento Card 1: Interactive Campus Map (Large Span) */}
            <div className="bento-card bento-card-large" onClick={() => setView('campus')}>
              <div className="bento-bg-accent" style={{ backgroundImage: `url(${resolveImageUrl('news/school_entrance_sign.jpg')})` }}></div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <div className="bento-icon-wrapper icon-blue">
                  <Layers size={28} />
                </div>
                <div className="bento-text-group">
                  <span className="bento-kicker">{isEn ? 'INTERACTIVE MAP' : 'ระบบแผนผังดิจิทัล'}</span>
                  <h3 className="bento-title-text">{isEn ? 'Campus Map & Learning Facilities' : 'แผนผังบริเวณสถานศึกษาและแหล่งเรียนรู้'}</h3>
                  <p className="bento-desc-text">
                    {isEn 
                      ? 'Interactive map showcasing 8 instructional buildings, digital labs, sports fields, and suffiency gardens.' 
                      : 'ข้อมูลอาคารเรียน 8 จุดสำคัญ ห้องเรียนอัจฉริยะ ลานกิจกรรม และแหล่งเรียนรู้ตามหลักปรัชญาของเศรษฐกิจพอเพียง'}
                  </p>
                </div>
                <div className="bento-action-row">
                  <span className="bento-btn-link">
                    {isEn ? 'Explore Campus' : 'เข้าชมแผนผังสถานศึกษา'} <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Faculty & Staff Directory */}
            <div className="bento-card bento-card-medium" onClick={() => setView('staff')}>
              <div className="bento-card-content">
                <div className="bento-icon-wrapper icon-emerald">
                  <Users size={26} />
                </div>
                <div className="bento-text-group">
                  <span className="bento-kicker">{isEn ? 'FACULTY & STAFF' : 'คณะผู้บริหารและครู'}</span>
                  <h3 className="bento-title-text">{isEn ? 'Staff Directory' : 'ทำเนียบข้าราชการครูและบุคลากร'}</h3>
                  <p className="bento-desc-text">
                    {isEn 
                      ? 'Meet our certified educators dedicated to active learning and student care.' 
                      : 'ข้อมูลผู้บริหารสถานศึกษา ครูประจำชั้น และบุคลากรทางการศึกษาพร้อมวุฒิการศึกษา'}
                  </p>
                </div>
                <div className="bento-action-row">
                  <span className="bento-btn-link">
                    {isEn ? 'View Directory' : 'ดูรายชื่อบุคลากร'} <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>

            {/* Bento Card 3: News & Announcements */}
            <div className="bento-card bento-card-medium" onClick={() => setView('news')}>
              <div className="bento-card-content">
                <div className="bento-icon-wrapper icon-amber">
                  <BookOpen size={26} />
                </div>
                <div className="bento-text-group">
                  <span className="bento-kicker">{isEn ? 'REAL-TIME NEWS' : 'ข่าวประชาสัมพันธ์'}</span>
                  <h3 className="bento-title-text">{isEn ? 'News & Official Notices' : 'ข่าวสารและประกาศทางราชการ'}</h3>
                  <p className="bento-desc-text">
                    {isEn 
                      ? 'Up-to-date notifications, admissions notices, and community activities.' 
                      : 'ประกาศรับสมัครนักเรียน ภาพกิจกรรมการเรียนรู้ และข่าวสารทางการของสถานศึกษา'}
                  </p>
                </div>
                <div className="bento-action-row">
                  <span className="bento-btn-link">
                    {isEn ? 'Read All News' : 'อ่านข่าวสารทั้งหมด'} <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Contact & Inquiries */}
            <div className="bento-card bento-card-medium" onClick={() => setView('contact')}>
              <div className="bento-card-content">
                <div className="bento-icon-wrapper icon-indigo">
                  <PhoneCall size={26} />
                </div>
                <div className="bento-text-group">
                  <span className="bento-kicker">{isEn ? 'GET IN TOUCH' : 'ติดต่อราชการ'}</span>
                  <h3 className="bento-title-text">{isEn ? 'Official Inquiries & Contact' : 'ติดต่อสอบถามและบริการประชาชน'}</h3>
                  <p className="bento-desc-text">
                    {isEn 
                      ? 'Direct contact channels, phone, school email, and GPS navigation to school.' 
                      : 'หมายเลขโทรศัพท์ ที่ตั้งทางภูมิศาสตร์ แผนที่นำทาง และช่องทางส่งข้อความถึงโรงเรียน'}
                  </p>
                </div>
                <div className="bento-action-row">
                  <span className="bento-btn-link">
                    {isEn ? 'Contact Portal' : 'ติดต่อสถานศึกษา'} <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 3. VITAL INSTITUTIONAL STATS (FLOATING COUNTERS WITH GLOW) */}
      <section className="metrics-glow-section">
        <div className="container">
          <div className="metrics-glass-grid">
            
            <div className="metric-glass-card">
              <div className="metric-glow-ring ring-blue"></div>
              <div className="metric-icon-box">
                <Users size={30} />
              </div>
              <div className="metric-text-box">
                <div className="metric-number-wrap">
                  <span className="metric-number">{schoolInfo?.stats ? schoolInfo.stats.students : 65}</span>
                  <span className="metric-plus">+</span>
                </div>
                <h4 className="metric-title">{isEn ? 'Enrolled Students' : 'จำนวนนักเรียนทั้งหมด'}</h4>
                <p className="metric-subtitle">{isEn ? 'Kindergarten to Primary Grade 6' : 'ระดับปฐมวัยถึงประถมศึกษาปีที่ 6'}</p>
              </div>
            </div>

            <div className="metric-glass-card">
              <div className="metric-glow-ring ring-gold"></div>
              <div className="metric-icon-box">
                <GraduationCap size={30} />
              </div>
              <div className="metric-text-box">
                <div className="metric-number-wrap">
                  <span className="metric-number">{schoolInfo?.stats ? schoolInfo.stats.teachers : 5}</span>
                  <span className="metric-unit">{isEn ? 'Staff' : 'ท่าน'}</span>
                </div>
                <h4 className="metric-title">{isEn ? 'Teachers & Faculty' : 'ข้าราชการครูและบุคลากร'}</h4>
                <p className="metric-subtitle">{isEn ? 'Dedicated & Qualified Educators' : 'มุ่งมั่นพัฒนาการจัดการเรียนรู้เชิงรุก'}</p>
              </div>
            </div>

            <div className="metric-glass-card">
              <div className="metric-glow-ring ring-emerald"></div>
              <div className="metric-icon-box">
                <BookOpen size={30} />
              </div>
              <div className="metric-text-box">
                <div className="metric-number-wrap">
                  <span className="metric-number">8</span>
                  <span className="metric-unit">{isEn ? 'Levels' : 'ระดับชั้น'}</span>
                </div>
                <h4 className="metric-title">{isEn ? 'Grade Levels Offered' : 'ระดับชั้นการศึกษาที่เปิดสอน'}</h4>
                <p className="metric-subtitle">{isEn ? 'Kindergarten 2 - Primary Grade 6' : 'อนุบาลปีที่ 2 ถึง ชั้นประถมศึกษาปีที่ 6'}</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 4. PRESIDENTIAL / DIRECTOR'S EDITORIAL (หรูหรา สง่างาม ไม่ใช่กรอบทองโบราณ) */}
      <section className="executive-editorial-section section-padding">
        <div className="container">
          <div className="editorial-wrapper">
            
            <div className="editorial-grid">
              
              {/* Left: Professional Executive Visual */}
              <div className="editorial-portrait-col">
                <div className="editorial-portrait-frame">
                  {directorInfo && directorInfo.imageUrl ? (
                    <img 
                      src={resolveImageUrl(directorInfo.imageUrl)} 
                      alt={schoolInfo?.directorName} 
                      className="editorial-director-img" 
                    />
                  ) : (
                    <div className="editorial-placeholder-portrait">
                      <div className="director-crest-symbol">
                        <Award size={48} />
                      </div>
                      <p className="director-seal-text">{isEn ? (schoolInfo?.directorNameEn || 'Mr. Suchart Chanbantone') : (schoolInfo?.directorName || 'นายสุชาติ จันทร์บ้านโต้น')}</p>
                      <span className="director-seal-sub">{isEn ? 'School Director' : 'ผู้อำนวยการสถานศึกษา'}</span>
                    </div>
                  )}
                  
                  <div className="editorial-floating-seal">
                    <ShieldCheck size={20} />
                    <span>{isEn ? 'Certified School Director' : 'ผู้บริหารสถานศึกษา'}</span>
                  </div>
                </div>

                <div className="editorial-director-meta">
                  <h4 className="editorial-name">{isEn ? (schoolInfo?.directorNameEn || 'Mr. Suchart Chanbantone') : schoolInfo?.directorName}</h4>
                  <p className="editorial-position">{isEn ? (schoolInfo?.directorPositionEn || 'School Director') : schoolInfo?.directorPosition}</p>
                  <p className="editorial-org">{isEn ? (schoolInfo?.regionEn || 'Kamphaeng Phet Primary Educational Service Area Office 2') : schoolInfo?.region}</p>
                </div>
              </div>

              {/* Right: Modern Executive Statement */}
              <div className="editorial-message-col">
                <div className="editorial-kicker">
                  <span className="kicker-line"></span>
                  <span>{isEn ? 'EXECUTIVE STATEMENT' : 'สารจากผู้บริหารสถานศึกษา'}</span>
                </div>
                
                <h3 className="editorial-heading">
                  {isEn ? 'Fostering Excellence, Character, and 21st-Century Competencies' : 'มุ่งมั่นพัฒนาการศึกษา สร้างเสริมคุณธรรม สู่ความเป็นเลิศอย่างยั่งยืน'}
                </h3>

                <div className="editorial-quote-container">
                  <div className="quote-mark-large">“</div>
                  <blockquote className="editorial-quote-body">
                    {isEn 
                      ? (schoolInfo?.directorMsgEn || "Ban Wang Hua Waen Phatthana School is dedicated to fostering academic excellence, moral integrity, and lifelong learning competencies in every student, through collaborative education and strong community partnership.") 
                      : schoolInfo?.directorMsg}
                  </blockquote>
                </div>

                <div className="editorial-sign-block">
                  <div className="sign-signature-line">
                    <span className="director-sign-name">({isEn ? (schoolInfo?.directorNameEn || 'Mr. Suchart Chanbantone') : schoolInfo?.directorName})</span>
                  </div>
                  <p className="director-sign-title">{isEn ? (schoolInfo?.directorPositionEn || 'School Director') : schoolInfo?.directorPosition}</p>
                  <p className="director-sign-subtitle">{isEn ? (schoolInfo?.nameEn || 'Ban Wang Hua Waen Phatthana School') : 'โรงเรียนบ้านวังหัวแหวนพัฒนา'}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 5. COMMITMENTS & 3 ACADEMIC PILLARS (วิสัยทัศน์ พันธกิจ และอัตลักษณ์) */}
      <section className="pillars-section section-padding">
        <div className="container">
          
          <div className="text-center mb-5">
            <span className="section-pill-tag">
              <Compass size={14} /> {isEn ? 'INSTITUTIONAL CORE VALUES' : 'อุดมการณ์และทิศทางการพัฒนา'}
            </span>
            <h2 className="section-heading-modern">
              {isEn ? 'Vision, Mission & School Identity' : 'วิสัยทัศน์ พันธกิจ และอัตลักษณ์สถานศึกษา'}
            </h2>
            <p className="section-sub-modern">
              {isEn 
                ? 'Guiding principles that steer our academic quality, student morals, and community collaboration.' 
                : 'หลักการและเป้าหมายในการพัฒนาผู้เรียนให้มีคุณภาพ มีคุณธรรม และมีทักษะชีวิตที่เข้มแข็ง'}
            </p>
          </div>

          <div className="grid-3 pillars-grid">
            
            {/* Pillar 1: Vision */}
            <div className="pillar-glass-card pillar-vision">
              <div className="pillar-card-top">
                <div className="pillar-icon-box">
                  <Compass size={28} />
                </div>
                <span className="pillar-tag">{isEn ? 'PILLAR 01' : 'เสาหลักที่ 1'}</span>
              </div>
              <h3 className="pillar-title">{isEn ? 'Vision' : 'วิสัยทัศน์ (Vision)'}</h3>
              <p className="pillar-body">
                {isEn 
                  ? (schoolInfo?.visionEn || 'Committed to developing learners in accordance with educational quality standards, promoting morality alongside academic knowledge and modern technology, preserving Thai heritage, fostering environmental responsibility, and embracing the Philosophy of Sufficiency Economy.') 
                  : (schoolInfo?.vision || 'มุ่งพัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐานการศึกษา สร้างเสริมคุณธรรมนำความรู้ ควบคู่เทคโนโลยี ร่วมใจสืบสานวัฒนธรรมไทย ใส่ใจสิ่งแวดล้อม น้อมนำปรัชญาของเศรษฐกิจพอเพียง')}
              </p>
            </div>

            {/* Pillar 2: Mission */}
            <div className="pillar-glass-card pillar-mission">
              <div className="pillar-card-top">
                <div className="pillar-icon-box">
                  <Award size={28} />
                </div>
                <span className="pillar-tag">{isEn ? 'PILLAR 02' : 'เสาหลักที่ 2'}</span>
              </div>
              <h3 className="pillar-title">{isEn ? 'Mission' : 'พันธกิจ (Mission)'}</h3>
              <p className="pillar-body">
                {isEn 
                  ? (schoolInfo?.missionEn || 'Provide equitable and comprehensive education from early childhood through primary levels, enhance student-centered learning methodologies, advance faculty professional standards, and foster participatory school administration with community engagement.') 
                  : (schoolInfo?.mission || 'จัดการศึกษาตั้งแต่ระดับปฐมวัยถึงประถมศึกษาอย่างทั่วถึง พัฒนาระบบการเรียนรู้ เน้นผู้เรียนเป็นสำคัญ ส่งเสริมบุคลากรให้มีคุณภาพ และบริหารจัดการโดยชุมชนมีส่วนร่วม')}
              </p>
            </div>

            {/* Pillar 3: Identity */}
            <div className="pillar-glass-card pillar-identity">
              <div className="pillar-card-top">
                <div className="pillar-icon-box">
                  <HeartHandshake size={28} />
                </div>
                <span className="pillar-tag">{isEn ? 'PILLAR 03' : 'เสาหลักที่ 3'}</span>
              </div>
              <h3 className="pillar-title">{isEn ? 'Identity' : 'อัตลักษณ์สถานศึกษา (Identity)'}</h3>
              <p className="pillar-body">
                {isEn 
                  ? (schoolInfo?.identityEn || '“Warm Smiles, Respectful Greetings, Generous Spirits, and Disciplined Learners” — Core behavioural foundations nurtured in every student.') 
                  : (schoolInfo?.identity || 'ยิ้มง่าย ไหว้สวย รวยน้ำใจ มีวินัยใฝ่การศึกษา ซึ่งเป็นจุดเน้นการหล่อหลอมพฤติกรรมพื้นฐานของเยาวชนและนักเรียนโรงเรียนบ้านวังหัวแหวนพัฒนาทุกคน')}
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* 6. LATEST NEWS & OFFICIAL ANNOUNCEMENTS HIGHLIGHTS */}
      <section className="latest-news-section section-padding">
        <div className="container">
          
          <div className="flex-between-title mb-4">
            <div>
              <span className="section-pill-tag">
                <Calendar size={14} /> {isEn ? 'PRESS & ANNOUNCEMENTS' : 'ข่าวสารและประกาศสถานศึกษา'}
              </span>
              <h2 className="section-heading-modern text-left mb-1">
                {isEn ? 'Latest School News' : 'ข่าวประชาสัมพันธ์และประกาศล่าสุด'}
              </h2>
              <p className="text-muted">
                {isEn 
                  ? 'Official notifications, educational activities, and achievements.' 
                  : 'ติดตามกิจกรรม กิจการนักเรียน และประกาศทางราชการที่เป็นปัจจุบัน'}
              </p>
            </div>
            
            <button className="btn-explore-news" onClick={() => setView('news')}>
              <span>{isEn ? 'View All News' : 'ดูข่าวประชาสัมพันธ์ทั้งหมด'}</span>
              <ChevronRight size={18} />
            </button>
          </div>

          {latestNews.length > 0 ? (
            <div className="grid-3 news-cards-grid">
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
            <div className="empty-news-box text-center py-5">
              <p className="text-muted">{isEn ? 'No news available at the moment.' : 'ขณะนี้ยังไม่มีข้อมูลข่าวประชาสัมพันธ์ในระบบ'}</p>
            </div>
          )}

        </div>
      </section>

      {/* Scoped CSS for Bespoke Modern Institutional Design */}
      <style>{`
        /* Hero Section Styling */
        .bespoke-hero-section {
          position: relative;
          background: #07172b;
          padding: 24px 0 32px;
          overflow: hidden;
        }

        .hero-stage {
          position: relative;
          min-height: 540px;
          border-radius: 24px;
          overflow: hidden;
          background: #040e1b;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          margin: 0 auto;
          max-width: 1240px;
        }

        .hero-bg-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 8s ease-out;
          z-index: 1;
        }

        .hero-bg-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        .hero-mesh-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg, 
            rgba(4, 14, 27, 0.94) 0%, 
            rgba(4, 14, 27, 0.82) 48%, 
            rgba(4, 14, 27, 0.38) 100%
          );
        }

        .hero-content-container {
          position: relative;
          z-index: 5;
          min-height: 540px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 50px 40px;
        }

        .hero-glass-card {
          max-width: 760px;
          color: #ffffff;
        }

        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(245, 158, 11, 0.18);
          border: 1px solid rgba(245, 158, 11, 0.45);
          color: #fde047;
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          backdrop-filter: blur(12px);
        }

        .pulse-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #f59e0b;
          box-shadow: 0 0 10px #f59e0b;
          animation: beaconWave 2s infinite ease-out;
        }

        .hero-headline {
          font-size: 2.75rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
        }

        .hero-subheadline {
          font-size: 1.15rem;
          color: #cbd5e1;
          font-weight: 500;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .hero-quote-card {
          background: rgba(7, 23, 43, 0.65);
          border-left: 4px solid #f59e0b;
          padding: 14px 20px;
          border-radius: 0 12px 12px 0;
          margin-bottom: 28px;
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(245, 158, 11, 0.2);
          border-right: 1px solid rgba(245, 158, 11, 0.2);
          border-bottom: 1px solid rgba(245, 158, 11, 0.2);
        }

        .hero-quote-text {
          font-size: 1rem;
          color: #f1f5f9;
          line-height: 1.6;
          margin: 0;
          font-style: italic;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #07172b;
          padding: 13px 26px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px -4px rgba(245, 158, 11, 0.5);
        }

        .btn-hero-primary:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -4px rgba(245, 158, 11, 0.7);
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.45);
          transform: translateY(-2px);
        }

        /* Nav Controls */
        .hero-nav-controls {
          position: absolute;
          bottom: 30px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 10;
        }

        .hero-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(7, 23, 43, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .hero-arrow-btn:hover {
          background: #f59e0b;
          border-color: #f59e0b;
          color: #07172b;
          transform: scale(1.08);
        }

        .hero-progress-group {
          display: flex;
          gap: 8px;
        }

        .hero-progress-pill {
          width: 14px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.25);
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          overflow: hidden;
        }

        .hero-progress-pill.active {
          width: 38px;
          background: #f59e0b;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
        }

        /* Section Headings */
        .section-header-modern {
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-pill-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #b45309;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .section-heading-modern {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0b2545;
          line-height: 1.3;
          margin-bottom: 10px;
        }

        .section-sub-modern {
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.6;
        }

        /* Bento Grid Modern */
        .bento-portal-section {
          padding: 60px 0 40px;
          background: #f8fafc;
        }

        .bento-grid-modern {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .bento-card-large {
          grid-column: span 3;
          position: relative;
          min-height: 220px;
        }

        .bento-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
        }

        .bento-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px -8px rgba(11, 37, 69, 0.12);
          border-color: #f59e0b;
        }

        .bento-bg-accent {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(1px);
          opacity: 0.18;
          transition: transform 0.5s ease;
        }

        .bento-card:hover .bento-bg-accent {
          transform: scale(1.05);
        }

        .bento-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.88) 100%);
        }

        .bento-card-content {
          position: relative;
          z-index: 2;
          padding: 28px;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .bento-card-large .bento-card-content {
          padding: 36px 40px;
        }

        .bento-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: transform 0.3s ease;
        }

        .bento-card:hover .bento-icon-wrapper {
          transform: scale(1.1) rotate(-3deg);
        }

        .icon-blue { background: #fef3c7; color: #b45309; }
        .icon-emerald { background: #ecfdf5; color: #059669; }
        .icon-amber { background: #fffbeb; color: #d97706; }
        .icon-indigo { background: #eff6ff; color: #0b2545; }

        .bento-kicker {
          display: block;
          font-size: 0.76rem;
          font-weight: 700;
          color: #b45309;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .bento-title-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.35;
          margin-bottom: 8px;
        }

        .bento-desc-text {
          font-size: 0.94rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .bento-btn-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          font-weight: 700;
          color: #0b2545;
          transition: gap 0.2s ease, color 0.2s ease;
        }

        .bento-card:hover .bento-btn-link {
          gap: 10px;
          color: #d97706;
        }

        /* Metrics Section */
        .metrics-glow-section {
          padding: 30px 0 60px;
          background: #f8fafc;
        }

        .metrics-glass-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .metric-glass-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          align-items: center;
          gap: 22px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          transition: transform 0.25s ease;
        }

        .metric-glass-card:hover {
          transform: translateY(-4px);
        }

        .metric-glow-ring {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          opacity: 0.15;
          filter: blur(15px);
        }

        .ring-blue { background: #f59e0b; }
        .ring-gold { background: #fbbf24; }
        .ring-emerald { background: #10b981; }

        .metric-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: #f1f5f9;
          color: #0b2545;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-number-wrap {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 4px;
        }

        .metric-number {
          font-size: 2.8rem;
          font-weight: 800;
          color: #0b2545;
          line-height: 1;
          font-family: var(--font-heading);
        }

        .metric-plus {
          font-size: 1.8rem;
          font-weight: 700;
          color: #f59e0b;
        }

        .metric-unit {
          font-size: 1.1rem;
          font-weight: 600;
          color: #64748b;
          margin-left: 6px;
        }

        .metric-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .metric-subtitle {
          font-size: 0.84rem;
          color: #64748b;
          margin: 0;
        }

        /* Executive Editorial Section */
        .executive-editorial-section {
          background: #ffffff;
        }

        .editorial-wrapper {
          background: linear-gradient(135deg, #07172b 0%, #0b2545 100%);
          border-top: 4px solid #f59e0b;
          border-radius: 28px;
          padding: 60px;
          color: #ffffff;
          box-shadow: 0 25px 60px -15px rgba(7, 23, 43, 0.4);
          position: relative;
          overflow: hidden;
        }

        .editorial-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 50px;
          align-items: center;
        }

        .editorial-portrait-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #040e1b;
          border: 2px solid #f59e0b;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          aspect-ratio: 4 / 4.8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .editorial-director-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .editorial-placeholder-portrait {
          text-align: center;
          padding: 30px;
          color: #ffffff;
        }

        .director-crest-symbol {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #fbbf24;
        }

        .director-seal-text {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .director-seal-sub {
          font-size: 0.88rem;
          color: #94a3b8;
        }

        .editorial-floating-seal {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          background: rgba(7, 23, 43, 0.9);
          border: 1px solid rgba(245, 158, 11, 0.35);
          padding: 8px 14px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #fbbf24;
          backdrop-filter: blur(8px);
        }

        .editorial-director-meta {
          margin-top: 18px;
          text-align: center;
        }

        .editorial-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .editorial-position {
          font-size: 0.92rem;
          color: #fbbf24;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .editorial-org {
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 0;
        }

        .editorial-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #f59e0b;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }

        .kicker-line {
          width: 30px;
          height: 2px;
          background: #f59e0b;
        }

        .editorial-heading {
          font-size: 2.1rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 24px;
        }

        .editorial-quote-container {
          position: relative;
          margin-bottom: 30px;
        }

        .quote-mark-large {
          position: absolute;
          top: -28px;
          left: -14px;
          font-size: 5rem;
          line-height: 1;
          color: rgba(245, 158, 11, 0.2);
          font-family: Georgia, serif;
          pointer-events: none;
        }

        .editorial-quote-body {
          font-size: 1.08rem;
          line-height: 1.8;
          color: #e2e8f0;
          margin: 0;
          font-weight: 400;
        }

        .editorial-sign-block {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .director-sign-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .director-sign-title {
          font-size: 0.9rem;
          color: #fbbf24;
          margin: 4px 0 2px;
        }

        .director-sign-subtitle {
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 0;
        }

        /* Pillars Section */
        .pillars-section {
          background: #f8fafc;
        }

        .pillar-glass-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 36px 30px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .pillar-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px -8px rgba(11, 37, 69, 0.1);
        }

        .pillar-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .pillar-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-vision .pillar-icon-box { background: #fef3c7; color: #b45309; }
        .pillar-mission .pillar-icon-box { background: #eff6ff; color: #0b2545; }
        .pillar-identity .pillar-icon-box { background: #ecfdf5; color: #059669; }

        .pillar-tag {
          font-size: 0.74rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 1px;
        }

        .pillar-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0b2545;
          margin-bottom: 12px;
        }

        .pillar-body {
          font-size: 0.98rem;
          color: #475569;
          line-height: 1.7;
          margin: 0;
        }

        /* Latest News Section */
        .latest-news-section {
          background: #ffffff;
        }

        .flex-between-title {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn-explore-news {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0b2545;
          color: #fde047;
          padding: 11px 22px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          border: 1px solid #f59e0b;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(11, 37, 69, 0.15);
        }

        .btn-explore-news:hover {
          background: #f59e0b;
          color: #07172b;
          border-color: #f59e0b;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(245, 158, 11, 0.35);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .editorial-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .editorial-portrait-col {
            max-width: 320px;
            margin: 0 auto;
          }
          .bento-grid-modern {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-card-large {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .hero-headline {
            font-size: 1.95rem;
          }
          .hero-content-container {
            padding: 30px 20px 80px;
          }
          .hero-nav-controls {
            right: 20px;
            bottom: 20px;
          }
          .bento-grid-modern {
            grid-template-columns: 1fr;
          }
          .bento-card-large {
            grid-column: span 1;
          }
          .metrics-glass-grid {
            grid-template-columns: 1fr;
          }
          .editorial-wrapper {
            padding: 32px 24px;
          }
          .editorial-heading {
            font-size: 1.55rem;
          }
        }
      `}</style>

    </div>
  );
}
