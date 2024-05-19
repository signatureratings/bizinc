import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useState } from 'react';

import {API_URL} from '../config.js';

export default function Home() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchImages = async (accessToken, refreshToken)=>{
  try {
    const response = await fetch(`${API_URL}/images/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        RefreshToken: refreshToken,
      },
    });
    if(response.status >= 200 && response.status < 300){
      const data = await response.json();
      if (data && data.data) {
        setImages(data.data);
      }
    }
    else{
      console.log("response status is not 200")
      throw new Error('Unable to fetch images');
    } 
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
}

  useEffect(() => {
    // Check if user is authenticated
    // If not, redirect to login page
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    
    if ((accessToken === null || accessToken === undefined) || (refreshToken === null || refreshToken === undefined)) {
      router.push('/login');
    }
    else{
      // If user is authenticated, fetch images
    fetchImages(accessToken, refreshToken);
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <a href="/upload">Upload the new image</a>
      <br/>

      {loading? <p>Loading...</p> : 
      images.length > 0 ? <div>{
        images.map((image) => {
          const base64Image = Buffer.from(image.data).toString('base64');
          return (
            <div key={image.id}>
              <img src={`data:image/jpeg;base64,${base64Image}`} alt="image"  height="250px" width="250px"/>
              <a href={`${image.id}`}>View Image</a>
            </div>
          );
        })
        }</div> : <p>No images found</p>}
    </div>
    );
}