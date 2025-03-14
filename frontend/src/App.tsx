import { useEffect, useState } from 'react'
import './App.css'  
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';

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
      <div className="container mx-auto">
        <h1 className="title">Scraped Profiles</h1>
        <div className="profiles-grid">
          {profiles.map(profile => (
            <div key={profile.id} className="profile-card">
              <ProfileCard
                imageUrl="https://avatars.githubusercontent.com/u/14118336?v=4"
                username={ profile.username }
                githubUrl={ profile.url }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
