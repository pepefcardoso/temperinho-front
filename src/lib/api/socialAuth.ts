import axiosClient from "../axios";

export type Provider = "google" | "github" | "facebook";

export const getSocialRedirectUrl = async (provider: Provider) => {
  const response = await axiosClient.get(`/api/auth/social/${provider}`);
  return response.data.url;
};

export const handleSocialCallback = async (
  provider: Provider,
  code: string
) => {
  const response = await axiosClient.get(
    `/api/auth/social/${provider}/callback`,
    {
      params: { code },
    }
  );
  return response.data;
};
