import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const components = {
  h1: ({ children, ...props }: any) => (
    <h1 className="heading-1" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="heading-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="heading-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="heading-4" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="paragraph" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="list-item" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="blockquote" {...props}>
      {children}
    </blockquote>
  ),
  a: ({ children, href, ...props }: any) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        className="link"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (!inline && language) {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="code-block"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    }
    
    return (
      <code className="inline-code" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => {
    if (React.isValidElement(children) && children.props.className?.includes('language-')) {
      return children;
    }
    return (
      <pre className="code-pre" {...props}>
        {children}
      </pre>
    );
  },
  table: ({ children, ...props }: any) => (
    <div className="table-wrapper">
      <table className="table" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="table-head" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody className="table-body" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => (
    <tr className="table-row" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: any) => (
    <th className="table-header-cell" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="table-cell" {...props}>
      {children}
    </td>
  ),
  hr: (props: any) => <hr className="divider" {...props} />,
  img: ({ src, alt, ...props }: any) => (
    <img className="image" src={src} alt={alt} loading="lazy" {...props} />
  ),
};

export default components;
