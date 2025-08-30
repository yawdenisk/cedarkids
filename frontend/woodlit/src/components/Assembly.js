import React from 'react'
import Accordion from './Accordion'
import { useTranslation } from 'react-i18next'

export default function Assembly() {
  const { t } = useTranslation();
  return (
    <div className='container'>
      <div className='assembly'>
        <h5>{t('assembly.guide')}</h5>
        <h6>{t('assembly.welcome')}</h6>
        <h1>{t('assembly.before')}</h1>
        <span/>
        <Accordion title={t('assembly.toolsTitle')} text={t('assembly.toolsText')}/>
        <span/>
        <Accordion title={t('assembly.prepareTitle')} text={t('assembly.prepareText')}/>
        <span/>
        <Accordion title={t('assembly.safetyTitle')} text={t('assembly.safetyText')}/>
        <span/>
        <h1>{t('assembly.during')}</h1>
        <span/>
        <Accordion title={t('assembly.timeTitle')} text={t('assembly.timeText')}/>
        <span/>
        <Accordion title={t('assembly.stepsTitle')} text={t('assembly.stepsText')}/>
        <span/>
        <Accordion title={t('assembly.troubleTitle')} text={t('assembly.troubleText')}/>
        <span/>
        <h1>{t('assembly.after')}</h1>
        <span/>
        <Accordion title={t('assembly.maintenanceTitle')} text={t('assembly.maintenanceText')}/>
        <span/>
        <Accordion title={t('assembly.checksTitle')} text={t('assembly.checksText')}/>
        <span/>
        <Accordion title={t('assembly.enjoyTitle')} text={t('assembly.enjoyText')}/>
        <span/>
        <h1>{t('assembly.contactTitle')}</h1>
        <h2>{t('assembly.contactDesc')}</h2>
      </div>
    </div>
  )
}
