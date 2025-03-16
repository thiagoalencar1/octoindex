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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/github_profiles');
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Erro ao buscar perfis.', error);
      } finally {
        setLoading(false);
      }
    };  

    fetchProfiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="h-full min-h-screen mx-auto w-full pr-20 pl-20 container">
        <h2 className="flex justify-center text-xl mt-20">Adicionar novo perfil do Github</h2>
        <div className="flex justify-center m-10 items-center"><ProfileScraper /></div>

        {profiles.length > 0 && (
          <>
            <h2 className="text-5xl font-bold flex justify-center pb-10">Perfis Adicionados</h2>
            <div className="divider"></div>
          </>
        )}

        <div className="profiles-grid">
          {profiles.slice().reverse().map(profile => (
            <div key={profile.id} className="profile-card">
              <ProfileCard profile={{
                imageUrl: profile.url,
                githubUrl: profile.url,
                ...profile
              }} />
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
