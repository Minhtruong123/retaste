import { z } from 'zod/v4';
import { ParsedQs } from 'qs';
import { BAD_REQUEST } from '~/core/errors.response';
import { LIMIT_ITEMS, PAGE_DEFAULT } from './constant';

export const FIELD_RULE = 'That field is invalid !';
export const EMAIL_RULE = '^[\\w.-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$';
export const EMAIL_RULE_MESSAGE = 'Email is not correct !';
export const PASSWORD_RULE = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\[\]{};':"\\|,.<>/?`~\\-]).{6,}$/;
export const PASSWORD_RULE_MESSAGE = 'Password is not correct !';
export const OBJECT_ID_RULE = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
export const OBJECT_ID_RULE_MESSAGE = 'Value is not objectid !';
export const LIMIT_COMMON_FILE_SIZE = 2097152;
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
export const ALLOW_COMMON_VEDIO_FILE_TYPES = [
  'video/mp4',
  'video/avi',
  'video/mov',
  'video/mkv',
  'video/webm'
];
export const LIMIT_COMMON_VEDIO_FILE_SIZE = 30 * 1024 * 1024; // 30MB

export const queryApi = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => {
      if (val <= 0) return false;
      if (val >= 50) return false;
      return true;
    })
    .default(LIMIT_ITEMS),
  page: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => val >= 1)
    .default(PAGE_DEFAULT),
  sortKey: z.string().max(30).optional(),
  sortValue: z.union([z.literal(1), z.literal(-1)]).optional(),
  keyWord: z.string().max(250).default('')
});
export type queryApiType = z.infer<typeof queryApi>;

export const queryApiValidate = (query: ParsedQs) => {
  try {
    return queryApi.parse(query);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new BAD_REQUEST('Params is not valid !');
  }
};
export const paramApi = z.string().regex(OBJECT_ID_RULE);
export const paramApiValidate = (param: string) => {
  try {
    return paramApi.parse(param);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new BAD_REQUEST('Params is not valid !');
  }
};
export function checkSubset(a: string[], b: string[]) {
  const setB = new Set(b);
  for (const item of a) {
    if (!setB.has(item)) return false; // dừng ngay nếu không tìm thấy
  }
  return true;
}
