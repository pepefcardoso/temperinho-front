export type Author = {
  name: string;
  avatarUrl: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  content: string;
  author: Author;
  date: string;
  category: string;
  tags: string[];
  readTimeInMinutes: number;
  featured: boolean;
  views: number;
};
