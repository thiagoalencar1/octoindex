import React from 'react';
interface ProfileData {
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

interface ProfileCardProps {
  profile: ProfileData;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="card card-side bg-base-100 shadow-lg">
      <figure>
        <img src={profile.image_url} alt={profile.username} />
      </figure>
      <div className="card-body min-w-75">
        <h2 className="card-title">{profile.username}</h2>
        <ul>
        <li><a href={profile.githubUrl} target='_blank'>{profile.githubUrl}</a></li>
          <li><span className="font-bold">Followers:</span> {profile.followers}</li>
          <li><span className="font-bold">Following:</span> {profile.following}</li>
          <li><span className="font-bold">Stars:</span> {profile.stars}</li>
          <li><span className="font-bold">Last Year Contributions:</span> {profile.contributions}</li>
          {profile.organization && (
            <li><span className="font-bold">Organization:</span> {profile.organization}</li>
          )}
          {profile.location && (
            <li><span className="font-bold">Location:</span> {profile.location}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
