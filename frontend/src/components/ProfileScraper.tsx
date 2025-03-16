import React, { useState } from 'react'

const ProfileScraper: React.FC = () => {
  const [url, setUrl] = useState('')
  const [flashMessage, setFlashMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null);

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
    event.preventDefault()
    
    if (validateInput(url)) {
        
      const apiUrl = `http://localhost:3000/api/v1/github_profiles?url_or_username=${encodeURIComponent(url)}`

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Resposta da API não foi bem-sucedida')
        }

        const data = await response.json()
        console.log('Response data:', data)

        setFlashMessage('Novo perfil adicionado com sucesso!')

        setTimeout(() => {
          window.location.reload()
        }, 2000)

      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }
  }

  return (
    <div className="new-profile">
      {flashMessage && ( 
        <div className="flash-message">
          {flashMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          required
          placeholder="Digite o username ou url do perfil do Github"
          value={url}
          onChange={handleUrlChange}
          className={`input input-lg w-100 ${error ? 'input-error' : ''}`}
        />
        <button type="submit" className="btn btn-lg">Adicionar</button>
      </form>
      {error && (
        <div className="text-error mt-2 block whitespace-pre-line">
          {error}
        </div>
      )}
    </div>
  )
}

export default ProfileScraper
