import React from 'react';
import { ProfileCardProps } from '../types';
import { Link } from 'react-router-dom';

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="card card-side bg-base-100 shadow-lg">
      <figure>
        <img src={profile.image_url} alt={profile.username} />
      </figure>
      <div className="card-body min-w-75">
        <Link to={`/profile/${profile.username}`} className="btn btn-primary">
          <h2 className="card-title">{profile.name || profile.username}</h2>
        </Link>
        <ul>
          {profile.name && (
            <li><span className="font-bold">Username:</span> {profile.username}</li>
          )}
          <li><a href={profile.url} target='_blank'>{profile.url}</a></li>
          <li><a href={profile.short_url} target='_blank'>{profile.short_url}</a></li>
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
