import React from 'react'
import raben from '../images/raben.webp'
import warehouse from '../images/warehouse.webp'
export default function Shipping() {
  return (
   <div className='container'>
     <div className='shipping'>
      <div className='area'>
        <img src={raben} alt='none image'/>
        <div className='text-area'>
            <p>SHIPPING PARTNER:</p>
            <h1>Raben Logistics</h1>
        <p>Your joy is in safe hands! <br/>
        For over 10 years, we've trusted Raben as our reliable shipping partner. Rest assured, your swing-set will be securely delivered by our experienced team.</p>
        </div>
      </div>
      <p>ORDER PROCESSING</p>
      <p>Swift dispatch guaranteed! Your purchase is shipped within 2-3 business days of payment. Expect your joyous package to be on its way promptly.</p>
      <span/>
      <p>ESTIMATED DELIVERY TIME</p>
      <p>Anticipate joy in just about a week! Delivery times vary based on your location, ensuring your play set arrives promptly.</p>
        <div className='area'>
        <div className='text-area'>
            <p>WAREHOUSE LOCATION</p>
            <h1>Poland, Łabiszyn</h1>
        <p>Your play sets originate from our Toruń, Poland hub. For self-pickup or choosing your courier, connect with us for details.</p>
        </div>
         <img src={warehouse} alt='none image'/>
      </div>
      <p>PICKUP OPTIONS</p>
      <p>For those inclined towards a self-pickup or selecting a courier of personal preference, kindly reach out to us for detailed instructions and further information.</p>
      <p>Your satisfaction is our priority, and we are committed to ensuring a seamless delivery process for your much-anticipated swing-set.</p>
      <span/>
      <p>If you have any inquiries or require additional assistance, don't hesitate to <a>contact us</a>.</p>
      <span/>
      <p>THANK YOU FOR CHOOSING US TO BE PART OF YOUR PLAYTIME MEMORIES!</p>
    </div>  
   </div>
  )
}
