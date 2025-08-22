import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getDocsByCategory, DocContent } from '@/lib/mdx';

interface DocsIndexProps {
  docsByCategory: Record<string, DocContent[]>;
}

export default function DocsIndex({ docsByCategory }: DocsIndexProps) {

  return (
    <Layout title="Documentation" description="Browse all documentation">
      <div className="docs-index">
        <h1>Documentation</h1>
        <p className="lead">
          Explore our comprehensive documentation to get started with Wojack.
        </p>

        <div className="docs-categories">
          {Object.entries(docsByCategory).map(([category, docs]) => (
            <section key={category} className="category-section">
              <h2>{category}</h2>
              <div className="docs-list">
                {docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="doc-link"
                  >
                    <h3>{doc.title}</h3>
                    {doc.description && <p>{doc.description}</p>}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
