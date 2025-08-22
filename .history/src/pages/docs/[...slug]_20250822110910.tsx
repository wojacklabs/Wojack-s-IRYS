import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Layout from '@/components/Layout';
import MDXComponents from '@/components/MDXComponents';
import { getDocBySlug, getDocSlugs, DocContent, getDocsByCategory } from '@/lib/mdx';

interface DocPageProps {
  doc: DocContent;
  source: any;
  docsByCategory: Record<string, DocContent[]>;
}

export default function DocPage({ doc, source, docsByCategory }: DocPageProps) {
  return (
    <Layout title={doc.title} description={doc.description} docsByCategory={docsByCategory}>
      <article className="doc-content">
        <header className="doc-header">
          <h1>{doc.title}</h1>
          {doc.description && <p className="doc-description">{doc.description}</p>}
        </header>
        
        <div className="prose">
          <MDXRemote {...source} components={MDXComponents} />
        </div>

        <footer className="doc-footer">
          <div className="doc-meta">
            {doc.lastUpdated && (
              <time dateTime={doc.lastUpdated}>
                Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
              </time>
            )}
          </div>
        </footer>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getDocSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug: slug.split('/') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<DocPageProps> = async ({ params }) => {
  const slug = params?.slug as string[];
  const doc = getDocBySlug(slug.join('/'));

  if (!doc) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(doc.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
  });

  return {
    props: {
      doc,
      source: mdxSource,
    },
  };
};
