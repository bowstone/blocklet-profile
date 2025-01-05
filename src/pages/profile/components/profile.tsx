import { useAsyncEffect } from '@src/hooks';
import { User } from '@src/model';
import { getUserById } from '@src/services';
import { useState } from 'react';
import { EditIcon } from 'tdesign-icons-react';
import { Button, Loading, message } from 'tdesign-react';

import ProfileForm from './profile-form';

export default function Profile(props: { id: number; onChange: (id: number) => void }) {
  const { id, onChange } = props;
  const [readPretty, setReadPretty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);

  useAsyncEffect(async () => {
    if (id) {
      setLoading(true);
      try {
        const { data } = await getUserById(id);
        setProfile(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);
  const handleEdit = () => {
    setReadPretty((prev) => !prev);
  };

  const handleSubmit = (user: User): Promise<boolean> => {
    return new Promise((reslove) => {
      // eslint-disable-next-line no-console
      console.log(user);
      setTimeout(() => reslove(true), 2000);
      onChange(1);
    });
  };

  return (
    <div>
      <Loading loading={loading} showOverlay size="small">
        <div className="text-right">
          {readPretty && (
            <Button shape="round" variant="text" onClick={handleEdit} icon={<EditIcon />}>
              编辑
            </Button>
          )}
        </div>
        <ProfileForm profile={profile} readPretty={readPretty} onCancal={handleEdit} onSubmit={handleSubmit} />
      </Loading>
    </div>
  );
}
