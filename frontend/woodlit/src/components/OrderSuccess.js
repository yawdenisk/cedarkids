import { useTranslation } from 'react-i18next'

export default function OrderSuccess() {
  const { t } = useTranslation();
  return (
    <div className="order-success">
      <div className="card">
        <h1>{t('order.successTitle')}</h1>
        <p>{t('order.successDesc')}</p>
        <a href="/" className="btn">
          {t('order.backHome')}
        </a>
      </div>
    </div>
  );
}
