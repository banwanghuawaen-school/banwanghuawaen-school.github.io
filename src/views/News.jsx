import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import NewsCard from '../components/NewsCard';
import { Search, AlertCircle, Newspaper } from 'lucide-react';

export default function News({ setView, setCurrentNewsItem, searchQuery: propSearchQuery, setSearchQuery: propSetSearchQuery, lang = 'th' }) {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const setSearchQuery = propSetSearchQuery || setLocalSearchQuery;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsList, setNewsList] = useState([]);

  const isEn = lang === 'en';

  useEffect(() => {
    const loadNews = () => {
      const news = dbService.getNews().filter(item => item.status === 'published');
      setNewsList(news);
    };

    loadNews();
    window.addEventListener('school_db_updated', loadNews);
    return () => window.removeEventListener('school_db_updated', loadNews);
  }, []);

  // Categories list
  const categories = isEn ? [
    { value: 'all', label: 'All News' },
    { value: 'announcement', label: 'Official Announcements' },
    { value: 'pr', label: 'Public Relations' },
    { value: 'activity', label: 'Activities & Events' }
  ] : [
    { value: 'all', label: 'ข่าวประชาสัมพันธ์ทั้งหมด' },
    { value: 'announcement', label: 'ประกาศทางราชการ' },
    { value: 'pr', label: 'ข่าวประชาสัมพันธ์' },
    { value: 'activity', label: 'ข่าวกิจกรรมและผลงาน' }
  ];

  // Filtering news based on search query and category tab
  const filteredNews = newsList.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = (item.title && item.title.toLowerCase().includes(q)) || 
                          (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
                          (item.content && item.content.toLowerCase().includes(q)) ||
                          (item.titleEn && item.titleEn.toLowerCase().includes(q));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="news-view container section-padding animate-fade-in">
      
      {/* Page Title Header */}
      <div className="page-header text-center mb-5">
        <span className="section-pill-tag">
          <Newspaper size={14} /> {isEn ? 'OFFICIAL PRESS & NEWS' : 'ข่าวประชาสัมพันธ์และประกาศทางราชการ'}
        </span>
        <h2 className="section-heading-modern">
          {isEn ? 'News & Announcements' : 'ข่าวประชาสัมพันธ์และประกาศสถานศึกษา'}
        </h2>
        <p className="section-sub-modern">
          {isEn 
            ? 'Stay informed about school admissions, academic awards, student nutrition, and community collaboration.' 
            : 'ติดตามข้อมูลข่าวสาร ประกาศทางการ เกียรติประวัติสถานศึกษา และภาพกิจกรรมการเรียนรู้'}
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="toolbar-section">
        {/* Search Input bar */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder={isEn ? "Search news, announcements, activities..." : "ระบุข้อความเพื่อสืบค้นข่าวสาร ประกาศทางราชการ..."} 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories filters */}
        <div className="filter-tabs-wrapper">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-tab-btn ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid Output */}
      {filteredNews.length > 0 ? (
        <div className="grid-3 news-grid-list">
          {filteredNews.map((item) => (
             <NewsCard 
               key={item.id} 
               item={item} 
               lang={lang}
               onClick={() => {
                 setCurrentNewsItem(item);
                 setView('news-detail');
               }} 
             />
          ))}
        </div>
      ) : (
        <div className="empty-results-state text-center">
          <AlertCircle size={44} className="empty-icon text-muted" />
          <h4>{isEn ? 'No Announcements Found' : 'ไม่พบข้อมูลข่าวสารที่ค้นหา'}</h4>
          <p className="text-muted">{isEn ? 'No articles match your search or filter. Try a different keyword.' : 'ไม่พบข้อมูลที่ตรงกับคำค้นหาหรือตัวกรองที่เลือก กรุณาระบุคำค้นหาใหม่อีกครั้ง'}</p>
          <button className="btn btn-outline btn-sm mt-3" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            {isEn ? 'Clear search & filters' : 'ล้างคำค้นหา'}
          </button>
        </div>
      )}

      <style>{`
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
          font-size: 2.3rem;
          font-weight: 800;
          color: #0b2545; /* Deep Royal Navy */
          line-height: 1.3;
          margin-bottom: 10px;
        }

        .section-sub-modern {
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.6;
          max-width: 680px;
          margin: 0 auto;
        }

        .toolbar-section {
          background-color: white;
          padding: 22px 24px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .search-bar-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #f59e0b;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.96rem;
          background-color: #f8fafc;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          background-color: white;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
        }

        .filter-tabs-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-tab-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 8px 18px;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .filter-tab-btn:hover {
          background-color: #f1f5f9;
          color: #0b2545;
          border-color: #f59e0b;
        }

        .filter-tab-btn.active {
          background: #0b2545; /* Deep Royal Navy */
          border-color: #f59e0b;
          color: #fde047; /* Yellow Accent */
          box-shadow: 0 4px 12px rgba(11, 37, 69, 0.25);
        }

        .news-grid-list {
          margin-top: 10px;
        }

        .empty-results-state {
          padding: 60px 20px;
          background-color: white;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
        }

        .empty-icon {
          margin-bottom: 16px;
          opacity: 0.6;
        }

        .empty-results-state h4 {
          font-size: 1.25rem;
          color: #0b2545;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .empty-results-state p {
          max-width: 440px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
