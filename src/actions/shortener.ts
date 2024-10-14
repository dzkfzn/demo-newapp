'use server';

import { db } from '@/lib/db';
// eslint-disable-next-line import/no-cycle
import { ShortenerFormData } from '@/app/page';

function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const createShortener = async (param: ShortenerFormData) => {
  if (!param.short) param.short = generateRandomString(5);

  const data = await db.shortenedURL.findFirst({
    where: {
      short: param.short,
    },
  });

  if (data) return data;

  return db.shortenedURL.create({
    data: {
      original: param.originalURL,
      short: param.short,
    },
  });
};
