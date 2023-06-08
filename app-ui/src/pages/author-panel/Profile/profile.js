import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserProfile } from '../../userProfile';


const AuthorProfile = () => {
  // const [author, setAuthor] = useState({
  //   name: 'Ehsan rasul',
  //   username: 'ehsanrasul0',
  //   age: 22,
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus nisi vitae ultricies facilisis.',
  //   profilePicture: null,
  // });



  const [author, setAuthor] = useState({
    name: '',
    username: '',
    email:'',
    password:'',
    age: 22,
    role:'',
    profilePicture: null,
  });


  const { user, fetchUserProfile } = useUserProfile();
  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status


  useEffect(() => {
    //setLoading(true);

    axios.get('http://localhost:5000/api/Admin/retrieveRoles')
      .then(response => {
        setAuthor(response.data);
        //setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [deletionStatus]); // Add deletionStatus as a dependency


  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save the updated author profile to the server or perform any necessary action
  };

  const handleCancelProfileEdit = () => {
    setIsEditing(false);
  };

  const handleProfileInputChange = (event) => {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      profilePicture: URL.createObjectURL(file),
    }));
  };

  return (
    <div className="author-profile">
      {isEditing ? (
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleProfileInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleProfileInputChange}
              readOnly
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Email</label>
            <input
              type="text"
              id="age"
              name="age"
              value={user.email}
              onChange={handleProfileInputChange}
            />
          </div>


          <div className="form-group">
            <label htmlFor="bio">Password</label>
            <input
              type='text'
              id="bio"
              name="bio"
              value={user.password}
              onChange={handleProfileInputChange}
            ></input>
          </div>


          <div className="form-group">
            <label htmlFor="bio">Age</label>
            <textarea
              id="bio"
              name="bio"
              value={user.age}
              onChange={handleProfileInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Role</label>
            <textarea
              id="bio"
              name="bio"
              value={user.role}
              onChange={handleProfileInputChange}
              readOnly
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>


          <div className="form-actions">
            <button className="save-profile-btn" onClick={handleSaveProfile}>
              Save
            </button>
            <button className="cancel-edit-profile-btn" onClick={handleCancelProfileEdit}>
              Cancel
            </button>
          </div>
        </div>
      ) : user && (
        <div className="profile-info">
          <div className="profile-picture">
            {author.profilePicture ? (
              <img src="C:/Users/Ehsan Rasul/Downloads/prof.jpeg" alt="Author Avatar" />
            ) : (
              <div className="default-avatar">No Picture</div>
            )}
          </div>
          <div className="profile-details">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-username">@{user.username}</p>
            <p className="profile-age">Email:{user.email}</p>
            <p className="profile-age">Password: {user.password}</p>
            <p className="profile-bio">{user.age}</p>
            <p className="profile-bio">{user.role}</p>
          </div>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      )}
      <style jsx>{`
        .author-profile {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            background-color: #CFD6D3;
            border: 2px solid #333;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .profile-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .profile-picture {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 10px;
          }
          
          .profile-picture img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .default-avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #ccc;
            color: #fff;
            font-size: 24px;
          }
          
          .profile-details {
            text-align: center;
            margin-bottom: 10px;
          }
          
          .profile-name {
            color: #333;
            font-size: 24px;
            margin-bottom: 5px;
          }
          
          .profile-username {
            color: #666;
            font-size: 16px;
            margin-bottom: 5px;
          }
          
          .profile-age {
            color: #666;
            font-size: 16px;
            margin-bottom: 10px;
          }
          
          .profile-bio {
            color: #666;
            font-size: 16px;
            margin-bottom: 20px;
          }
          
          .edit-profile-btn {
            background-color: #19B8F2;
            color: #fff;
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
          }
          
          .edit-profile-btn:hover {
            background-color: #0056b3;
          }
          
          .profile-form {
            text-align: left;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
          }
          
          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            color: #333;
          }
          
          .form-actions {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .save-profile-btn,
          .cancel-edit-profile-btn {
            background-color: #19B8F2;
            color: #fff;
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
          }
          
          .save-profile-btn:hover,
          .cancel-edit-profile-btn:hover {
            background-color: #0056b3;
          }
          
          /* Section-wise color combinations */
          .profile-details {
            background-color: #FEFFFF;
            padding: 20px;
            border-radius: 5px;
          }
          
          .profile-name {
            color: #333;
          }
          
          .profile-username {
            color: #666;
          }
          
          .profile-age {
            color: #777;
          }
          
          .profile-bio {
            color: #333;
          }
          
          .edit-profile-btn {
            background-color: #333;
          }
          
          .edit-profile-btn:hover {
            background-color: #1082D9;
          }
          
          .form-group label {
            color: #555;
          }
          
          .form-group input,
          .form-group textarea {
            background-color: #fff;
            border: 1px solid #ccc;
            color: #333;
          }
          
          .save-profile-btn{
            background-color: #333;
          }
          .cancel-edit-profile-btn {
            background-color: black;
          }
          
          .save-profile-btn:hover{
            background-color: #1082D9;
          }
          .cancel-edit-profile-btn:hover {
            background-color: red;
          }
          
      `}</style>
    </div>
  );
};

export default AuthorProfile;
