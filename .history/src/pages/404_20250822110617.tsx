import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div className="error-page">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn&apos;t exist.</p>
        <Link href="/" className="button button-primary">
          Go Home
        </Link>
      </div>
    </Layout>
  );
}
