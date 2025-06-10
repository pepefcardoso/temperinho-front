import Link from 'next/link';
import { Heart, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
    return (
        <footer className="bg-warm-900 text-warm-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <h3 className="text-2xl font-display font-bold text-white mb-4">
                                CozinhaInclusiva
                            </h3>
                        </Link>
                        <p className="text-warm-300 mb-6 leading-relaxed">
                            Conectando pessoas através da culinária inclusiva.
                            Porque todos merecem sabor, independente de suas restrições alimentares.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Button variant="ghost" size="sm" className="text-warm-300 hover:text-white hover:bg-warm-800">
                                    <Instagram className="h-5 w-5" />
                                </Button>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Button variant="ghost" size="sm" className="text-warm-300 hover:text-white hover:bg-warm-800">
                                    <Facebook className="h-5 w-5" />
                                </Button>
                            </a>
                            <Link href="/contato" aria-label="Email">
                                <Button variant="ghost" size="sm" className="text-warm-300 hover:text-white hover:bg-warm-800">
                                    <Mail className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Navegação</h4>
                        <ul className="space-y-3">
                            <li><Link href="/receitas" className="text-warm-300 hover:text-white transition-colors">Receitas</Link></li>
                            <li><Link href="/blog" className="text-warm-300 hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/sobre" className="text-warm-300 hover:text-white transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/contato" className="text-warm-300 hover:text-white transition-colors">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Restrições</h4>
                        <ul className="space-y-3">
                            <li><Link href="/receitas?filter=vegan" className="text-warm-300 hover:text-white transition-colors">Vegano</Link></li>
                            <li><Link href="/receitas?filter=gluten-free" className="text-warm-300 hover:text-white transition-colors">Sem Glúten</Link></li>
                            <li><Link href="/receitas?filter=lactose-free" className="text-warm-300 hover:text-white transition-colors">Sem Lactose</Link></li>
                            <li><Link href="/receitas?filter=vegetarian" className="text-warm-300 hover:text-white transition-colors">Vegetariano</Link></li>
                            <li><Link href="/receitas?filter=keto" className="text-warm-300 hover:text-white transition-colors">Cetogênica</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                        <p className="text-warm-300 mb-4 text-sm">
                            Receba receitas exclusivas e dicas semanais no seu email.
                        </p>

                        <form className="space-y-3">
                            <Input
                                type="email"
                                placeholder="Seu email"
                                className="bg-warm-800 border-warm-700 text-white placeholder-warm-400 focus:border-sage-400"
                            />
                            <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white">
                                Assinar Newsletter
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-warm-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-warm-400 text-sm mb-4 md:mb-0">
                        © 2025 CozinhaInclusiva. Todos os direitos reservados.
                    </div>
                    <div className="flex items-center text-warm-400 text-sm">
                        <span>Feito com</span>
                        <Heart className="h-4 w-4 mx-1 text-red-400" fill="currentColor" />
                        <span>para uma cozinha mais inclusiva</span>
                    </div>
                    <div className="flex space-x-6 text-warm-400 text-sm mt-4 md:mt-0">
                        <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
                        <Link href="/termos" className="hover:text-white transition-colors">Termos</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;