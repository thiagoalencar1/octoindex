import React from 'react';

// interface ProfileCardProps {
//   imageUrl: string;
//   username: string;
//   githubUrl: string;
// }

// const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, username, githubUrl }) => {
//   return (
//     <div className="card bg-base-100 w-96 shadow-sm">
//       <figure>
//         <img src={imageUrl} alt={username} />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{username}</h2>
//         <p className="card-description">{githubUrl}</p>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;

interface ProfileCardProps {
  imageUrl: string;
  username: string;
  githubUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, username, githubUrl }) => {
  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure>
        <img src={imageUrl} alt={username} />
      </figure>
      <div className="card-body min-w-75">
        <h2 className="card-title">{username}</h2>
        <p><a href={githubUrl} target='_blank'>{githubUrl}</a></p>
      </div>
    </div>
  );
};

export default ProfileCard;
