import React from 'react'
import about from '../images/about.webp'
export default function AboutUs() {
  return (
    <div className='container'>
      <div className='about'>
        <div className='text-area'>
            <h1>CedarKids</h1>
            <p>Founded in 2007, Cedarkids is dedicated to bringing high-quality swing sets to European families. As the official distributor of Backyard Discovery, we pride ourselves on our extensive range of cedar lumber swing sets, catering to various budgets and backyard sizes. Unlike our competitors who use fir or pine, our premium cedar ensures durability and safety, a top priority for us.
</p>
<p>As a family-run business inspired by our own children's love for their backyard swing set, we understand the joy and excitement it brings. We're committed to fast delivery, knowing how eager children are to enjoy their new play space. At CedarKids, we don't just sell swing sets; we're helping build spaces of joy and safe adventure for families.</p>
        </div>
        <img src={about} alt='none image'/>
      </div>
    </div>
  )
}
