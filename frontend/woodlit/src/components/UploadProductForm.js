
import axios from 'axios';
import React, {useState} from 'react'
import config from '../config'
import loadingIcon from '../images/loading.svg'
export default function UploadProductForm({setShowUploadProductForm}) {
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
                headers: { 'Content-Type': 'multipart/form-data' }
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
                <p>Add new Product</p>
                <input name='name' onChange={(e) => setName(e.target.value)} placeholder='Name'></input> 
                <input name='price' onChange={(e) => setPrice(e.target.value)} placeholder='Price'></input>
                <input name='lastPrice' onChange={(e) => setLastPrice(e.target.value)} placeholder='Last Price'></input>
                <input name='installationPrice' onChange={(e) => setInstallationPrice(e.target.value)} placeholder='Installation Price'></input>
                <input name='description' onChange={(e) => setDescription(e.target.value)} placeholder='Description'></input>
                <textarea name='demensions' onChange={(e) => setDemensions(e.target.value)} placeholder='Demensions'></textarea>
                <textarea name='composition' onChange={(e) => setComposition(e.target.value)} placeholder='Composition'></textarea>
                <p>Composition image</p>
                    <input type='file' onChange={(e) => setCompositionImage(e.target.files[0])} placeholder='Composition Image' />
                <p>Image</p>
                    <input type='file' onChange={(e) => setImage(e.target.files[0])} placeholder='Image' />
                     <p>Gallery</p>
                <input type='file' multiple onChange={(e) => setGalleryImages(Array.from(e.target.files))} placeholder='Gallery'></input>
                    <p>Movie</p>
                    <input type='file' onChange={(e) => setMovie(e.target.files[0])} placeholder='Movie' />
            
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
