// import React, { useState } from 'react';
// import './UserProfile.css';
// import personLogo from './userprofile.jpeg';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function UserProfile() {
//   const [profilePicture, setProfilePicture] = useState(null); // Initialize profile picture as null
//   const [username, setUsername] = useState('');
//   const [bio, setBio] = useState('');
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handlePictureChange = (event) => {
//     setProfilePicture(URL.createObjectURL(event.target.files[0])); // Store the URL of the selected image
//   };

//   const toggleFullscreen = () => {
//     setIsFullscreen(!isFullscreen);
//   };

//   const saveProfile = async () => {
//     if (!username || !bio || !profilePicture) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     if (bio.length > 250) {
//       alert('Bio should be less than 250 characters.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');
//       conso
//       const formData = new FormData();
//       formData.append('profilePicture', profilePicture);
//       formData.append('username', username);
//       formData.append('bio', bio);
//       console.log(formData)
//       await axios.post('http://localhost:8080/save-profile', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//           'User-Email': email,
//         },
//       });
      
//       alert('Profile saved successfully!');
//       navigate('/create-post'); // Use navigate for navigation
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       alert('Failed to save profile. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <form className="profile-info" encType="multipart/form-data">
//         <img
//           className="profile-picture"
//           src={profilePicture ? profilePicture : personLogo}
//           alt="Profile Picture"
//           onClick={toggleFullscreen}
//         />
//         <input type="file" accept="image/*" onChange={handlePictureChange} />
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <textarea
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Club Bio (max 250 characters)"
//           maxLength={250}
//         ></textarea>
//         <button type="button" onClick={saveProfile}>
//           Save
//         </button>
//       </form>
//       {isFullscreen && (
//         <div className="fullscreen-overlay" onClick={toggleFullscreen}>
//           <img
//             className="fullscreen-picture"
//             src={profilePicture ? profilePicture : personLogo}
//             alt="Profile Picture"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserProfile;
import React, { useState } from 'react';
import './UserProfile.css'; // Import your CSS file for styling
import personLogo from './userprofile.jpeg'; // Import your default profile picture
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const handlePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const saveProfile = async () => {
    if (!username || !bio || !profilePicture) {
      alert("Please fill in all fields.");
      return;
    }

    if (bio.length > 250) {
      alert("Bio should be less than 250 characters.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      formData.append('username', username);
      formData.append('bio', bio);

      await axios.post('http://localhost:8080/save-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'User-Email': email
        }
      });
     
      localStorage.setItem('log', 2);

       navigate('/create-post');
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again later.");
    }
  };

  return (
    <div className="container">
      <form className="profile-info" encType="multipart/form-data">
        <img className="profile-picture" src={profilePicture ? URL.createObjectURL(profilePicture) : personLogo} alt="Profile Picture" onClick={toggleFullscreen} />
        <input type="file" accept="image/*" onChange={handlePictureChange} />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Club Bio (max 250 characters)" maxLength={250}></textarea>
        <button type="button" onClick={saveProfile}>Save</button>
      </form>
      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={toggleFullscreen}>
          <img className="fullscreen-picture" src={profilePicture ? URL.createObjectURL(profilePicture) : personLogo} alt="Profile Picture" />
        </div>
      )}
    </div>
  );
}

export default UserProfile;