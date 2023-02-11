import { getProviders, signIn } from 'next-auth/react';

export default function signin({ providers }) {
  const loginHandler = (provider) => {
    signIn(provider.id, { callbackUrl: '/' });
  };

  return (
    <div className='flex justify-center mt-20 space-x-4'>
      <img
        className='hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6'
        src='/imgs/twitter-phone.png' alt='Login-Image' 
      />
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.id} className='flex flex-col items-center'>
            <img className='w-36 object-cover' src='/imgs/twitter-logo.png' alt='twitter logo' />
            <p className='text-center text-sm italic my-10'>This is a clone version of Twitter for learning only.</p>
            <button onClick={() => loginHandler(provider)} className='bg-red-400 hover:bg-red-500 rounded-full text-white px-6 py-3'>Sign in with {provider.name}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    }
  }
}