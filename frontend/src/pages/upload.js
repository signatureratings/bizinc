import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { API_URL } from '../config'

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!file){
      alert("Please select an image");
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);

    try{
      const response = await fetch(`${API_URL}/images/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          RefreshToken: localStorage.getItem('refreshToken'),
        },
        body: formData,
      });
  
      if (response.ok) {
        // Upload successful
        console.log('Upload successful');
        setTitle("");
        setDescription("");
        setFile(null);
        alert('Upload successful');
      } else {
        // Upload failed
        console.log('Upload failed');
        alert('Upload failed');
      }
    }
    catch(err){
      console.log(err);
      alert("Error Occured while uploading the image. Please try again later.")
    }
   
  };

  useEffect(() => {
    // Check if user is authenticated
    // If not, redirect to login page
     const accessToken = localStorage.getItem('accessToken');
     const refreshToken = localStorage.getItem('refreshToken');
     setName(localStorage.getItem('name'));
     setEmail(localStorage.getItem('email'));
    
    if ((accessToken === null || accessToken === undefined) || (refreshToken === null || refreshToken === undefined)) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h3>Hi {name}</h3>
      <p>Ready to upload the image...</p>
    <form onSubmit={handleSubmit} encType="multipart/form-data" method='post' >
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Image:
        <input name="image" type="file" onChange={(e) => setFile(e.target.files[0])} required />
      </label>
      <button type="submit">Upload</button>
    </form>
    </div>
  );
};

export default UploadPage;