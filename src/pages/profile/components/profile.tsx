import { User } from '@src/model';
import { useState } from 'react';
import { EditIcon } from 'tdesign-icons-react';
import { Button } from 'tdesign-react';

import ProfileForm from './profile-form';

export default function Profile() {
  const [readPretty, setReadPretty] = useState(true);

  const handleEdit = () => {
    setReadPretty((prev) => !prev);
  };

  const handleSubmit = (user: User): Promise<boolean> => {
    return new Promise((reslove) => {
      // eslint-disable-next-line no-console
      console.log(user);
      setTimeout(() => reslove(true), 2000);
    });
  };

  return (
    <div>
      <div className="text-right">
        {readPretty && (
          <Button shape="round" variant="text" onClick={handleEdit} icon={<EditIcon />}>
            编辑
          </Button>
        )}
      </div>
      <ProfileForm readPretty={readPretty} onCancal={handleEdit} onSubmit={handleSubmit} />
    </div>
  );
}
