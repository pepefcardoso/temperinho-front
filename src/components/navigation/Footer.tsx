import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_NAV_LINKS, SOCIAL_LINKS, LEGAL_LINKS, SocialLink, NavItem } from '@/lib/config/site';
import { getRecipeDiets } from '@/lib/api/recipe';
import NewsletterSection from '../newsletter/NewsletterSection';

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const restrictionLinks = await getRecipeDiets();

    return (
        <footer className="bg-foreground text-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <h3 className="text-2xl font-display font-bold text-background mb-4">Leve Sabor</h3>
                        </Link>
                        <p className="text-muted-foreground mb-6 leading-relaxed">Conectando pessoas através da culinária inclusiva.</p>
                        <div className="flex space-x-2">
                            {SOCIAL_LINKS.map((link: SocialLink) => (
                                <Link key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={link.label}>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-background hover:bg-background/20">
                                        <link.icon className="h-5 w-5" />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-background">Navegação</h4>
                        <ul className="space-y-3">
                            {SITE_NAV_LINKS.map((link: NavItem) => (
                                <li key={link.href}><Link href={link.href} className="text-muted-foreground hover:text-background transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-background">Restrições</h4>
                        <ul className="space-y-3">
                            {restrictionLinks.slice(0, 5).map((link) => (
                                <li key={link.id}><Link href={`/receitas?diets=${link.id}`} className="text-muted-foreground hover:text-background transition-colors">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-background">Newsletter</h4>
                        <p className="text-muted-foreground mb-4 text-sm">Receba receitas exclusivas e dicas semanais no seu email.</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-background/20">
                <NewsletterSection />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-muted-foreground text-sm mb-4 md:mb-0">
                        © {currentYear} Leve Sabor. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center text-muted-foreground text-sm">
                        <span>Feito com</span>
                        <Heart className="h-4 w-4 mx-1.5 text-red-500" fill="currentColor" />
                        <span>para uma cozinha mais inclusiva</span>
                    </div>
                    <div className="flex space-x-6 text-muted-foreground text-sm mt-4 md:mt-0">
                        {LEGAL_LINKS.map((link: NavItem) => (
                            <Link key={link.href} href={link.href} className="hover:text-background transition-colors">{link.label}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
