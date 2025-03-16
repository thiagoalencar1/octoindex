import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import { ProfileData } from '../types';

const Home = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
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
  }

  return (
    <>
      <div className="h-full min-h-screen mx-auto w-full pr-20 pl-20">
        <h2 className="flex justify-center text-3xl font-bold mt-20 mb-5">Buscar perfis cadastrados</h2>

        <div className="flex justify-center mb-10 w-full px-4">
          <input
            type="text"
            placeholder="Buscar perfis cadastrados..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-lg input-bordered w-150 max-w-3xl"
          />
        </div>

        {profiles.length > 0 && (<div className="divider"></div>)}

        <div className="profiles-grid mb-10">
          {filteredProfiles.slice().reverse().map(profile => (
            <div key={profile.id} className="profile-card">
              <ProfileCard profile={{...profile}} />
            </div>
          ))} 
        </div>
      </div>
    </>
  );
};

export default Home;
