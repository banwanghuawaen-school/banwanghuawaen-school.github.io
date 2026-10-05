import React, { useEffect, useState } from 'react';
import { Mail, GraduationCap, Heart } from 'lucide-react';
import { dbService } from '../services/db';

export default function Staff({ lang = 'th' }) {
  const [staffData, setStaffData] = useState({ director: {}, teachers: [] });
  const isEn = lang === 'en';

  useEffect(() => {
    const loadStaff = () => {
      const data = dbService.getStaff();
      setStaffData(data);
    };

    loadStaff();
    window.addEventListener('school_db_updated', loadStaff);
    return () => window.removeEventListener('school_db_updated', loadStaff);
  }, []);

  const director = staffData.director;
  const teachers = staffData.teachers;

  // Teacher translation dictionary for fallback when legacy DB records lack English fields
  const getTeacherEn = (t) => {
    const map = {
      'teacher-1': {
        name: 'Mrs. Pornpimon Areerat',
        position: 'Senior Professional Level Teacher',
        duty: 'Homeroom Teacher, Grades 5 - 6',
        qualification: 'Bachelor of Education (B.Ed.) in Elementary Education',
        subject: 'Thai Language & Mathematics Department'
      },
      'teacher-2': {
        name: 'Mr. Tewarit Maliwan',
        position: 'Professional Level Teacher',
        duty: 'Homeroom Teacher, Grades 3 - 4',
        qualification: 'Bachelor of Education (B.Ed.) in Computer Education',
        subject: 'Science & Technology Department'
      },
      'teacher-3': {
        name: 'Ms. Sirilak Deeprom',
        position: 'Assistant Teacher',
        duty: 'Homeroom Teacher, Grades 1 - 2',
        qualification: 'Bachelor of Education (B.Ed.) in English Education',
        subject: 'Foreign Language Department (English)'
      },
      'teacher-4': {
        name: 'Ms. Nichanan Kaewwiset',
        position: 'Contract Teacher',
        duty: 'Early Childhood Teacher (Kindergarten 2 - 3)',
        qualification: 'Bachelor of Education (B.Ed.) in Early Childhood Education',
        subject: 'Early Childhood & Student Development Department'
      }
    };
    return map[t.id] || {};
  };

  const directorName = isEn ? (director.nameEn || 'Mr. Suchart Chanbantone') : director.name;
  const directorPosition = isEn ? (director.positionEn || 'Director of Ban Wang Hua Waen Phatthana School') : director.position;
  const directorQual = isEn ? (director.qualificationEn || 'Master of Education (M.Ed.) in Educational Administration') : director.qualification;
  const directorMotto = isEn ? (director.mottoEn || 'Systematic administration, fostering 21st-century global learning, guided by the Sufficiency Economy Philosophy.') : director.motto;

  const getTeacherAvatar = (_gender) => {
    // Elegant uniform portrait SVG outline
    return (
      <svg viewBox="0 0 100 100" className="staff-avatar-svg">
        <rect x="0" y="0" width="100" height="100" fill="#f1f5f9" />
        <circle cx="50" cy="38" r="16" fill="var(--color-primary)" opacity="0.8" />
        <path d="M 24 82 C 24 63, 34 58, 50 58 C 66 58, 76 63, 76 82 Z" fill="var(--color-primary)" />
        <path d="M 28 65 Q 32 63 36 67 M 72 65 Q 68 63 64 67" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" />
        <rect x="48" y="58" width="4" height="10" fill="var(--color-secondary)" />
      </svg>
    );
  };

  return (
    <div className="staff-view container section-padding animate-fade-in">
      {/* Title */}
      <div className="page-header text-center mb-5">
        <span className="section-tag">{isEn ? 'FACULTY & STAFF DIRECTORY' : 'PERSONNEL DIRECTORY'}</span>
        <h2 className="section-title">{isEn ? 'Faculty & Staff Directory' : 'ทำเนียบข้าราชการครูและบุคลากรทางการศึกษา'}</h2>
        <div className="school-divider">
          <span className="school-divider-dot"></span>
        </div>
        <p className="section-subtitle">
          {isEn 
            ? 'Directory of school administrators, certified teachers, and educational personnel at Ban Wang Hua Waen Phatthana School' 
            : 'ทำเนียบข้อมูลผู้บริหารสถานศึกษา ข้าราชการครู และบุคลากรทางการศึกษา โรงเรียนบ้านวังหัวแหวนพัฒนา'}
        </p>
      </div>

      {/* Real Faculty Group Photo Showcase */}
      <div className="faculty-group-showcase mb-5">
        <div className="group-photo-card">
          <img 
            src="news/school_teachers_group.jpg" 
            alt={isEn ? "Faculty and staff group photo" : "ภาพถ่ายรวมคณะครูและบุคลากรทางการศึกษา โรงเรียนบ้านวังหัวแหวนพัฒนา"} 
            className="group-photo-img"
          />
          <div className="group-photo-overlay">
            <span className="badge badge-pr mb-1">{isEn ? 'Faculty & Staff' : 'ข้าราชการครูและบุคลากร'}</span>
            <h4 className="group-photo-title">
              {isEn 
                ? 'Teachers and Educational Personnel of Ban Wang Hua Waen Phatthana School' 
                : 'คณะข้าราชการครูและบุคลากรทางการศึกษา โรงเรียนบ้านวังหัวแหวนพัฒนา'}
            </h4>
            <p className="group-photo-desc">
              {isEn 
                ? 'Dedicated to collaborative educational leadership, student well-being, and cultivating ethics alongside academic excellence.' 
                : 'ร่วมแรงร่วมใจจัดการศึกษา พัฒนาคุณภาพชีวิต และเสริมสร้างคุณธรรมนำความรู้สู่ผู้เรียน'}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Director Section */}
      <div className="director-executive-section mb-5">
        <h3 className="staff-sub-heading text-center">{isEn ? 'School Administrator' : 'ผู้บริหารสถานศึกษา'}</h3>
        <div className="director-card-wrapper">

          <div className="director-card">
            {/* Left Column: Photo frame */}
            <div className="director-photo-col">
              <div className="director-border-decor"></div>
              <div className="director-image-box">
                {director.imageUrl ? (
                  <img src={director.imageUrl} alt={directorName} className="director-svg-staff" style={{ objectFit: 'cover' }} />
                ) : (
                  <svg viewBox="0 0 100 100" className="director-svg-staff">
                    <rect x="0" y="0" width="100" height="100" fill="#f8fafc" />
                    <circle cx="50" cy="36" r="18" fill="var(--color-primary)" opacity="0.85" />
                    <path d="M 50 15 L 50 10 L 45 10 M 50 10 L 55 10" fill="none" stroke="var(--color-secondary)" strokeWidth="2" />
                    <path d="M 20 82 C 20 58, 30 53, 50 53 C 70 58, 80 58, 80 82 Z" fill="var(--color-primary)" />
                    <path d="M 24 61 Q 30 59 36 63 M 76 61 Q 70 59 64 63" fill="none" stroke="var(--color-secondary)" strokeWidth="3" />
                    <rect x="47" y="53" width="6" height="13" fill="var(--color-secondary)" />
                  </svg>
                )}
              </div>
            </div>
            {/* Right Column: Info details */}
            <div className="director-info-col">
              <span className="badge badge-pr mb-2">{isEn ? 'School Director' : 'ผู้อำนวยการสถานศึกษา'}</span>
              <h3 className="name-title">{directorName}</h3>
              <p className="position-title">{directorPosition}</p>
              
              <div className="details-list">
                <div className="detail-item">
                  <GraduationCap size={16} className="text-secondary" />
                  <span><strong>{isEn ? 'Educational Qualification:' : 'คุณวุฒิการศึกษา:'}</strong> {directorQual}</span>
                </div>
                <div className="detail-item">
                  <Mail size={16} className="text-secondary" />
                  <span><strong>{isEn ? 'Official Email Address:' : 'ไปรษณีย์อิเล็กทรอนิกส์ (อีเมล):'}</strong> <a href={`mailto:${director.email}`}>{director.email}</a></span>
                </div>
                <div className="detail-item">
                  <Heart size={16} className="text-secondary" />
                  <span className="motto-span">“{directorMotto}”</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Teachers Grid Section */}
      <div className="teachers-faculty-section">
        <h3 className="staff-sub-heading text-center mb-4">{isEn ? 'Teachers & Academic Staff' : 'ข้าราชการครูและบุคลากรทางการศึกษา'}</h3>
        
        <div className="grid-2 teachers-grid">
          {teachers.map((teacher) => {
            const enFallback = getTeacherEn(teacher);
            const teacherName = isEn ? (teacher.nameEn || enFallback.name || teacher.name) : teacher.name;
            const teacherPos = isEn ? (teacher.positionEn || enFallback.position || teacher.position) : teacher.position;
            const teacherDuty = isEn ? (teacher.dutyEn || enFallback.duty || teacher.duty) : teacher.duty;
            const teacherSubject = isEn ? (teacher.subjectEn || enFallback.subject || teacher.subject) : teacher.subject;
            const teacherQual = isEn ? (teacher.qualificationEn || enFallback.qualification || teacher.qualification) : teacher.qualification;

            return (
              <div key={teacher.id} className="teacher-card animate-fade-in">
                {/* Photo box left */}
                <div className="teacher-photo-container">
                  <div className="decor-border"></div>
                  <div className="photo-box">
                    {teacher.imageUrl ? (
                      <img src={teacher.imageUrl} alt={teacherName} className="staff-avatar-svg" style={{ objectFit: 'cover' }} />
                    ) : (
                      getTeacherAvatar(teacher.gender)
                    )}
                  </div>
                </div>

                {/* Info details right */}
                <div className="teacher-info">
                  <span className="badge badge-activity mb-2">{teacherDuty}</span>
                  <h4 className="teacher-name">{teacherName}</h4>
                  <p className="teacher-pos">{teacherPos}</p>
                  <div className="teacher-divider"></div>
                  
                  <div className="teacher-meta-list">
                    <p><strong>{isEn ? 'Department / Subject:' : 'กลุ่มสาระการเรียนรู้:'}</strong> {teacherSubject}</p>
                    <p><strong>{isEn ? 'Qualification:' : 'คุณวุฒิการศึกษา:'}</strong> {teacherQual}</p>
                    <p className="email-row">
                      <Mail size={14} className="text-secondary" /> 
                      <a href={`mailto:${teacher.email}`} className="email-link">{teacher.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .staff-sub-heading {
          font-size: 1.45rem;
          color: var(--color-primary);
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
        }

        .staff-sub-heading::after {
          content: '';
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -6px;
          height: 2px;
          background-color: var(--color-secondary);
        }

        /* Director card */
        .director-card-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .director-card {
          background-color: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          padding: 32px;
          width: 100%;
          max-width: 800px;
          border-top: 4px solid var(--color-secondary);
          align-items: center;
        }

        @media (max-width: 680px) {
          .director-card {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 20px;
            gap: 20px;
          }
          .director-photo-col {
            margin: 0 auto;
          }
          .detail-item {
            justify-content: center;
          }
        }

        .director-photo-col {
          position: relative;
          width: 180px;
          height: 225px;
          padding: 8px;
          background-color: white;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
        }

        .director-border-decor {
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 1px dashed var(--color-secondary);
          pointer-events: none;
        }

        .director-image-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .director-svg-staff {
          width: 100%;
          height: 100%;
        }

        .director-info-col .name-title {
          font-size: 1.5rem;
          color: var(--color-primary);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .director-info-col .position-title {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          margin-bottom: 20px;
          font-weight: 500;
        }

        .details-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          color: var(--color-text-main);
        }

        .motto-span {
          font-style: italic;
          color: var(--color-primary);
          font-weight: 500;
        }

        /* Teachers Faculty cards */
        .teachers-grid {
          margin-top: 20px;
          gap: 24px !important;
        }

        .teacher-card {
          background-color: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          padding: 24px;
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 24px;
          align-items: center;
          transition: var(--transition-smooth);
        }

        .teacher-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary-medium);
        }

        @media (max-width: 600px) {
          .teacher-card {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 20px;
            gap: 16px;
          }
          .teacher-photo-container {
            margin: 0 auto;
          }
        }

        .teacher-photo-container {
          position: relative;
          width: 130px;
          height: 165px;
          padding: 6px;
          background-color: white;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-sm);
        }

        .decor-border {
          position: absolute;
          top: 3px;
          left: 3px;
          right: 3px;
          bottom: 3px;
          border: 1px solid var(--color-secondary);
          opacity: 0.5;
          pointer-events: none;
        }

        .photo-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .staff-avatar-svg {
          width: 100%;
          height: 100%;
        }

        .teacher-info .teacher-name {
          font-size: 1.15rem;
          color: var(--color-primary);
          font-weight: 600;
          margin-bottom: 2px;
        }

        .teacher-info .teacher-pos {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .teacher-divider {
          height: 1px;
          background-color: var(--color-border);
          margin: 10px 0;
        }

        .teacher-meta-list {
          font-size: 0.85rem;
          color: var(--color-text-main);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .email-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .email-link {
          color: var(--color-primary);
          text-decoration: none;
        }

        .email-link:hover {
          text-decoration: underline;
        }

        .faculty-group-showcase {
          max-width: 900px;
          margin: 0 auto 3rem;
        }

        .group-photo-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          border: 1px solid #e2e8f0;
          background: #08192e;
        }

        .group-photo-img {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: cover;
          display: block;
        }

        .group-photo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0deg, rgba(8, 25, 46, 0.95) 0%, rgba(8, 25, 46, 0.75) 60%, transparent 100%);
          color: #ffffff;
          padding: 30px 28px 22px;
        }

        .group-photo-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #ffffff;
        }

        .group-photo-desc {
          font-size: 0.92rem;
          color: #cbd5e1;
          margin: 0;
        }

        .mb-5 { margin-bottom: 3rem; }
      `}</style>
    </div>
  );
}

