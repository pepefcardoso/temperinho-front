import type { ElementType } from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink extends NavItem {
  icon: ElementType;
}

export const SITE_NAV_LINKS: NavItem[] = [
  { label: 'Receitas', href: '/receitas' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre Nós', href: '/sobre-nos' },
  { label: 'Anuncie', href: '/marketing' },
  { label: 'Contato', href: '/contato' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: '#', icon: FaInstagram },
  { label: 'Facebook', href: '#', icon: FaFacebook },
  { label: 'Youtube', href: '#', icon: FaYoutube },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: 'Termos de Serviço', href: '/termos' },
  { label: 'Política de Privacidade', href: '/privacidade' },
];