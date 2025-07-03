import axiosClient from "@/lib/axios";
import { PaginatedResponse } from "@/types/api";
import type { Post, PostCategory, PostTopic } from "@/types/blog";

export interface GetPostsOptions {
  sortBy?: "title" | "created_at";
  sortDirection?: "asc" | "desc";
  filters?: {
    search?: string;
    category_id?: number;
    user_id?: number;
  };
  page?: number;
  limit?: number;
}

export async function getPosts(
  options: GetPostsOptions = {}
): Promise<PaginatedResponse<Post>> {
  const params = new URLSearchParams();

  if (options.sortBy) params.append("order_by", options.sortBy);
  if (options.sortDirection)
    params.append("order_direction", options.sortDirection);
  if (options.page) params.append("page", options.page.toString());
  if (options.limit) params.append("per_page", options.limit.toString());

  if (options.filters) {
    if (options.filters.search) params.append("search", options.filters.search);
    if (options.filters.category_id)
      params.append("category_id", options.filters.category_id.toString());
    if (options.filters.user_id)
      params.append("user_id", options.filters.user_id.toString());
  }

  const response = await axiosClient.get<PaginatedResponse<Post>>(`/posts`, {
    params,
  });
  return response.data;
}

export async function getPostById(id: number): Promise<Post> {
  const response = await axiosClient.get<{ data: Post }>(`/posts/${id}`);
  return response.data.data;
}

export async function createPost(data: FormData): Promise<Post> {
  const response = await axiosClient.post<{ data: Post }>("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
}

export async function updatePost(id: number, data: FormData): Promise<Post> {
  data.append("_method", "PUT");

  const response = await axiosClient.post<{ data: Post }>(
    `/posts/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
}

export async function deletePost(id: number): Promise<void> {
  await axiosClient.delete(`/posts/${id}`);
}

interface GetMyPostsParams {
  search?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}

export async function getMyPosts({
  search,
  categoryId,
  page = 1,
  limit = 10,
}: GetMyPostsParams = {}): Promise<PaginatedResponse<Post>> {
  const params: Record<string, string> = {
    page: page.toString(),
    per_page: limit.toString(),
  };

  if (search) {
    params.search = search;
  }
  if (categoryId) {
    params.category_id = categoryId;
  }

  const response = await axiosClient.get<PaginatedResponse<Post>>("/posts/my", {
    params,
  });
  return response.data;
}

interface GetFavoritePostsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
}

export async function getFavoritePosts({
  page = 1,
  limit = 10,
  search,
  categoryId,
}: GetFavoritePostsParams = {}): Promise<PaginatedResponse<Post>> {
  const params: Record<string, string> = {
    page: page.toString(),
    per_page: limit.toString(),
  };
  if (search) {
    params.search = search;
  }
  if (categoryId) {
    params.category_id = categoryId;
  }

  const response = await axiosClient.get<PaginatedResponse<Post>>(
    "/posts/favorites",
    { params }
  );
  return response.data;
}

export async function getPostCategories(): Promise<PostCategory[]> {
  const response = await axiosClient.get<{ data: PostCategory[] }>(
    "/post-categories"
  );
  return response.data.data;
}

export async function getPostTopics(): Promise<PostTopic[]> {
  const response = await axiosClient.get<{ data: PostTopic[] }>("/post-topics");
  return response.data.data;
}
