import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { DocContent } from '@/lib/mdx';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  docsByCategory?: Record<string, DocContent[]>;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, docsByCategory }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const pageTitle = title ? `${title} | Wojack Docs` : 'Wojack Docs';
  const pageDescription = description || 'Documentation for your project';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="layout">
        <header className="header">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <span className="blind">메뉴 토글</span>
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
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          
          <Link href="/" className="logo">
            Wojack Docs
          </Link>

          <nav className="header-nav">
            <Link href="/docs" className={router.pathname.startsWith('/docs') ? 'active' : ''}>
              Docs
            </Link>
            <Link href="/guides" className={router.pathname.startsWith('/guides') ? 'active' : ''}>
              Guides
            </Link>
            <Link href="/api" className={router.pathname.startsWith('/api') ? 'active' : ''}>
              API
            </Link>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
          </div>
        </header>

        <div className="layout-body">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="main-content">
            <div className="content-wrapper">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
