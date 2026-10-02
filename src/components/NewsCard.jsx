import React from 'react';
import { Calendar, ArrowRight, BookOpen, Volume2, Award, Eye, Download, Pin } from 'lucide-react';

export default function NewsCard({ item, onClick, lang = 'th' }) {
  const isEn = lang === 'en';

  const getCategoryBadge = (category) => {
    const labels = {
      announcement: { th: 'ประกาศสำคัญ', en: 'Announcement' },
      pr: { th: 'ข่าวประชาสัมพันธ์', en: 'Public Relations' },
      activity: { th: 'ข่าวกิจกรรม', en: 'Activity' },
      default: { th: 'ข่าวสาร', en: 'News' }
    };
    const key = labels[category] ? category : 'default';
    const badgeClass = category === 'announcement' ? 'badge-announcement' : category === 'activity' ? 'badge-activity' : 'badge-pr';
    return <span className={`badge ${badgeClass}`}>{isEn ? labels[key].en : labels[key].th}</span>;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'announcement':
        return <Volume2 size={24} className="card-decor-icon text-danger" />;
      case 'pr':
        return <Award size={24} className="card-decor-icon text-warning" />;
      case 'activity':
        return <BookOpen size={24} className="card-decor-icon text-primary" />;
      default:
        return <BookOpen size={24} className="card-decor-icon" />;
    }
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

  const firstGalleryImg = item.galleryUrls ? item.galleryUrls.split(',')[0]?.trim() : '';
  const rawImage = item.imageUrl || firstGalleryImg;
  const displayImage = resolveImageUrl(rawImage);

  // Helper to clean raw HTML, markdown symbols, and Facebook scraped footer metadata
  const cleanTextExcerpt = (text) => {
    if (!text) return '';
    let cleaned = String(text);
    // Remove HTML tags
    cleaned = cleaned.replace(/<[^>]*>/g, ' ');
    // Remove Facebook scraped page footer boilerplate text
    cleaned = cleaned.replace(/(?:รูปภาพ|ความเป็นส่วนตัว|ข้อกำหนด|ลงโฆษณา|ตัวเลือกโฆษณา|คุกกี้|\s·\s)+.*/gi, '');
    // Remove markdown symbols
    cleaned = cleaned.replace(/[*#_`]/g, '');
    // Collapse spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
  };

  const currentTitle = isEn && item.titleEn ? item.titleEn : item.title;
  const currentSubtitle = isEn && item.subtitleEn ? item.subtitleEn : item.subtitle;
  const currentContent = isEn && item.contentEn ? item.contentEn : item.content;

  const cleanSubtitle = cleanTextExcerpt(currentSubtitle);
  const cleanContent = cleanTextExcerpt(currentContent);
  const excerpt = cleanSubtitle || cleanContent;
  const displayExcerpt = excerpt ? (excerpt.length > 95 ? excerpt.slice(0, 95) + '...' : excerpt) : (isEn ? 'No additional details available.' : 'ไม่มีรายละเอียดเพิ่มเติม');

  return (
    <article className="news-card" onClick={onClick}>
      {/* Cover Image or Text-only Post */}
      <div className="card-cover-container">
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={currentTitle} 
            className="card-image"
            onError={(e) => {
              // Fallback: hide broken image and show text-only style
              e.currentTarget.parentElement.classList.add('card-text-only');
              e.currentTarget.style.display = 'none';
            }} 
          />
        ) : (
          <div className="card-text-only-fallback">
            <div className="text-only-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>{isEn ? 'School News' : 'ข่าวสารโรงเรียน'}</span>
            </div>
            <p className="text-only-preview">{cleanContent ? cleanContent.slice(0, 120) : currentTitle}</p>
          </div>
        )}
        <div className="card-category-floating" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {item.isPinned && (
            <span className="badge badge-pinned" style={{ backgroundColor: '#f97316', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '0.75rem', fontWeight: '600', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <Pin size={11} fill="white" /> {isEn ? 'Pinned' : 'ปักหมุด'}
            </span>
          )}
          {item.fbUrl && (
            <span className="badge" style={{ backgroundColor: '#1877F2', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '0.75rem', fontWeight: '600', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg> Facebook
            </span>
          )}
          {getCategoryBadge(item.category)}
        </div>
      </div>

      {/* Card Info */}
      <div className="card-body">
        <div className="card-meta">
          <span className="meta-item">
            <Calendar size={14} />
            {formatDate(item.date)}
          </span>
          <span className="meta-item" title={isEn ? `${(item.views || 0).toLocaleString()} views` : `เข้าชม ${(item.views || 0).toLocaleString()} ครั้ง`}>
            <Eye size={14} />
            {(item.views || 0).toLocaleString()}
          </span>
          {item.attachmentUrl && !item.attachmentUrl.includes('example.com') && (
            <span className="meta-item text-primary" title={isEn ? 'Attachment available' : 'มีไฟล์เอกสารดาวน์โหลดแนบ'} style={{ color: 'var(--color-primary)' }}>
              <Download size={14} />
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
            {isEn ? 'Read more' : 'อ่านรายละเอียดเพิ่มเติม'}
            <ArrowRight size={14} className="arrow-icon" />
          </span>
        </div>
      </div>

      <style>{`
        .news-card {
          background-color: var(--color-bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .news-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-premium);
          border-color: var(--color-primary-medium);
        }

        .card-cover-container {
          position: relative;
          height: 200px;
          overflow: hidden;
          background-color: #f3f4f6;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .news-card:hover .card-image {
          transform: scale(1.05);
        }

        /* Text-only fallback for posts without images */
        .card-text-only-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 24px;
          background: var(--color-bg-card, #ffffff);
          border-bottom: 1px solid var(--color-border, #e5e7eb);
        }

        .text-only-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-muted, #6b7280);
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .text-only-preview {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.55;
          color: var(--color-text, #1f2937);
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-text-only .card-text-only-fallback {
          display: flex;
        }

        /* Legacy gradient classes (kept for backward compatibility) */
        .bg-gradient-announcement {
          background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
        }

        .bg-gradient-pr {
          background: linear-gradient(135deg, #1e4620 0%, #112814 100%);
        }

        .bg-gradient-activity {
          background: linear-gradient(135deg, #cf9c27 0%, #906913 100%);
        }

        .card-category-floating {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
        }

        .card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-meta {
          display: flex;
          gap: 16px;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-bottom: 10px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text-heading);
          margin-bottom: 8px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-height: 3em; /* Exactly 2 lines at 1.5 line-height */
          min-height: 3em;
          padding-bottom: 2px;
          word-break: break-word;
        }

        .news-card:hover .card-title {
          color: var(--color-primary);
        }

        .card-description {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          margin-bottom: 16px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-height: 3em; /* Exactly 2 lines at 1.5 line-height */
          min-height: 3em;
          word-break: break-word;
        }

        .card-footer-action {
          margin-top: auto;
          border-top: 1px solid var(--color-border);
          padding-top: 12px;
        }

        .read-more-btn {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .arrow-icon {
          transition: transform 0.2s ease;
        }

        .news-card:hover .arrow-icon {
          transform: translateX(4px);
        }
      `}</style>
    </article>
  );
}
