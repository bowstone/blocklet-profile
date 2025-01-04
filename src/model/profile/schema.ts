import { ISchema } from '@formily/react';
import { useMemo } from 'react';

export const useProfileSchema = () => {
  const schema = useMemo(() => {
    const innerSchema: ISchema = {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          title: '用户名',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
          maxLength: 50,
          'x-validator': [
            { required: true, message: '用户名必填' },
            { maxLength: 50, message: '用户名最长50个字符' },
          ],
        },
        email: {
          type: 'string',
          title: '邮箱',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          format: 'email',
          'x-validator': [{ required: true, message: '邮箱必填' }],
        },
        phoneNumber: {
          type: 'string',
          title: '手机号',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          format: 'phone',
          'x-validator': [{ required: true, message: '手机号必填' }],
        },
      },
    };
    return innerSchema;
  }, []);

  return schema;
};
