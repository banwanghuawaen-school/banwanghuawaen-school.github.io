import React from 'react';
import { Calendar, ArrowRight, Eye, Download, Pin, FileText, Image as ImageIcon } from 'lucide-react';

export default function NewsCard({ item, onClick, lang = 'th' }) {
  const isEn = lang === 'en';

  const getCategoryBadge = (category) => {
    const labels = {
      announcement: { th: 'ประกาศทางราชการ', en: 'Official Notice' },
      pr: { th: 'ข่าวประชาสัมพันธ์', en: 'Public Relations' },
      activity: { th: 'ข่าวกิจกรรมและผลงาน', en: 'Activities' },
      default: { th: 'ข่าวประชาสัมพันธ์', en: 'Public Relations' }
    };
    const key = labels[category] ? category : 'default';
    const badgeClass = category === 'announcement' ? 'badge-announcement' : category === 'activity' ? 'badge-activity' : 'badge-pr';
    return <span className={`badge ${badgeClass}`}>{isEn ? labels[key].en : labels[key].th}</span>;
  };

  // Convert date format from YYYY-MM-DD to formal Thai/English date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const monthsTh = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const monthsEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const day = parseInt(parts[2]);
        const monthIndex = parseInt(parts[1]) - 1;
        if (isEn) {
          const year = parseInt(parts[0]);
          return `${monthsEn[monthIndex]} ${day}, ${year}`;
        } else {
          const year = parseInt(parts[0]) + 543; // convert to Buddhist Era
          return `${day} ${monthsTh[monthIndex]} พ.ศ. ${year}`;
        }
      }
    } catch (e) {
      console.error("Error formatting date:", e);
    }
    return dateStr;
  };

  const resolveImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) return img;
    const clean = img.replace(/^\/+/, '');
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    return `${base}${clean}`;
  };

  // Check gallery count
  const galleryList = item.galleryUrls ? item.galleryUrls.split(',').map(s => s.trim()).filter(Boolean) : [];
  const rawImage = item.imageUrl || (galleryList.length > 0 ? galleryList[0] : '');
  const displayImage = resolveImageUrl(rawImage);

  // Helper to clean raw HTML, markdown symbols, and Facebook scraped footer metadata
  const cleanTextExcerpt = (text) => {
    if (!text) return '';
    let cleaned = String(text);
    cleaned = cleaned.replace(/<[^>]*>/g, ' ');
    cleaned = cleaned.replace(/(?:รูปภาพ|ความเป็นส่วนตัว|ข้อกำหนด|ลงโฆษณา|ตัวเลือกโฆษณา|คุกกี้|\s·\s)+.*/gi, '');
    cleaned = cleaned.replace(/[*#_`]/g, '');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
  };

  const currentTitle = isEn && item.titleEn ? item.titleEn : item.title;
  const currentSubtitle = isEn && item.subtitleEn ? item.subtitleEn : item.subtitle;
  const currentContent = isEn && item.contentEn ? item.contentEn : item.content;

  const cleanSubtitle = cleanTextExcerpt(currentSubtitle);
  const cleanContent = cleanTextExcerpt(currentContent);
  const excerpt = cleanSubtitle || cleanContent;
  const displayExcerpt = excerpt ? (excerpt.length > 110 ? excerpt.slice(0, 110) + '...' : excerpt) : (isEn ? 'Official announcement details.' : 'ไม่มีรายละเอียดเพิ่มเติม');

  // RENDER CASE 1: REAL PHOTO CARD
  if (displayImage) {
    return (
      <article className="news-card photo-card" onClick={onClick}>
        <div className="card-cover-container">
          <img 
            src={displayImage} 
            alt={currentTitle} 
            className="card-image"
            onError={(e) => {
              // If image fails, switch to text-only mode
              e.currentTarget.parentElement.style.display = 'none';
            }} 
          />
          <div className="card-category-floating">
            {item.isPinned && (
              <span className="badge badge-pinned">
                <Pin size={11} fill="white" /> {isEn ? 'Pinned' : 'ปักหมุด'}
              </span>
            )}
            {item.fbUrl && (
              <span className="badge badge-facebook">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg> Facebook
              </span>
            )}
            {getCategoryBadge(item.category)}
            {galleryList.length > 0 && (
              <span className="badge badge-gallery-count">
                <ImageIcon size={11} /> +{galleryList.length} รูป
              </span>
            )}
          </div>
        </div>

        <div className="card-body">
          <div className="card-meta">
            <span className="meta-item">
              <Calendar size={13} />
              {formatDate(item.date)}
            </span>
            <span className="meta-item" title={isEn ? `${(item.views || 0).toLocaleString()} views` : `ผู้เข้าชม ${(item.views || 0).toLocaleString()} ครั้ง`}>
              <Eye size={13} />
              {(item.views || 0).toLocaleString()}
            </span>
            {item.attachmentUrl && !item.attachmentUrl.includes('example.com') && (
              <span className="meta-item meta-attachment" title={isEn ? 'Attachment' : 'มีเอกสารแนบ'}>
                <Download size={13} />
              </span>
            )}
          </div>
          
          <h3 className="card-title" title={currentTitle}>
            {currentTitle}
          </h3>
          
          <p className="card-description">
            {displayExcerpt}
          </p>
          
          <div className="card-footer-action">
            <span className="read-more-btn">
              {isEn ? 'Read article' : 'อ่านรายละเอียดเพิ่มเติม'}
              <ArrowRight size={14} className="arrow-icon" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  // RENDER CASE 2: TEXT-ONLY CARD (NO PHOTO - Clean, Dignified Official Bulletin)
  return (
    <article className="news-card text-only-card" onClick={onClick}>
      <div className="text-card-accent-bar"></div>
      <div className="text-card-body">
        
        {/* Top Header Badge & Meta */}
        <div className="text-card-top-row">
          <div className="text-card-badges">
            <span className="badge badge-bulletin">
              <FileText size={12} /> {isEn ? 'Official Bulletin' : 'ประกาศทางราชการ'}
            </span>
            {item.isPinned && (
              <span className="badge badge-pinned">
                <Pin size={11} fill="white" /> {isEn ? 'Pinned' : 'ปักหมุด'}
              </span>
            )}
            {getCategoryBadge(item.category)}
          </div>
          <span className="text-card-date">
            <Calendar size={12} /> {formatDate(item.date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-card-title" title={currentTitle}>
          {currentTitle}
        </h3>

        {/* Content Excerpt with clean quote styling */}
        <div className="text-card-content-wrap">
          <p className="text-card-excerpt">
            {displayExcerpt}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="text-card-footer">
          <span className="meta-item text-views">
            <Eye size={13} /> {(item.views || 0).toLocaleString()} {isEn ? 'views' : 'ครั้ง'}
          </span>
          <span className="read-more-btn">
            {isEn ? 'Read full notice' : 'อ่านประกาศฉบับเต็ม'}
            <ArrowRight size={14} className="arrow-icon" />
          </span>
        </div>

      </div>
    </article>
  );
}
