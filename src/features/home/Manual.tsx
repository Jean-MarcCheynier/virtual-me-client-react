import { useTranslation } from 'react-i18next';

const Manual = () => {
  const [t] = useTranslation('manual')
  return <div>
    {t("content")}
  </div>
}

export default Manual;