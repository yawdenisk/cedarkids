import React, {useState} from 'react';
import axios from 'axios';

export default function UpdateProductForm({currentProduct, setCurrentProduct}) {
    const [newImage, setNewImage] = useState(null);
    const [newGalleryImages, setNewGalleryImages] = useState([]);

    function handleDeleteImage(id){
        
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setCurrentProduct(prev => ({
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
        formData.append("name", currentProduct.name);
        formData.append("price", currentProduct.price);
        formData.append("lastPrice", currentProduct.lastPrice);
        formData.append("description", currentProduct.description);
        formData.append("features", currentProduct.features);
    
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
                `https://cedarkids.work.gd/api/product/update/${currentProduct.id}`,
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
                <label>Image</label>
                <input type='file' onChange={handleFileChange}/>
                <label>Name</label>
                <input type="text" name="name" value={currentProduct.name} onChange={handleInputChange}/>
                <label>Price</label>
                <input type="number" name="price" value={currentProduct.price} onChange={handleInputChange}/>
                <label>LastPrice</label>
                <input type="number" name="lastPrice" value={currentProduct.lastPrice} onChange={handleInputChange}/>
                <label>Features</label>
                <textarea name="features" value={currentProduct.features} onChange={handleInputChange}/>
                <label>Description</label>
                <textarea name="description" value={currentProduct.description} onChange={handleInputChange}/>
            </form>
            <img src={currentProduct.image} alt="Product"/>
            </div>

            <div className='gallery'>
                <label>Add image to gallery</label>
                <input type='file' multiple onChange={handleGalleryChange}/>
                <ul>
                    {currentProduct.gallery.map((item, index) => (
                        <li key={index}>
                            <img src={item.imageUrl} alt={`Gallery ${index}`}/>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleUpdateProduct}>Apply changes</button>
        </div>
    );
}
