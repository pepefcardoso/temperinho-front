'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Menu, User, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SITE_NAV_LINKS } from '@/lib/config/site';
import { ThemeToggle } from './ThemeToggle';

function GlobalSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/receitas?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
            <Input
                type="text"
                placeholder="Buscar receitas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-9 bg-muted border-border focus:border-primary focus:ring-primary w-full"
            />
        </form>
    );
}

const Header = () => {
    const pathname = usePathname();

    const isActiveRoute = (href: string) => {
        return pathname === href || (href.length > 1 && pathname.startsWith(href));
    };

    return (
        <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-display font-bold text-primary hover:text-primary/90 transition-colors">
                            Leve Sabor
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-1">
                        {SITE_NAV_LINKS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActiveRoute(item.href)
                                        ? 'text-foreground bg-muted'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8">
                        <GlobalSearch />
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                            <Heart className="h-5 w-5" />
                            <span className="sr-only">Favoritos</span>
                        </Button>

                        <ThemeToggle />

                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/login">
                                <User className="h-5 w-5 mr-0 sm:mr-2" />
                                <span className="hidden sm:inline">Entrar</span>
                            </Link>
                        </Button>

                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Abrir menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full max-w-sm">
                                    <nav className="flex flex-col h-full">
                                        <div className="px-4 mt-8 mb-6"><GlobalSearch /></div>
                                        <div className="flex flex-col space-y-2 flex-grow">
                                            {SITE_NAV_LINKS.map((item) => (
                                                <SheetClose asChild key={item.label}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "block px-4 py-3 rounded-lg text-base",
                                                            isActiveRoute(item.href)
                                                                ? 'text-primary bg-primary/10 font-semibold'
                                                                : 'text-foreground hover:text-primary hover:bg-muted'
                                                        )}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;