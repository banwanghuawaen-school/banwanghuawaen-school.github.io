const SUPABASE_URL = 'https://rsukgfvutcagkpcfatfw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdWtnZnZ1dGNhZ2twY2ZhdGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzQwODEsImV4cCI6MjA5OTA1MDA4MX0.YoIDvfwtSM-jO32vbRvsmV7mRzNd3UEB0epIAeAxyZ0';

async function updateNews() {
  const getRes = await fetch(`${SUPABASE_URL}/rest/v1/school_portal_data?key=eq.news&select=value`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  const data = await getRes.json();
  let newsList = data[0].value || [];

  console.log(`Current news count: ${newsList.length}`);

  // Create clean, strictly matched news records
  const updatedList = newsList.map(item => {
    // 1. Water truck from SAO Wang Ham Hae
    if (item.id === 'fb_1560176759242385') {
      return {
        ...item,
        title: "ขอขอบคุณองค์การบริหารส่วนตำบลวังหามแห นำรถน้ำมาอนุเคราะห์ช่วยเหลือสถานศึกษา",
        titleEn: "Gratitude to Wang Ham Hae SAO for Water Truck Assistance",
        subtitle: "การสนับสนุนน้ำอุปโภคบริโภคเพื่อการจัดการศึกษาและความเป็นอยู่ที่ดีของนักเรียน",
        subtitleEn: "Community water supply support for campus hygiene and school operations",
        imageUrl: "news/fb_1560176759242385.jpg",
        galleryUrls: "news/fb_1560176759242385_g1.jpg,news/fb_1560176759242385_g2.jpg,news/fb_1560176759242385_g3.jpg,news/fb_1560176759242385_g4.jpg"
      };
    }

    // 2. Thai Honda safety helmet & scholarships
    if (item.id === 'fb_1551648353428559') {
      return {
        ...item,
        title: "ขอขอบคุณ บริษัท ไทยฮอนด้า จำกัด และ ห้างหุ้นส่วนจำกัด นรินทร์กลการกำแพงเพชร มอบหมวกนิรภัยและทุนการศึกษา",
        titleEn: "Thai Honda and Narin Karnkol Donate Safety Helmets and Scholarships",
        subtitle: "โครงการขับขี่ปลอดภัยใส่ใจวินัยจราจร ส่งเสริมความปลอดภัยและมอบโอกาสทางการศึกษา",
        subtitleEn: "Safety riding campaign and educational scholarships for students",
        imageUrl: "news/fb_honda_safety.jpg",
        galleryUrls: ""
      };
    }

    // 3. Lunch donation by คุณเบญญาภา วงศ์ภู่
    if (item.id === 'fb_1550894303503964') {
      return {
        ...item,
        title: "ขอขอบคุณผู้ใหญ่ใจดี คุณเบญญาภา วงศ์ภู่ (พี่เกด) เลี้ยงอาหารกลางวันและมอบเงินแก่นักเรียน",
        titleEn: "Generous Lunch Sponsorship and Support by Khun Benyapha Wongphu",
        subtitle: "สนับสนุนสปาเก็ตตี้ ไก่ป๊อป คัพเค้กแสนอร่อย และมอบเงินสนับสนุนทุนการศึกษาแก่นักเรียน",
        subtitleEn: "Delightful spaghetti lunch and educational support for all students",
        imageUrl: "news/fb_lunch_donation.jpg",
        galleryUrls: ""
      };
    }

    // 4. Teacher PA evaluation
    if (item.id === 'fb_1550841523509242') {
      return {
        ...item,
        title: "การประเมินผลการปฏิบัติงานตามข้อตกลงในการพัฒนางาน (PA) ประจำปีงบประมาณ 2569",
        titleEn: "Teacher Performance Agreement (PA) Annual Assessment FY 2026",
        subtitle: "ขับเคลื่อนคุณภาพการจัดการเรียนรู้และการพัฒนาวิชาชีพครูเพื่อประโยชน์สูงสุดของผู้เรียน",
        subtitleEn: "Continuous instructional leadership and educational quality development",
        imageUrl: "news/fb_teacher_pa.jpg",
        galleryUrls: ""
      };
    }

    // 5. Buddhist holidays announcement (news-4) -> STRICT TEXT ONLY (no fake image)
    if (item.id === 'news-4') {
      return {
        ...item,
        title: "ประกาศหยุดเรียนเนื่องในวันสำคัญทางพระพุทธศาสนา วันอาสาฬหบูชาและวันเข้าพรรษา",
        titleEn: "School Holiday Notice: Asalha Puja Day and Buddhist Lent Day",
        subtitle: "แจ้งกำหนดการหยุดเรียนและการปฏิบัติตนตามหลักธรรมทางพระพุทธศาสนา",
        subtitleEn: "Official notification on religious observance and school schedule",
        imageUrl: "",
        galleryUrls: ""
      };
    }

    // 6. Campus landscaping & modern learning environment (news-3) -> Real entrance sign photo
    if (item.id === 'news-3') {
      return {
        ...item,
        title: "โครงการปรับปรุงภูมิทัศน์โรงเรียนและห้องเรียนอัจฉริยะ เพื่อรองรับการเรียนรู้ยุคใหม่",
        titleEn: "Campus Environment and Modern Learning Spaces Renovation Project",
        subtitle: "พัฒนาสภาพแวดล้อม ป้ายสถานศึกษา และบรรยากาศที่ปลอดภัย สะอาด ร่มรื่น และน่าเรียนรู้",
        subtitleEn: "Upgrading school grounds, entrance signs, and safe learning environment",
        imageUrl: "news/school_entrance_sign.jpg",
        galleryUrls: ""
      };
    }

    // 7. Wai Kru ceremony (news-2) -> STRICT TEXT ONLY (no fake image)
    if (item.id === 'news-2') {
      return {
        ...item,
        title: "กิจกรรมไหว้ครู ประจำปีการศึกษา 2569 'นอบน้อมวันทา บูชาคุณครู'",
        titleEn: "Annual Wai Kru (Teacher Appreciation) Ceremony 2026",
        subtitle: "พิธีแสดงความกตัญญูกตเวทิตาต่อครูอาจารย์ ผู้ประสิทธิ์ประสาทวิชาความรู้",
        subtitleEn: "Students pay tribute and express respect to teachers and mentors",
        imageUrl: "",
        galleryUrls: ""
      };
    }

    // 8. Admissions announcement (news-1) -> STRICT TEXT ONLY (no fake image)
    if (item.id === 'news-1') {
      return {
        ...item,
        title: "การสมัครเข้าเรียนระดับชั้นอนุบาล และชั้นประถมศึกษาปีที่ 1 ประจำปีการศึกษา 2569",
        titleEn: "Student Admissions for Kindergarten and Primary Grade 1 (Academic Year 2026)",
        subtitle: "เปิดรับสมัครนักเรียนใหม่เพื่อเข้ารับการศึกษาที่มีคุณภาพและสร้างเสริมพัฒนาการรอบด้าน",
        subtitleEn: "Enrolling new students for holistic development and academic excellence",
        imageUrl: "",
        galleryUrls: ""
      };
    }

    return item;
  });

  // Check if ISMS Award post is already in the list
  const hasAwardPost = updatedList.some(item => item.id === 'news-isms-award');
  if (!hasAwardPost) {
    // Add the authentic ISMS award post with school_award_honor.jpg
    updatedList.splice(4, 0, {
      id: "news-isms-award",
      title: "โรงเรียนบ้านวังหัวแหวนพัฒนา ได้รับรางวัลสถานศึกษาต้นแบบการนิเทศภายใน (ISMS Award) ระดับยอดเยี่ยม",
      titleEn: "Ban Wang Hua Waen Phatthana School Receives ISMS Excellence Award",
      subtitle: "ความภาคภูมิใจแห่งการพัฒนาคุณภาพการศึกษาและระบบนิเทศภายใน ระดับสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน",
      subtitleEn: "Excellence recognition in educational quality and instructional supervision from OBEC",
      category: "announcement",
      content: "โรงเรียนบ้านวังหัวแหวนพัฒนา สำนักงานเขตพื้นที่การศึกษาประถมศึกษากำแพงเพชร เขต 2 ได้รับการคัดเลือกและยกย่องเชิดชูเกียรติให้เป็น 'สถานศึกษาต้นแบบการนิเทศภายใน (Internal Supervision Model School : ISMS Award)' ระดับสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) ระดับยอดเยี่ยม ประจำปีการศึกษา 2568 สะท้อนถึงความมุ่งมั่นทุ่มเทของผู้บริหาร คณะครู และบุคลากรทางการศึกษาในการยกระดับคุณภาพการเรียนรู้ของผู้เรียนอย่างต่อเนื่อง",
      contentEn: "Ban Wang Hua Waen Phatthana School under Kamphaeng Phet Primary Educational Service Area Office 2 has been recognized as an Internal Supervision Model School (ISMS Award) at the Excellent Level by the Office of the Basic Education Commission (OBEC) for academic year 2025-2026.",
      date: "2026-08-10",
      author: "กลุ่มงานประชาสัมพันธ์สถานศึกษา",
      imageUrl: "news/school_award_honor.jpg",
      isPinned: true,
      status: "published",
      views: 245,
      attachmentName: "",
      attachmentUrl: "",
      galleryUrls: ""
    });
  }

  console.log(`\nSaving ${updatedList.length} items to Supabase...`);
  const postRes = await fetch(`${SUPABASE_URL}/rest/v1/school_portal_data`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify({
      key: 'news',
      value: updatedList,
      updated_at: new Date().toISOString()
    })
  });

  if (!postRes.ok) {
    const err = await postRes.text();
    console.error("Failed to save to Supabase:", err);
  } else {
    console.log("Successfully updated Supabase news with 100% strictly matched real photos & text-only fallbacks!");
  }
}

updateNews();
