import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getAllDocs } from '@/lib/mdx';

export default function Home() {
  const recentDocs = getAllDocs().slice(0, 6);

  return (
    <Layout title="Home" description="Welcome to Wojack Documentation">
      <div className="home-page">
        <section className="hero">
          <h1 className="hero-title">Welcome to Wojack Docs</h1>
          <p className="hero-description">
            Build amazing documentation with Markdown and Next.js
          </p>
          <div className="hero-actions">
            <Link href="/docs" className="button button-primary">
              Get Started
            </Link>
            <Link href="/guides" className="button button-secondary">
              View Guides
            </Link>
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">Why Wojack Docs?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📝 Markdown Based</h3>
              <p>Write your documentation in Markdown with full MDX support</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Fast & Modern</h3>
              <p>Built with Next.js for optimal performance and SEO</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Beautiful UI</h3>
              <p>Clean and responsive design with dark mode support</p>
            </div>
            <div className="feature-card">
              <h3>🚀 Easy Deploy</h3>
              <p>Deploy to Vercel with one click and automatic updates</p>
            </div>
          </div>
        </section>

        {recentDocs.length > 0 && (
          <section className="recent-docs">
            <h2 className="section-title">Recent Documentation</h2>
            <div className="docs-grid">
              {recentDocs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="doc-card"
                >
                  <h3>{doc.title}</h3>
                  {doc.description && <p>{doc.description}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
