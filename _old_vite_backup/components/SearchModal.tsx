import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { ROLE_CARDS, PRODUCT_FEATURES } from '../constants';
import { api } from '../services/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery, isOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      const lowerQuery = query.toLowerCase();

      try {
        // Static Search (Roles & Features)
        const roleResults = ROLE_CARDS.filter(item =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)
        ).map(item => ({ ...item, type: 'Giải pháp' }));

        const featureResults = PRODUCT_FEATURES.filter(item =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)
        ).map(item => ({ ...item, type: 'Tính năng' }));

        // Async Search (News) using API
        let newsResults: any[] = [];
        try {
          const newsData = await api.getNews();
          if (Array.isArray(newsData)) {
            newsResults = newsData.filter((item: any) =>
              item.title.toLowerCase().includes(lowerQuery) ||
              (item.excerpt && item.excerpt.toLowerCase().includes(lowerQuery))
            ).map((item: any) => ({ ...item, type: 'Tin tức' }));
          }
        } catch (err) {
          console.error("Search API error:", err);
          // Fallback to static constants if API fails or while developing
          newsResults = [];
        }

        setResults([...roleResults, ...newsResults, ...featureResults]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tìm kiếm" maxWidth="sm:max-w-2xl">
      <div className="p-6">
        <div className="relative mb-6">
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
            placeholder="Nhập từ khóa tìm kiếm (VD: BIM, Nghị định 175...)"
            autoFocus
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-gray-500 uppercase">Kết quả ({results.length})</h5>
              {results.map((item, idx) => (
                <div key={idx} className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-transparent hover:border-blue-100" onClick={onClose}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-brand-blue bg-blue-100 px-2 py-0.5 rounded">{item.type}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description || item.excerpt}</p>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy kết quả nào cho "{query}"
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Nhập từ khóa để bắt đầu tìm kiếm
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;