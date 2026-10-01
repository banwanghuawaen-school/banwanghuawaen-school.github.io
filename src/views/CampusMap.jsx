import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Footprints,
  Trees, 
  Coffee, 
  ShoppingBag, 
  Car, 
  Home, 
  Baby, 
  Trophy, 
  Compass
} from 'lucide-react';

export default function CampusMap() {
  const [selectedZone, setSelectedZone] = useState('b1'); // default to Main Building 1
  const [activeCategory, setActiveCategory] = useState('all');

  const campusZones = {
    b1: {
      id: 'b1',
      number: '1',
      category: 'academic',
      name: 'อาคาร 1 (อาคารเรียนหลักวังพัฒนา)',
      nameEn: 'Building 1 (Main Academic Building)',
      type: 'อาคารเรียนมาตรฐาน 2 ชั้น',
      color: '#8b5cf6',
      badgeText: 'อาคารหลัก',
      desc: 'อาคารเรียน 2 ชั้นขนาดใหญ่ เป็นศูนย์กลางการจัดการเรียนการสอนระดับประถมศึกษา พร้อมระบบเทคโนโลยีสารสนเทศเพื่อการศึกษาครบครัน',
      highlights: [
        'ชั้นที่ 1: ห้องพักครู, ห้องธุรการ-การเงิน, ห้องเรียนชั้น ป.1 - ป.3',
        'ชั้นที่ 2: ห้องเรียนชั้น ป.4 - ป.6, ห้องปฏิบัติการคอมพิวเตอร์และสื่อ DLTV',
        'ระบบสมาร์ททีวีและอินเทอร์เน็ตความเร็วสูงประจำทุกห้องเรียน'
      ],
      area: '280 ตร.ม.'
    },
    b2: {
      id: 'b2',
      number: '2',
      category: 'academic',
      name: 'อาคาร 2 (อาคารส่งเสริมการเรียนรู้)',
      nameEn: 'Building 2 (Learning Center)',
      type: 'อาคารเรียน 1 ชั้น',
      color: '#f97316',
      badgeText: 'อาคาร 2',
      desc: 'อาคารกิจกรรมและการเรียนรู้เฉพาะทาง รองรับกิจกรรมเสริมทักษะวิชาการ ห้องสมุดมีชีวิต และห้องปฏิบัติการกิจกรรม',
      highlights: [
        'ห้องสมุดเฉลิมพระเกียรติและมุมส่งเสริมการอ่าน',
        'ห้องปฏิบัติการวิทยาศาสตร์พื้นฐานและโครงงานนักเรียน',
        'ห้องพยาบาลและมุมตรวจสุขภาพนักเรียน'
      ],
      area: '160 ตร.ม.'
    },
    kindergarten: {
      id: 'kindergarten',
      number: 'อ.',
      category: 'academic',
      name: 'อาคารเรียนปฐมวัย (อนุบาล) & ลานร่มรื่น',
      nameEn: 'Kindergarten Building & Garden',
      type: 'อาคารเรียนปฐมวัยและพื้นที่ส่งเสริมพัฒนาการ',
      color: '#f43f5e',
      badgeText: 'อนุบาล',
      desc: 'อาคารเรียนสำหรับเด็กปฐมวัย (อนุบาล 2 - อนุบาล 3) ออกแบบเพื่อความปลอดภัยและส่งเสริมพัฒนาการทั้ง 4 ด้าน มีลานกิจกรรมร่มรื่นใต้ต้นไม้ใหญ่',
      highlights: [
        'ห้องเรียนปฐมวัยพร้อมสื่อเสริมพัฒนาการกล้ามเนื้อมัดเล็กและมัดใหญ่',
        'มุมนิทานและจินตนาการสร้างสรรค์',
        'ห้องทำงาน/อำนวยการของผู้บริหาร (โซน ผอ.)',
        'ลานกิจกรรมร่มรื่นใต้ต้นไม้ใหญ่ประจำโรงเรียน'
      ],
      area: '190 ตร.ม.'
    },
    canteen: {
      id: 'canteen',
      number: '3',
      category: 'service',
      name: 'โรงอาหารโรงเรียน',
      nameEn: 'School Cafeteria & Canteen',
      type: 'อาคารบริการโภชนาการนักเรียน',
      color: '#f59e0b',
      badgeText: 'โรงอาหาร',
      desc: 'สถานที่ประกอบอาหารกลางวันและรับประทานอาหารของนักเรียนและบุคลากร สะอาด ถูกสุขอนามัยตามมาตรฐานโครงการอาหารกลางวัน สพฐ.',
      highlights: [
        'โรงครัวปรุงอาหารสดใหม่ สะอาด ถูกหลักโภชนาการทุกวัน',
        'โต๊ะรับประทานอาหารเป็นระเบียบสำหรับนักเรียนทุกระดับชั้น',
        'จุดล้างมือน้ำไหลและจุดแปรงฟันหลังอาหารกลางวัน'
      ],
      area: '140 ตร.ม.'
    },
    welfare: {
      id: 'welfare',
      number: '4',
      category: 'service',
      name: 'ร้านค้าสวัสดิการโรงเรียน',
      nameEn: 'School Welfare & Cooperative Store',
      type: 'ร้านค้าบริการนักเรียนและชุมชน',
      color: '#a855f7',
      badgeText: 'ร้านสวัสดิการ',
      desc: 'ร้านค้าสวัสดิการโรงเรียนและสหกรณ์นักเรียน จำหน่ายเครื่องเขียน อุปกรณ์การเรียน เครื่องแต่งกาย และอาหารว่างที่มีประโยชน์',
      highlights: [
        'ฝึกทักษะการทำบัญชีและสหกรณ์นักเรียน',
        'จำหน่ายอุปกรณ์การเรียนราคาประหยัด',
        'เครื่องดื่มและนมโรงเรียนคุณภาพ'
      ],
      area: '45 ตร.ม.'
    },
    restroom1: {
      id: 'restroom1',
      number: 'ส1',
      category: 'service',
      name: 'ห้องน้ำ-สุขา (โซนร้านสวัสดิการ)',
      nameEn: 'Restroom Zone A',
      type: 'อาคารสุขอนามัย',
      color: '#eab308',
      badgeText: 'สุขา โซน 1',
      desc: 'สุขาสำหรับนักเรียนระดับปฐมวัยและผู้มาติดต่อร้านค้าสวัสดิการ แยกห้องน้ำชาย-หญิง สะอาด ปลอดภัย และมีแสงสว่างทั่วถึง',
      highlights: [
        'แยกสัดส่วนห้องน้ำชาย-หญิงชัดเจน',
        'อ่างล้างมือพร้อมสบู่ทำความสะอาด',
        'เจ้าหน้าที่ดูแลทำความสะอาดสม่ำเสมอตลอดวัน'
      ],
      area: '35 ตร.ม.'
    },
    restroom2: {
      id: 'restroom2',
      number: 'ส2',
      category: 'service',
      name: 'ห้องน้ำ-สุขา (โซนอาคาร 2)',
      nameEn: 'Restroom Zone B',
      type: 'อาคารสุขอนามัย',
      color: '#38bdf8',
      badgeText: 'สุขา โซน 2',
      desc: 'ห้องน้ำหลักสำหรับนักเรียนชั้นประถมศึกษาและคณะครู ตั้งอยู่ทางทิศตะวันออกติดกับอาคารเรียน 2 สะดวกต่อการใช้งานระหว่างคาบเรียน',
      highlights: [
        'ห้องสุขาและห้องอาบน้ำสำหรับนักเรียนหลังกิจกรรมกีฬา',
        'ระบบระบายอากาศถูกสุขอนามัย',
        'รองรับการใช้งานของนักเรียนทุกระดับชั้น'
      ],
      area: '50 ตร.ม.'
    },
    parking: {
      id: 'parking',
      number: 'P',
      category: 'facility',
      name: 'ลานจอดรถโรงเรียน',
      nameEn: 'School Parking Area',
      type: 'พื้นที่จอดรถยนต์และจักรยานยนต์',
      color: '#ec4899',
      badgeText: 'ลานจอดรถ',
      desc: 'พื้นที่จอดรถในร่มและกลางแจ้ง สำหรับรถยนต์ของคณะครู บุคลากรทางการศึกษา และผู้ปกครองที่เดินทางมาติดต่อราชการ',
      highlights: [
        'ช่องจอดรถยนต์และช่องจอดรถจักรยานยนต์เป็นระเบียบ',
        'ทางเข้า-ออกสะดวก เชื่อมต่อกับถนนภายในโรงเรียน',
        'ระบบไฟส่องสว่างเวลากลางคืนเพื่อความปลอดภัย'
      ],
      area: '180 ตร.ม.'
    },
    football: {
      id: 'football',
      number: 'สนาม',
      category: 'sports',
      name: 'สนามฟุตบอลโรงเรียน',
      nameEn: 'Main Football Field',
      type: 'สนามกีฬากลางแจ้งขนาดใหญ่',
      color: '#22c55e',
      badgeText: 'สนามบอล',
      desc: 'สนามฟุตบอลหญ้าธรรมชาติขนาดมาตรฐานใจกลางโรงเรียน เป็นหัวใจของการจัดกิจกรรมกลางแจ้ง กีฬาสี และการออกกำลังกายของชุมชน',
      highlights: [
        'สนามหญ้าตัดแต่งเรียบสม่ำเสมอ พร้อมเส้นเขตสนามชัดเจน',
        'ประตูฟุตบอลมาตรฐานพร้อมตาข่าย',
        'ใช้ในการเรียนการสอนวิชาพลศึกษาและกิจกรรมหน้าเสาธงในวันสำคัญ'
      ],
      area: '1,200 ตร.ม.'
    },
    volleyball: {
      id: 'volleyball',
      number: 'วอลเลย์',
      category: 'sports',
      name: 'สนามวอลเลย์บอล & ลานกีฬาอเนกประสงค์',
      nameEn: 'Volleyball Court & Outdoor Arena',
      type: 'สนามกีฬากลางแจ้งคอนกรีต',
      color: '#10b981',
      badgeText: 'สนามวอลเลย์',
      desc: 'สนามวอลเลย์บอลคอนกรีตมาตรฐาน ตั้งอยู่ด้านหน้าติดแนวรั้วโรงเรียน ใช้ฝึกซ้อมกีฬาวอลเลย์บอล ตะกร้อ และการละเล่นพื้นบ้าน',
      highlights: [
        'พื้นคอนกรีตทาสีกันลื่นพร้อมเส้นสนามมาตรฐาน',
        'เสาและตาข่ายวอลเลย์บอลที่ได้มาตรฐานความปลอดภัย',
        'ร่มรื่นด้วยแนวต้นไม้ใหญ่ด้านข้างสนาม'
      ],
      area: '162 ตร.ม.'
    },
    playground: {
      id: 'playground',
      number: 'BBL',
      category: 'sports',
      name: 'สนามเด็กเล่นสร้างสรรค์ (BBL) & แนวทิวไม้',
      nameEn: 'Creative BBL Playground',
      type: 'พื้นที่เรียนรู้กลางแจ้งและเครื่องเล่นพัฒนาการ',
      color: '#a78bfa',
      badgeText: 'สนามเด็กเล่น',
      desc: 'สนามเด็กเล่นแนวยาวขนานถนนหลัก ร่มรื่นด้วยแนวต้นไม้ใหญ่ตลอดแนว มีเครื่องเล่นตามหลักการพัฒนาสมอง (Brain-based Learning: BBL)',
      highlights: [
        'เครื่องเล่นเสริมทักษะ: ชิงช้า, กระดานลื่น, บาร์โหนทรงตัว',
        'ลานกระโดดและภาพวาดลายพื้นพัฒนาทักษะสมอง',
        'ทิวต้นไม้ร่มรื่น ให้ร่มเงาตลอดทั้งวันสำหรับพักผ่อน'
      ],
      area: '220 ตร.ม.'
    },
    flagpole_shrine: {
      id: 'flagpole_shrine',
      number: 'ธง-พระ',
      category: 'facility',
      name: 'ลานเสาธงชาติ และซุ้มพระพุทธรูปประจำโรงเรียน',
      nameEn: 'National Flagpole & Buddha Shrine',
      type: 'ศูนย์รวมจิตใจและลานพิธีการ',
      color: '#d97706',
      badgeText: 'เสาธง / พระพุทธรูป',
      desc: 'จุดศูนย์รวมจิตใจและอัตลักษณ์ของโรงเรียน ใช้ประกอบพิธีเข้าแถวเคารพธงชาติ สวดมนต์ ไหว้พระ และรับฟังโอวาทในตอนเช้าของทุกวัน',
      highlights: [
        'เสาธงชาติสูงสง่างาม หน้าอาคารเรียนหลัก',
        'ซุ้มประดิษฐานพระพุทธรูปศักดิ์สิทธิ์ประจำโรงเรียนบ้านวังหัวแหวนพัฒนา',
        'ลานคอนกรีตสำหรับนักเรียนและครูยืนเข้าแถวอย่างเป็นระเบียบ'
      ],
      area: '80 ตร.ม.'
    },
    teachers_housing: {
      id: 'teachers_housing',
      number: 'พักครู',
      category: 'facility',
      name: 'กลุ่มบ้านพักครู (5 หลัง) & ที่พักบุคลากร',
      nameEn: 'Teachers Residential Houses',
      type: 'โซนที่พักอาศัยของคณะครูและบุคลากร',
      color: '#b45309',
      badgeText: 'บ้านพักครู',
      desc: 'กลุ่มบ้านพักสำหรับครูและบุคลากรทางการศึกษาที่ปฏิบัติหน้าที่ดูแลโรงเรียน จำนวน 5 หลัง ตั้งอยู่ในมุมที่เงียบสงบ ปลอดภัย และร่มรื่น',
      highlights: [
        'บ้านพักครูจำนวน 5 หลังพร้อมระบบสาธารณูปโภคครบครัน',
        'มีครูเวรดูแลความปลอดภัยของโรงเรียนตลอด 24 ชั่วโมง',
        'สภาพแวดล้อมร่มรื่น น่าอยู่ ใกล้ชิดธรรมชาติ'
      ],
      area: '450 ตร.ม.'
    },
    gate_fence: {
      id: 'gate_fence',
      number: 'ประตู',
      category: 'facility',
      name: 'ประตูทางเข้า, ป้ายชื่อโรงเรียน และแนวรั้ว',
      nameEn: 'School Gate & Boundary Fence',
      type: 'ทางเข้าหลักและระบบรักษาความปลอดภัย',
      color: '#475569',
      badgeText: 'ประตู & รั้ว',
      desc: 'ทางเข้าหลักของโรงเรียนบ้านวังหัวแหวนพัฒนา ประดับป้ายหินสลักชื่อโรงเรียนอย่างสง่างาม พร้อมประตูเหล็กแข็งแรงและแนวรั้วรอบโรงเรียน',
      highlights: [
        'ป้ายชื่อโรงเรียนบ้านวังหัวแหวนพัฒนา สวยงาม เด่นชัดริมถนน',
        'ประตูรั้วเหล็กเปิด-ปิดตามเวลาทำการราชการ',
        'แนวรั้วคอนกรีตและทิวต้นไม้ล้อมรอบสร้างความปลอดภัยแก่นักเรียน'
      ],
      area: 'ตลอดแนวหน้า รร.'
    }
  };

  const currentZone = campusZones[selectedZone] || campusZones.b1;

  const categories = [
    { id: 'all', label: 'ทั้งหมด (14 โซน)', icon: Compass },
    { id: 'academic', label: 'อาคารเรียน', icon: Building2 },
    { id: 'sports', label: 'สนามกีฬา & เครื่องเล่น', icon: Trophy },
    { id: 'service', label: 'สวัสดิการ & สุขา', icon: Coffee },
    { id: 'facility', label: 'ที่พัก & ลานกิจกรรม', icon: Home }
  ];

  const filteredZoneKeys = Object.keys(campusZones).filter(key => {
    if (activeCategory === 'all') return true;
    return campusZones[key].category === activeCategory;
  });

  return (
    <div className="campus-view container section-padding animate-fade-in">
      {/* Page Header */}
      <div className="page-header text-center mb-4">
        <span className="section-tag">CAMPUS MASTER PLAN</span>
        <h2 className="section-title">แผนผังโรงเรียนบ้านวังหัวแหวนพัฒนา</h2>
        <div className="school-divider">
          <span className="school-divider-dot"></span>
        </div>
        <p className="section-subtitle">
          แผนผังแสดงตำแหน่งอาคารเรียน สนามกีฬา อาคารบริการ และสิ่งอำนวยความสะดวกภายในบริเวณโรงเรียน
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="category-filters-row mb-4">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`cat-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Layout */}
      <div className="campus-grid-container">
        
        {/* Left: The Visual Interactive Campus Map */}
        <div className="map-view-card">
          <div className="map-card-topbar">
            <div className="topbar-title">
              <Layers size={18} className="text-secondary" />
              <span>แผนผังเชิงโต้ตอบ (คลิกที่อาคารหรือพื้นที่เพื่อดูรายละเอียด)</span>
            </div>
            <div className="topbar-hint">
              <Footprints size={14} /> โซนที่เลือก: <strong className="text-secondary">{currentZone.name}</strong>
            </div>
          </div>

          <div className="blueprint-canvas-wrapper">
            {/* SVG Interactive Canvas */}
            <svg 
              viewBox="0 0 960 680" 
              className="campus-master-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Notebook Grid Paper Pattern matching the hand sketch */}
                <pattern id="campus-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e9ecef" strokeWidth="0.8" />
                </pattern>

                {/* Road texture stripes */}
                <pattern id="road-stripe" width="20" height="10" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="10" height="2" fill="#f8fafc" />
                </pattern>

                {/* Filter Shadow for 3D elevation */}
                <filter id="soft-shadow" x="-5%" y="-5%" width="110%" height="115%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
                </filter>
                <filter id="active-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#e5b326" floodOpacity="0.85" />
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* 1. Base Grid Canvas */}
              <rect x="0" y="0" width="960" height="680" fill="#fbfbfa" rx="16" />
              <rect x="15" y="15" width="930" height="650" fill="url(#campus-grid)" rx="12" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* ---------------------------------------------------- */}
              {/* 2. ROADS NETWORK (ถนนภายในโรงเรียน) */}
              {/* ---------------------------------------------------- */}
              
              {/* Vertical Main Road from Gate to North */}
              <rect x="360" y="140" width="46" height="500" fill="#64748b" rx="2" />
              {/* Center dashed line for vertical road */}
              <line x1="383" y1="170" x2="383" y2="610" stroke="#f1f5f9" strokeWidth="2.5" strokeDasharray="12 10" opacity="0.85" />

              {/* Horizontal Internal Road in front of buildings */}
              <rect x="360" y="210" width="560" height="42" fill="#64748b" rx="2" />
              {/* Center dashed line for horizontal road */}
              <line x1="390" y1="231" x2="910" y2="231" stroke="#f1f5f9" strokeWidth="2.5" strokeDasharray="14 10" opacity="0.85" />

              {/* Road Intersection Smoother */}
              <rect x="360" y="210" width="46" height="42" fill="#64748b" />

              {/* Curb accents on road */}
              <line x1="360" y1="210" x2="360" y2="630" stroke="#475569" strokeWidth="2" />
              <line x1="406" y1="252" x2="406" y2="630" stroke="#475569" strokeWidth="2" />
              <line x1="406" y1="210" x2="920" y2="210" stroke="#475569" strokeWidth="2" />
              <line x1="406" y1="252" x2="920" y2="252" stroke="#475569" strokeWidth="2" />


              {/* ---------------------------------------------------- */}
              {/* 3. SOUTH BOUNDARY: GATE, SCHOOL SIGN, FENCE & TREES */}
              {/* ---------------------------------------------------- */}
              
              {/* Gate & Fence Interactive Group */}
              <g 
                className={`svg-zone ${selectedZone === 'gate_fence' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('gate_fence')}
              >
                {/* Iron Main Gate at bottom of vertical road */}
                <rect x="350" y="605" width="66" height="30" fill="#334155" rx="4" filter="url(#soft-shadow)" />
                <rect x="356" y="610" width="24" height="20" fill="#475569" rx="2" stroke="#94a3b8" strokeWidth="1" />
                <rect x="386" y="610" width="24" height="20" fill="#475569" rx="2" stroke="#94a3b8" strokeWidth="1" />
                <text x="383" y="658" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="700" fontFamily="Prompt">ประตูโรงเรียน</text>

                {/* School Sign Monument (ป้าย รร.) */}
                <rect x="424" y="602" width="70" height="26" fill="#f8fafc" rx="4" stroke="#0b2545" strokeWidth="2.5" filter="url(#soft-shadow)" />
                <rect x="427" y="605" width="64" height="20" fill="#0b2545" rx="2" />
                <text x="459" y="619" textAnchor="middle" fill="#e5b326" fontSize="9" fontWeight="700" fontFamily="Prompt">ป้าย รร.</text>
                <text x="459" y="658" textAnchor="middle" fill="#0b2545" fontSize="12" fontWeight="600" fontFamily="Prompt">ป้ายโรงเรียน</text>

                {/* Concrete Boundary Fence running along the bottom */}
                <line x1="495" y1="615" x2="920" y2="615" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                <line x1="495" y1="615" x2="920" y2="615" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="10 8" />
                <text x="740" y="656" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="600" fontFamily="Prompt">รั้วโรงเรียน</text>

                {/* Fence trees row (right side) */}
                <g opacity="0.9">
                  <circle cx="680" cy="595" r="16" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
                  <circle cx="705" cy="592" r="19" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                  <circle cx="730" cy="596" r="15" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
                  <rect x="702" y="608" width="6" height="12" fill="#78350f" />

                  <circle cx="830" cy="595" r="16" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
                  <circle cx="855" cy="592" r="19" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                  <circle cx="880" cy="596" r="15" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
                  <rect x="852" y="608" width="6" height="12" fill="#78350f" />
                  <text x="780" y="598" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="600" fontFamily="Prompt">ต้นไม้</text>
                </g>
              </g>


              {/* ---------------------------------------------------- */}
              {/* 4. WEST SIDE (LEFT OF ROAD): TEACHERS HOUSES & KINDERGARTEN */}
              {/* ---------------------------------------------------- */}

              {/* Group: Teachers' Housing (บ้านพักครู 5 หลัง) */}
              <g 
                className={`svg-zone ${selectedZone === 'teachers_housing' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('teachers_housing')}
              >
                {/* Bounding hover highlight area */}
                <rect x="180" y="420" width="165" height="195" fill={selectedZone === 'teachers_housing' ? 'rgba(180, 83, 9, 0.08)' : 'transparent'} rx="10" stroke={selectedZone === 'teachers_housing' ? '#b45309' : 'transparent'} strokeWidth="1.5" strokeDasharray="4 4" />

                {/* House 1 (Top Left) */}
                <polygon points="215,440 235,422 255,440" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                <rect x="220" y="440" width="30" height="24" fill="#fed7aa" stroke="#78350f" strokeWidth="1.5" />
                <rect x="231" y="448" width="8" height="16" fill="#b45309" />

                {/* House 2 (Top Right) */}
                <polygon points="280,440 300,422 320,440" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                <rect x="285" y="440" width="30" height="24" fill="#fed7aa" stroke="#78350f" strokeWidth="1.5" />
                <rect x="296" y="448" width="8" height="16" fill="#b45309" />

                {/* House 3 (Middle Right) */}
                <polygon points="280,505 300,487 320,505" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                <rect x="285" y="505" width="30" height="24" fill="#fed7aa" stroke="#78350f" strokeWidth="1.5" />
                <rect x="296" y="513" width="8" height="16" fill="#b45309" />

                {/* House 4 (Middle-Bottom Left) */}
                <polygon points="220,545 240,527 260,545" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                <rect x="225" y="545" width="30" height="24" fill="#fed7aa" stroke="#78350f" strokeWidth="1.5" />
                <rect x="236" y="553" width="8" height="16" fill="#b45309" />

                {/* House 5 (Bottom Right) */}
                <polygon points="288,585 308,567 328,585" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                <rect x="293" y="585" width="30" height="24" fill="#fed7aa" stroke="#78350f" strokeWidth="1.5" />
                <rect x="304" y="593" width="8" height="16" fill="#b45309" />

                {/* Labels */}
                <text x="215" y="500" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="700" fontFamily="Prompt">บ้านพักครู</text>
                <text x="220" y="605" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="700" fontFamily="Prompt">บ้านพักครู</text>
              </g>

              {/* Group: Kindergarten (อนุบาล & ห้อง/โซน ผอ. & ต้นไม้ใหญ่) */}
              <g 
                className={`svg-zone ${selectedZone === 'kindergarten' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('kindergarten')}
              >
                {/* Big Tree next to Kindergarten (ต้นไม้ใหญ่) */}
                <g>
                  {/* Tree trunk */}
                  <rect x="326" y="325" width="10" height="28" fill="#78350f" rx="2" />
                  {/* Lush tree canopy */}
                  <circle cx="331" cy="305" r="22" fill="#86efac" stroke="#16a34a" strokeWidth="2.5" />
                  <circle cx="318" cy="295" r="16" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                  <circle cx="344" cy="295" r="16" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                  {/* Arrow and label: ต้นไม้ใหญ่ */}
                  <path d="M 331 350 L 331 370 M 331 350 L 326 358 M 331 350 L 336 358" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <text x="331" y="386" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="600" fontFamily="Prompt">ต้นไม้ใหญ่</text>
                </g>

                {/* Kindergarten Main Building (อนุบาล - Pink/Red) */}
                <rect x="240" y="240" width="65" height="85" fill="#fca5a5" rx="8" stroke="#dc2626" strokeWidth="2.5" filter="url(#soft-shadow)" />
                <rect x="248" y="248" width="49" height="30" fill="#fee2e2" rx="4" />
                <text x="272" y="288" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="700" fontFamily="Prompt">อนุบาล</text>

                {/* Director Area structure below kindergarten (ของ ผอ.) */}
                <rect x="244" y="325" width="57" height="52" fill="#f8fafc" rx="4" stroke="#64748b" strokeWidth="1.8" />
                <line x1="244" y1="350" x2="301" y2="350" stroke="#cbd5e1" strokeWidth="1.5" />
                
                {/* Arrow and label: ของ ผอ. */}
                <path d="M 235 348 Q 215 345 220 330" fill="none" stroke="#334155" strokeWidth="2" />
                <polygon points="233,344 238,349 231,351" fill="#334155" />
                <text x="205" y="322" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="700" fontFamily="Prompt">ของ ผอ.</text>
              </g>


              {/* ---------------------------------------------------- */}
              {/* 5. PLAYGROUND & TREE ROW (EAST OF ROAD, WEST OF FIELD) */}
              {/* ---------------------------------------------------- */}

              {/* Group: Playground (สนามเด็กเล่น BBL) */}
              <g 
                className={`svg-zone ${selectedZone === 'playground' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('playground')}
              >
                {/* Playground Purple Long Strip */}
                <rect x="388" y="295" width="40" height="175" fill="#e9d5ff" rx="14" stroke="#a855f7" strokeWidth="2" filter="url(#soft-shadow)" />
                {/* Rotated text for long strip */}
                <text 
                  x="408" 
                  y="385" 
                  textAnchor="middle" 
                  fill="#7e22ce" 
                  fontSize="12" 
                  fontWeight="700" 
                  fontFamily="Prompt"
                  transform="rotate(-90 408 385)"
                >
                  สนามเด็กเล่น
                </text>

                {/* Swings / seesaw playful decorations */}
                <circle cx="408" cy="315" r="4" fill="#a855f7" />
                <circle cx="408" cy="455" r="4" fill="#a855f7" />

                {/* Line of 7 Trees along the road */}
                <g>
                  {[305, 335, 365, 395, 425, 455, 485].map((yVal, idx) => (
                    <g key={idx}>
                      <circle cx="380" cy={yVal} r="10" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
                      <circle cx="377" cy={yVal - 3} r="3" fill="#bbf7d0" />
                    </g>
                  ))}
                </g>
              </g>


              {/* ---------------------------------------------------- */}
              {/* 6. CENTRAL QUAD: FOOTBALL FIELD & VOLLEYBALL COURT */}
              {/* ---------------------------------------------------- */}

              {/* Group: Football Field (สนามบอลใหญ่) */}
              <g 
                className={`svg-zone ${selectedZone === 'football' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('football')}
              >
                {/* Grass Boundary Container */}
                <rect x="445" y="270" width="375" height="205" fill="#4ade80" rx="12" stroke="#15803d" strokeWidth="3" filter="url(#soft-shadow)" />
                
                {/* Outer Field Lines */}
                <rect x="458" y="280" width="349" height="185" fill="#22c55e" stroke="#ffffff" strokeWidth="2.5" rx="6" />

                {/* Center Line */}
                <line x1="632" y1="280" x2="632" y2="465" stroke="#ffffff" strokeWidth="2.5" />
                
                {/* Center Circle */}
                <circle cx="632" cy="372" r="38" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="632" cy="372" r="3.5" fill="#ffffff" />

                {/* Left Penalty Box */}
                <rect x="458" y="322" width="60" height="100" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <rect x="458" y="342" width="25" height="60" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="500" cy="372" r="2.5" fill="#ffffff" />

                {/* Right Penalty Box */}
                <rect x="747" y="322" width="60" height="100" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <rect x="782" y="342" width="25" height="60" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="765" cy="372" r="2.5" fill="#ffffff" />

                {/* Corner Arcs */}
                <path d="M 458 290 A 10 10 0 0 0 468 280" fill="none" stroke="#ffffff" strokeWidth="2" />
                <path d="M 458 455 A 10 10 0 0 1 468 465" fill="none" stroke="#ffffff" strokeWidth="2" />
                <path d="M 807 290 A 10 10 0 0 1 797 280" fill="none" stroke="#ffffff" strokeWidth="2" />
                <path d="M 807 455 A 10 10 0 0 0 797 465" fill="none" stroke="#ffffff" strokeWidth="2" />

                {/* Large Text in center */}
                <text x="632" y="378" textAnchor="middle" fill="#064e3b" fontSize="18" fontWeight="800" fontFamily="Prompt" filter="drop-shadow(0 1px 2px rgba(255,255,255,0.7))">สนามบอล</text>
              </g>

              {/* Group: Volleyball Court (สนามวอลเลย์บอล) */}
              <g 
                className={`svg-zone ${selectedZone === 'volleyball' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('volleyball')}
              >
                {/* Court Container */}
                <rect x="495" y="495" width="88" height="75" fill="#86efac" rx="6" stroke="#15803d" strokeWidth="2" filter="url(#soft-shadow)" />
                {/* Court Infield */}
                <rect x="503" y="503" width="72" height="59" fill="#a7f3d0" stroke="#ffffff" strokeWidth="2" />
                {/* Net center line */}
                <line x1="539" y1="503" x2="539" y2="562" stroke="#059669" strokeWidth="3" strokeDasharray="3 2" />
                {/* Attack lines */}
                <line x1="527" y1="503" x2="527" y2="562" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="551" y1="503" x2="551" y2="562" stroke="#ffffff" strokeWidth="1.5" />

                {/* Text vertical */}
                <text x="517" y="536" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 517 536)">สนาม</text>
                <text x="539" y="536" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 539 536)">วอลเลย์</text>
                <text x="561" y="536" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 561 536)">บอล</text>
              </g>


              {/* ---------------------------------------------------- */}
              {/* 7. NORTH SIDE OF FIELD: FLAGPOLE & BUDDHA STATUE */}
              {/* ---------------------------------------------------- */}

              {/* Group: Flagpole & Buddha Statue */}
              <g 
                className={`svg-zone ${selectedZone === 'flagpole_shrine' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('flagpole_shrine')}
              >
                {/* Flagpole (เสาธง) */}
                <g>
                  {/* Base & Pole */}
                  <rect x="585" y="196" width="3" height="24" fill="#334155" />
                  <circle cx="586.5" cy="195" r="3.5" fill="#e5b326" />
                  {/* Thai Flag Waving */}
                  <rect x="588" y="197" width="18" height="3.5" fill="#ef4444" />
                  <rect x="588" y="200.5" width="18" height="3" fill="#ffffff" />
                  <rect x="588" y="203.5" width="18" height="5" fill="#1e3a8a" />
                  <rect x="588" y="208.5" width="18" height="3" fill="#ffffff" />
                  <rect x="588" y="211.5" width="18" height="3.5" fill="#ef4444" />
                  {/* Arrow & label: เสาธง */}
                  <path d="M 586 230 L 586 216 M 586 216 L 582 221 M 586 216 L 590 221" stroke="#1e293b" strokeWidth="2" fill="none" />
                  <text x="586" y="244" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="700" fontFamily="Prompt">เสาธง</text>
                </g>

                {/* Buddha Statue (พระพุทธรูป) */}
                <g>
                  {/* Pedestal & Statue silhouette */}
                  <rect x="635" y="202" width="20" height="6" fill="#78350f" rx="1" />
                  <path d="M 640 202 C 640 196, 642 192, 645 190 C 648 192, 650 196, 650 202 Z" fill="#d97706" />
                  <circle cx="645" cy="189" r="3.5" fill="#e5b326" />
                  <circle cx="645" cy="189" r="6" fill="#fef08a" opacity="0.4" />
                  {/* Arrow & label: พระพุทธรูป */}
                  <path d="M 650 230 L 646 215 M 646 215 L 643 220 M 646 215 L 650 220" stroke="#1e293b" strokeWidth="2" fill="none" />
                  <text x="655" y="244" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="700" fontFamily="Prompt">พระพุทธรูป</text>
                </g>
              </g>


              {/* ---------------------------------------------------- */}
              {/* 8. TOP ROW BUILDINGS (ALONG THE NORTH INTERNAL ROAD) */}
              {/* ---------------------------------------------------- */}

              {/* 8.1 Welfare Shop (ร้านค้าสวัสดิการ) */}
              <g 
                className={`svg-zone ${selectedZone === 'welfare' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('welfare')}
              >
                <rect x="388" y="142" width="50" height="54" fill="#e9d5ff" rx="6" stroke="#9333ea" strokeWidth="2" filter="url(#soft-shadow)" />
                <rect x="393" y="146" width="40" height="18" fill="#f3e8ff" rx="3" />
                <text x="413" y="172" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="700" fontFamily="Prompt">ร้านค้า</text>
                <text x="413" y="184" textAnchor="middle" fill="#6b21a8" fontSize="9" fontWeight="700" fontFamily="Prompt">สวัสดิการ</text>
              </g>

              {/* 8.2 Restroom 1 (ห้องน้ำ โซนร้านสวัสดิการ) */}
              <g 
                className={`svg-zone ${selectedZone === 'restroom1' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('restroom1')}
              >
                <rect x="397" y="94" width="34" height="34" fill="#fed7aa" rx="5" stroke="#ea580c" strokeWidth="2" filter="url(#soft-shadow)" />
                {/* Arrow pointing up */}
                <path d="M 405 138 Q 400 120 412 116" fill="none" stroke="#ea580c" strokeWidth="1.8" />
                <text x="414" y="85" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="700" fontFamily="Prompt">ห้องน้ำ</text>
              </g>

              {/* 8.3 Canteen (โรงอาหาร) */}
              <g 
                className={`svg-zone ${selectedZone === 'canteen' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('canteen')}
              >
                <rect x="448" y="125" width="56" height="71" fill="#fed7aa" rx="6" stroke="#ea580c" strokeWidth="2.5" filter="url(#soft-shadow)" />
                <rect x="453" y="130" width="46" height="24" fill="#ffedd5" rx="3" />
                <text x="476" y="166" textAnchor="middle" fill="#9a3412" fontSize="13" fontWeight="700" fontFamily="Prompt">โรง</text>
                <text x="476" y="184" textAnchor="middle" fill="#9a3412" fontSize="13" fontWeight="700" fontFamily="Prompt">อาหาร</text>
              </g>

              {/* 8.4 Building 1 (อาคาร 1 - Main Large Building) */}
              <g 
                className={`svg-zone ${selectedZone === 'b1' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('b1')}
              >
                <rect x="514" y="122" width="168" height="74" fill="#d8b4fe" rx="8" stroke="#7e22ce" strokeWidth="3" filter="url(#soft-shadow)" />
                <rect x="522" y="130" width="152" height="20" fill="#f3e8ff" rx="4" />
                {/* Small windows pattern */}
                <g fill="#c084fc">
                  <rect x="526" y="134" width="16" height="12" rx="2" />
                  <rect x="548" y="134" width="16" height="12" rx="2" />
                  <rect x="570" y="134" width="16" height="12" rx="2" />
                  <rect x="618" y="134" width="16" height="12" rx="2" />
                  <rect x="640" y="134" width="16" height="12" rx="2" />
                  <rect x="652" y="134" width="16" height="12" rx="2" />
                </g>
                <text x="598" y="172" textAnchor="middle" fill="#581c87" fontSize="18" fontWeight="800" fontFamily="Prompt">อาคาร 1</text>
              </g>

              {/* 8.5 Building 2 (อาคาร 2) */}
              <g 
                className={`svg-zone ${selectedZone === 'b2' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('b2')}
              >
                <rect x="692" y="122" width="80" height="74" fill="#fca5a5" rx="7" stroke="#dc2626" strokeWidth="2.5" filter="url(#soft-shadow)" />
                <rect x="698" y="128" width="68" height="20" fill="#fee2e2" rx="3" />
                <text x="732" y="172" textAnchor="middle" fill="#991b1b" fontSize="15" fontWeight="700" fontFamily="Prompt">อาคาร 2</text>
              </g>

              {/* 8.6 Restroom 2 (ห้องน้ำ โซนอาคาร 2) */}
              <g 
                className={`svg-zone ${selectedZone === 'restroom2' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('restroom2')}
              >
                <rect x="782" y="118" width="62" height="78" fill="#bae6fd" rx="6" stroke="#0284c7" strokeWidth="2" filter="url(#soft-shadow)" />
                <text x="813" y="158" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="700" fontFamily="Prompt">ห้อง</text>
                <text x="813" y="174" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="700" fontFamily="Prompt">น้ำ</text>
              </g>

              {/* 8.7 Parking Lot (ลานจอดรถ) */}
              <g 
                className={`svg-zone ${selectedZone === 'parking' ? 'active-zone' : ''}`}
                onClick={() => setSelectedZone('parking')}
              >
                <rect x="854" y="118" width="66" height="78" fill="#fbcfe8" rx="6" stroke="#db2777" strokeWidth="2" strokeDasharray="3 3" filter="url(#soft-shadow)" />
                {/* Parking stalls lines */}
                <line x1="864" y1="126" x2="898" y2="126" stroke="#db2777" strokeWidth="1.5" />
                <line x1="864" y1="140" x2="898" y2="140" stroke="#db2777" strokeWidth="1.5" />
                <line x1="864" y1="154" x2="898" y2="154" stroke="#db2777" strokeWidth="1.5" />
                <text x="887" y="174" textAnchor="middle" fill="#9d174d" fontSize="10" fontWeight="700" fontFamily="Prompt">ลานจอดรถ</text>
              </g>

              {/* Compass Rose Accent */}
              <g transform="translate(900, 50)" opacity="0.85">
                <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                <polygon points="0,-18 5,-2 0,0" fill="#dc2626" />
                <polygon points="0,-18 -5,-2 0,0" fill="#ef4444" />
                <polygon points="0,18 5,2 0,0" fill="#64748b" />
                <polygon points="0,18 -5,2 0,0" fill="#94a3b8" />
                <text x="0" y="-22" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="800">N</text>
              </g>

            </svg>
          </div>

          {/* Quick Zone Jump Badges */}
          <div className="zone-jump-bar">
            <span className="jump-label"><MapPin size={14} /> เลือกดูสถานที่:</span>
            <div className="jump-scroll-row">
              {filteredZoneKeys.map(key => {
                const z = campusZones[key];
                const isSelected = selectedZone === key;
                return (
                  <button
                    key={key}
                    className={`jump-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedZone(key)}
                  >
                    <span className="chip-dot" style={{ backgroundColor: z.color }}></span>
                    <span>{z.name.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Rich Information Details Card */}
        <div className="details-view-card">
          <div className="details-header-banner" style={{ borderTopColor: currentZone.color }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="zone-badge" style={{ backgroundColor: `${currentZone.color}20`, color: currentZone.color, borderColor: currentZone.color }}>
                {currentZone.badgeText}
              </span>
              <span className="area-text">พื้นที่: {currentZone.area}</span>
            </div>
            <h3 className="zone-title">{currentZone.name}</h3>
            <p className="zone-title-en">{currentZone.nameEn}</p>
            <p className="zone-type-badge">
              <Building2 size={14} /> {currentZone.type}
            </p>
          </div>

          <div className="details-body">
            <div className="info-block">
              <h5 className="info-heading">
                <Sparkles size={16} className="text-secondary" /> รายละเอียดและการใช้งาน:
              </h5>
              <p className="info-desc">{currentZone.desc}</p>
            </div>

            <div className="info-block mt-4">
              <h5 className="info-heading">
                <CheckCircle2 size={16} className="text-secondary" /> จุดเด่นและฟังก์ชันภายใน:
              </h5>
              <ul className="highlights-list">
                {currentZone.highlights.map((item, idx) => (
                  <li key={idx}>
                    <ArrowRight size={14} className="bullet-arrow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="school-safety-notice mt-4">
              <div className="notice-icon">
                <Compass size={20} />
              </div>
              <div className="notice-text">
                <strong>โรงเรียนบ้านวังหัวแหวนพัฒนา</strong>
                <p>มุ่งสร้างบรรยากาศและสภาพแวดล้อมที่สะอาด ปลอดภัย และเอื้อต่อการเรียนรู้ของนักเรียนทุกคน</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded Styles */}
      <style>{`
        .campus-view {
          min-height: 80vh;
        }

        .category-filters-row {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cat-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background-color: white;
          color: var(--color-text-main);
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .cat-pill-btn:hover {
          border-color: var(--color-secondary);
          color: var(--color-primary);
          transform: translateY(-1px);
        }

        .cat-pill-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(11, 37, 69, 0.2);
        }

        /* 2-Column Campus Layout */
        .campus-grid-container {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .campus-grid-container {
            grid-template-columns: 1fr;
          }
        }

        /* Map View Card */
        .map-view-card {
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .map-card-topbar {
          background: linear-gradient(135deg, var(--color-primary) 0%, #0f325d 100%);
          color: white;
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          font-family: var(--font-heading);
          border-bottom: 2px solid var(--color-secondary);
          flex-wrap: wrap;
          gap: 8px;
        }

        .topbar-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .topbar-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          opacity: 0.95;
        }

        .blueprint-canvas-wrapper {
          background-color: #f8fafc;
          padding: 16px;
          display: flex;
          justify-content: center;
        }

        .campus-master-svg {
          width: 100%;
          height: auto;
          max-height: 560px;
          display: block;
        }

        /* Interactive SVG Zone Styles */
        .svg-zone {
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .svg-zone:hover {
          filter: brightness(1.06) drop-shadow(0 4px 10px rgba(11, 37, 69, 0.25));
        }

        .svg-zone.active-zone {
          filter: drop-shadow(0 0 10px #e5b326) brightness(1.05);
        }

        /* Zone Jump Bottom Bar */
        .zone-jump-bar {
          padding: 12px 18px;
          background-color: #f8fafc;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .jump-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .jump-scroll-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: thin;
        }

        .jump-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: white;
          font-size: 0.82rem;
          font-family: var(--font-heading);
          color: var(--color-text-main);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        .jump-chip:hover {
          border-color: var(--color-secondary);
        }

        .jump-chip.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .chip-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* Details View Card */
        .details-view-card {
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .details-header-banner {
          padding: 24px;
          background: linear-gradient(180deg, #f8fafc 0%, white 100%);
          border-top: 5px solid var(--color-primary);
          border-bottom: 1px solid var(--color-border);
        }

        .zone-badge {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          border: 1px solid;
          font-family: var(--font-heading);
        }

        .area-text {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .zone-title {
          font-size: 1.35rem;
          color: var(--color-primary);
          font-weight: 700;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .zone-title-en {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 10px;
          font-weight: 500;
        }

        .zone-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #475569;
          background-color: #f1f5f9;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 500;
        }

        .details-body {
          padding: 24px;
        }

        .info-heading {
          font-size: 0.98rem;
          color: var(--color-primary);
          font-weight: 700;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-desc {
          font-size: 0.94rem;
          color: var(--color-text-main);
          line-height: 1.65;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .highlights-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--color-text-main);
        }

        .bullet-arrow {
          color: var(--color-secondary);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .school-safety-notice {
          background-color: #eff6ff;
          border-radius: var(--radius-md);
          border: 1px solid #bfdbfe;
          padding: 14px 16px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .notice-icon {
          color: #2563eb;
          flex-shrink: 0;
        }

        .notice-text strong {
          display: block;
          font-size: 0.88rem;
          color: #1e3a8a;
          margin-bottom: 2px;
        }

        .notice-text p {
          font-size: 0.82rem;
          color: #3b82f6;
          margin: 0;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
