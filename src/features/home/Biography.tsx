import { useTranslation } from 'react-i18next';

const Biography = () => {
  const [t] = useTranslation('bio')
  return <div>
    {t("content")}
  </div>
}

export default Biography;