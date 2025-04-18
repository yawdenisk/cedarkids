import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import loading from '../images/loading.svg';
import quality from '../images/quality.webp';
import warranty from '../images/warranty.webp';
import cert from '../images/cert.webp';
import ReviewForm from './ReviewForm';
import userIcon from '../images/user.png'

export default function ProductDetails({cart, setCart}) {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [gallery, setGallery] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [thumbsStartIndex, setThumbsStartIndex] = useState(0);
    const [installation, setInstallation] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8081/product/get/${id}`)
            .then(response => {
                setProduct(response.data);
                const images = [response.data.image, ...response.data.gallery.map(img => img.imageUrl)];
                setGallery(images);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const averageRate = useMemo(() => {
        if (!product || !product.reviews || product.reviews.length === 0) return 0;
        const total = product.reviews.reduce((sum, review) => sum + review.rate, 0);
        return total / product.reviews.length;
    }, [product]);

    function handleChangeCheckbox(event) {
        setInstallation(event.target.checked);
    };

    function addToCart(id) {
        const existingProduct = cart.find(item => item.product.id === id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.product.id === id ? {...item, quantity: item.quantity + 1, installation: installation} : item
            ));
        } else {
            setCart([...cart, {product: product, quantity: 1, installation: installation}]);
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
                    <div className='price'>
                        <p>€ {(product.price).toFixed(2)}</p>
                        <s>€ {(product.lastPrice).toFixed(2)}</s>
                    </div>
                    <div className='installation'>
                        <input type='checkbox' checked={installation} onChange={handleChangeCheckbox}></input>
                        <p>installation + € {(product.installationPrice).toFixed(2)}</p>
                    </div>
                    <button onClick={() => addToCart(product.id, installation)}>ADD TO CART</button>
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
                <ul className='whyBlock'>
                    <li>
                        <img src={quality}/>
                        <p>High Quality Design</p>
                        <p>We work hard to make sure your swing set features design elements as stylish as they are
                            strong. From the materials to the colors to the overall aesthetic, these are swing sets
                            you’ll be proud to have in your backyard. </p>
                    </li>
                    <li>
                        <img src={cert}/>
                        <p>Tested and Certified</p>
                        <p>All of our swing sets are certified to meet and exceed ASTM standards. We test our
                            performance for kids up to 12-years-old, going above and beyond industry standards.</p>
                    </li>
                    <li>
                        <img src={warranty}/>
                        <p>Warranty and Assembly</p>
                        <p>With a 5 Year Limited Warranty and 3D interactive assembly instructions with the BILT® app,
                            you’ll be supported from the very beginning for years and years of backyard fun.</p>
                    </li>
                </ul>
                <div className='reviewDetails'>
                    <p>CUSTOMER REVIEWS</p>

                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        color: averageRate >= star ? 'gold' : 'gray',
                                        fontSize: '24px',
                                    }}
                                >
                              ★
                            </span>
                            ))}
                            <span> /</span>
                            <span style={{color: 'gold',fontSize: '24px'}}> ★★★★★</span>
                            <p>{averageRate.toFixed(2)} / 5.00</p>
                            <p>Based on {product.reviews.length} reviews</p>
                            <button onClick={() => setShowReviewForm(!showReviewForm)}>Write a review</button>
                </div>
            {showReviewForm && 
            <ReviewForm setShowReviewForm={setShowReviewForm} product={product}/>}
            <div className='reviews'>
                    {product.reviews.map(item => (
                        <div className='comment'>
                            <div className='userInfo'>
                                <img src={userIcon}/>
                            <p>{item.fullName}</p>
                            </div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        color: item.rate >= star ? 'gold' : 'gray',
                                        fontSize: '24px',
                                    }}
                                >
                              ★
                            </span>
                            ))}
                            <p>{item.text}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
