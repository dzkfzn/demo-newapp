'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { createShortener } from '@/actions/shortener';
import { z } from 'zod';

const shortenerSchema = z.object({
  originalURL: z.string().url('Please enter a valid URL'),
  short: z
    .string()
    .regex(
      /^[a-zA-Z0-9]*$/, // Updated to allow empty strings as well
      'Shortened must be alphanumeric and contain no spaces'
    )
    .optional(),
});

export type ShortenerFormData = z.infer<typeof shortenerSchema>;

export default function Home() {
  const [shortenSuccess, setShortenSuccess] = useState(false);
  const [data, setData] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShortenerFormData>({
    resolver: zodResolver(shortenerSchema),
  });

  const onSubmit = async (formData: ShortenerFormData) => {
    console.log('=>(page.tsx:33) formData', formData);

    try {
      const result = await createShortener(formData);
      console.log('=>(page.tsx:38) result', result);
      setShortenSuccess(true);
      setData(result);
      reset();
    } catch (error) {
      console.error('Failed to create short URL', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Big Title */}
      <header className="mt-10 text-center">
        <h1 className="text-5xl font-bold text-blue-600">URL Shortener</h1>{' '}
        {/* Increased font size */}
      </header>

      <main className="mx-auto mt-10 max-w-full flex-grow">
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-6">
          {/* Original URL Input */}
          <div>
            <label
              htmlFor="originalURL"
              className="text-white-700 block text-lg font-medium" // Increased font size
            >
              Original URL
            </label>
            <input
              type="text"
              id="originalURL"
              {...register('originalURL')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-5 py-4 text-lg text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg" // Increased padding and text size
              placeholder="https://example.com"
            />
            {errors.originalURL && (
              <p className="mt-2 text-sm text-red-600">
                {errors.originalURL.message}
              </p>
            )}
          </div>

          {/* Short URL Input */}
          <div>
            <label
              htmlFor="short"
              className="text-white-700 block text-lg font-medium" // Increased font size
            >
              Shortened
            </label>
            <input
              type="text"
              id="short"
              {...register('short')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-5 py-4 text-lg text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg" // Increased padding and text size
              placeholder="Leave it empty if you want it generated"
            />
            {errors.short && (
              <p className="mt-2 text-sm text-red-600">
                {errors.short.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700" // Increased padding and text size
          >
            Create Short URL
          </button>
        </form>

        {/* Success Message */}
        {shortenSuccess && (
          <div className="mt-6">
            <p className="text-green-600">Short URL created successfully!</p>
            <p>
              <span className="font-semibold">Original URL:</span>{' '}
              {data.original}
            </p>
            <p>
              <span className="font-semibold">Short URL:</span>{' '}
              <a
                href={`${process.env.NEXT_PUBLIC_DOMAIN}${data.short}`}
                className="text-blue-600"
              >
                {`${process.env.NEXT_PUBLIC_DOMAIN}${data.short}`}
              </a>
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 bg-gray-800 py-4">
        <p className="text-center text-white">
          &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
