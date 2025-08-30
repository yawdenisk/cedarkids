import React from 'react'
import { useTranslation } from 'react-i18next'
import about from '../images/about.webp'
export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <div className='container'>
      <div className='about'>
        <div className='text-area'>
            <h1>{t('about.title')}</h1>
            <p>{t('about.p1')}</p>
<p>{t('about.p2')}</p>
        </div>
        <img src={about} alt='none image'/>
      </div>
    </div>
  )
}
