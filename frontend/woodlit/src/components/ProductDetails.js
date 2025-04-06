import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import loading from '../images/loading.svg';

export default function ProductDetails({cart, setCart}) {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [gallery, setGallery] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [thumbsStartIndex, setThumbsStartIndex] = useState(0);

    useEffect(() => {
        axios.get(`https://cedarkids.work.gd/api/product/get/${id}`)
            .then(response => {
                setProduct(response.data);
                const images = [response.data.image, ...response.data.gallery.map(img => img.imageUrl)];
                setGallery(images);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    function addToCart(id) {
        const existingProduct = cart.find(item => item.product.id === id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.product.id === id ? {...item, quantity: item.quantity + 1} : item
            ));
        } else {
            setCart([...cart, {product: product, quantity: 1}]);
        }
    }

    if (!product) {
        return <div className='loading'><img src={loading} alt='Loading'/></div>;
    }

    const formattedFeatures = product.features.split("\n").map((line, index) => (
        <span key={index}>{line}<br/></span>
    ));

    const maxVisibleThumbs = 4;

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            const newIndex = (prev + 1) % gallery.length;
            updateThumbPosition(newIndex);
            return newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => {
            const newIndex = (prev - 1 + gallery.length) % gallery.length;
            updateThumbPosition(newIndex);
            return newIndex;
        });
    };

    const selectImage = (index) => {
        setCurrentSlide(index);
        updateThumbPosition(index);
    };

    const updateThumbPosition = (index) => {
        if (index < thumbsStartIndex) {
            setThumbsStartIndex(index);
        } else if (index >= thumbsStartIndex + maxVisibleThumbs) {
            setThumbsStartIndex(index - maxVisibleThumbs + 1);
        }
    };

    return (
        <div className='container'>
            <div className='productDetails'>
                <div className='view'>
                    <button className="prev" onClick={prevSlide}>&#10094;</button>
                    <img src={gallery[currentSlide]} alt="Product"/>
                    <button className="next" onClick={nextSlide}>&#10095;</button>
                </div>

                <div className='information'>
                    <p>{product.name}</p>
                    <p>€ {product.price}</p>
                    <button onClick={() => addToCart(product.id)}>ADD TO CART</button>

                    <div className='description'>
                        <ul>
                            <li onClick={() => setActiveTab('description')}
                                style={{borderBottom: activeTab === 'description' ? '1px solid black' : 'none'}}>DESCRIPTION
                            </li>
                            <li onClick={() => setActiveTab('features')}
                                style={{borderBottom: activeTab === 'features' ? '1px solid black' : 'none'}}>FEATURES
                            </li>
                            <li onClick={() => setActiveTab('construction')}
                                style={{borderBottom: activeTab === 'construction' ? '1px solid black' : 'none'}}>ALL-CEDAR
                                CONSTRUCTION
                            </li>
                        </ul>
                        <div className="description-content">
                            {activeTab === 'description' && <p>{product.description}</p>}
                            {activeTab === 'features' && <p>{formattedFeatures}</p>}
                            {activeTab === 'construction' && (
                                <p>The Cedar Cove is made from 100% cedar. With small, tight knot structure, your lumber
                                    will be less likely to develop small cracks emanating from knots. In laboratory
                                    testing, our durable cedar wood proved to be rot resistant and highly resistant to
                                    natural decay. All lumber is pre-stained for a smooth and clear appearance, as well
                                    as cut and stamped with the part number to help speed up the building process. Some
                                    pilot-hole drilling may be required. </p>
                            )}
                        </div>
                    </div>

                    <div className="thumbnail-gallery">
                        <button
                            className="thumb-prev"
                            onClick={() => setThumbsStartIndex(Math.max(0, thumbsStartIndex - 1))}
                            disabled={thumbsStartIndex === 0}
                        >
                            &#10094;
                        </button>
                        <div className="thumbs-container">
                            <div className="thumbs-wrapper"
                                 style={{transform: `translateX(-${thumbsStartIndex * 170}px)`}}>
                                {gallery.map((img, index) => (
                                    <img key={index}
                                         src={img}
                                         alt="Thumbnail"
                                         className={currentSlide === index ? "active-thumbnail" : ""}
                                         onClick={() => selectImage(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            className="thumb-next"
                            onClick={() => setThumbsStartIndex(Math.min(gallery.length - maxVisibleThumbs, thumbsStartIndex + 1))}
                            disabled={thumbsStartIndex >= gallery.length - maxVisibleThumbs}
                        >
                            &#10095;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
