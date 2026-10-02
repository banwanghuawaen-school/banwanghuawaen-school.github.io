import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Footprints,
  Trees, 
  Coffee, 
  Car, 
  Home, 
  Trophy, 
  Compass,
  Sun,
  Moon,
  Tag
} from 'lucide-react';

export default function CampusMap() {
  const [selectedZone, setSelectedZone] = useState('b1'); // default to Main Building 1
  const [activeCategory, setActiveCategory] = useState('all');
  const [isNightMode, setIsNightMode] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const campusZones = {
    b1: {
      id: 'b1',
      number: '1',
      category: 'academic',
      name: 'อาคาร 1 (อาคารเรียนหลักวังพัฒนา)',
      nameEn: 'Building 1 (Main Academic Building)',
      type: 'อาคารเรียนมาตรฐาน 2 ชั้น ขนาดใหญ่',
      color: '#8b5cf6',
      badgeText: 'อาคารหลัก',
      desc: 'อาคารเรียน 2 ชั้น ขนาดใหญ่ ศูนย์กลางการจัดการเรียนการสอนระดับประถมศึกษา พร้อมระบบห้องเรียนคุณภาพและศูนย์เทคโนโลยีสารสนเทศเพื่อการศึกษา',
      highlights: [
        'ชั้นที่ 1: ห้องพักครู, ห้องธุรการ-การเงิน, ห้องเรียนชั้น ป.1 - ป.3',
        'ชั้นที่ 2: ห้องเรียนชั้น ป.4 - ป.6, ห้องปฏิบัติการคอมพิวเตอร์และสื่อการเรียนรู้ทางไกลผ่านดาวเทียม (DLTV)',
        'ติดตั้งระบบ Smart TV และเครือข่ายสัญญาณอินเทอร์เน็ตความเร็วสูงทุกห้องเรียน'
      ],
      facilities: ['ห้องเรียนประถม 6 ห้อง', 'ห้องพักครูและธุรการ', 'ห้องปฏิบัติการคอมพิวเตอร์'],
      area: '280 ตร.ม.'
    },
    b2: {
      id: 'b2',
      number: '2',
      category: 'academic',
      name: 'อาคาร 2 (ศูนย์การเรียนรู้สร้างสรรค์)',
      nameEn: 'Building 2 (Creative Learning Center)',
      type: 'อาคารเรียน 1 ชั้น โครงสร้างมาตรฐาน',
      color: '#f97316',
      badgeText: 'อาคาร 2',
      desc: 'อาคารจัดกิจกรรมการเรียนรู้และแหล่งค้นคว้าเฉพาะทาง รองรับการพัฒนาทักษะวิชาการ การศึกษาค้นคว้า และการดูแลสุขอนามัยของผู้เรียน',
      highlights: [
        'ห้องสมุดมีชีวิตและศูนย์วิทยบริการสถานศึกษา',
        'ห้องปฏิบัติการวิทยาศาสตร์พื้นฐานและโครงงานนักเรียน',
        'ห้องพยาบาลมาตรฐาน พร้อมอุปกรณ์และเวชภัณฑ์ปฐมพยาบาลเบื้องต้น'
      ],
      facilities: ['ห้องสมุดมีชีวิต', 'มุมวิทยาศาสตร์', 'ห้องพยาบาล'],
      area: '160 ตร.ม.'
    },
    kindergarten: {
      id: 'kindergarten',
      number: 'อ.',
      category: 'academic',
      name: 'อาคารเรียนปฐมวัย (อนุบาล) & ห้องผู้อำนวยการสถานศึกษา',
      nameEn: 'Early Childhood Center & Director Office',
      type: 'อาคารเรียนปฐมวัยและห้องปฏิบัติงานผู้บริหาร',
      color: '#f43f5e',
      badgeText: 'อนุบาล & ผู้อำนวยการ',
      desc: 'อาคารเรียนระดับปฐมวัย (อนุบาล 2 - อนุบาล 3) พร้อมห้องปฏิบัติงานผู้อำนวยการสถานศึกษา ออกแบบตามมาตรฐานความปลอดภัยและเอื้อต่อพัฒนาการของผู้เรียน',
      highlights: [
        'ห้องเรียนระดับปฐมวัยพร้อมสื่อส่งเสริมพัฒนาการกล้ามเนื้อและทักษะสมอง',
        'มุมส่งเสริมการอ่านและพื้นที่กิจกรรมสร้างสรรค์ตามหลัก BBL',
        'ห้องปฏิบัติงานผู้อำนวยการสถานศึกษา',
        'สภาพแวดล้อมร่มรื่นด้วยพรรณไม้ธรรมชาติเพื่อสุขภาวะที่ดี'
      ],
      facilities: ['ห้องเรียนระดับปฐมวัย', 'ห้องผู้อำนวยการสถานศึกษา', 'มุมส่งเสริมพัฒนาการ BBL'],
      area: '190 ตร.ม.'
    },
    canteen: {
      id: 'canteen',
      number: '3',
      category: 'service',
      name: 'อาคารโรงอาหารสถานศึกษา',
      nameEn: 'School Cafeteria & Nutrition Hall',
      type: 'อาคารบริการโภชนาการนักเรียน',
      color: '#f59e0b',
      badgeText: 'โรงอาหาร',
      desc: 'สถานที่ประกอบอาหารและบริการอาหารกลางวันสำหรับนักเรียนและบุคลากร สะอาด ถูกสุขอนามัยตามเกณฑ์มาตรฐานสุขาภิบาลอาหาร สพฐ.',
      highlights: [
        'โรงครัวมาตรฐาน ปรุงอาหารสดใหม่ สะอาด ถูกหลักโภชนาการทุกวันราชการ',
        'โต๊ะรับประทานอาหารเป็นระเบียบสำหรับนักเรียนทุกระดับชั้น',
        'จุดล้างมือน้ำไหลและจุดส่งเสริมสุขอนามัยประจำสถานศึกษา'
      ],
      facilities: ['โรงครัวมาตรฐาน สพฐ.', 'โต๊ะรับประทานอาหาร', 'จุดล้างมือน้ำไหล'],
      area: '140 ตร.ม.'
    },
    welfare: {
      id: 'welfare',
      number: '4',
      category: 'service',
      name: 'ร้านค้าสวัสดิการและสหกรณ์นักเรียน',
      nameEn: 'Welfare & Student Cooperative Store',
      type: 'อาคารบริการสวัสดิการทางการศึกษา',
      color: '#a855f7',
      badgeText: 'ร้านสวัสดิการ',
      desc: 'ร้านค้าสวัสดิการและกิจกรรมสหกรณ์นักเรียน จำหน่ายแบบเรียน เครื่องเขียน อุปกรณ์การศึกษา และอาหารว่างที่มีคุณค่าทางโภชนาการ',
      highlights: [
        'แหล่งฝึกปฏิบัติจริงด้านทักษะอาชีพและการทำบัญชีสหกรณ์นักเรียน',
        'จำหน่ายอุปกรณ์การเรียนราคายุติธรรมเพื่อแบ่งเบาภาระผู้ปกครอง',
        'บริการเครื่องดื่มและนมโรงเรียนคุณภาพ'
      ],
      facilities: ['ร้านค้าสหกรณ์', 'มุมเครื่องเขียน', 'มุมอาหารว่างถูกสุขลักษณะ'],
      area: '45 ตร.ม.'
    },
    restroom1: {
      id: 'restroom1',
      number: 'ส1',
      category: 'service',
      name: 'อาคารสุขา (โซนร้านค้าสวัสดิการ)',
      nameEn: 'Sanitary Restroom Zone A',
      type: 'อาคารสุขอนามัย',
      color: '#ea580c',
      badgeText: 'สุขา โซน 1',
      desc: 'อาคารสุขาสำหรับนักเรียนระดับปฐมวัยและผู้มาติดต่อราชการ แยกสัดส่วนชาย-หญิง สะอาด ปลอดภัย และถูกสุขลักษณะ',
      highlights: [
        'แยกสัดส่วนห้องน้ำชาย-หญิงชัดเจน ปลอดภัย',
        'สุขภัณฑ์สำหรับเด็กปฐมวัยเพื่อความสะดวกสบาย',
        'เจ้าหน้าที่ดูแลทำความสะอาดสม่ำเสมอ'
      ],
      facilities: ['ห้องน้ำชาย', 'ห้องน้ำหญิง', 'อ่างล้างมือพร้อมสบู่'],
      area: '35 ตร.ม.'
    },
    restroom2: {
      id: 'restroom2',
      number: 'ส2',
      category: 'service',
      name: 'อาคารสุขา (โซนอาคารเรียน 2)',
      nameEn: 'Sanitary Restroom Zone B',
      type: 'อาคารสุขอนามัย',
      color: '#0284c7',
      badgeText: 'สุขา โซน 2',
      desc: 'อาคารสุขาหลักสำหรับนักเรียนระดับประถมศึกษาและข้าราชการครู ตั้งอยู่ทางทิศตะวันออกติดกับอาคารเรียน 2',
      highlights: [
        'ห้องสุขามาตรฐานและจุดชำระร่างกายหลังกิจกรรมพลศึกษา',
        'ระบบประหยัดน้ำและสุขภัณฑ์ประหยัดพลังงาน',
        'รองรับการใช้งานช่วงพักกลางวันได้อย่างมีประสิทธิภาพ'
      ],
      facilities: ['ห้องสุขาประถม', 'จุดอาบน้ำนักกีฬา', 'อ่างล้างมือสุขอนามัย'],
      area: '50 ตร.ม.'
    },
    parking: {
      id: 'parking',
      number: 'P',
      category: 'facility',
      name: 'ลานจอดรถสถานศึกษา',
      nameEn: 'Official Parking Complex',
      type: 'พื้นที่จอดรถยนต์และจักรยานยนต์',
      color: '#db2777',
      badgeText: 'ลานจอดรถ',
      desc: 'พื้นที่จอดรถยนต์และจักรยานยนต์ สำหรับข้าราชการครู บุคลากรทางการศึกษา และผู้เดินทางมาติดต่อราชการ',
      highlights: [
        'ช่องจอดรถยนต์และช่องจอดรถจักรยานยนต์เป็นระเบียบเรียบร้อย',
        'เส้นทางสัญจรสะดวก เชื่อมต่อกับถนนภายในสถานศึกษา',
        'ระบบไฟส่องสว่างเวลากลางคืนเพื่อความปลอดภัย'
      ],
      facilities: ['ช่องจอดรถยนต์บุคลากร', 'ช่องจอดรถผู้มาติดต่อราชการ', 'ที่จอดรถจักรยานยนต์'],
      area: '180 ตร.ม.'
    },
    football: {
      id: 'football',
      number: '⚽',
      category: 'sports',
      name: 'สนามฟุตบอลสถานศึกษา (สนามหญ้ามาตรฐาน)',
      nameEn: 'Main Football Field',
      type: 'สนามกีฬากลางแจ้งขนาดใหญ่',
      color: '#22c55e',
      badgeText: 'สนามบอล',
      desc: 'สนามฟุตบอลหญ้าธรรมชาติขนาดมาตรฐาน ศูนย์กลางการจัดกิจกรรมกลางแจ้ง การแข่งขันกีฬา และการส่งเสริมสุขภาพพลานามัย',
      highlights: [
        'สนามหญ้าตัดแต่งเรียบสม่ำเสมอ พร้อมเส้นเขตสนามชัดเจน',
        'ประตูฟุตบอลมาตรฐานพร้อมตาข่าย ปลอดภัย',
        'ใช้ในการจัดการเรียนรู้กลุ่มสาระสุขศึกษาและพลศึกษา'
      ],
      facilities: ['สนามหญ้ามาตรฐาน', 'ประตูฟุตบอล 2 ฝั่ง', 'เส้นเขตสนามฟุตบอล'],
      area: '1,200 ตร.ม.'
    },
    volleyball: {
      id: 'volleyball',
      number: '🏐',
      category: 'sports',
      name: 'สนามวอลเลย์บอล & ลานกีฬาอเนกประสงค์',
      nameEn: 'Volleyball & Takraw Arena',
      type: 'สนามกีฬากลางแจ้งคอนกรีตมาตรฐาน',
      color: '#10b981',
      badgeText: 'สนามวอลเลย์',
      desc: 'สนามวอลเลย์บอลคอนกรีตมาตรฐาน ตั้งอยู่ด้านหน้าติดแนวรั้วโรงเรียน ใช้ฝึกซ้อมกีฬาวอลเลย์บอล ตะกร้อ และกิจกรรมนันทนาการ',
      highlights: [
        'พื้นคอนกรีตทาสีกันลื่น พร้อมเส้นสนามมาตรฐาน',
        'เสาและตาข่ายวอลเลย์บอลที่ได้มาตรฐานความปลอดภัย',
        'สภาพแวดล้อมร่มรื่นด้วยทิวทัศน์ธรรมชาติ'
      ],
      facilities: ['สนามคอนกรีตมาตรฐาน', 'เสาและตาข่ายวอลเลย์บอล', 'เส้นเขตตะกร้อ'],
      area: '162 ตร.ม.'
    },
    playground: {
      id: 'playground',
      number: 'BBL',
      category: 'sports',
      name: 'สนามเด็กเล่นสร้างสรรค์ (BBL) & พื้นที่ร่มรื่น',
      nameEn: 'BBL Creative Playground',
      type: 'พื้นที่เรียนรู้กลางแจ้งและเครื่องเล่นพัฒนาการ',
      color: '#a855f7',
      badgeText: 'สนามเด็กเล่น',
      desc: 'สนามเด็กเล่นแนวยาวขนานถนนหลัก ร่มรื่นด้วยแมกไม้ธรรมชาติ พร้อมเครื่องเล่นส่งเสริมพัฒนาการสมอง (Brain-based Learning: BBL)',
      highlights: [
        'เครื่องเล่นเสริมทักษะ: สไลเดอร์, ชิงช้า, กระดานกระดก, บาร์โหนทรงตัว',
        'ลานกระโดดและภาพวาดลายพื้นพัฒนาทักษะสมอง (BBL Floor Games)',
        'ภูมิทัศน์ร่มรื่น ให้ร่มเงาตลอดวันสำหรับการจัดกิจกรรมกลางแจ้ง'
      ],
      facilities: ['สไลเดอร์', 'ชุดชิงช้า', 'บาร์โหนทรงตัว', 'พื้นที่ร่มรื่นธรรมชาติ'],
      area: '220 ตร.ม.'
    },
    flagpole_shrine: {
      id: 'flagpole_shrine',
      number: 'ธง-พระ',
      category: 'facility',
      name: 'ลานเสาธงชาติและซุ้มพระพุทธรูปประจำสถานศึกษา',
      nameEn: 'Flagpole Plaza & Buddha Shrine',
      type: 'ลานพิธีการเคารพธงชาติและศูนย์รวมจิตใจ',
      color: '#d97706',
      badgeText: 'เสาธง / พระพุทธรูป',
      desc: 'ศูนย์รวมจิตใจของสถานศึกษา ใช้ประกอบกิจกรรมเข้าแถวเคารพธงชาติ สวดมนต์ไหว้พระ และรับฟังโอวาทในยามเช้าของทุกวันเปิดทำการเรียนการสอน',
      highlights: [
        'เสาธงชาติมาตรฐาน บริเวณด้านหน้าอาคารเรียนหลัก',
        'ซุ้มประดิษฐานพระพุทธรูปประจำโรงเรียนบ้านวังหัวแหวนพัฒนา',
        'ลานคอนกรีตสำหรับกิจกรรมหน้าเสาธงอย่างเป็นระเบียบเรียบร้อย'
      ],
      facilities: ['เสาธงชาติมาตรฐาน', 'ซุ้มพระพุทธรูป', 'ลานเข้าแถวเคารพธงชาติ'],
      area: '80 ตร.ม.'
    },
    teachers_housing: {
      id: 'teachers_housing',
      number: 'พักครู',
      category: 'facility',
      name: 'กลุ่มบ้านพักข้าราชการครูและบุคลากร (5 หลัง)',
      nameEn: 'Teachers Residential Cottages (5 Houses)',
      type: 'เขตที่พักอาศัยของคณะครูและบุคลากร',
      color: '#b45309',
      badgeText: 'บ้านพักครู',
      desc: 'บ้านพักสำหรับข้าราชการครูและบุคลากรทางการศึกษา จำนวน 5 หลัง มีครูเวรปฏิบัติหน้าที่รักษาความปลอดภัยของสถานศึกษาตลอด 24 ชั่วโมง',
      highlights: [
        'บ้านพักครูจำนวน 5 หลังพร้อมระบบสาธารณูปโภคครบถ้วน',
        'มีครูเวรปฏิบัติหน้าที่ดูแลรักษาความปลอดภัยของสถานศึกษาตลอด 24 ชั่วโมง',
        'สภาพแวดล้อมร่มรื่น ปลอดภัย และใกล้ชิดธรรมชาติ'
      ],
      facilities: ['บ้านพักครู 5 หลัง', 'พื้นที่พักผ่อน', 'ระบบความปลอดภัยสถานศึกษา'],
      area: '450 ตร.ม.'
    },
    gate_fence: {
      id: 'gate_fence',
      number: 'ประตู',
      category: 'facility',
      name: 'ซุ้มประตูทางเข้า ป้ายชื่อสถานศึกษา และแนวรั้วมาตรฐาน',
      nameEn: 'School Gate, Plaque & Boundary Fence',
      type: 'ทางเข้าหลักและระบบรักษาความปลอดภัย',
      color: '#334155',
      badgeText: 'ประตู & รั้ว',
      desc: 'ทางเข้าหลักของโรงเรียนบ้านวังหัวแหวนพัฒนา ประดับป้ายหินสลักชื่อสถานศึกษา พร้อมระบบรักษาความปลอดภัย',
      highlights: [
        'ป้ายชื่อโรงเรียนบ้านวังหัวแหวนพัฒนา สง่างามริมทางหลวงชนบท',
        'ประตูรั้วเหล็กเปิด-ปิดตามระเบียบเวลาปฏิบัติราชการเพื่อความปลอดภัย',
        'แนวรั้วรอบบริเวณสถานศึกษาเพื่อความปลอดภัยของผู้เรียน'
      ],
      facilities: ['ป้ายหินสลักทางการ', 'ประตูรั้วเหล็ก', 'แนวรั้วความปลอดภัย'],
      area: 'ตลอดแนวหน้าสถานศึกษา'
    }
  };

  const currentZone = campusZones[selectedZone] || campusZones.b1;

  const categories = [
    { id: 'all', label: 'ทั้งหมด (14 เขตพื้นที่)', icon: Compass },
    { id: 'academic', label: 'อาคารเรียนและแหล่งเรียนรู้', icon: Building2 },
    { id: 'sports', label: 'สนามกีฬาและลานกิจกรรม', icon: Trophy },
    { id: 'service', label: 'อาคารบริการและสุขอนามัย', icon: Coffee },
    { id: 'facility', label: 'อาคารที่พักและลานพิธีการ', icon: Home }
  ];

  const filteredZoneKeys = Object.keys(campusZones).filter(key => {
    if (activeCategory === 'all') return true;
    return campusZones[key].category === activeCategory;
  });

  return (
    <div className={`campus-view-wrapper ${isNightMode ? 'mode-night' : 'mode-day'} animate-fade-in`}>
      <div className="container section-padding">
        
        {/* Page Top Title */}
        <div className="page-header text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <span className="section-tag-gold">CAMPUS MASTER PLAN</span>
          </div>
          <h2 className="master-title">
            แผนผังบริเวณและอาคารสถานที่ โรงเรียนบ้านวังหัวแหวนพัฒนา
          </h2>
          <div className="school-divider">
            <span className="school-divider-dot"></span>
          </div>
          <p className="master-subtitle">
            แผนผังแสดงตำแหน่งอาคารเรียน อาคารประกอบการ ลานกิจกรรม และระบบสาธารณูปโภคภายในสถานศึกษา จัดวางตามผังแม่บทจริงอย่างเป็นระเบียบ
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="controls-island mb-4">
          <div className="filters-group">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={15} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="toggles-group">
            {/* Day / Night Ambience Toggle */}
            <button 
              className={`ambience-toggle-btn ${isNightMode ? 'night' : 'day'}`}
              onClick={() => setIsNightMode(!isNightMode)}
              title={isNightMode ? "เปลี่ยนเป็นโหมดกลางวัน" : "เปลี่ยนเป็นโหมดพลบค่ำ/ราตรี"}
            >
              {isNightMode ? (
                <>
                  <Moon size={16} className="text-warning" />
                  <span>โหมดราตรี</span>
                </>
              ) : (
                <>
                  <Sun size={16} className="text-warning" />
                  <span>โหมดกลางวัน</span>
                </>
              )}
            </button>

            {/* Labels Toggle */}
            <button 
              className={`label-toggle-btn ${showLabels ? 'active' : ''}`}
              onClick={() => setShowLabels(!showLabels)}
              title="เปิด/ปิดป้ายชื่ออาคาร"
            >
              <Tag size={15} />
              <span>{showLabels ? 'ซ่อนป้ายชื่อ' : 'แสดงป้ายชื่อ'}</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Showcase */}
        <div className="campus-stage-grid">
          
          {/* Left Canvas Column: Clean, Perfectly Organized 2D Blueprint */}
          <div className="stage-canvas-panel">
            <div className="canvas-header-bar">
              <div className="d-flex align-items-center gap-2">
                <Layers size={18} className="text-secondary" />
                <span className="fw-semibold">แผนผังบริเวณสถานศึกษา (เลือกอาคารหรือพื้นที่เพื่อดูรายละเอียด)</span>
              </div>
              <div className="selected-indicator">
                <Footprints size={14} /> เลือกดู: <strong>{currentZone.name.split(' (')[0]}</strong>
              </div>
            </div>

            <div className={`canvas-viewport ${isNightMode ? 'night-ambient' : 'day-ambient'}`}>
              <svg 
                viewBox="0 0 960 670" 
                className="master-svg-canvas"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Clean Background Grid */}
                  <pattern id="clean-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke={isNightMode ? "rgba(255,255,255,0.05)" : "rgba(11,37,69,0.06)"} strokeWidth="0.8" />
                  </pattern>

                  {/* Active Highlight Glow */}
                  <filter id="clean-glow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f59e0b" floodOpacity="0.8" />
                  </filter>
                </defs>

                {/* 1. Base Canvas Background with Notebook Grid */}
                <rect x="0" y="0" width="960" height="670" fill={isNightMode ? "#091322" : "#fdfcf9"} rx="14" />
                <rect x="15" y="15" width="930" height="640" fill="url(#clean-grid)" rx="10" stroke={isNightMode ? "#1e293b" : "#e2e8f0"} strokeWidth="1.5" />

                {/* Top-Left Blueprint Emblem & Orientation (Balances Top-Left Space) */}
                <g>
                  {/* Compass Rose */}
                  <g transform="translate(65, 55)">
                    <circle cx="0" cy="0" r="18" fill={isNightMode ? "#1e293b" : "#ffffff"} stroke={isNightMode ? "#475569" : "#cbd5e1"} strokeWidth="1.5" />
                    <polygon points="0,-14 4,-2 0,0" fill="#dc2626" />
                    <polygon points="0,-14 -4,-2 0,0" fill="#ef4444" />
                    <polygon points="0,14 4,2 0,0" fill="#64748b" />
                    <polygon points="0,14 -4,2 0,0" fill="#94a3b8" />
                    <text x="0" y="-18" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="900">N</text>
                  </g>
                  {/* Map Orientation Tag */}
                  <text x="96" y="50" fill={isNightMode ? "#cbd5e1" : "#1e293b"} fontSize="12" fontWeight="800" fontFamily="Prompt">แผนผังแม่บทสถานศึกษา</text>
                  <text x="96" y="66" fill={isNightMode ? "#64748b" : "#94a3b8"} fontSize="10" fontWeight="600" fontFamily="Prompt">รร.บ้านวังหัวแหวนพัฒนา</text>
                </g>

                {/* ---------------------------------------------------- */}
                {/* 2. ROAD NETWORK (ถนนภายในโรงเรียน - จัดวางสมดุลกึ่งกลาง) */}
                {/* ---------------------------------------------------- */}
                
                {/* Vertical Main Road from Gate up to North Road */}
                <rect x="300" y="20" width="45" height="585" fill={isNightMode ? "#1e293b" : "#64748b"} rx="2" />
                {/* Clean center dashed line for vertical road */}
                <line x1="322.5" y1="25" x2="322.5" y2="595" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="12 10" opacity="0.8" />

                {/* Horizontal North Road in front of the buildings */}
                <rect x="300" y="135" width="605" height="44" fill={isNightMode ? "#1e293b" : "#64748b"} rx="2" />
                {/* Clean center dashed line for horizontal road */}
                <line x1="345" y1="157" x2="895" y2="157" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="14 10" opacity="0.8" />

                {/* Smooth road intersection box */}
                <rect x="300" y="135" width="45" height="44" fill={isNightMode ? "#1e293b" : "#64748b"} />

                {/* Road Borders */}
                <line x1="300" y1="20" x2="300" y2="605" stroke="#334155" strokeWidth="2" />
                <line x1="345" y1="20" x2="345" y2="135" stroke="#334155" strokeWidth="2" />
                <line x1="345" y1="179" x2="345" y2="605" stroke="#334155" strokeWidth="2" />
                <line x1="300" y1="135" x2="905" y2="135" stroke="#334155" strokeWidth="2" />
                <line x1="345" y1="179" x2="905" y2="179" stroke="#334155" strokeWidth="2" />


                {/* ---------------------------------------------------- */}
                {/* 3. TOP ROW OF BUILDINGS (เหนือถนนแนวนอน - กระจายสมดุล) */}
                {/* ---------------------------------------------------- */}

                {/* 3.1 Welfare Shop (ร้านค้าสวัสดิการ) */}
                <g 
                  className={`zone-item ${selectedZone === 'welfare' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('welfare')}
                  filter={selectedZone === 'welfare' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="360" y="55" width="55" height="74" fill={isNightMode ? "#4c1d95" : "#e9d5ff"} rx="6" stroke="#9333ea" strokeWidth="2" />
                  <text x="387" y="90" textAnchor="middle" fill="#581c87" fontSize="12" fontWeight="700" fontFamily="Prompt">ร้านค้า</text>
                  <text x="387" y="108" textAnchor="middle" fill="#581c87" fontSize="11" fontWeight="700" fontFamily="Prompt">สวัสดิการ</text>
                </g>

                {/* 3.2 Restroom 1 (ห้องน้ำ โซนร้านสวัสดิการ - วางซ้อนด้านบนตามภาพสเก็ตช์) */}
                <g 
                  className={`zone-item ${selectedZone === 'restroom1' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('restroom1')}
                  filter={selectedZone === 'restroom1' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="362" y="15" width="51" height="35" fill={isNightMode ? "#7c2d12" : "#fed7aa"} rx="5" stroke="#ea580c" strokeWidth="2" />
                  <text x="387" y="37" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="700" fontFamily="Prompt">ห้องน้ำ</text>
                </g>

                {/* 3.3 Canteen (โรงอาหาร) */}
                <g 
                  className={`zone-item ${selectedZone === 'canteen' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('canteen')}
                  filter={selectedZone === 'canteen' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="425" y="44" width="70" height="85" fill={isNightMode ? "#7c2d12" : "#fed7aa"} rx="6" stroke="#ea580c" strokeWidth="2.5" />
                  <text x="460" y="82" textAnchor="middle" fill="#9a3412" fontSize="14" fontWeight="800" fontFamily="Prompt">โรง</text>
                  <text x="460" y="102" textAnchor="middle" fill="#9a3412" fontSize="14" fontWeight="800" fontFamily="Prompt">อาหาร</text>
                </g>

                {/* 3.4 Building 1 (อาคาร 1 - อาคารเรียนหลักหลังใหญ่) */}
                <g 
                  className={`zone-item ${selectedZone === 'b1' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('b1')}
                  filter={selectedZone === 'b1' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="505" y="32" width="165" height="97" fill={isNightMode ? "#3b0764" : "#d8b4fe"} rx="8" stroke="#7e22ce" strokeWidth="3" />
                  {/* Window Row Accent */}
                  <g fill={isNightMode ? "#fef08a" : "#c084fc"} opacity="0.8">
                    <rect x="515" y="42" width="18" height="12" rx="2" />
                    <rect x="541" y="42" width="18" height="12" rx="2" />
                    <rect x="567" y="42" width="18" height="12" rx="2" />
                    <rect x="605" y="42" width="18" height="12" rx="2" />
                    <rect x="631" y="42" width="18" height="12" rx="2" />
                    <rect x="647" y="42" width="16" height="12" rx="2" />
                  </g>
                  <text x="587" y="94" textAnchor="middle" fill={isNightMode ? "#f5d0fe" : "#581c87"} fontSize="20" fontWeight="900" fontFamily="Prompt">อาคาร 1</text>
                </g>

                {/* 3.5 Building 2 (อาคาร 2) */}
                <g 
                  className={`zone-item ${selectedZone === 'b2' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('b2')}
                  filter={selectedZone === 'b2' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="680" y="44" width="90" height="85" fill={isNightMode ? "#4c0519" : "#fca5a5"} rx="7" stroke="#dc2626" strokeWidth="2.5" />
                  <rect x="692" y="54" width="22" height="12" rx="2" fill={isNightMode ? "#fef08a" : "#fee2e2"} opacity="0.8" />
                  <rect x="736" y="54" width="22" height="12" rx="2" fill={isNightMode ? "#fef08a" : "#fee2e2"} opacity="0.8" />
                  <text x="725" y="96" textAnchor="middle" fill={isNightMode ? "#fecdd3" : "#991b1b"} fontSize="16" fontWeight="800" fontFamily="Prompt">อาคาร 2</text>
                </g>

                {/* 3.6 Restroom 2 (ห้องน้ำ โซนอาคาร 2) */}
                <g 
                  className={`zone-item ${selectedZone === 'restroom2' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('restroom2')}
                  filter={selectedZone === 'restroom2' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="780" y="44" width="50" height="85" fill={isNightMode ? "#075985" : "#bae6fd"} rx="6" stroke="#0284c7" strokeWidth="2" />
                  <text x="805" y="82" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800" fontFamily="Prompt">ห้อง</text>
                  <text x="805" y="102" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800" fontFamily="Prompt">น้ำ</text>
                </g>

                {/* 3.7 Parking Lot (ลานจอดรถ) */}
                <g 
                  className={`zone-item ${selectedZone === 'parking' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('parking')}
                  filter={selectedZone === 'parking' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="840" y="44" width="65" height="85" fill={isNightMode ? "#500724" : "#fce7f3"} rx="6" stroke="#db2777" strokeWidth="2" strokeDasharray="4 3" />
                  {/* Clean Parking Stalls */}
                  <line x1="848" y1="60" x2="897" y2="60" stroke="#db2777" strokeWidth="1.5" />
                  <line x1="848" y1="80" x2="897" y2="80" stroke="#db2777" strokeWidth="1.5" />
                  <line x1="848" y1="100" x2="897" y2="100" stroke="#db2777" strokeWidth="1.5" />
                  <text x="872" y="122" textAnchor="middle" fill="#9d174d" fontSize="11" fontWeight="800" fontFamily="Prompt">ลานจอดรถ</text>
                </g>


                {/* ---------------------------------------------------- */}
                {/* 4. CEREMONIAL STRIP: FLAGPOLE & BUDDHA SHRINE (y=185-235) */}
                {/* ---------------------------------------------------- */}

                <g 
                  className={`zone-item ${selectedZone === 'flagpole_shrine' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('flagpole_shrine')}
                  filter={selectedZone === 'flagpole_shrine' ? 'url(#clean-glow)' : 'none'}
                >
                  {/* Flagpole (เสาธง) */}
                  <g>
                    <rect x="544" y="185" width="2" height="24" fill="#334155" />
                    <circle cx="545" cy="184" r="2.5" fill="#f59e0b" />
                    {/* Thai Flag */}
                    <rect x="546" y="185" width="16" height="3" fill="#ef4444" />
                    <rect x="546" y="188" width="16" height="2.5" fill="#ffffff" />
                    <rect x="546" y="190.5" width="16" height="4" fill="#1e3a8a" />
                    <rect x="546" y="194.5" width="16" height="2.5" fill="#ffffff" />
                    <rect x="546" y="197" width="16" height="3" fill="#ef4444" />

                    <path d="M 545 218 L 545 208 M 545 208 L 541 212 M 545 208 L 549 212" stroke={isNightMode ? "#cbd5e1" : "#1e293b"} strokeWidth="1.5" fill="none" />
                    {showLabels && (
                      <text x="545" y="230" textAnchor="middle" fill={isNightMode ? "#f8fafc" : "#1e293b"} fontSize="12" fontWeight="700" fontFamily="Prompt">เสาธง</text>
                    )}
                  </g>

                  {/* Buddha Shrine (พระพุทธรูป) */}
                  <g>
                    <rect x="610" y="195" width="20" height="5" fill="#78350f" rx="1" />
                    <path d="M 615 195 C 615 189, 617 185, 620 183 C 623 185, 625 189, 625 195 Z" fill="#d97706" />
                    <circle cx="620" cy="182" r="3" fill="#fbbf24" />

                    <path d="M 620 218 L 620 208 M 620 208 L 616 212 M 620 208 L 624 212" stroke={isNightMode ? "#cbd5e1" : "#1e293b"} strokeWidth="1.5" fill="none" />
                    {showLabels && (
                      <text x="620" y="230" textAnchor="middle" fill={isNightMode ? "#f8fafc" : "#1e293b"} fontSize="12" fontWeight="700" fontFamily="Prompt">พระพุทธรูป</text>
                    )}
                  </g>
                </g>


                {/* ---------------------------------------------------- */}
                {/* 5. FOOTBALL FIELD (สนามบอลใหญ่ - ตรงกลางพอดี) */}
                {/* ---------------------------------------------------- */}

                <g 
                  className={`zone-item ${selectedZone === 'football' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('football')}
                  filter={selectedZone === 'football' ? 'url(#clean-glow)' : 'none'}
                >
                  {/* Field Green Grass Surface */}
                  <rect x="415" y="245" width="425" height="205" fill={isNightMode ? "#15803d" : "#22c55e"} rx="10" stroke="#166534" strokeWidth="2.5" />
                  
                  {/* Boundary Line */}
                  <rect x="425" y="255" width="405" height="185" fill="none" stroke="#ffffff" strokeWidth="2" rx="4" />

                  {/* Center Line and Center Circle */}
                  <line x1="627.5" y1="255" x2="627.5" y2="440" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="627.5" cy="347.5" r="38" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="627.5" cy="347.5" r="3" fill="#ffffff" />

                  {/* Left Penalty Area */}
                  <rect x="425" y="292.5" width="58" height="110" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <rect x="425" y="317.5" width="24" height="60" fill="none" stroke="#ffffff" strokeWidth="2" />

                  {/* Right Penalty Area */}
                  <rect x="772" y="292.5" width="58" height="110" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <rect x="806" y="317.5" width="24" height="60" fill="none" stroke="#ffffff" strokeWidth="2" />

                  {/* Field Title */}
                  <text 
                    x="627.5" 
                    y="353" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    fontSize="22" 
                    fontWeight="800" 
                    fontFamily="Prompt"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                  >
                    สนามบอล
                  </text>
                </g>


                {/* ---------------------------------------------------- */}
                {/* 6. PLAYGROUND & TREE ROW (ระหว่างถนนแนวตั้ง กับ สนามบอล) */}
                {/* ---------------------------------------------------- */}

                <g 
                  className={`zone-item ${selectedZone === 'playground' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('playground')}
                  filter={selectedZone === 'playground' ? 'url(#clean-glow)' : 'none'}
                >
                  {/* Clean row of 7 Trees along road (x=362) */}
                  <g>
                    {[265, 295, 325, 355, 385, 415, 440].map((yTr, idx) => (
                      <g key={idx}>
                        <circle cx="362" cy={yTr} r="9" fill="#16a34a" />
                        <circle cx="360" cy={yTr - 2} r="6" fill="#4ade80" />
                      </g>
                    ))}
                  </g>

                  {/* Playground Purple Long Strip (x=378 to x=404) */}
                  <rect x="378" y="255" width="26" height="190" fill={isNightMode ? "#581c87" : "#e9d5ff"} rx="13" stroke="#a855f7" strokeWidth="2" />

                  {showLabels && (
                    <text 
                      x="391" 
                      y="350" 
                      textAnchor="middle" 
                      fill="#7e22ce" 
                      fontSize="12" 
                      fontWeight="700" 
                      fontFamily="Prompt"
                      transform="rotate(-90 391 350)"
                    >
                      สนามเด็กเล่น
                    </text>
                  )}
                </g>


                {/* ---------------------------------------------------- */}
                {/* 7. WEST COMPLEX: KINDERGARTEN & 5 TEACHER COTTAGES (สมดุลฝั่งซ้าย) */}
                {/* ---------------------------------------------------- */}

                {/* 7.1 Kindergarten & Director Office (อนุบาล & ห้องของผู้อำนวยการ) */}
                <g 
                  className={`zone-item ${selectedZone === 'kindergarten' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('kindergarten')}
                  filter={selectedZone === 'kindergarten' ? 'url(#clean-glow)' : 'none'}
                >
                  {/* Tree at x=235, y=165 (เอาข้อความป้ายออกตามที่ผู้ใช้สั่ง) */}
                  <g>
                    <rect x="231" y="175" width="8" height="26" fill="#78350f" rx="2" />
                    <circle cx="235" cy="160" r="24" fill="#16a34a" />
                    <circle cx="226" cy="152" r="15" fill="#4ade80" />
                    <circle cx="244" cy="152" r="15" fill="#4ade80" />
                  </g>

                  {/* Kindergarten Building (อนุบาล) */}
                  <rect x="65" y="105" width="115" height="80" fill={isNightMode ? "#450a0a" : "#fca5a5"} rx="6" stroke="#dc2626" strokeWidth="2.5" />
                  <rect x="75" y="113" width="95" height="22" fill={isNightMode ? "#7f1d1d" : "#fee2e2"} rx="3" />
                  <text x="122" y="162" textAnchor="middle" fill="#991b1b" fontSize="16" fontWeight="800" fontFamily="Prompt">อนุบาล</text>

                  {/* Director Office Structure (ห้องผู้อำนวยการสถานศึกษา) */}
                  <rect x="68" y="195" width="110" height="54" fill={isNightMode ? "#1e293b" : "#ffffff"} rx="6" stroke="#475569" strokeWidth="2" />
                  <line x1="68" y1="222" x2="178" y2="222" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {showLabels && (
                    <>
                      <text x="123" y="213" textAnchor="middle" fill={isNightMode ? "#cbd5e1" : "#1e293b"} fontSize="11" fontWeight="700" fontFamily="Prompt">ห้อง</text>
                      <text x="123" y="238" textAnchor="middle" fill={isNightMode ? "#cbd5e1" : "#1e293b"} fontSize="11" fontWeight="700" fontFamily="Prompt">ผู้อำนวยการ</text>
                    </>
                  )}
                </g>

                {/* 7.2 Five Teacher Houses (บ้านพักครู 5 หลัง) */}
                <g 
                  className={`zone-item ${selectedZone === 'teachers_housing' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('teachers_housing')}
                  filter={selectedZone === 'teachers_housing' ? 'url(#clean-glow)' : 'none'}
                >
                  {/* Clean 5 Houses Placed with Balanced Margins */}
                  {[
                    { x: 65, y: 295 },
                    { x: 165, y: 295 },
                    { x: 65, y: 395 },
                    { x: 165, y: 395 },
                    { x: 115, y: 495 }
                  ].map((h, i) => (
                    <g key={i}>
                      <polygon points={`${h.x},${h.y + 16} ${h.x + 21},${h.y} ${h.x + 42},${h.y + 16}`} fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                      <rect x={h.x + 4} y={h.y + 16} width="34" height="24" fill={isNightMode ? "#78350f" : "#fed7aa"} stroke="#78350f" strokeWidth="1.5" />
                      <rect x={h.x + 16} y={h.y + 24} width="10" height="16" fill="#b45309" />
                    </g>
                  ))}

                  {showLabels && (
                    <>
                      <text x="115" y="375" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="800" fontFamily="Prompt">บ้านพักครู</text>
                      <text x="115" y="575" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="800" fontFamily="Prompt">บ้านพักครู (5 หลัง)</text>
                    </>
                  )}
                </g>


                {/* ---------------------------------------------------- */}
                {/* 8. SOUTH ZONE: VOLLEYBALL COURT, FENCE, GATE, SIGN */}
                {/* ---------------------------------------------------- */}

                {/* 8.1 Volleyball Court (สนามวอลเลย์บอล) */}
                <g 
                  className={`zone-item ${selectedZone === 'volleyball' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('volleyball')}
                  filter={selectedZone === 'volleyball' ? 'url(#clean-glow)' : 'none'}
                >
                  <rect x="455" y="475" width="95" height="75" fill={isNightMode ? "#064e3b" : "#86efac"} rx="6" stroke="#15803d" strokeWidth="2" />
                  <rect x="463" y="483" width="79" height="59" fill={isNightMode ? "#047857" : "#a7f3d0"} stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="502" y1="483" x2="502" y2="542" stroke="#059669" strokeWidth="2.5" strokeDasharray="3 2" />

                  {showLabels && (
                    <>
                      <text x="480" y="515" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 480 515)">สนาม</text>
                      <text x="502" y="515" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 502 515)">วอลเลย์</text>
                      <text x="524" y="515" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 524 515)">บอล</text>
                    </>
                  )}
                </g>

                {/* 8.2 Gate, Signboard & Fence */}
                <g 
                  className={`zone-item ${selectedZone === 'gate_fence' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('gate_fence')}
                  filter={selectedZone === 'gate_fence' ? 'url(#clean-glow)' : 'none'}
                >
                  {/* Gate (ประตูโรงเรียน) */}
                  <rect x="300" y="605" width="45" height="25" fill="#334155" rx="3" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="322.5" y1="605" x2="322.5" y2="630" stroke="#94a3b8" strokeWidth="2" />

                  {/* School Sign (ป้าย รร.) */}
                  <rect x="360" y="602" width="75" height="28" fill="#0b2545" rx="4" stroke="#e5b326" strokeWidth="2" />
                  <text x="397" y="620" textAnchor="middle" fill="#e5b326" fontSize="11" fontWeight="800" fontFamily="Prompt">ป้าย รร.</text>

                  {/* Boundary Fence */}
                  <line x1="445" y1="616" x2="905" y2="616" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  <line x1="445" y1="616" x2="905" y2="616" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="10 8" />

                  {/* Trees along Fence */}
                  <g>
                    <circle cx="630" cy="602" r="16" fill="#16a34a" />
                    <circle cx="652" cy="600" r="18" fill="#22c55e" />
                    <circle cx="674" cy="604" r="14" fill="#16a34a" />

                    <circle cx="780" cy="602" r="16" fill="#16a34a" />
                    <circle cx="802" cy="600" r="18" fill="#22c55e" />
                    <circle cx="824" cy="604" r="14" fill="#16a34a" />
                  </g>

                  {showLabels && (
                    <>
                      <text x="322.5" y="650" textAnchor="middle" fill={isNightMode ? "#f8fafc" : "#1e293b"} fontSize="13" fontWeight="700" fontFamily="Prompt">ประตู</text>
                      <text x="397" y="650" textAnchor="middle" fill="#0b2545" fontSize="13" fontWeight="700" fontFamily="Prompt">ป้าย รร.</text>
                      <text x="730" y="650" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700" fontFamily="Prompt">แนวรั้วสถานศึกษา</text>
                    </>
                  )}
                </g>

              </svg>
            </div>

            {/* Quick Campus Zone Jump Ribbon */}
            <div className="campus-jump-ribbon">
              <span className="ribbon-label"><MapPin size={15} /> เลือกเขตพื้นที่:</span>
              <div className="ribbon-scroll">
                {filteredZoneKeys.map(key => {
                  const z = campusZones[key];
                  const isSelected = selectedZone === key;
                  return (
                    <button
                      key={key}
                      className={`ribbon-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedZone(key)}
                    >
                      <span className="chip-indicator" style={{ backgroundColor: z.color }}></span>
                      <span>{z.name.split(' (')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Clean & Elegant Facility Presentation Drawer */}
          <div className="stage-details-panel">
            {/* Header with dynamic color banner */}
            <div className="drawer-header" style={{ borderTopColor: currentZone.color }}>
              <div className="drawer-meta-row">
                <span className="drawer-badge" style={{ backgroundColor: `${currentZone.color}20`, color: currentZone.color, borderColor: currentZone.color }}>
                  {currentZone.badgeText}
                </span>
                <span className="drawer-area-badge">
                  ขนาดพื้นที่: <strong>{currentZone.area}</strong>
                </span>
              </div>
              <h3 className="drawer-title">{currentZone.name}</h3>
              <p className="drawer-subtitle">{currentZone.nameEn}</p>
              <div className="drawer-type-pill">
                <Building2 size={14} /> {currentZone.type}
              </div>
            </div>

            {/* Drawer Body Content */}
            <div className="drawer-body">
              <div className="content-segment">
                <h5 className="segment-heading">
                  <Sparkles size={16} className="text-secondary" /> ข้อมูลลักษณะอาคารและการใช้สอย:
                </h5>
                <p className="segment-desc">{currentZone.desc}</p>
              </div>

              <div className="content-segment mt-4">
                <h5 className="segment-heading">
                  <CheckCircle2 size={16} className="text-secondary" /> ลักษณะเด่นและระบบสนับสนุนการเรียนรู้:
                </h5>
                <ul className="drawer-checklist">
                  {currentZone.highlights.map((h, i) => (
                    <li key={i}>
                      <ArrowRight size={14} className="bullet-gold" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="content-segment mt-4">
                <h5 className="segment-heading">
                  <Layers size={16} className="text-secondary" /> สิ่งอำนวยความสะดวกและอุปกรณ์ประจำอาคาร:
                </h5>
                <div className="facilities-chips-grid">
                  {currentZone.facilities.map((fac, i) => (
                    <span key={i} className="facility-chip">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* School Quality Assurance Card */}
              <div className="school-guarantee-card mt-4">
                <div className="guarantee-icon">
                  <Trophy size={20} className="text-warning" />
                </div>
                <div className="guarantee-text">
                  <strong>โรงเรียนบ้านวังหัวแหวนพัฒนา</strong>
                  <p>สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษากำแพงเพชร เขต 2 มุ่งมั่นบริหารจัดการสภาพแวดล้อมที่ปลอดภัยและเอื้อต่อการจัดการเรียนรู้อย่างมีคุณภาพ</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Scoped CSS for Clean & Neat Campus Master Experience */}
      <style>{`
        .campus-view-wrapper {
          transition: background-color 0.3s ease;
        }

        .campus-view-wrapper.mode-day {
          background-color: var(--color-bg-body);
        }

        .campus-view-wrapper.mode-night {
          background-color: #070d17;
          color: #f1f5f9;
        }

        .section-tag-gold {
          background-color: rgba(229, 179, 38, 0.15);
          color: #b45309;
          border: 1px solid rgba(229, 179, 38, 0.35);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          letter-spacing: 0.8px;
        }

        .mode-night .section-tag-gold {
          color: #fde047;
          border-color: rgba(253, 224, 71, 0.3);
        }

        .master-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-top: 6px;
        }

        .mode-night .master-title {
          color: #ffffff;
        }

        .master-subtitle {
          color: var(--color-text-muted);
          font-size: 1rem;
          max-width: 680px;
          margin: 0 auto;
        }

        .mode-night .master-subtitle {
          color: #94a3b8;
        }

        /* Controls Island */
        .controls-island {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .filters-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: white;
          color: var(--color-text-main);
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .mode-night .pill-btn {
          background: #111c2e;
          border-color: #1e293b;
          color: #cbd5e1;
        }

        .pill-btn:hover {
          border-color: var(--color-secondary);
          color: var(--color-primary);
          transform: translateY(-1px);
        }

        .pill-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .mode-night .pill-btn.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }

        .toggles-group {
          display: flex;
          gap: 10px;
        }

        .ambience-toggle-btn, .label-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid var(--color-border);
          background: white;
          color: var(--color-text-main);
        }

        .mode-night .ambience-toggle-btn, .mode-night .label-toggle-btn {
          background: #111c2e;
          border-color: #1e293b;
          color: #cbd5e1;
        }

        .ambience-toggle-btn:hover, .label-toggle-btn:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        /* 2-Column Stage Grid */
        .campus-stage-grid {
          display: grid;
          grid-template-columns: 1.85fr 1fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .campus-stage-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Stage Canvas Panel */
        .stage-canvas-panel {
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .mode-night .stage-canvas-panel {
          background: #0f1a2a;
          border-color: #1e293b;
        }

        .canvas-header-bar {
          background: linear-gradient(135deg, var(--color-primary) 0%, #153b68 100%);
          color: white;
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
          font-family: var(--font-heading);
          border-bottom: 2px solid var(--color-secondary);
        }

        .selected-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #fde047;
          font-size: 0.85rem;
        }

        .canvas-viewport {
          padding: 16px;
          display: flex;
          justify-content: center;
          transition: background-color 0.3s ease;
        }

        .canvas-viewport.day-ambient {
          background: #f8fafc;
        }

        .canvas-viewport.night-ambient {
          background: #080f1a;
        }

        .master-svg-canvas {
          width: 100%;
          height: auto;
          max-height: 580px;
          display: block;
        }

        /* Zone Items Interactive States */
        .zone-item {
          cursor: pointer;
          transition: transform 0.15s ease, filter 0.15s ease;
        }

        .zone-item:hover {
          filter: brightness(1.08) drop-shadow(0 2px 8px rgba(11, 37, 69, 0.25));
        }

        .zone-item.active-zone {
          filter: drop-shadow(0 0 8px #f59e0b) brightness(1.06);
        }

        /* Jump Ribbon */
        .campus-jump-ribbon {
          padding: 12px 18px;
          background: #f8fafc;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mode-night .campus-jump-ribbon {
          background: #0d1522;
          border-color: #1e293b;
        }

        .ribbon-label {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--color-text-muted);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ribbon-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .ribbon-chip {
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

        .mode-night .ribbon-chip {
          background: #111c2e;
          border-color: #1e293b;
          color: #cbd5e1;
        }

        .ribbon-chip:hover {
          border-color: var(--color-secondary);
        }

        .ribbon-chip.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .mode-night .ribbon-chip.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }

        .chip-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* Stage Details Panel (Right Column) */
        .stage-details-panel {
          background: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .mode-night .stage-details-panel {
          background: #0f1a2a;
          border-color: #1e293b;
        }

        .drawer-header {
          padding: 24px;
          background: linear-gradient(180deg, #f8fafc 0%, white 100%);
          border-top: 6px solid var(--color-primary);
          border-bottom: 1px solid var(--color-border);
        }

        .mode-night .drawer-header {
          background: linear-gradient(180deg, #132237 0%, #0f1a2a 100%);
          border-bottom-color: #1e293b;
        }

        .drawer-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .drawer-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: var(--radius-full);
          border: 1px solid;
          font-family: var(--font-heading);
          line-height: 1.4;
          white-space: nowrap;
        }

        .drawer-area-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.84rem;
          color: var(--color-text-muted);
          font-family: var(--font-heading);
          white-space: nowrap;
        }

        .drawer-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-top: 4px;
          margin-bottom: 6px;
          line-height: 1.35;
          clear: both;
        }

        .mode-night .drawer-title {
          color: #ffffff;
        }

        .drawer-subtitle {
          font-size: 0.86rem;
          color: var(--color-text-muted);
          margin-bottom: 10px;
          font-weight: 500;
        }

        .drawer-type-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          color: #475569;
          background-color: #f1f5f9;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 600;
        }

        .mode-night .drawer-type-pill {
          background-color: #1e293b;
          color: #94a3b8;
        }

        .drawer-body {
          padding: 24px;
        }

        .segment-heading {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mode-night .segment-heading {
          color: #fde047;
        }

        .segment-desc {
          font-size: 0.94rem;
          color: var(--color-text-main);
          line-height: 1.65;
        }

        .mode-night .segment-desc {
          color: #cbd5e1;
        }

        .drawer-checklist {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .drawer-checklist li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--color-text-main);
        }

        .mode-night .drawer-checklist li {
          color: #cbd5e1;
        }

        .bullet-gold {
          color: var(--color-secondary);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .facilities-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .facility-chip {
          background: #f1f5f9;
          color: #334155;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid #e2e8f0;
        }

        .mode-night .facility-chip {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155;
        }

        .school-guarantee-card {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .mode-night .school-guarantee-card {
          background: #064e3b;
          border-color: #047857;
        }

        .guarantee-icon {
          flex-shrink: 0;
        }

        .guarantee-text strong {
          display: block;
          font-size: 0.88rem;
          color: #14532d;
          margin-bottom: 2px;
        }

        .mode-night .guarantee-text strong {
          color: #86efac;
        }

        .guarantee-text p {
          font-size: 0.82rem;
          color: #15803d;
          margin: 0;
          line-height: 1.4;
        }

        .mode-night .guarantee-text p {
          color: #dcfce7;
        }
      `}</style>
    </div>
  );
}
