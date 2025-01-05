import { createForm } from '@formily/core';
import { Form, FormButtonGroup, Submit } from '@formily/tdesign-react';
import { createSchemaField } from '@src/formily';
import { User, useProfileSchema } from '@src/model';
import { useMemo, useState } from 'react';
import { CloseCircleIcon } from 'tdesign-icons-react';
import { Button } from 'tdesign-react';

const SchemaField = createSchemaField();

function ProfileForm(props: {
  readPretty: boolean;
  profile: User | null;
  onSubmit: (values: User) => Promise<boolean>;
  onCancal: () => void;
}) {
  const { readPretty, onCancal, onSubmit, profile } = props;
  const [loading, setLoading] = useState(false);
  const form = useMemo(() => {
    return createForm({
      readPretty,
      values: {
        ...profile,
      },
    });
  }, [readPretty, profile]);
  const schema = useProfileSchema();

  const handleCancel = () => {
    onCancal();
  };
  const handleSubmit = async (values: User) => {
    try {
      setLoading(true);
      await onSubmit(values);
      handleCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" labelAlign="left" labelWidth={150} previewTextPlaceholder=" ">
      <SchemaField schema={schema} />
      {!readPretty && (
        <FormButtonGroup align="right">
          <Submit loading={loading} onSubmit={handleSubmit}>
            保存
          </Submit>
          <Button disabled={loading} onClick={handleCancel} variant="outline" icon={<CloseCircleIcon />}>
            取消
          </Button>
        </FormButtonGroup>
      )}
    </Form>
  );
}

export default ProfileForm;
