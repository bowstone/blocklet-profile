import { useAsyncEffect } from '@src/hooks';
import { User } from '@src/model';
import { createUser, getUserById, updateUser } from '@src/services';
import { useState } from 'react';
import { EditIcon } from 'tdesign-icons-react';
import { Button, Loading, message } from 'tdesign-react';

import ProfileForm from './profile-form';

export default function Profile(props: { id: number; onChange: (id: number) => void }) {
  const { id, onChange } = props;
  const [readPretty, setReadPretty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);

  const fetchData = async (currId: number) => {
    if (!currId) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await getUserById(currId);
      setProfile(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useAsyncEffect(async () => {
    await fetchData(id);
  }, [id]);
  const handleEdit = () => {
    setReadPretty((prev) => !prev);
  };

  const handleSubmit = async (user: User): Promise<boolean> => {
    const { id: currId } = profile || {};
    try {
      // 更新数据
      if (currId) {
        user.id = currId;
        const { data } = await updateUser(user);
        await fetchData(data);
        message.success('保存成功');
        return true;
      }
      const { data } = await createUser(user);
      message.success('保存成功');
      onChange(data);
      return true;
    } catch (error) {
      message.error(error.message);
      return false;
    }
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
