'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';
import { cousines } from '@/vars';
import { useState } from 'react';

type FormValues = {
  query: string;
  cuisine: string;
  maxReadyTime: string;
};

export const SearchForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({ mode: 'onChange' });

  const query = watch('query');
  const cuisine = watch('cuisine');
  const maxReadyTime = watch('maxReadyTime');

  const isAllFilled = query && cuisine && maxReadyTime && isValid;

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams();
    if (data.query) params.append('query', data.query);
    if (data.cuisine) params.append('cuisine', data.cuisine);
    if (data.maxReadyTime) params.append('maxReadyTime', data.maxReadyTime);
    router.push(`/recipes?${params.toString()}`);
  };

    
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start flex-col w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Recipe Finder</h1>

        <input
          type="text"
          placeholder="Search recipe..."
          {...register('query')}
          className="w-full px-4 py-2 border rounded outline-blue-400"
        />
        <div className="relative w-full">
          <select
            {...register('cuisine')}
            onFocus={() => setIsOpen(true)}
            onBlur={() => {
              // Close only if nothing is selected
              setTimeout(() => setIsOpen(false), 100); // small delay to allow value to update
            }}
            className="w-full px-4 py-2 border rounded outline-blue-400 appearance-none"
          >
            <option value="">Select cuisine</option>
            {cousines.map((cuisine, index) => (
              <option key={index} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
          <FiChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${
              isOpen && !watch('cuisine').length ? 'rotate-180 text-blue-400' : 'text-gray-400'
            }`}
            size={20}
          />
        </div>

        <input
          type="number"
          placeholder="Max preparation time (min)"
          {...register('maxReadyTime')}
          className="w-full px-4 py-2 border rounded outline-blue-400"
        />

        <button
          type="submit"
          disabled={!isAllFilled}
          className={`w-full px-4 py-2 rounded ${
            !isAllFilled ? 'bg-gray-300 cursor-default' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </form>
    </main>
  );
};
