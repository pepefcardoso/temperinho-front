import { userStats, recentActivity, quickActions } from '@/lib/dummy-data/dashboard';
import type { UserStat, ActivityItem, QuickAction } from '@/types/dashboard';

interface DashboardData {
    user: { name: string };
    stats: UserStat[];
    activities: ActivityItem[];
    actions: QuickAction[];
}

export async function getDashboardData(): Promise<DashboardData> {
    // Em um app real, os dados do usuário viriam de uma sessão (ex: auth())
    // e os outros dados de uma API.
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
        user: { name: 'Maria' }, // Dado do usuário agora vem da API
        stats: userStats,
        activities: recentActivity,
        actions: quickActions,
    };
}