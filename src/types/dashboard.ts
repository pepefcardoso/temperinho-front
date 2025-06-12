export type IconName = 'BookOpen' | 'FileText' | 'Heart' | 'TrendingUp';

export interface UserStat {
    title: string;
    value: string;
    description: string;
    iconName: IconName;
    variant: 'primary' | 'success' | 'danger' | 'warning';
}

export interface ActivityItem {
    type: 'receita' | 'artigo';
    title: string;
    action: 'publicada' | 'atualizado' | 'comentado';
    date: string;
    views: number;
}

export interface QuickAction {
    title: string;
    description: string;
    href: string;
    iconName: IconName;
    variant: 'primary' | 'secondary';
}