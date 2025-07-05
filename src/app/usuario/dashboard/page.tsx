import { getAuthenticatedUserProfile } from '@/lib/api/user.server';
import { getMyRecipes } from '@/lib/api/recipe.server';
import { getMyPosts } from '@/lib/api/blog.server';
import { DashboardClient } from '@/components/user-profile/DashboardClient';

export default async function UserDashboardPage() {
    try {
        const [userData, myRecipesResponse, myPostsResponse] = await Promise.all([
            getAuthenticatedUserProfile(),
            getMyRecipes({ page: 1, limit: 3 }),
            getMyPosts({ page: 1, limit: 3 }),
        ]);

        return (
            <DashboardClient
                user={userData}
                recentRecipes={myRecipesResponse.data}
                recentPosts={myPostsResponse.data}
            />
        );
    } catch (error) {
        console.error("Falha ao carregar dados do dashboard no servidor:", error);
        return (
            <DashboardClient
                user={null}
                recentRecipes={[]}
                recentPosts={[]}
            />
        );
    }
}