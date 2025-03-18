import React, { useEffect, useState } from 'react';
import { ProfileData } from '../types';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const { username } = useParams();
  const navigate = useNavigate();

  const fetchProfile = async (username: string) => {
    try {
      const response = await fetch(`http://3.145.73.162:3000/api/v1/github_profiles/${username}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Erro ao buscar perfis.', error);
      setError('Falha ao buscar perfil. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const reloadProfile = async (username: string) => {
    const apiUrl = `http://3.145.73.162:3000/api/v1/github_profiles?url_or_username=${username}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Resposta da API não foi bem-sucedida');
      }

      // Fetch the updated profile data
      await fetchProfile(username);

      setFlashMessage('Perfil atualizado com sucesso!');
      navigate(`/profile/${username}`, { state: { flashMessage: 'Perfil atualizado com sucesso!' } });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError('Falha ao atualizar perfil. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Deseja realmente deletar este perfil?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://3.145.73.162:3000/api/v1/github_profiles/${username}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar perfil');
      }

      navigate('/', { 
        state: { flashMessage: 'Perfil deletado com sucesso!' }
      });
    } catch (error) {
      console.error('Erro ao deletar perfil:', error);
      setError('Erro ao deletar perfil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProfile(username);
    }
  }, [username]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="h-full min-h-screen mx-auto w-full pr-20 pl-20 mt-20">
      {flashMessage && (
        <div className="alert alert-success shadow-lg mb-4 mx-auto max-w-[900px]">
          <div>
            <span>{flashMessage}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mb-6">
        <Link to="/" className="btn btn-ghost mr-4">
          &larr; Voltar
        </Link>
      </div>
      <div className="card card-side bg-base-100 shadow-lg max-w-[900px] mx-auto">
        <figure>
          <img src={profile?.image_url} alt={profile?.username} />
        </figure>
        <div className="card-body min-w-75">
          <h2 className="card-title">{profile?.name || profile?.username}</h2>
          <ul>
            {profile?.name && (
              <li><span className="font-bold">Username:</span> {profile.username}</li>
            )}
            <li><a href={profile?.url} target='_blank'>{profile?.url}</a></li>
            <li><a href={profile?.short_url} target='_blank'>{profile?.short_url}</a></li>
            <li><span className="font-bold">Followers:</span> {profile?.followers}</li>
            <li><span className="font-bold">Following:</span> {profile?.following}</li>
            <li><span className="font-bold">Stars:</span> {profile?.stars}</li>
            <li><span className="font-bold">Last Year Contributions:</span> {profile?.contributions}</li>
            {profile?.organization && (
              <li><span className="font-bold">Organization:</span> {profile.organization}</li>
            )}
            {profile?.location && (
              <li><span className="font-bold">Location:</span> {profile.location}</li>
            )}
          </ul>
          <div className="flex-grow card-actions justify-end items-end gap-2">
            <button 
              onClick={handleDelete} 
              className="btn btn-dash btn-error"
              disabled={loading}
            >
              Deletar Perfil
            </button>
            <Link 
              to={`/profile/${username}/edit`} 
              className="btn btn-outline btn-warning"
            >
              Editar Perfil
            </Link>
            <button
              onClick={() => reloadProfile(username!)}
              className="btn btn-outline btn-info"
            >
              Reescanear Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
