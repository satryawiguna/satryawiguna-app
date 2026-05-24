import { apiClient } from '../client';

export interface ProfileUpdateRequest {
  name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    github: string | null;
    twitter: string | null;
    linkedin: string | null;
  };
}

class ProfileService {
  private readonly basePath = '/auth/profile';

  async update(data: ProfileUpdateRequest): Promise<ProfileResponse> {
    return apiClient.put<ProfileResponse>(this.basePath, data);
  }
}

export const profileService = new ProfileService();
