import { useSearchParams } from 'react-router-dom';

import ProfileForm from './components';
import './index.less';

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const handleChange = (newId: number) => {
    setSearchParams({ id: newId as unknown as string });
  };
  return (
    <div>
      {/* export */}
      <ProfileForm id={id as unknown as number} onChange={handleChange} />
    </div>
  );
}
