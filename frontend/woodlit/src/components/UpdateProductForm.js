import React, {use, useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config'
import { useTranslation } from 'react-i18next'

export default function UpdateProductForm() {
    const { t } = useTranslation();
    const [newImage, setNewImage] = useState(null);
    const [newGalleryImages, setNewGalleryImages] = useState([]);
    const [product, setProduct] = useState({})
    const {id} = useParams();
    useEffect(() => {
        axios.get(`${config.API_URL}/api/product/get/${id}`)
        .then(responce => {
            setProduct(responce.data);
        })
        .catch(error => {
        })
    })

    function handleInputChange(e) {
        const {name, value} = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleFileChange(e) {
        setNewImage(e.target.files[0]);
    }

    function handleGalleryChange(e) {
        setNewGalleryImages([...e.target.files]); 
    }

    async function handleUpdateProduct(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("lastPrice", product.lastPrice);
        formData.append("installationPrice", product.installationPrice);
        formData.append("description", product.description);
        formData.append("features", product.features);
        formData.append("construction", product.construction);
        formData.append("demensions", product.demensions);
    
        if (newImage) {
            formData.append("image", newImage); 
        }
    
        if (newGalleryImages.length > 0) {
            newGalleryImages.forEach(file => {
                formData.append("gallery", file); 
            });
        }
    
        try {
            await axios.put(
                `https://cedarkids.eu/product/update/${id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            console.log("Продукт успешно обновлен");
        } catch (error) {
            console.error("Ошибка обновления:", error);
        }
    }
    

    return (
        <div className='updateProduct'>
            <div className='viewport'>
            <form>
                <label>{t('updateForm.image')}</label>
                <input type='file' onChange={handleFileChange}/>
                <label>{t('updateForm.name')}</label>
                <input type="text" name="name" value={product.name} onChange={handleInputChange}/>
                <label>{t('updateForm.price')}</label>
                <input type="number" name="price" value={product.price} onChange={handleInputChange}/>
                <label>{t('updateForm.lastPrice')}</label>
                <input type="number" name="lastPrice" value={product.lastPrice} onChange={handleInputChange}/>
                 <label>{t('updateForm.installationPrice')}</label>
                <input type="number" name="installationPrice" value={product.installationPrice} onChange={handleInputChange}/>
                <label>{t('updateForm.features')}</label>
                <textarea name="features" value={product.features} onChange={handleInputChange}/>
                <label>{t('updateForm.description')}</label>
                <textarea name="description" value={product.description} onChange={handleInputChange}/>
                 <label>{t('updateForm.construction')}</label>
                <textarea name="construction" value={product.construction} onChange={handleInputChange}/>
                 <label>{t('updateForm.demensions')}</label>
                <textarea name="demensions" value={product.demensions} onChange={handleInputChange}/>
                 <label>{t('updateForm.features')}</label>
                <textarea name="features" value={product.features} onChange={handleInputChange}/>
            </form>
            <img src={product.image} alt="Product"/>
            </div>

            <div className='gallery'>
                <label>{t('updateForm.galleryAdd')}</label>
                <input type='file' multiple onChange={handleGalleryChange}/>
                <ul>
                    {product.gallery?.map((item, index) => (
                        <li key={index}>
                            <img src={item.imageUrl} alt={`Gallery ${index}`}/>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleUpdateProduct}>{t('updateForm.apply')}</button>
        </div>
    );
}
