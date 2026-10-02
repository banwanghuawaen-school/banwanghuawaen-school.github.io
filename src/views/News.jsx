import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import NewsCard from '../components/NewsCard';
import { Search, AlertCircle } from 'lucide-react';

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
    { value: 'announcement', label: 'Announcements' },
    { value: 'pr', label: 'Public Relations' },
    { value: 'activity', label: 'Activities' }
  ] : [
    { value: 'all', label: 'ข่าวประชาสัมพันธ์ทั้งหมด' },
    { value: 'announcement', label: 'ประกาศทางราชการ' },
    { value: 'pr', label: 'ข่าวประชาสัมพันธ์' },
    { value: 'activity', label: 'ข่าวกิจกรรมและผลงาน' }
  ];

  // Filtering news based on search query and category tab
  const filteredNews = newsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="news-view container section-padding animate-fade-in">
      {/* Page Title Header */}
      <div className="page-header text-center">
        <span className="section-tag">{isEn ? 'ANNOUNCEMENTS & NEWS' : 'ข่าวประชาสัมพันธ์และประกาศทางราชการ'}</span>
        <h2 className="section-title">{isEn ? 'News & Announcements' : 'ข่าวประชาสัมพันธ์และประกาศทางราชการ'}</h2>
        <div className="school-divider">
          <span className="school-divider-dot"></span>
        </div>
        <p className="section-subtitle">
          {isEn 
            ? 'Stay informed about school admissions, events, student activities, and official notices.' 
            : 'ติดตามข้อมูลข่าวสาร ประกาศทางราชการ กิจกรรมการเรียนรู้ และผลงานการศึกษาของสถานศึกษา'}
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="toolbar-section">
        {/* Search Input bar */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder={isEn ? "Search news, announcements..." : "ระบุข้อความเพื่อสืบค้นข่าวประชาสัมพันธ์..."} 
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
          <AlertCircle size={48} className="empty-icon text-muted" />
          <h4>{isEn ? 'No Announcements Found' : 'ไม่พบข้อมูลข่าวประชาสัมพันธ์'}</h4>
          <p className="text-muted">{isEn ? 'No articles match your search or filter. Try a different keyword.' : 'ไม่พบข้อมูลที่ตรงกับเงื่อนไขการสืบค้นหรือตัวกรองที่เลือก กรุณาระบุคำค้นหาใหม่อีกครั้ง'}</p>
          <button className="btn btn-outline btn-sm mt-3" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            {isEn ? 'Clear search & filters' : 'ล้างเงื่อนไขการสืบค้น'}
          </button>
        </div>
      )}



      <style>{`
        .page-header {
          margin-bottom: 40px;
        }

        .toolbar-section {
          background-color: white;
          padding: 20px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
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
          color: var(--color-text-muted);
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 1rem;
          background-color: var(--color-bg-body);
          transition: var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          background-color: white;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-light);
        }

        .filter-tabs-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-tab-btn {
          background: none;
          border: 1px solid var(--color-border);
          padding: 8px 16px;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-main);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-tab-btn:hover {
          background-color: var(--color-bg-body);
          border-color: var(--color-text-muted);
        }

        .filter-tab-btn.active {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .news-grid-list {
          margin-top: 10px;
        }

        .empty-results-state {
          padding: 60px 20px;
          background-color: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }

        .empty-icon {
          margin-bottom: 16px;
          opacity: 0.6;
        }

        .empty-results-state h4 {
          font-size: 1.25rem;
          color: var(--color-text-heading);
          margin-bottom: 8px;
        }

        .empty-results-state p {
          max-width: 400px;
          margin: 0 auto;
        }

        .mt-3 { margin-top: 1rem; }
      `}</style>
    </div>
  );
}
