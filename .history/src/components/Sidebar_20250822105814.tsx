import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDocsByCategory } from '@/lib/mdx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const docsByCategory = getDocsByCategory();

  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, onClose]);

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Documentation</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <span className="blind">사이드바 닫기</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          {Object.entries(docsByCategory).map(([category, docs]) => (
            <div key={category} className="nav-category">
              <h3 className="category-title">{category}</h3>
              <ul className="nav-list">
                {docs.map((doc) => {
                  const href = `/docs/${doc.slug}`;
                  const isActive = router.asPath === href;
                  
                  return (
                    <li key={doc.slug}>
                      <Link
                        href={href}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
