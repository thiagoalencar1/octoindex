export interface ProfileData {
  username: string;
  image_url: string;
  githubUrl: string;
  followers?: number | string;
  following?: number | string;
  stars?: number | string;
  contributions?: number | string;
  organization?: string;
  location?: string;
}

export interface ProfileCardProps {
  profile: ProfileData;
}

export interface GithubProfile {
  id: number;
  username: string;
  url: string;
}
