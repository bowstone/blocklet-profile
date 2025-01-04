import { createSchemaField as createSchemaFieldCore } from '@formily/react';
import { Form, FormItem, Input } from '@formily/tdesign-react';

/**
 * 创建 SchemaFiel 对象
 * @param components
 * @returns
 */
export const createSchemaField = (components: Record<string, any> = {}) =>
  createSchemaFieldCore({
    components: {
      FormItem,
      Input,
      Form,
      ...components,
    },
  });
