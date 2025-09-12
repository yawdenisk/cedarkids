import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Contacts() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:info@cedarkids.eu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      )}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container'>
      <div className='contacts'>
        <div className='contacts-header'>
          <h1>{t('contacts.title')}</h1>
          <p>{t('contacts.subtitle')}</p>
        </div>
        
        <div className='contacts-content'>
          <div className='contact-form'>
            <h2>{t('contacts.form.title')}</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contacts.form.name')}
                  required
                />
              </div>
              
              <div className='form-group'>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contacts.form.email')}
                  required
                />
              </div>
              
              <div className='form-group'>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('contacts.form.phone')}
                />
              </div>
              
              <div className='form-group'>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t('contacts.form.subject')}
                  required
                />
              </div>
              
              <div className='form-group'>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contacts.form.message')}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={submitStatus === 'success' ? 'success' : ''}
              >
                {isSubmitting ? t('contacts.form.sending') : t('contacts.form.submit')}
              </button>
              
              {submitStatus === 'success' && (
                <div className='success-message'>
                  {t('contacts.form.success')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className='error-message'>
                  {t('contacts.form.error')}
                </div>
              )}
            </form>
          </div>
          
          <div className='contact-info'>
            <h2>{t('contacts.info.title')}</h2>
            
            <div className='info-item'>
              <div className='info-icon'>
                <span>✉️</span>
              </div>
              <div className='info-content'>
                <h3>{t('contacts.info.email')}</h3>
                <p>info@cedarkids.eu</p>
              </div>
            </div>
            
            <div className='info-item'>
              <div className='info-icon'>
                <span>📞</span>
              </div>
              <div className='info-content'>
                <h3>{t('contacts.info.phone')}</h3>
                <p><a href='tel:+48452816914'>+48 452 816 914</a></p>
              </div>
            </div>
            
            <div className='info-item'>
              <div className='info-icon'>
                <span>📍</span>
              </div>
              <div className='info-content'>
                <h3>{t('contacts.info.address')}</h3>
                <p>Ul. Brzozowa 36/3, 85-154 Bydgoszcz, Polska</p>
              </div>
            </div>
            
    
          </div>
        </div>
      </div>
    </div>
  )
}
