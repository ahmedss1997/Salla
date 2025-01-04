import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Breadcrumb = ({ paths }: { paths: string[] }) => {
  const { t } = useTranslation();
  return (
    <div className="px-6 py-3 text-sm">
      <ul className="flex">
        <li>
          <Link href="/" className="text-textColor hover:underline flex items-center">
            <FaHome /> <span className="material-icons mx-2">{t('home')}</span> 
          </Link>
        </li>
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            <span className='mx-1'>/</span>
            <span className='mx-1 text-grayPath'>{path}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
