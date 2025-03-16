import { useEffect, useState } from 'react'
import './App.css'  
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import ProfileScraper from './components/ProfileScraper';

interface GitHubProfile {
  id: number;
  username: string;
  url: string;
}

function App() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/github_profiles');
        const data = await response.json();
        setProfiles(data);
        setFilteredProfiles(data);
      } catch (error) {
        console.error('Erro ao buscar perfis.', error);
      } finally {
        setLoading(false);
      }
    };  

    fetchProfiles();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredProfiles(profiles);
    } else {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/github_profiles/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setFilteredProfiles(data);
      } catch (error) {
        console.error('Erro ao buscar resultados da pesquisa.', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="h-full min-h-screen mx-auto w-full pr-20 pl-20 container">
        <h2 className="flex justify-center text-xl mt-20">Adicionar novo perfil do Github</h2>
        <div className="flex justify-center m-10 items-center"><ProfileScraper /></div>

        <div className="flex justify-center mb-10 w-full px-4">
          <input
            type="text"
            placeholder="Buscar perfis cadastrados..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-lg input-bordered w-150 max-w-3xl"
          />
        </div>


        {profiles.length > 0 && (
          <>
            <h2 className="text-5xl font-bold flex justify-center pb-10">Perfis Cadastrados</h2>
            <div className="divider"></div>
          </>
        )}

        <div className="profiles-grid">
          {filteredProfiles.slice().reverse().map(profile => (
            <div key={profile.id} className="profile-card">
              <ProfileCard profile={{...profile}} />
            </div>
          ))} 
        </div>
      </div>
      <div className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
          OctoIndex   
      </div>
    </>
  )
}

export default App
