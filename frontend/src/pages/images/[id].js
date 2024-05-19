import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { API_URL } from '../../config';

export default function Image() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState({});
  const [imagedata, setImagedata] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const { id } = router.query;

  const fetchImage = async ( accessToken, refreshToken)=>{
    try {
      const response = await fetch(`${API_URL}/images/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: refreshToken,
        },
      });
      
      if(response.status >= 200 && response.status < 300){
        const data = await response.json();
        if (data && data.data) {
          setImage(data.data);
          setImagedata(Buffer.from(data.data.imagedata.data).toString('base64'))
        }
      }
      else{
        console.log("response status is not 200")
        throw new Error('Unable to fetch images');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateImage = async (accessToken, refreshToken) => {
    try{
      let isNewImage = false;
      if(file){
        isNewImage = true;
      }
      if(title === ""){
        setTitle(image.title);
      }
      if(description === ""){
        setDescription(image.description);
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', file);
      formData.append('isNewImage', isNewImage);

      const response = await fetch(`${API_URL}/images/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: refreshToken,
        },
        body: formData,
      });
  
      if (response.ok) {
        // Upload successful
        setTitle("");
        setDescription("");
        setFile(null);
        alert('Upload successful');
        setIsEditing(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateImage(localStorage.getItem('accessToken'), localStorage.getItem('refreshToken'));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if ((accessToken === null || accessToken === undefined) || (refreshToken === null || refreshToken === undefined)) {
      router.push('/login');
    }
    else{
      fetchImage( accessToken, refreshToken);
      setLoading(false);
    }
  }, [id]);


  return (
    <div>
      
       {image ? (isEditing?
      <div>
        <h3>Edit Page for Image {id}</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data" method='post' >
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  />
      </label>
      <br/>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}  />
      </label>
      <br/>
      <label>
        Image:
        <input name="image" type="file" onChange={(e) => setFile(e.target.files[0])} />
      </label>
      <br/>
      <button type="submit">Update</button>
      <button type="button" onClick={() => {setTitle(image.title); setDescription(image.description); setIsEditing(false);}}>Cancel</button>
    </form>
      </div>:
      <div>
        <h3>View Page for Image {id}</h3>
          <h2>Image Details</h2>
          <p>Name: {image.title}</p>
          <p>Description: {image.description}</p>
          <p>created_at: {image.created_at}</p>
          {image.updated_at && <p>updated_at: {image.updated_at}</p>}
          <img src={`data:image/jpeg;base64,${imagedata}`} alt="image" height="250px" width="250px"/>
          <button type='button' onClick={()=>setIsEditing(true)}>Edit Image</button>
      </div>) : <p>No image found</p>
}
    </div>
  );
}