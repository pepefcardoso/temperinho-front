'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Search, Menu, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();

    const navigationItems = [
        { name: 'Receitas', href: '/receitas' },
        { name: 'Blog', href: '/blog' },
        { name: 'Sobre', href: '/sobre-nos' },
        { name: 'Contato', href: '/contato' },
    ];

    const isActiveRoute = (href: string) => {
        return pathname === href || (href !== '/' && pathname.startsWith(href));
    };

    return (
        <header className="bg-white/95 backdrop-blur-sm border-b border-warm-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-display font-bold text-sage-700 hover:text-sage-800 transition-colors">
                            CozinhaInclusiva
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActiveRoute(item.href)
                                        ? 'text-sage-700 border-b-2 border-sage-600'
                                        : 'text-warm-700 hover:text-sage-600'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-500 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Buscar receitas, ingredientes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-warm-50 border-warm-200 focus:border-sage-400 focus:ring-sage-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="hidden sm:flex">
                            <Heart className="h-4 w-4 mr-2" />
                            Favoritos
                        </Button>
                        <Button variant="outline" size="sm" className="border-sage-300 text-sage-700 hover:bg-sage-50">
                            <User className="h-4 w-4 mr-2" />
                            Entrar
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="lg:hidden py-3 border-t border-warm-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-500 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Buscar receitas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-warm-50 border-warm-200"
                        />
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-warm-200">
                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-md transition-colors duration-200 ${isActiveRoute(item.href)
                                            ? 'text-sage-700 bg-sage-50 font-medium'
                                            : 'text-warm-700 hover:text-sage-600 hover:bg-warm-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;