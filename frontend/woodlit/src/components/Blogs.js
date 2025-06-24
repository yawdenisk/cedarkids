import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../config'
import { Link } from 'react-router-dom';
export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get(`${config.API_URL}/api/blog/getAll`)
        .then(responce => {
            setBlogs(responce.data);
        }).catch(error => {
            console.error(error);
        })
    })
  return (
    <div className='container'>
      <ul className='blogs'>
        {blogs.map(blog =>(
            <li>
                <Link to={`/blog/${blog.id}`}><img src={blog.image} alt='none image' /></Link>
                <p>{blog.title}</p>
                <p>{blog.shortDescription}</p>
            </li>
        ))}
      </ul>
    </div>
  )
}
