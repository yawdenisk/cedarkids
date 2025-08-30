import axios from 'axios';
import React, {useState} from 'react'
import config from '../config'
import { useTranslation } from 'react-i18next'

export default function ReviewForm({setShowReviewForm, product}) {
    const { t } = useTranslation();
    const [galleryImages, setGalleryImages] = useState([]);
    const [rating, setRating] = useState();
    const [text, setText] = useState();
    const [fullName, setFullName] = useState();

    async function sendForm(e) {
        e.preventDefault();

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
            await axios.post(`${config.API_URL}/api/review/upload`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='reviewForm'>
            <form onSubmit={sendForm}>
                <p>{t('review.add')}</p>
                <input name='fullName' onChange={(e) => setFullName(e.target.value)} placeholder={t('review.fullName')}></input>
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
                <textarea name='text' onChange={(e) => setText(e.target.value)} placeholder={t('review.comment')}></textarea>
                <input type='file' multiple onChange={(e) => setGalleryImages(Array.from(e.target.files))}
                       placeholder={t('review.gallery')}></input>
                <button type='submit'>{t('review.submit')}</button>
            </form>
        </div>
    )
}
