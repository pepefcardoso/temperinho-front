// src/components/comments/CommentForm.tsx
'use client';

import { useState, useTransition } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { createComment } from '@/lib/api/interactions';

interface CommentFormProps {
    type: 'posts' | 'recipes';
    id: number;
    onCommentAdded: (newComment: any) => void;
}

export function CommentForm({ type, id, onCommentAdded }: CommentFormProps) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [content, setContent] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Você precisa estar logado para comentar.');
            router.push('/auth/login');
            return;
        }
        if (!content.trim()) {
            toast.error('O comentário não pode estar vazio.');
            return;
        }

        startTransition(async () => {
            try {
                const newComment = await createComment(type, id, content);
                toast.success('Comentário adicionado!');
                setContent('');
                onCommentAdded(newComment);
            } catch (error) {
                toast.error('Falha ao adicionar comentário.');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva seu comentário..."
                rows={4}
                disabled={isPending || !isAuthenticated}
            />
            <div className="flex justify-end">
                {isAuthenticated ? (
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Publicar
                    </Button>
                ) : (
                    <Button type="button" onClick={() => router.push('/auth/login')}>
                        Faça login para comentar
                    </Button>
                )}
            </div>
        </form>
    );
}