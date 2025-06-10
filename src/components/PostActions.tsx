'use client';

import { Bookmark, Share2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Post } from '@/types/blog';

interface PostActionsProps {
    post: Post;
}

export function PostActions({ post }: PostActionsProps) {
    const [isBookmarked, setIsBookmarked] = useLocalStorage(`bookmark_${post.id}`, false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
                console.log('Post compartilhado com sucesso!');
            } catch (error) {
                console.error('Erro ao compartilhar:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    return (
        <div className="flex flex-wrap gap-3">
            <Button
                variant="outline"
                onClick={() => setIsBookmarked(!isBookmarked)}
                aria-pressed={isBookmarked}
                className={cn(isBookmarked && 'border-primary text-primary hover:text-primary')}
            >
                <Bookmark className={cn('h-4 w-4 mr-2', isBookmarked && 'fill-primary')} />
                {isBookmarked ? 'Salvo' : 'Salvar'}
            </Button>
            <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
            </Button>
        </div>
    );
}