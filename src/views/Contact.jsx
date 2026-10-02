import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { dbService } from '../services/db';

export default function Contact({ schoolInfo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'ทั่วไป',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Enquiry:", formData);
    
    // Save message via dbService to automatically upload to cloud database
    dbService.saveMessage(formData);

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: 'ทั่วไป', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-view container section-padding animate-fade-in">
      {/* Header */}
      <div className="page-header text-center">
        <span className="section-tag">OFFICIAL CONTACT</span>
        <h2 className="section-title">ข้อมูลการติดต่อราชการ</h2>
        <div className="school-divider">
          <span className="school-divider-dot"></span>
        </div>
        <p className="section-subtitle">ช่องทางการติดต่อราชการ การประสานงาน และแบบฟอร์มสอบถามข้อมูล โรงเรียนบ้านวังหัวแหวนพัฒนา</p>
      </div>

      <div className="grid-2 contact-grid">
        {/* Left: Contact Info details */}
        <div className="contact-info-cards-wrapper">
          <div className="contact-card-item">
            <div className="icon-wrapper">
              <MapPin size={24} />
            </div>
            <div className="content">
              <h4>ที่ตั้งสถานศึกษา</h4>
              <p>{schoolInfo.address}</p>
            </div>
          </div>

          <div className="contact-card-item">
            <div className="icon-wrapper">
              <Phone size={24} />
            </div>
            <div className="content">
              <h4>หมายเลขโทรศัพท์ติดต่อราชการ</h4>
              <p><a href={`tel:${schoolInfo.phone}`}>{schoolInfo.phone}</a></p>
              <span className="muted-note">ในวันและเวลาราชการ (08.30 น. - 16.30 น.)</span>
            </div>
          </div>

          <div className="contact-card-item">
            <div className="icon-wrapper">
              <Mail size={24} />
            </div>
            <div className="content">
              <h4>ไปรษณีย์อิเล็กทรอนิกส์ (อีเมล)</h4>
              <p><a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a></p>
            </div>
          </div>

          <div className="contact-card-item">
            <div className="icon-wrapper">
              <Clock size={24} />
            </div>
            <div className="content">
              <h4>วันและเวลาปฏิบัติราชการ</h4>
              <p>วันจันทร์ - วันศุกร์ (เว้นวันหยุดราชการและวันหยุดนักขัตฤกษ์)</p>
              <p>เวลา 08.30 น. - 16.30 น.</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-card">
          <h3 className="form-card-title">แบบฟอร์มติดต่อราชการและสอบถามข้อมูล</h3>
          <div className="title-underline text-left"></div>
          
          {submitted ? (
            <div className="submit-success-alert animate-fade-in">
              <CheckCircle size={36} className="success-icon" />
              <div>
                <h4>ส่งข้อความประสานงานสำเร็จ</h4>
                <p>ทางสถานศึกษาได้รับข้อมูลของท่านเรียบร้อยแล้ว เจ้าหน้าที่ผู้เกี่ยวข้องจะดำเนินการติดต่อกลับโดยเร็ว</p>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">ชื่อ-นามสกุล ผู้ติดต่อ</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-input" 
                required 
                placeholder="ระบุชื่อและนามสกุล"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="email" className="form-label">ไปรษณีย์อิเล็กทรอนิกส์ (อีเมล)</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">หมายเลขโทรศัพท์ติดต่อ</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-input" 
                  required 
                  placeholder="08X-XXX-XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">เรื่องที่ประสงค์ติดต่อราชการ</label>
              <select 
                id="subject" 
                name="subject" 
                className="form-input select-input"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="ทั่วไป">สอบถามข้อมูลทั่วไปและการประสานงาน</option>
                <option value="สมัครเรียน">สอบถามข้อมูลการรับสมัครและเข้าศึกษาต่อ</option>
                <option value="เสนอแนะ">ข้อเสนอแนะเพื่อการพัฒนาสถานศึกษา</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">รายละเอียดข้อความที่ประสงค์ติดต่อ</label>
              <textarea 
                id="message" 
                name="message" 
                className="form-input" 
                required 
                placeholder="ระบุข้อความรายละเอียดที่ประสงค์ติดต่อราชการหรือสอบถามข้อมูลที่นี่..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              <Send size={16} /> ส่งข้อความติดต่อราชการ
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Map Area */}
      <section className="map-embed-section mt-5">
        <h3 className="map-title text-center">แผนที่และพิกัดที่ตั้งสถานศึกษา</h3>
        <div className="school-divider">
          <span className="school-divider-dot"></span>
        </div>
        <div className="map-frame-container">
          <iframe 
            src={schoolInfo.googleMapsUrl} 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="แผนที่โรงเรียนบ้านวังหัวแหวนพัฒนา"
            className="map-iframe"
          ></iframe>
        </div>
      </section>

      <style>{`
        .contact-grid {
          align-items: start;
          margin-bottom: 50px;
        }

        .contact-info-cards-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-card-item {
          background-color: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          padding: 24px;
          display: flex;
          gap: 20px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
        }

        .contact-card-item:hover {
          transform: translateX(6px);
          border-color: var(--color-primary-medium);
          box-shadow: var(--shadow-md);
        }

        .contact-card-item .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-card-item:hover .icon-wrapper {
          background-color: var(--color-primary);
          color: white;
          transition: var(--transition-smooth);
        }

        .contact-card-item .content h4 {
          font-size: 1.1rem;
          color: var(--color-primary);
          margin-bottom: 6px;
        }

        .contact-card-item .content p {
          font-size: 0.95rem;
          color: var(--color-text-main);
          word-break: break-word;
        }

        .muted-note {
          display: block;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .contact-form-card {
          background-color: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          padding: 30px;
          box-shadow: var(--shadow-sm);
        }

        .form-card-title {
          font-size: 1.4rem;
          color: var(--color-primary);
          margin-bottom: 8px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .select-input {
          cursor: pointer;
        }

        .w-100 {
          width: 100%;
        }

        .submit-success-alert {
          background-color: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .submit-success-alert h4 {
          color: #065f46;
          margin-bottom: 4px;
        }

        .submit-success-alert p {
          font-size: 0.85rem;
          margin: 0;
        }

        .success-icon {
          color: var(--color-success);
          flex-shrink: 0;
        }

        /* Map styling */
        .map-embed-section {
          margin-top: 40px;
        }

        .map-title {
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-bottom: 8px;
        }

        .map-frame-container {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 2px solid var(--color-primary);
          box-shadow: var(--shadow-lg);
        }

        .map-iframe {
          display: block;
        }

        .mt-5 { margin-top: 3rem; }
      `}</style>
    </div>
  );
}
