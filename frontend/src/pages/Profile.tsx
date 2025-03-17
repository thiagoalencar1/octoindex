import React, { useEffect, useState } from 'react';
import { ProfileCardProps } from '../types';
import { ProfileData } from '../types';
import { Link, useParams } from 'react-router-dom';

const Profile: React.FC<ProfileCardProps> = ({}) => {
  const [profile, setProfile] = useState<ProfileData[]>([]);
  const { username } = useParams();

    useEffect(() => {
      const fetchProfile = async (username) => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/github_profiles/${username}`);
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Erro ao buscar perfis.', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile(username);
    }, []);

  return (
    <div className="h-full min-h-screen mx-auto w-full pr-20 pl-20 mt-20">
      <div className="flex justify-center items-center mb-6">
        <Link to="/" className="btn btn-ghost mr-4">
          &larr; Voltar
        </Link>
      </div>
      <div className="card card-side bg-base-100 shadow-lg max-w-[900px] mx-auto">
        <figure>
          <img src={profile.image_url} alt={profile.username} />
        </figure>
        <div className="card-body min-w-75">
          <h2 className="card-title">{profile.name || profile.username}</h2>
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
    </div>
  );
};

export default Profile;
