
import axios from 'axios';
import React, {useState} from 'react'
import config from '../config'
import loadingIcon from '../images/loading.svg'
import { useTranslation } from 'react-i18next'
export default function UploadProductForm({setShowUploadProductForm}) {
    const { t } = useTranslation();
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [lastPrice, setLastPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [composition, setComposition] = useState(null);
    const [image, setImage] = useState(null);
    const [movie, setMovie] = useState(null);
    const [compositionImage, setCompositionImage] = useState(null);
    const [demensions, setDemensions] = useState(null);
    const [installationPrice, setInstallationPrice] = useState(null);
     const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(false);


    const [error, setError] = useState(null);

    async function sendForm(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        const formData = new FormData();
        formData.append("installationPrice", installationPrice);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("lastPrice", lastPrice);
        formData.append("description", description);
        formData.append("composition", composition);
        formData.append("demensions", demensions);
        formData.append("image", image); 
        formData.append("movie", movie); 
        formData.append("compositionImage", compositionImage); 
        
        galleryImages.forEach((file, index) => {
            formData.append(`gallery`, file); 
        });
    
        try {
            await axios.post(`${config.API_URL}/api/product/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data',   
                'Authorization': `Bearer ${localStorage.getItem("access_tocken")}` }
            });
            window.location.reload();
        } catch (error) {
            setError(error.response.data);
        }finally {
        setLoading(false); 
    }
    }
    
if (loading == true) {
        return <div className='loading'><img src={loadingIcon} alt='none gif'></img></div>
    }
    return (
        <div className='uploadProductForm'>
            <form onSubmit={sendForm}>
                <p>{t('uploadForm.title')}</p>
                <input name='name' onChange={(e) => setName(e.target.value)} placeholder={t('uploadForm.name')}></input> 
                <input name='price' onChange={(e) => setPrice(e.target.value)} placeholder={t('uploadForm.price')}></input>
                <input name='lastPrice' onChange={(e) => setLastPrice(e.target.value)} placeholder={t('uploadForm.lastPrice')}></input>
                <input name='installationPrice' onChange={(e) => setInstallationPrice(e.target.value)} placeholder={t('uploadForm.installationPrice')}></input>
                <input name='description' onChange={(e) => setDescription(e.target.value)} placeholder={t('uploadForm.description')}></input>
                <textarea name='demensions' onChange={(e) => setDemensions(e.target.value)} placeholder={t('uploadForm.demensions')}></textarea>
                <textarea name='composition' onChange={(e) => setComposition(e.target.value)} placeholder={t('uploadForm.composition')}></textarea>
                <p>{t('uploadForm.compositionImage')}</p>
                    <input type='file' onChange={(e) => setCompositionImage(e.target.files[0])} placeholder='Composition Image' />
                <p>{t('uploadForm.image')}</p>
                    <input type='file' onChange={(e) => setImage(e.target.files[0])} placeholder='Image' />
                     <p>{t('uploadForm.gallery')}</p>
                <input type='file' multiple onChange={(e) => setGalleryImages(Array.from(e.target.files))} placeholder={t('uploadForm.gallery')}></input>
                    <p>{t('uploadForm.movie')}</p>
                    <input type='file' onChange={(e) => setMovie(e.target.files[0])} placeholder='Movie' />
            
                <button type='submit'>{t('uploadForm.submit')}</button>
            </form>
        </div>
    )
}
