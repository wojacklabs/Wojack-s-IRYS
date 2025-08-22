import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'docs');

export interface DocMeta {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  order?: number;
  [key: string]: any;
}

export interface DocContent extends DocMeta {
  content: string;
}

export function getDocSlugs(): string[] {
  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
        arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const relativePath = path.relative(docsDirectory, path.join(dirPath, file));
        const slug = relativePath.replace(/\.(md|mdx)$/, '').replace(/\\/g, '/');
        arrayOfFiles.push(slug);
      }
    });

    return arrayOfFiles;
  };

  try {
    return getAllFiles(docsDirectory);
  } catch {
    return [];
  }
}

export function getDocBySlug(slug: string): DocContent | null {
  const realSlug = slug.replace(/\//g, path.sep);
  let fullPath = path.join(docsDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(docsDirectory, `${realSlug}.md`);
  }
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title || slug.split('/').pop() || 'Untitled',
    description: data.description,
    category: data.category,
    order: data.order,
    ...data,
  };
}

export function getAllDocs(): DocContent[] {
  const slugs = getDocSlugs();
  const docs = slugs
    .map((slug) => getDocBySlug(slug))
    .filter((doc): doc is DocContent => doc !== null)
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });

  return docs;
}

export function getDocsByCategory(): Record<string, DocContent[]> {
  const docs = getAllDocs();
  const categories: Record<string, DocContent[]> = {};

  docs.forEach((doc) => {
    const category = doc.category || 'General';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(doc);
  });

  return categories;
}
