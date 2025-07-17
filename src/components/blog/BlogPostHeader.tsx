import Link from 'next/link';
import { Calendar, User, Clock, Star } from 'lucide-react';
import type { Post } from '@/types/blog';
import { formatDate } from '@/lib/dateUtils';
import { PostActions } from '@/components/blog/PostActions';

interface BlogPostHeaderProps {
    article: Post;
    readTime: number;
}

const MetaItem = ({ icon: Icon, children }: { icon: React.ElementType, children: React.ReactNode }) => (
    <div className="flex items-center">
        <Icon className="h-4 w-4 mr-2" />
        {children}
    </div>
);

export function BlogPostHeader({ article, readTime }: BlogPostHeaderProps) {
    return (
        <div className="container mx-auto px-4 max-w-4xl">
            <nav className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                    <li className="select-none">/</li>
                    <li><span className="text-foreground">{article.category?.name ?? 'Artigo'}</span></li>
                </ol>
            </nav>
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
                    {article.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{article.summary}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                    <MetaItem icon={User}>{article.author?.name ?? 'Autor'}</MetaItem>
                    <MetaItem icon={Calendar}>
                        {formatDate(article.created_at, "dd 'de' MMMM 'de' yyyy")}
                    </MetaItem>
                    <MetaItem icon={Clock}>{readTime} min de leitura</MetaItem>
                    <MetaItem icon={Star}>
                        {(article.average_rating ?? 0).toFixed(1)} ({article.ratings_count ?? 0} avaliações)
                    </MetaItem>
                </div>
                <PostActions post={article} />
            </div>
        </div>
    );
}