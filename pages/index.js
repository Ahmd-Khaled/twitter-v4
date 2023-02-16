import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { CommentModal, Feed, Sidebar, Widgets } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ newsResults, randomUsersResults }) {
  return (
    <>
      <Head>
        <title>Twitter clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex min-h-screen mx-auto'>
        <Sidebar />
        <Feed />
        <Widgets newsResults={newsResults.articles} randomUsersResults={randomUsersResults.results} />
        <CommentModal />
      </main>
    </>
  )
}


export async function getServerSideProps() {
  // what's happening section
  const newsResults = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/business/us.json'
  ).then((res) => res.json());

  // who to follow section
  const randomUsersResults = await fetch(
    'https://randomuser.me/api/?results=30&inc=name,login,picture'
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
};