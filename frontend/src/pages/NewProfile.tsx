import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React from 'react';
const NewProfile = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const GITHUB_URL_PATTERN = /^(?:https?:\/\/)?github\.com\/[\w-]+\/?$/;
  const USERNAME_PATTERN = /^[\w-]+$/;

  const validateInput = (input: string): boolean => {
    if (!input.trim()) {
      setError('Input cannot be blank');
      return false;
    }
    
    if (GITHUB_URL_PATTERN.test(input) || USERNAME_PATTERN.test(input)) {
      setError(null);
      return true;
    }
    
    setError('Por favor digite um nome de usuário ou url válida (ex: "octocat" or "github.com/octocat")');
    return false;
  };
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);

    if (input.trim()) {
      validateInput(input);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (validateInput(url)) {
      setLoading(true);
      
      const apiUrl = `http://localhost:3000/api/v1/github_profiles?url_or_username=${encodeURIComponent(url)}`;

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

        const data = await response.json();
        console.log('Response data:', data);
        
        // Redirecionar para a página inicial com uma mensagem de sucesso
        navigate('/', { state: { flashMessage: 'Novo perfil adicionado com sucesso!' } });

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError('Falha ao adicionar perfil. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        
        <div className="my-8">
          <div className="flex justify-center items-center mb-6">
            <Link to="/" className="btn btn-ghost mr-4">
              &larr; Voltar
            </Link>
            <h1 className="text-3xl font-bold">Adicionar Novo Perfil GitHub</h1>
          </div>

          <div className="card bg-base-100 shadow-xl p-6 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Nome de usuário ou URL do GitHub</span>
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Ex: octocat ou github.com/octocat"
                  className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
                />
                {error && <p className="text-error mt-2">{error}</p>}
              </div>
              
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading || !!error}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processando...
                    </>
                  ) : (
                    'Adicionar Perfil'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProfile;
