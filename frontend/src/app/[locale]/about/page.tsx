import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
export default function AboutPage() {
  const t = useTranslations('AboutPage');
  return (
    <div>
      <h1>{t('message')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}