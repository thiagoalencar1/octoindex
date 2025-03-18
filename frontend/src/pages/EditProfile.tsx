import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ProfileData } from '../types';

const EditProfile: React.FC = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProfileData>>({
    name: '',
    organization: '',
    location: '',
    stars: 0,
    followers: 0,
    following: 0,
    url: '',
    short_url: '',
    contributions: 0,
    image_url: '',
    username: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://3.145.73.162:3000/api/v1/github_profiles/${username}`);
        const data = await response.json();
        setFormData({
          name: data.name || '',
          organization: data.organization || '',
          location: data.location || '',
          stars: data.stars || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          url: data.url || '',
          short_url: data.short_url || '',
          contributions: data.contributions || 0,
          image_url: data.image_url || '',
          username: data.username || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://3.145.73.162:3000/api/v1/github_profiles/${username}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      navigate(`/profile/${username}`, {
        state: { flashMessage: 'Profile updated successfully!' }
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="h-full min-h-screen mx-auto w-full pr-20 pl-20 mt-20">
      <div className="flex justify-center items-center mb-6">
        <Link to={`/profile/${username}`} className="btn btn-ghost mr-4">
          &larr; Voltar para o perfil
        </Link>
      </div>
      <div className="card bg-base-100 shadow-lg max-w-[800px] mx-auto">
        <div className="card-body">
          <h2 className="card-title mb-4">Editar Perfil</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nome do usuário</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Nome</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Organização</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Localização</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Estrelas</span>
              </label>
              <input
                type="number"
                name="stars"
                value={formData.stars}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Seguidores</span>
              </label>
              <input
                type="number"
                name="followers"
                value={formData.followers}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Seguindo</span>
              </label>
              <input
                type="number"
                name="following"
                value={formData.following}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Contribuições no último ano</span>
              </label>
              <input
                type="number"
                name="contributions"
                value={formData.contributions}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">URL do Perfil</span>
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">URL encurtada</span>
              </label>
              <input
                type="url"
                name="short_url"
                value={formData.short_url}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">URL da imagem de perfil</span>
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
              <Link 
                to={`/profile/${username}`}
                className="btn btn-ghost"
              >
                Cancelar
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar modificações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
