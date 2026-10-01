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
  Tag,
  Maximize2
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
      nameEn: 'Building 1 (Main Academic Complex)',
      type: 'อาคารเรียนมาตรฐาน 2 ชั้น ขนาดใหญ่',
      color: '#8b5cf6',
      badgeText: 'อาคารหลัก',
      icon: Building2,
      desc: 'อาคารเรียน 2 ชั้น ขนาดใหญ่ ศูนย์กลางการเรียนการสอนระดับประถมศึกษา พร้อมระบบห้องเรียนอัจฉริยะ Smart Classroom และศูนย์เทคโนโลยีสารสนเทศของโรงเรียน',
      highlights: [
        'ชั้นที่ 1: ห้องพักครู, ห้องธุรการ-การเงิน, ห้องเรียนชั้น ป.1 - ป.3',
        'ชั้นที่ 2: ห้องเรียนชั้น ป.4 - ป.6, ห้องปฏิบัติการคอมพิวเตอร์และสื่อ DLTV',
        'ติดตั้งระบบ Smart TV ความคมชัดสูง 4K และอินเทอร์เน็ตความเร็วสูงทุกห้องเรียน'
      ],
      facilities: ['ห้องเรียนประถม 6 ห้อง', 'ห้องพักครูและธุรการ', 'ห้องคอมพิวเตอร์ 20 เครื่อง', 'สมาร์ททีวีทุกห้อง'],
      area: '280 ตร.ม.'
    },
    b2: {
      id: 'b2',
      number: '2',
      category: 'academic',
      name: 'อาคาร 2 (ศูนย์การเรียนรู้สร้างสรรค์)',
      nameEn: 'Building 2 (Creative Learning Center)',
      type: 'อาคารเรียน 1 ชั้น โครงสร้างทันสมัย',
      color: '#f97316',
      badgeText: 'อาคาร 2',
      icon: Building2,
      desc: 'อาคารจัดกิจกรรมและแหล่งเรียนรู้เฉพาะทาง รองรับการพัฒนาทักษะวิชาการ การค้นคว้าอิสระ และการดูแลสุขอนามัยของนักเรียน',
      highlights: [
        'ห้องสมุดเฉลิมพระเกียรติ พร้อมมุม E-Library ค้นคว้าดิจิทัล',
        'ห้องปฏิบัติการวิทยาศาสตร์พื้นฐานและโครงงานสะเต็มศึกษา (STEM)',
        'ห้องพยาบาลมาตรฐาน พร้อมอุปกรณ์ปฐมพยาบาลเบื้องต้น'
      ],
      facilities: ['ห้องสมุดมีชีวิต', 'มุมวิทยาศาสตร์ & STEM', 'ห้องพยาบาล', 'ห้องแนะแนว'],
      area: '160 ตร.ม.'
    },
    kindergarten: {
      id: 'kindergarten',
      number: 'อ.',
      category: 'academic',
      name: 'อาคารเรียนปฐมวัย (อนุบาล) & ลานร่มรื่น',
      nameEn: 'Early Childhood Center & Garden',
      type: 'อาคารเรียนปฐมวัยและพื้นที่ส่งเสริมพัฒนาการ',
      color: '#f43f5e',
      badgeText: 'อนุบาล',
      icon: Home,
      desc: 'อาคารเรียนสำหรับเด็กปฐมวัย (อนุบาล 2 - อนุบาล 3) ออกแบบเพื่อความปลอดภัยสูงสุดและส่งเสริมพัฒนาการทั้ง 4 ด้าน ล้อมรอบด้วยธรรมชาติร่มรื่นใต้ต้นไม้ใหญ่',
      highlights: [
        'ห้องเรียนปฐมวัยพร้อมสื่อเสริมพัฒนาการกล้ามเนื้อมัดเล็กและมัดใหญ่',
        'มุมหนังสือนิทานและพื้นที่ศิลปะจินตนาการสร้างสรรค์',
        'ห้องอำนวยการและประสานงานผู้บริหาร (โซน ผอ.)',
        'ลานกิจกรรมร่มรื่นใต้ต้นไม้ใหญ่ประจำโรงเรียน'
      ],
      facilities: ['ห้องเรียน อ.2 - อ.3', 'มุมเสริมทักษะ BBL', 'ห้อง ผอ.', 'ลานธรรมชาติใต้ต้นไม้ใหญ่'],
      area: '190 ตร.ม.'
    },
    canteen: {
      id: 'canteen',
      number: '3',
      category: 'service',
      name: 'โรงอาหารโรงเรียน (สุขาภิบาลดีเด่น)',
      nameEn: 'School Cafeteria & Nutrition Hall',
      type: 'อาคารบริการโภชนาการนักเรียน',
      color: '#f59e0b',
      badgeText: 'โรงอาหาร',
      icon: Coffee,
      desc: 'สถานที่ประกอบอาหารกลางวันและรับประทานอาหารของนักเรียนและบุคลากร สะอาด ถูกสุขอนามัยตามมาตรฐานโครงการอาหารกลางวัน สพฐ. 100%',
      highlights: [
        'โรงครัวมาตรฐาน ปรุงอาหารสดใหม่ สะอาด ถูกหลักโภชนาการทุกวัน',
        'โต๊ะรับประทานอาหารสแตนเลสเป็นระเบียบสำหรับนักเรียนทุกระดับชั้น',
        'จุดล้างมือน้ำไหลอัตโนมัติและจุดแปรงฟันส่งเสริมสุขนิสัย'
      ],
      facilities: ['โรงครัวมาตรฐาน สพฐ.', 'โต๊ะรับประทานอาหาร', 'จุดล้างมือน้ำไหล', 'ตู้แช่นมโรงเรียน'],
      area: '140 ตร.ม.'
    },
    welfare: {
      id: 'welfare',
      number: '4',
      category: 'service',
      name: 'ร้านค้าสวัสดิการ & สหกรณ์นักเรียน',
      nameEn: 'Welfare & Student Cooperative Store',
      type: 'ร้านค้าบริการนักเรียนและชุมชน',
      color: '#a855f7',
      badgeText: 'ร้านสวัสดิการ',
      icon: Coffee,
      desc: 'ร้านค้าสวัสดิการและสหกรณ์โรงเรียน จำหน่ายเครื่องเขียน อุปกรณ์การเรียน ชุดนักเรียน และอาหารว่างที่มีประโยชน์ตามหลักโภชนาการ',
      highlights: [
        'แหล่งฝึกปฏิบัติจริงด้านทักษะอาชีพและการทำบัญชีสหกรณ์นักเรียน',
        'จำหน่ายอุปกรณ์การเรียนราคาประหยัดเพื่อลดภาระผู้ปกครอง',
        'บริการเครื่องดื่มและนมโรงเรียนคุณภาพ'
      ],
      facilities: ['ร้านค้าสหกรณ์', 'มุมเครื่องเขียน', 'มุมเครื่องแบบ', 'เคาน์เตอร์บริการ'],
      area: '45 ตร.ม.'
    },
    restroom1: {
      id: 'restroom1',
      number: 'ส1',
      category: 'service',
      name: 'ห้องน้ำ-สุขา (โซนร้านสวัสดิการ)',
      nameEn: 'Sanitary Restroom Zone A',
      type: 'อาคารสุขอนามัย',
      color: '#ea580c',
      badgeText: 'สุขา โซน 1',
      icon: Building2,
      desc: 'สุขาสำหรับนักเรียนระดับปฐมวัยและผู้มาติดต่อร้านค้าสวัสดิการ แยกห้องน้ำชาย-หญิง สะอาด ปลอดภัย และมีแสงสว่างธรรมชาติทั่วถึง',
      highlights: [
        'แยกสัดส่วนห้องน้ำชาย-หญิงชัดเจน ปลอดภัย',
        'สุขภัณฑ์สำหรับเด็กปฐมวัยเพื่อความสะดวกสบาย',
        'เจ้าหน้าที่ดูแลทำความสะอาดและฆ่าเชื้อสม่ำเสมอ'
      ],
      facilities: ['ห้องน้ำชาย', 'ห้องน้ำหญิง', 'อ่างล้างมือพร้อมสบู่', 'ระบบระบายอากาศ'],
      area: '35 ตร.ม.'
    },
    restroom2: {
      id: 'restroom2',
      number: 'ส2',
      category: 'service',
      name: 'ห้องน้ำ-สุขา (โซนอาคาร 2)',
      nameEn: 'Sanitary Restroom Zone B',
      type: 'อาคารสุขอนามัย',
      color: '#0284c7',
      badgeText: 'สุขา โซน 2',
      icon: Building2,
      desc: 'ห้องน้ำหลักสำหรับนักเรียนชั้นประถมศึกษาและคณะครู ตั้งอยู่ทางทิศตะวันออกติดกับอาคารเรียน 2 สะดวกต่อการใช้งานระหว่างคาบเรียน',
      highlights: [
        'ห้องสุขามาตรฐานและจุดอาบน้ำหลังกิจกรรมพลศึกษา',
        'ระบบประหยัดน้ำและสุขภัณฑ์ประหยัดพลังงาน',
        'รองรับการใช้งานช่วงพักกลางวันได้อย่างรวดเร็ว'
      ],
      facilities: ['ห้องสุขาประถม', 'จุดอาบน้ำนักกีฬา', 'อ่างล้างมือสุขอนามัย'],
      area: '50 ตร.ม.'
    },
    parking: {
      id: 'parking',
      number: 'P',
      category: 'facility',
      name: 'ลานจอดรถโรงเรียน',
      nameEn: 'Official Parking Complex',
      type: 'พื้นที่จอดรถยนต์และจักรยานยนต์',
      color: '#db2777',
      badgeText: 'ลานจอดรถ',
      icon: Car,
      desc: 'พื้นที่จอดรถในร่มและกลางแจ้ง สำหรับรถยนต์ของคณะครู บุคลากรทางการศึกษา และผู้ปกครองที่เดินทางมาติดต่อราชการโรงเรียน',
      highlights: [
        'ช่องจอดรถยนต์ 8 คัน และช่องจอดรถจักรยานยนต์เป็นระเบียบ',
        'ทางเข้า-ออกสะดวก เชื่อมต่อกับถนนภายในโรงเรียน',
        'ระบบไฟส่องสว่างเวลากลางคืนเพื่อความปลอดภัย'
      ],
      facilities: ['ช่องจอดรถยนต์ครู', 'ช่องจอดรถผู้มาติดต่อ', 'ที่จอดรถจักรยานยนต์', 'ไฟส่องสว่าง'],
      area: '180 ตร.ม.'
    },
    football: {
      id: 'football',
      number: '⚽',
      category: 'sports',
      name: 'สนามฟุตบอลโรงเรียน (สนามหญ้ามาตรฐาน)',
      nameEn: 'Main Stadium Football Field',
      type: 'สนามกีฬากลางแจ้งขนาดใหญ่',
      color: '#22c55e',
      badgeText: 'สนามบอล',
      icon: Trophy,
      desc: 'สนามฟุตบอลหญ้าธรรมชาติขนาดมาตรฐานใจกลางโรงเรียน เป็นหัวใจของการจัดกิจกรรมกลางแจ้ง กีฬาสี และการออกกำลังกายของชุมชนบ้านวังหัวแหวน',
      highlights: [
        'สนามหญ้าตัดแต่งลายแถบเรียบสม่ำเสมอ พร้อมเส้นเขตสนามชัดเจน',
        'ประตูฟุตบอลมาตรฐานพร้อมตาข่ายเหนียวแน่น ปลอดภัย',
        'ใช้ในการเรียนการสอนวิชาพลศึกษาและกิจกรรมหน้าเสาธงในวันสำคัญ'
      ],
      facilities: ['สนามหญ้ามาตรฐาน', 'ประตูฟุตบอล 2 ฝั่ง', 'ซุ้มม้านั่งนักกีฬา', 'ธงมุมสนาม 4 มุม'],
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
      icon: Trophy,
      desc: 'สนามวอลเลย์บอลคอนกรีตมาตรฐาน ตั้งอยู่ด้านหน้าติดแนวรั้วโรงเรียน ใช้ฝึกซ้อมกีฬาวอลเลย์บอล ตะกร้อ และการละเล่นพื้นบ้าน',
      highlights: [
        'พื้นคอนกรีตทาสีกันลื่นสีมินต์-เขียว พร้อมเส้นสนามมาตรฐาน',
        'เสาและตาข่ายวอลเลย์บอลที่ได้มาตรฐานความปลอดภัย',
        'ร่มรื่นด้วยแนวต้นไม้ใหญ่ด้านข้างสนามตลอดช่วงบ่าย'
      ],
      facilities: ['สนามคอนกรีตมาตรฐาน', 'เสาและตาข่ายวอลเลย์บอล', 'เส้นเขตตะกร้อ', 'ร่มเงาต้นไม้'],
      area: '162 ตร.ม.'
    },
    playground: {
      id: 'playground',
      number: 'BBL',
      category: 'sports',
      name: 'สนามเด็กเล่นสร้างสรรค์ (BBL) & ทิวไม้ร่มรื่น',
      nameEn: 'BBL Creative Playground & Tree Boulevard',
      type: 'พื้นที่เรียนรู้กลางแจ้งและเครื่องเล่นพัฒนาการ',
      color: '#a855f7',
      badgeText: 'สนามเด็กเล่น',
      icon: Trees,
      desc: 'สนามเด็กเล่นแนวยาวขนานถนนหลัก ร่มรื่นด้วยแนวต้นไม้ใหญ่ 7 ต้นตลอดแนว มีเครื่องเล่นตามหลักการพัฒนาสมอง (Brain-based Learning: BBL)',
      highlights: [
        'เครื่องเล่นเสริมทักษะ: สไลเดอร์ 3D, ชิงช้า, กระดานกระดก, บาร์โหนทรงตัว',
        'ลานกระโดดและภาพวาดลายพื้นพัฒนาทักษะสมอง (BBL Floor Games)',
        'ทิวต้นไม้ร่มรื่น ให้ร่มเงาตลอดทั้งวันสำหรับพักผ่อนและทำกิจกรรม'
      ],
      facilities: ['สไลเดอร์เกลียว', 'ชุดชิงช้า 4 ที่นั่ง', 'บาร์โหนทรงตัว', 'ทิวไม้ร่มรื่น 7 ต้น'],
      area: '220 ตร.ม.'
    },
    flagpole_shrine: {
      id: 'flagpole_shrine',
      number: 'ธง-พระ',
      category: 'facility',
      name: 'ลานเสาธงชาติ และซุ้มพระพุทธรูปประจำโรงเรียน',
      nameEn: 'Flagpole Plaza & Buddha Shrine',
      type: 'ศูนย์รวมจิตใจและลานพิธีการยามเช้า',
      color: '#d97706',
      badgeText: 'เสาธง / พระพุทธรูป',
      icon: Compass,
      desc: 'จุดศูนย์รวมจิตใจและอัตลักษณ์ของโรงเรียน ใช้ประกอบพิธีเข้าแถวเคารพธงชาติ สวดมนต์ ไหว้พระ และรับฟังโอวาทในตอนเช้าของทุกวันเรียน',
      highlights: [
        'เสาธงชาติสูงสง่างาม หน้าอาคารเรียนหลัก โบกสะบัดธงไตรรงค์',
        'ซุ้มประดิษฐานพระพุทธรูปศักดิ์สิทธิ์ประจำโรงเรียนบ้านวังหัวแหวนพัฒนา',
        'ลานคอนกรีตเข้าแถวอย่างเป็นระเบียบของครูและนักเรียน'
      ],
      facilities: ['เสาธงชาติมาตรฐาน', 'ซุ้มพระพุทธรูป', 'ลานเข้าแถวเคารพธงชาติ', 'ระบบสปอตไลต์'],
      area: '80 ตร.ม.'
    },
    teachers_housing: {
      id: 'teachers_housing',
      number: 'พักครู',
      category: 'facility',
      name: 'กลุ่มบ้านพักครู (5 หลัง) & ที่พักบุคลากร',
      nameEn: 'Faculty Residential Village (5 Cottages)',
      type: 'โซนที่พักอาศัยของคณะครูและบุคลากร',
      color: '#b45309',
      badgeText: 'บ้านพักครู',
      icon: Home,
      desc: 'กลุ่มบ้านพักทรงคอทเทจอบอุ่นสำหรับครูและบุคลากรทางการศึกษา จำนวน 5 หลัง ตั้งอยู่ในมุมที่เงียบสงบ ปลอดภัย และใกล้ชิดธรรมชาติ',
      highlights: [
        'บ้านพักครูจำนวน 5 หลังพร้อมระบบสาธารณูปโภคและไฟฟ้าครบถ้วน',
        'มีครูเวรประจำการดูแลความปลอดภัยของโรงเรียนตลอด 24 ชั่วโมง',
        'สภาพแวดล้อมร่มรื่น สวนหย่อมขนาดเล็ก สบายตา'
      ],
      facilities: ['บ้านพักครู 5 หลัง', 'ระเบียงไม้พักผ่อน', 'สวนหย่อมร่มรื่น', 'ระบบรักษาความปลอดภัย'],
      area: '450 ตร.ม.'
    },
    gate_fence: {
      id: 'gate_fence',
      number: 'ประตู',
      category: 'facility',
      name: 'ซุ้มประตูทางเข้า, ป้ายชื่อโรงเรียน และแนวรั้ว',
      nameEn: 'Grand School Gate & Boundary Boulevard',
      type: 'ทางเข้าหลักและระบบรักษาความปลอดภัย',
      color: '#334155',
      badgeText: 'ประตู & รั้ว',
      icon: Building2,
      desc: 'ทางเข้าหลักของโรงเรียนบ้านวังหัวแหวนพัฒนา ประดับป้ายหินสลักชื่อโรงเรียนสีน้ำเงิน-ทองสง่างาม พร้อมประตูเหล็กแข็งแรงและทางม้าลายปลอดภัย',
      highlights: [
        'ป้ายชื่อโรงเรียนบ้านวังหัวแหวนพัฒนา หรูหรา สง่างามริมถนน',
        'ประตูรั้วเหล็กเปิด-ปิดตามเวลาทำการราชการเพื่อความปลอดภัย',
        'ทางม้าลายคนข้าม (Zebra Crossing) เพิ่มความปลอดภัยแก่นักเรียนและผู้ปกครอง'
      ],
      facilities: ['ป้ายหินแกรนิตสลักทอง', 'ประตูเหล็กดัดสองบาน', 'ทางม้าลาย', 'แนวรั้วและทิวไม้'],
      area: 'ตลอดแนวหน้า รร.'
    }
  };

  const currentZone = campusZones[selectedZone] || campusZones.b1;

  const categories = [
    { id: 'all', label: 'ทั้งหมด (14 โซน)', icon: Compass },
    { id: 'academic', label: 'อาคารเรียน & ห้องสมุด', icon: Building2 },
    { id: 'sports', label: 'สนามกีฬา & เครื่องเล่น', icon: Trophy },
    { id: 'service', label: 'สวัสดิการ & สุขา', icon: Coffee },
    { id: 'facility', label: 'ที่พัก & ลานพิธีการ', icon: Home }
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
            <span className="section-tag-gold">✨ 2.5D INTERACTIVE CAMPUS MASTER PLAN</span>
          </div>
          <h2 className="master-title">
            แผนผังโรงเรียนบ้านวังหัวแหวนพัฒนา
          </h2>
          <div className="school-divider">
            <span className="school-divider-dot"></span>
          </div>
          <p className="master-subtitle">
            สำรวจอาคารเรียน สนามกีฬา แหล่งเรียนรู้ และสิ่งอำนวยความสะดวกในระบบจำลอง 2.5D เสมือนจริง
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
                  <span>โหมดราตรี (Night Mode)</span>
                </>
              ) : (
                <>
                  <Sun size={16} className="text-warning" />
                  <span>โหมดกลางวัน (Day Mode)</span>
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
          
          {/* Left Canvas Column: The Ultra-WOW 2.5D SVG Map */}
          <div className="stage-canvas-panel glass-panel">
            <div className="canvas-header-bar">
              <div className="d-flex align-items-center gap-2">
                <Layers size={18} className="text-secondary" />
                <span className="fw-semibold">แผนผังจำลองเชิงสถาปัตยกรรม (คลิกอาคารเพื่อชมข้อมูล)</span>
              </div>
              <div className="selected-indicator">
                <Footprints size={14} /> โซนปัจจุบัน: <strong>{currentZone.name.split(' (')[0]}</strong>
              </div>
            </div>

            <div className={`canvas-viewport ${isNightMode ? 'night-ambient' : 'day-ambient'}`}>
              <svg 
                viewBox="0 0 980 700" 
                className="master-svg-canvas"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Subtle Blueprint Grid */}
                  <pattern id="grid-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke={isNightMode ? "rgba(255,255,255,0.04)" : "rgba(11,37,69,0.05)"} strokeWidth="1" />
                  </pattern>

                  {/* FIFA Football Lawn Stripes Pattern */}
                  <pattern id="lawn-stripes" width="30" height="200" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="15" height="200" fill={isNightMode ? "#166534" : "#22c55e"} />
                    <rect x="15" y="0" width="15" height="200" fill={isNightMode ? "#14532d" : "#16a34a"} />
                  </pattern>

                  {/* Asphalt Texture */}
                  <linearGradient id="asphalt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isNightMode ? "#1e293b" : "#475569"} />
                    <stop offset="100%" stopColor={isNightMode ? "#0f172a" : "#334155"} />
                  </linearGradient>

                  {/* Building 1 Purple Roof 3D Gradient */}
                  <linearGradient id="b1-roof-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="70%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#6b21a8" />
                  </linearGradient>

                  {/* Building 2 Coral Roof Gradient */}
                  <linearGradient id="b2-roof-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="70%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#9f1239" />
                  </linearGradient>

                  {/* 3D Drop Shadows */}
                  <filter id="iso-shadow" x="-10%" y="-10%" width="125%" height="130%">
                    <feDropShadow dx="3" dy="8" stdDeviation="5" floodColor="#0b2545" floodOpacity={isNightMode ? "0.6" : "0.22"} />
                  </filter>
                  <filter id="active-beacon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#f59e0b" floodOpacity="0.9" />
                    <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#e5b326" floodOpacity="0.5" />
                  </filter>
                  <filter id="light-beam" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                  </filter>
                </defs>

                {/* 1. Base Canvas Background */}
                <rect x="0" y="0" width="980" height="700" fill={isNightMode ? "#091322" : "#fdfbf7"} rx="16" />
                <rect x="15" y="15" width="950" height="670" fill="url(#grid-pattern)" rx="12" stroke={isNightMode ? "#1e293b" : "#e2e8f0"} strokeWidth="1.5" />

                {/* ---------------------------------------------------- */}
                {/* 2. ROAD NETWORK & PEDESTRIAN ZEBRA CROSSING */}
                {/* ---------------------------------------------------- */}
                
                {/* Vertical Main Road */}
                <rect x="365" y="140" width="50" height="510" fill="url(#asphalt-grad)" rx="2" filter="url(#iso-shadow)" />
                {/* Road dashed lane */}
                <line x1="390" y1="170" x2="390" y2="620" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="14 12" opacity={isNightMode ? "0.4" : "0.85"} />

                {/* Horizontal North Road */}
                <rect x="365" y="210" width="580" height="46" fill="url(#asphalt-grad)" rx="2" filter="url(#iso-shadow)" />
                <line x1="415" y1="233" x2="930" y2="233" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="16 12" opacity={isNightMode ? "0.4" : "0.85"} />

                {/* Road Intersection Corner Smooth */}
                <rect x="365" y="210" width="50" height="46" fill="url(#asphalt-grad)" />

                {/* Pedestrian Zebra Crossing near Gate */}
                <g opacity={isNightMode ? "0.6" : "0.9"}>
                  <rect x="368" y="580" width="44" height="4" fill="#ffffff" />
                  <rect x="368" y="588" width="44" height="4" fill="#ffffff" />
                  <rect x="368" y="596" width="44" height="4" fill="#ffffff" />
                  <rect x="368" y="604" width="44" height="4" fill="#ffffff" />
                </g>

                {/* Night Street Light Cones */}
                {isNightMode && (
                  <g opacity="0.35">
                    <circle cx="390" cy="233" r="60" fill="#fef08a" filter="url(#light-beam)" />
                    <circle cx="390" cy="420" r="50" fill="#fef08a" filter="url(#light-beam)" />
                    <circle cx="680" cy="233" r="65" fill="#fef08a" filter="url(#light-beam)" />
                  </g>
                )}


                {/* ---------------------------------------------------- */}
                {/* 3. SOUTH BOUNDARY: GATE, SCHOOL SIGN & FENCE */}
                {/* ---------------------------------------------------- */}
                
                <g 
                  className={`zone-item ${selectedZone === 'gate_fence' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('gate_fence')}
                  filter={selectedZone === 'gate_fence' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* Gate Entrance with 3D Pillars */}
                  <rect x="352" y="618" width="14" height="28" fill="#1e293b" rx="2" />
                  <rect x="414" y="618" width="14" height="28" fill="#1e293b" rx="2" />
                  {/* Double Wrought Iron Gates */}
                  <rect x="366" y="622" width="22" height="20" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  <line x1="377" y1="622" x2="377" y2="642" stroke="#94a3b8" strokeWidth="2" />
                  <rect x="392" y="622" width="22" height="20" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  <line x1="403" y1="622" x2="403" y2="642" stroke="#94a3b8" strokeWidth="2" />

                  {/* School Sign Granite Plaque with Gold Trim */}
                  <rect x="432" y="615" width="80" height="28" fill="#0b2545" rx="4" stroke="#e5b326" strokeWidth="2.5" filter="url(#iso-shadow)" />
                  <rect x="436" y="619" width="72" height="20" fill="#163964" rx="2" />
                  <text x="472" y="633" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="800" fontFamily="Prompt">ป้าย รร.</text>

                  {/* Boundary Fence with Concrete Posts */}
                  <line x1="516" y1="628" x2="940" y2="628" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                  {[540, 600, 660, 720, 780, 840, 900].map(xP => (
                    <rect key={xP} x={xP} y="621" width="8" height="16" fill="#64748b" rx="1" />
                  ))}

                  {/* Shaded Lush Trees along Fence */}
                  <g>
                    <circle cx="690" cy="610" r="18" fill="#15803d" />
                    <circle cx="688" cy="607" r="15" fill="#22c55e" />
                    <circle cx="715" cy="605" r="22" fill="#15803d" />
                    <circle cx="712" cy="601" r="19" fill="#4ade80" />
                    <circle cx="740" cy="608" r="16" fill="#22c55e" />

                    <circle cx="840" cy="610" r="18" fill="#15803d" />
                    <circle cx="838" cy="607" r="15" fill="#22c55e" />
                    <circle cx="865" cy="605" r="22" fill="#15803d" />
                    <circle cx="862" cy="601" r="19" fill="#4ade80" />
                    <circle cx="890" cy="608" r="16" fill="#22c55e" />
                  </g>

                  {showLabels && (
                    <>
                      <text x="390" y="665" textAnchor="middle" fill={isNightMode ? "#f8fafc" : "#1e293b"} fontSize="12" fontWeight="700" fontFamily="Prompt">ประตูโรงเรียน</text>
                      <text x="472" y="665" textAnchor="middle" fill="#e5b326" fontSize="12" fontWeight="700" fontFamily="Prompt">ป้ายโรงเรียน</text>
                      <text x="790" y="665" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="600" fontFamily="Prompt">รั้วโรงเรียน & ทิวไม้</text>
                    </>
                  )}
                </g>


                {/* ---------------------------------------------------- */}
                {/* 4. WEST COMPLEX: 5 TEACHER COTTAGES & KINDERGARTEN */}
                {/* ---------------------------------------------------- */}

                {/* 4.1 Teachers Cottages (บ้านพักครู 5 หลัง) */}
                <g 
                  className={`zone-item ${selectedZone === 'teachers_housing' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('teachers_housing')}
                  filter={selectedZone === 'teachers_housing' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* Shaded Village Compound Border */}
                  <rect x="180" y="420" width="170" height="205" fill={selectedZone === 'teachers_housing' ? 'rgba(180,83,9,0.1)' : 'transparent'} rx="12" stroke={selectedZone === 'teachers_housing' ? '#b45309' : 'transparent'} strokeWidth="1.5" strokeDasharray="5 5" />

                  {/* 5 Distinct Cottages with 3D Depth */}
                  {[
                    { x: 220, y: 430, label: '1' },
                    { x: 285, y: 430, label: '2' },
                    { x: 285, y: 495, label: '3' },
                    { x: 225, y: 540, label: '4' },
                    { x: 295, y: 575, label: '5' }
                  ].map((h, i) => (
                    <g key={i} filter="url(#iso-shadow)">
                      {/* Chimney */}
                      <rect x={h.x + 22} y={h.y - 8} width="5" height="12" fill="#78350f" />
                      {/* 3D Pitched Roof */}
                      <polygon points={`${h.x},${h.y + 16} ${h.x + 18},${h.y} ${h.x + 36},${h.y + 16}`} fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
                      {/* Front Facade */}
                      <rect x={h.x + 3} y={h.y + 16} width="30" height="22" fill={isNightMode ? "#78350f" : "#fed7aa"} stroke="#78350f" strokeWidth="1.5" />
                      {/* Glowing Window or Door */}
                      <rect x={h.x + 8} y={h.y + 20} width="8" height="8" fill={isNightMode ? "#fef08a" : "#60a5fa"} rx="1" />
                      <rect x={h.x + 20} y={h.y + 24} width="8" height="14" fill="#78350f" />
                    </g>
                  ))}

                  {showLabels && (
                    <>
                      <text x="220" y="500" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="800" fontFamily="Prompt">บ้านพักครู</text>
                      <text x="230" y="605" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="800" fontFamily="Prompt">บ้านพักครู</text>
                    </>
                  )}
                </g>

                {/* 4.2 Kindergarten & Heritage Tree (อนุบาล & ต้นไม้ใหญ่ & ของ ผอ.) */}
                <g 
                  className={`zone-item ${selectedZone === 'kindergarten' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('kindergarten')}
                  filter={selectedZone === 'kindergarten' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* Big Heritage Tree (ต้นไม้ใหญ่) */}
                  <g filter="url(#iso-shadow)">
                    {/* Shadow on ground */}
                    <ellipse cx="334" cy="355" rx="28" ry="12" fill="#000000" opacity={isNightMode ? "0.4" : "0.15"} />
                    {/* Trunk with bark details */}
                    <rect x="328" y="325" width="12" height="32" fill="#78350f" rx="3" />
                    {/* Volumetric Layered Leaves */}
                    <circle cx="334" cy="310" r="26" fill="#15803d" />
                    <circle cx="320" cy="298" r="20" fill="#22c55e" />
                    <circle cx="348" cy="298" r="20" fill="#4ade80" />
                    <circle cx="334" cy="285" r="18" fill="#86efac" />
                    {showLabels && (
                      <text x="334" y="380" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="700" fontFamily="Prompt">ต้นไม้ใหญ่</text>
                    )}
                  </g>

                  {/* Kindergarten Building 3D Extrusion */}
                  <g filter="url(#iso-shadow)">
                    {/* 3D Wall Side Shadow */}
                    <rect x="236" y="240" width="70" height="85" fill="#dc2626" rx="8" />
                    {/* Roof Facet */}
                    <rect x="236" y="235" width="70" height="40" fill="url(#b2-roof-grad)" rx="8" />
                    {/* Front Wall */}
                    <rect x="240" y="255" width="62" height="65" fill={isNightMode ? "#450a0a" : "#fee2e2"} rx="4" />
                    {/* Windows with Day/Night Lighting */}
                    <rect x="246" y="265" width="22" height="16" fill={isNightMode ? "#fef08a" : "#93c5fd"} rx="2" />
                    <rect x="274" y="265" width="22" height="16" fill={isNightMode ? "#fef08a" : "#93c5fd"} rx="2" />
                    <text x="271" y="302" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="800" fontFamily="Prompt">อนุบาล</text>
                  </g>

                  {/* Director's Compound / Office below (ของ ผอ.) */}
                  <g filter="url(#iso-shadow)">
                    <rect x="240" y="325" width="62" height="52" fill={isNightMode ? "#1e293b" : "#ffffff"} rx="6" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="240" y1="351" x2="302" y2="351" stroke="#cbd5e1" strokeWidth="1.5" />
                    <rect x="248" y="331" width="46" height="14" fill={isNightMode ? "#fef08a" : "#f1f5f9"} rx="2" />
                    {showLabels && (
                      <>
                        <path d="M 235 348 Q 215 345 220 330" fill="none" stroke={isNightMode ? "#cbd5e1" : "#334155"} strokeWidth="2" />
                        <polygon points="233,344 238,349 231,351" fill={isNightMode ? "#cbd5e1" : "#334155"} />
                        <text x="200" y="322" textAnchor="middle" fill={isNightMode ? "#f1f5f9" : "#334155"} fontSize="12" fontWeight="700" fontFamily="Prompt">ของ ผอ.</text>
                      </>
                    )}
                  </g>
                </g>


                {/* ---------------------------------------------------- */}
                {/* 5. PLAYGROUND & 7 TREE BOULEVARD */}
                {/* ---------------------------------------------------- */}

                <g 
                  className={`zone-item ${selectedZone === 'playground' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('playground')}
                  filter={selectedZone === 'playground' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* BBL Soft Purple Rubber Safety Flooring */}
                  <rect x="392" y="295" width="44" height="185" fill={isNightMode ? "#581c87" : "#e9d5ff"} rx="16" stroke="#a855f7" strokeWidth="2.5" filter="url(#iso-shadow)" />

                  {/* Play Equipment Visuals: Slide, Swings, Hopscotch */}
                  <circle cx="414" cy="315" r="7" fill="#ef4444" />
                  <rect x="411" y="322" width="6" height="16" fill="#f59e0b" rx="2" />
                  <line x1="404" y1="445" x2="424" y2="445" stroke="#3b82f6" strokeWidth="3" />
                  <line x1="407" y1="448" x2="407" y2="465" stroke="#64748b" strokeWidth="2" />
                  <line x1="421" y1="448" x2="421" y2="465" stroke="#64748b" strokeWidth="2" />

                  {showLabels && (
                    <text 
                      x="414" 
                      y="395" 
                      textAnchor="middle" 
                      fill="#6b21a8" 
                      fontSize="13" 
                      fontWeight="800" 
                      fontFamily="Prompt"
                      transform="rotate(-90 414 395)"
                    >
                      สนามเด็กเล่น BBL
                    </text>
                  )}

                  {/* 7 Lush Shade Trees along the road */}
                  <g>
                    {[305, 335, 365, 395, 425, 455, 485].map((yT, idx) => (
                      <g key={idx} filter="url(#iso-shadow)">
                        <circle cx="380" cy={yT} r="12" fill="#15803d" />
                        <circle cx="377" cy={yT - 3} r="9" fill="#22c55e" />
                        <circle cx="375" cy={yT - 5} r="4" fill="#86efac" />
                      </g>
                    ))}
                  </g>
                </g>


                {/* ---------------------------------------------------- */}
                {/* 6. CENTRAL QUAD: STADIUM FOOTBALL FIELD & VOLLEYBALL */}
                {/* ---------------------------------------------------- */}

                {/* 6.1 Football Field (สนามบอลหญ้ามาตรฐาน) */}
                <g 
                  className={`zone-item ${selectedZone === 'football' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('football')}
                  filter={selectedZone === 'football' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* Field Surrounding Track Border */}
                  <rect x="450" y="270" width="385" height="215" fill={isNightMode ? "#14532d" : "#15803d"} rx="16" filter="url(#iso-shadow)" />
                  
                  {/* FIFA Mowed Grass Pattern Infield */}
                  <rect x="460" y="280" width="365" height="195" fill="url(#lawn-stripes)" rx="10" stroke="#ffffff" strokeWidth="2.5" />

                  {/* Field Markings: Center line & circle */}
                  <line x1="642" y1="280" x2="642" y2="475" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" />
                  <circle cx="642" cy="377" r="42" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" />
                  <circle cx="642" cy="377" r="4" fill="#ffffff" />

                  {/* Left Penalty Box & 3D Goal */}
                  <rect x="460" y="322" width="66" height="110" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                  <rect x="460" y="347" width="28" height="60" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                  {/* Left Goalpost 3D */}
                  <rect x="450" y="352" width="10" height="50" fill="none" stroke="#ffffff" strokeWidth="3" />

                  {/* Right Penalty Box & 3D Goal */}
                  <rect x="759" y="322" width="66" height="110" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                  <rect x="797" y="347" width="28" height="60" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                  {/* Right Goalpost 3D */}
                  <rect x="825" y="352" width="10" height="50" fill="none" stroke="#ffffff" strokeWidth="3" />

                  {/* 4 Corner Flags with Red Pennants */}
                  <g>
                    <polygon points="460,280 468,284 460,288" fill="#ef4444" />
                    <polygon points="460,475 468,471 460,467" fill="#ef4444" />
                    <polygon points="825,280 817,284 825,288" fill="#ef4444" />
                    <polygon points="825,475 817,471 825,467" fill="#ef4444" />
                  </g>

                  {/* Stadium Title */}
                  <text 
                    x="642" 
                    y="384" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    fontSize="22" 
                    fontWeight="800" 
                    fontFamily="Prompt"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                  >
                    สนามบอล
                  </text>
                </g>

                {/* 6.2 Volleyball Court (สนามวอลเลย์บอล) */}
                <g 
                  className={`zone-item ${selectedZone === 'volleyball' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('volleyball')}
                  filter={selectedZone === 'volleyball' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  <rect x="500" y="505" width="94" height="80" fill={isNightMode ? "#064e3b" : "#86efac"} rx="8" stroke="#15803d" strokeWidth="2.5" filter="url(#iso-shadow)" />
                  <rect x="508" y="513" width="78" height="64" fill={isNightMode ? "#047857" : "#a7f3d0"} stroke="#ffffff" strokeWidth="2" />
                  {/* 3D Net with Post */}
                  <line x1="547" y1="510" x2="547" y2="580" stroke="#1e293b" strokeWidth="3" strokeDasharray="3 2" />
                  <circle cx="547" cy="510" r="3" fill="#e5b326" />
                  <circle cx="547" cy="580" r="3" fill="#e5b326" />

                  {showLabels && (
                    <>
                      <text x="522" y="550" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 522 550)">สนาม</text>
                      <text x="547" y="550" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="800" fontFamily="Prompt" transform="rotate(-90 547 550)">วอลเลย์</text>
                      <text x="572" y="550" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700" fontFamily="Prompt" transform="rotate(-90 572 550)">บอล</text>
                    </>
                  )}
                </g>


                {/* ---------------------------------------------------- */}
                {/* 7. CEREMONIAL: NATIONAL FLAGPOLE & BUDDHA SHRINE */}
                {/* ---------------------------------------------------- */}

                <g 
                  className={`zone-item ${selectedZone === 'flagpole_shrine' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('flagpole_shrine')}
                  filter={selectedZone === 'flagpole_shrine' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* Flagpole (เสาธง) */}
                  <g filter="url(#iso-shadow)">
                    {/* Multi-tier Marble Base */}
                    <rect x="590" y="215" width="16" height="5" fill="#94a3b8" rx="1" />
                    <rect x="597" y="190" width="3" height="28" fill="#e2e8f0" />
                    <circle cx="598.5" cy="189" r="3" fill="#f59e0b" />
                    {/* Waving Thai National Flag */}
                    <path d="M 600 190 Q 610 188 622 192 L 622 208 Q 610 204 600 206 Z" fill="#ef4444" />
                    <path d="M 600 193 Q 610 191 622 195 L 622 205 Q 610 201 600 203 Z" fill="#ffffff" />
                    <path d="M 600 196 Q 610 194 622 198 L 622 202 Q 610 198 600 200 Z" fill="#1e3a8a" />
                    
                    {showLabels && (
                      <>
                        <path d="M 598 230 L 598 218 M 598 218 L 594 223 M 598 218 L 602 223" stroke={isNightMode ? "#cbd5e1" : "#1e293b"} strokeWidth="2" fill="none" />
                        <text x="598" y="244" textAnchor="middle" fill={isNightMode ? "#f8fafc" : "#1e293b"} fontSize="12" fontWeight="800" fontFamily="Prompt">เสาธง</text>
                      </>
                    )}
                  </g>

                  {/* Buddha Shrine (พระพุทธรูป) */}
                  <g filter="url(#iso-shadow)">
                    {/* Pedestal & Golden Statue */}
                    <rect x="650" y="202" width="22" height="8" fill="#78350f" rx="2" />
                    <circle cx="661" cy="189" r="10" fill="#fef08a" opacity="0.5" filter="url(#light-beam)" />
                    <path d="M 656 202 C 656 195, 658 190, 661 188 C 664 190, 666 195, 666 202 Z" fill="#d97706" />
                    <circle cx="661" cy="187" r="4" fill="#fbbf24" />

                    {showLabels && (
                      <>
                        <path d="M 661 230 L 661 218 M 661 218 L 657 223 M 661 218 L 665 223" stroke={isNightMode ? "#cbd5e1" : "#1e293b"} strokeWidth="2" fill="none" />
                        <text x="661" y="244" textAnchor="middle" fill={isNightMode ? "#f8fafc" : "#1e293b"} fontSize="12" fontWeight="800" fontFamily="Prompt">พระพุทธรูป</text>
                      </>
                    )}
                  </g>
                </g>


                {/* ---------------------------------------------------- */}
                {/* 8. NORTH COMPLEX: THE MAIN ROW OF BUILDINGS */}
                {/* ---------------------------------------------------- */}

                {/* 8.1 Welfare Shop (ร้านค้าสวัสดิการ) */}
                <g 
                  className={`zone-item ${selectedZone === 'welfare' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('welfare')}
                  filter={selectedZone === 'welfare' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  <rect x="390" y="140" width="54" height="60" fill={isNightMode ? "#4c1d95" : "#e9d5ff"} rx="7" stroke="#7e22ce" strokeWidth="2.5" filter="url(#iso-shadow)" />
                  {/* Shop Awning Stripes */}
                  <rect x="392" y="142" width="50" height="16" fill="#a855f7" rx="3" />
                  <rect x="396" y="166" width="42" height="18" fill={isNightMode ? "#fde047" : "#ffffff"} rx="2" />
                  <text x="417" y="174" textAnchor="middle" fill="#581c87" fontSize="10" fontWeight="800" fontFamily="Prompt">ร้านค้า</text>
                  <text x="417" y="185" textAnchor="middle" fill="#581c87" fontSize="9" fontWeight="800" fontFamily="Prompt">สวัสดิการ</text>
                </g>

                {/* 8.2 Restroom 1 (ห้องน้ำ 1) */}
                <g 
                  className={`zone-item ${selectedZone === 'restroom1' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('restroom1')}
                  filter={selectedZone === 'restroom1' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  <rect x="400" y="90" width="38" height="38" fill={isNightMode ? "#7c2d12" : "#fed7aa"} rx="6" stroke="#ea580c" strokeWidth="2.5" filter="url(#iso-shadow)" />
                  <path d="M 408 135 Q 402 118 418 114" fill="none" stroke="#ea580c" strokeWidth="2" />
                  <text x="419" y="80" textAnchor="middle" fill="#c2410c" fontSize="12" fontWeight="800" fontFamily="Prompt">ห้องน้ำ</text>
                </g>

                {/* 8.3 Canteen (โรงอาหาร สพฐ.) */}
                <g 
                  className={`zone-item ${selectedZone === 'canteen' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('canteen')}
                  filter={selectedZone === 'canteen' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  <rect x="452" y="122" width="60" height="78" fill={isNightMode ? "#7c2d12" : "#fed7aa"} rx="8" stroke="#ea580c" strokeWidth="3" filter="url(#iso-shadow)" />
                  {/* Canteen 3D Overhang Roof */}
                  <rect x="450" y="118" width="64" height="24" fill="#f97316" rx="4" />
                  {/* Dining Windows / Ambient glow */}
                  <rect x="458" y="148" width="48" height="36" fill={isNightMode ? "#fef08a" : "#ffedd5"} rx="3" />
                  <text x="482" y="166" textAnchor="middle" fill="#9a3412" fontSize="14" fontWeight="800" fontFamily="Prompt">โรง</text>
                  <text x="482" y="184" textAnchor="middle" fill="#9a3412" fontSize="14" fontWeight="800" fontFamily="Prompt">อาหาร</text>
                </g>

                {/* 8.4 Building 1 (อาคาร 1 - Main Complex 2-Story) */}
                <g 
                  className={`zone-item ${selectedZone === 'b1' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('b1')}
                  filter={selectedZone === 'b1' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* 3D Extruded Wall Shadow */}
                  <rect x="522" y="124" width="180" height="78" fill="#581c87" rx="10" />
                  {/* 3D Sloped Tile Roof */}
                  <rect x="522" y="116" width="180" height="36" fill="url(#b1-roof-grad)" rx="8" filter="url(#iso-shadow)" />
                  {/* Front Facade */}
                  <rect x="526" y="136" width="172" height="62" fill={isNightMode ? "#2e1065" : "#f3e8ff"} rx="6" />

                  {/* 2nd Floor Windows Row */}
                  <g fill={isNightMode ? "#fef08a" : "#c084fc"} filter={isNightMode ? "url(#light-beam)" : "none"}>
                    <rect x="536" y="142" width="20" height="12" rx="3" />
                    <rect x="564" y="142" width="20" height="12" rx="3" />
                    <rect x="592" y="142" width="20" height="12" rx="3" />
                    <rect x="620" y="142" width="20" height="12" rx="3" />
                    <rect x="648" y="142" width="20" height="12" rx="3" />
                    <rect x="670" y="142" width="20" height="12" rx="3" />
                  </g>

                  {/* Entrance Stairs & Name Plate */}
                  <rect x="585" y="194" width="54" height="6" fill="#cbd5e1" rx="1" />
                  <text 
                    x="612" 
                    y="180" 
                    textAnchor="middle" 
                    fill="#581c87" 
                    fontSize="20" 
                    fontWeight="900" 
                    fontFamily="Prompt"
                  >
                    อาคาร 1
                  </text>
                </g>

                {/* 8.5 Building 2 (อาคาร 2) */}
                <g 
                  className={`zone-item ${selectedZone === 'b2' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('b2')}
                  filter={selectedZone === 'b2' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  <rect x="712" y="124" width="86" height="78" fill="#9f1239" rx="8" />
                  <rect x="712" y="118" width="86" height="34" fill="url(#b2-roof-grad)" rx="6" filter="url(#iso-shadow)" />
                  <rect x="716" y="136" width="78" height="62" fill={isNightMode ? "#4c0519" : "#fee2e2"} rx="4" />
                  
                  {/* Windows */}
                  <rect x="724" y="144" width="24" height="12" fill={isNightMode ? "#fef08a" : "#fca5a5"} rx="2" />
                  <rect x="760" y="144" width="24" height="12" fill={isNightMode ? "#fef08a" : "#fca5a5"} rx="2" />
                  <text x="755" y="180" textAnchor="middle" fill="#991b1b" fontSize="16" fontWeight="800" fontFamily="Prompt">อาคาร 2</text>
                </g>

                {/* 8.6 Restroom 2 (ห้องน้ำ 2) */}
                <g 
                  className={`zone-item ${selectedZone === 'restroom2' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('restroom2')}
                  filter={selectedZone === 'restroom2' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  <rect x="806" y="120" width="64" height="82" fill={isNightMode ? "#075985" : "#bae6fd"} rx="7" stroke="#0284c7" strokeWidth="2.5" filter="url(#iso-shadow)" />
                  <text x="838" y="158" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800" fontFamily="Prompt">ห้อง</text>
                  <text x="838" y="176" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800" fontFamily="Prompt">น้ำ</text>
                </g>

                {/* 8.7 Parking Complex with 3 Parked Cars (ลานจอดรถ) */}
                <g 
                  className={`zone-item ${selectedZone === 'parking' ? 'active-zone' : ''}`}
                  onClick={() => setSelectedZone('parking')}
                  filter={selectedZone === 'parking' ? 'url(#active-beacon-glow)' : 'none'}
                >
                  {/* Parking Asphalt Ground */}
                  <rect x="878" y="120" width="70" height="82" fill={isNightMode ? "#500724" : "#fbcfe8"} rx="7" stroke="#db2777" strokeWidth="2" strokeDasharray="4 3" filter="url(#iso-shadow)" />
                  
                  {/* Parking Stall White Lines */}
                  <line x1="886" y1="130" x2="925" y2="130" stroke="#db2777" strokeWidth="1.5" />
                  <line x1="886" y1="150" x2="925" y2="150" stroke="#db2777" strokeWidth="1.5" />
                  <line x1="886" y1="170" x2="925" y2="170" stroke="#db2777" strokeWidth="1.5" />

                  {/* Cute Vector Cars Parked */}
                  {/* Car 1: White School Van */}
                  <rect x="892" y="124" width="28" height="12" fill="#ffffff" rx="3" stroke="#94a3b8" strokeWidth="1" />
                  <rect x="898" y="126" width="8" height="8" fill="#38bdf8" rx="1" />
                  {/* Car 2: Blue Sedan */}
                  <rect x="892" y="144" width="26" height="11" fill="#3b82f6" rx="3" />
                  <rect x="897" y="146" width="7" height="7" fill="#bae6fd" rx="1" />

                  <text x="913" y="190" textAnchor="middle" fill="#9d174d" fontSize="11" fontWeight="800" fontFamily="Prompt">ลานจอดรถ</text>
                </g>

                {/* 3D Compass Rose in North-East */}
                <g transform="translate(930, 50)" filter="url(#iso-shadow)">
                  <circle cx="0" cy="0" r="24" fill={isNightMode ? "#1e293b" : "#ffffff"} stroke={isNightMode ? "#475569" : "#cbd5e1"} strokeWidth="2" />
                  <polygon points="0,-20 6,-2 0,0" fill="#dc2626" />
                  <polygon points="0,-20 -6,-2 0,0" fill="#ef4444" />
                  <polygon points="0,20 6,2 0,0" fill="#64748b" />
                  <polygon points="0,20 -6,2 0,0" fill="#94a3b8" />
                  <circle cx="0" cy="0" r="4" fill="#ffffff" />
                  <text x="0" y="-25" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="900">N</text>
                </g>

              </svg>
            </div>

            {/* Quick Campus Zone Jump Ribbon */}
            <div className="campus-jump-ribbon">
              <span className="ribbon-label"><MapPin size={15} /> คลิกเลือกสถานที่:</span>
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

          {/* Right Column: Ultra-Luxurious Facility Presentation Drawer */}
          <div className="stage-details-panel glass-panel">
            {/* Header with dynamic color banner */}
            <div className="drawer-header" style={{ borderTopColor: currentZone.color }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="drawer-badge" style={{ backgroundColor: `${currentZone.color}25`, color: currentZone.color, borderColor: currentZone.color }}>
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
                  <Sparkles size={16} className="text-secondary" /> วัตถุประสงค์และการใช้งาน:
                </h5>
                <p className="segment-desc">{currentZone.desc}</p>
              </div>

              <div className="content-segment mt-4">
                <h5 className="segment-heading">
                  <CheckCircle2 size={16} className="text-secondary" /> จุดเด่นและระบบภายใน:
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
                  <Layers size={16} className="text-secondary" /> สิ่งอำนวยความสะดวก:
                </h5>
                <div className="facilities-chips-grid">
                  {currentZone.facilities.map((fac, i) => (
                    <span key={i} className="facility-chip">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* School Quality Assurance Badge */}
              <div className="school-guarantee-card mt-4">
                <div className="guarantee-icon">
                  <Trophy size={22} className="text-warning" />
                </div>
                <div className="guarantee-text">
                  <strong>โรงเรียนบ้านวังหัวแหวนพัฒนา</strong>
                  <p>สังกัด สพป.กำแพงเพชร เขต 2 มุ่งมั่นพัฒนาสภาพแวดล้อมที่สะอาด ปลอดภัย และทันสมัยสำหรับเยาวชนทุกคน</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Scoped CSS for Campus Master Experience */}
      <style>{`
        .campus-view-wrapper {
          transition: background-color 0.4s ease;
        }

        .campus-view-wrapper.mode-day {
          background-color: var(--color-bg-body);
        }

        .campus-view-wrapper.mode-night {
          background-color: #070d17;
          color: #f1f5f9;
        }

        .section-tag-gold {
          background: linear-gradient(135deg, rgba(229,179,38,0.2) 0%, rgba(245,158,11,0.1) 100%);
          color: #b45309;
          border: 1px solid rgba(229,179,38,0.4);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          letter-spacing: 0.8px;
        }

        .mode-night .section-tag-gold {
          color: #fde047;
          border-color: rgba(253,224,71,0.4);
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
          font-size: 1.05rem;
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
          transform: translateY(-2px);
        }

        .pill-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
          box-shadow: 0 4px 14px rgba(11, 37, 69, 0.25);
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
          transform: translateY(-2px);
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
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 16px 36px -10px rgba(11, 37, 69, 0.15);
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
          transition: background-color 0.4s ease;
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
          max-height: 600px;
          display: block;
        }

        /* Zone Items Interactive States */
        .zone-item {
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease;
        }

        .zone-item:hover {
          filter: drop-shadow(0 4px 12px rgba(229,179,38,0.7)) brightness(1.08);
          transform: translateY(-2px);
        }

        .zone-item.active-zone {
          transform: translateY(-2px);
        }

        /* Jump Ribbon */
        .campus-jump-ribbon {
          padding: 12px 18px;
          background: rgba(248, 250, 252, 0.8);
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
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 16px 36px -10px rgba(11, 37, 69, 0.15);
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

        .drawer-badge {
          font-size: 0.78rem;
          font-weight: 800;
          padding: 3px 12px;
          border-radius: var(--radius-full);
          border: 1px solid;
          font-family: var(--font-heading);
        }

        .drawer-area-badge {
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }

        .drawer-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .mode-night .drawer-title {
          color: #ffffff;
        }

        .drawer-subtitle {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          margin-bottom: 12px;
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
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
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
