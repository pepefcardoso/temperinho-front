import Link from 'next/link';
import Image from 'next/image';
import { User, Clock } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import type { Post } from '@/types/blog';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const cardVariants = cva(
    "group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border h-full",
    {
        variants: {
            variant: {
                default: "flex flex-col hover:-translate-y-1",
                featured: "relative text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BlogPostCardProps extends VariantProps<typeof cardVariants> {
    post: Post;
    className?: string;
}

const MetaInfo = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
    <div className="flex items-center">
        <Icon className="h-3.5 w-3.5 mr-1.5" />
        <span>{text}</span>
    </div>
);


export function BlogPostCard({ post, variant, className }: BlogPostCardProps) {
    return (
        <article className={cn(cardVariants({ variant }), className)}>
            <Link href={`/blog/${post.slug}`} className="block w-full h-full" aria-label={`Ler o artigo ${post.title}`}>
                <div className={cn("relative w-full overflow-hidden", variant === 'featured' ? 'h-full' : 'h-48')}>
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {variant === 'featured' && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>}
                </div>

                <div className={cn(
                    "flex flex-col",
                    variant === 'featured' ? 'absolute bottom-0 left-0 p-6 w-full' : 'p-6 flex-grow'
                )}>
                    {variant === 'featured' ? (
                        <Badge className="w-fit">Destaque</Badge>
                    ) : (
                        <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                    )}

                    <h3 className={cn(
                        "font-semibold line-clamp-2 group-hover:text-primary transition-colors",
                        variant === 'featured' ? 'text-xl text-white mt-2 font-display' : 'text-lg text-foreground mb-3'
                    )}>
                        {post.title}
                    </h3>

                    {variant === 'default' && (
                        <>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
                                <MetaInfo icon={User} text={post.author.name} />
                                <MetaInfo icon={Clock} text={`${post.readTimeInMinutes} min`} />
                            </div>
                        </>
                    )}
                </div>
            </Link>
        </article>
    );
}