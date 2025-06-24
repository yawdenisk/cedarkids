import axios from 'axios';
import React, { useEffect, useState } from 'react'  
import { useParams } from 'react-router-dom';

export default function BlogDetails() {
    const [blog, setBlog] = useState({});
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8081/api/blog/get/${id}`)
            .then(responce => {
                setBlog(responce.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);
        const formattedDescription = blog.description ? blog.description.split("\n").map((line, index) => (
        <span key={index}>{line}<br/></span>
    )) : [];
  return (
    <div className='container'>
      <div className='blog'>
        <p>{blog.title}</p>
        <img src={blog.image} alt='none image'/>
        <p>{formattedDescription}</p>
      </div>
    </div>
  )
}
