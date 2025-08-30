import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import raben from '../images/raben.webp'
import warehouse from '../images/warehouse.webp'
export default function Shipping() {
  const { t } = useTranslation();
  return (
   <div className='container'>
     <div className='shipping'>
      <div className='area'>
        <img src={raben} alt='none image'/>
        <div className='text-area'>
            <p>{t('shipping.partnerLabel')}</p>
            <h1>{t('shipping.partnerName')}</h1>
        <p><Trans i18nKey="shipping.partnerDesc" /></p>
        </div>
      </div>
      <p>{t('shipping.orderProcessingTitle')}</p>
      <p>{t('shipping.orderProcessingDesc')}</p>
      <span/>
      <p>{t('shipping.estimatedDeliveryTitle')}</p>
      <p>{t('shipping.estimatedDeliveryDesc')}</p>
        <div className='area'>
        <div className='text-area'>
            <p>{t('shipping.warehouseTitle')}</p>
            <h1>{t('shipping.warehouseName')}</h1>
        <p>{t('shipping.warehouseDesc')}</p>
        </div>
         <img src={warehouse} alt='none image'/>
      </div>
      <p>{t('shipping.pickupTitle')}</p>
      <p>{t('shipping.pickupDesc')}</p>
      <p>{t('shipping.satisfaction')}</p>
      <span/>
      <p><Trans i18nKey="shipping.contact"><a>contact us</a></Trans></p>
      <span/>
      <p>{t('shipping.thankYou')}</p>
    </div>  
   </div>
  )
}
