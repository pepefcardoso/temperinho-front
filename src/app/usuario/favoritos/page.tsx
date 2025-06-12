import { redirect } from 'next/navigation';

// Esta página não renderiza nada. Sua única função é redirecionar o usuário.
export default function FavoritesPage() {
    redirect('/usuario/favoritos/artigos');
}