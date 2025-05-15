import axios from 'axios';
import React, { useState } from 'react'

export default function ReviewForm({ setShowReviewForm, product }) {
    const [galleryImages, setGalleryImages] = useState([]);
    const [rating, setRating] = useState();
    const [text, setText] = useState();
    const [fullName, setFullName] = useState();
    const [error, setError] = useState(null);

    async function sendForm(e) {
        e.preventDefault();
        setError(null);
        
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("text", text);
        formData.append("rate", rating);
        formData.append("gallery", galleryImages); 
        formData.append("productId", product.id); 
        
        galleryImages.forEach((file, index) => {
            formData.append(`gallery`, file); 
        });
    
        try {
            await axios.post('https://cedarkid.work.gd/api/review/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            window.location.reload();
        } catch (error) {
            setError(error.response.data);
        }
    }
  return (
    <div className='reviewForm'>
            <form onSubmit={sendForm}>
                <p>Add new Review</p>
                <input name='fullName' onChange={(e) => setFullName(e.target.value)} placeholder='Full name'></input>
                <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: 'pointer',
            color: rating >= star ? 'gold' : 'gray',
            fontSize: '24px',
          }}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
                <textarea name='text' onChange={(e) => setText(e.target.value)} placeholder='Your comment'></textarea>
                <input type='file' multiple onChange={(e) => setGalleryImages(Array.from(e.target.files))} placeholder='Gallery'></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
  )
}
