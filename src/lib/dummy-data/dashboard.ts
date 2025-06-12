import type { UserStat, ActivityItem, QuickAction } from '@/types/dashboard';

export const userStats: UserStat[] = [
    { title: 'Minhas Receitas', value: '12', description: 'Receitas publicadas', iconName: 'BookOpen', variant: 'primary' },
    { title: 'Meus Artigos', value: '8', description: 'Artigos publicados', iconName: 'FileText', variant: 'success' },
    { title: 'Favoritos', value: '24', description: 'Itens salvos', iconName: 'Heart', variant: 'danger' },
    { title: 'Visualizações', value: '1.2k', description: 'Total este mês', iconName: 'TrendingUp', variant: 'warning' }
];

export const recentActivity: ActivityItem[] = [/* ...seu array de recentActivity... */];

export const quickActions: QuickAction[] = [
    { title: 'Nova Receita', description: 'Compartilhe uma nova receita', href: '/usuario/receitas/nova', iconName: 'BookOpen', variant: 'primary' },
    { title: 'Novo Artigo', description: 'Escreva um artigo sobre alimentação', href: '/usuario/artigos/novo', iconName: 'FileText', variant: 'secondary' }
];