import { Instagram, Facebook, Mail } from 'lucide-react';

export const SITE_NAV_LINKS = [
  { label: "Receitas", href: "/receitas" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Contato", href: "/contato" },
];

export const SOCIAL_LINKS = [
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
    { label: "Email", href: "/contato", icon: Mail },
];

export const LEGAL_LINKS = [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "Política de Cookies", href: "/cookies" },
];