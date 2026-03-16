export interface Frontmatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  published?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  readingTime: number;
}
