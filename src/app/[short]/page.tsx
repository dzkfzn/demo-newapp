import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function ShortUrlRedirect({
  params: { short },
}: {
  params: {
    short: string;
  };
}) {
  async function getUrlFromDb() {
    'use server';

    const res = await db.shortenedURL.findFirst({
      where: {
        short,
      },
    });
    return res;
  }

  const apa = await getUrlFromDb();
  if (!apa) redirect('/');
  redirect(apa.original);

  return <></>;
}
