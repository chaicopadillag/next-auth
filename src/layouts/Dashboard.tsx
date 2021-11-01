import React from 'react';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Dashboard = ({ children }) => {
  const { data, status } = useSession();
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'authenticated') {
    return (
      <main className='bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative'>
        <div className='flex items-start justify-between'>
          <Sidebar />
          <div className='flex flex-col w-full md:space-y-4'>
            <Header />
            <div className='overflow-auto h-screen pb-24 px-4 md:px-6'>{children}</div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <div className='max-w-screen-lg bg-white shadow-2xl rounded-lg mx-auto text-center py-12 mt-52'>
      <h2 className='text-3xl leading-9 font-bold tracking-tight text-gray-800 sm:text-4xl sm:leading-10'>Para poder continuar debe inicar sesión</h2>
      <div className='mt-8 flex justify-center'>
        <div className='inline-flex rounded-md bg-blue-500 shadow'>
          <a href='/api/auth/signin' className='text-gray-200 font-bold py-2 px-6'>
            Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
