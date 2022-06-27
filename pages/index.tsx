import 'animate.css';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import imageLoader from '../imageLoader';
import { useState, useEffect, useRef } from 'react';
import Loader from '../public/ios_loader.png';
import styles from '../styles/Home.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import { Character, GetCharacterResults, Info } from '../types';
;

const defaultEndPoint = 'https:/rickandmortyapi.com/api/character';

const Home: NextPage<{ info: Info, characters: Character[] }> = ({info, characters}) => {
  var counter = useRef(0);
  const [loading, setLoading] = useState(true);
  const [results, updateResults] = useState(characters);


  //API Routing to different pages
  const [page, updatePage] = useState({
    ...info,
    current: defaultEndPoint
  });

  const { current } = page;

  useEffect(() => {
    if ( current === defaultEndPoint )  return;
  
    async function request() {
      setLoading(false);
      const res = await fetch(current)
      const nextData = await res.json();
  
      updatePage({
        current,
        ...nextData.info
      });
  
      if ( !nextData.info?.prev ) {
        updateResults(nextData.results);
        return;
      }
  
      setLoading(true);
      updateResults(prev => {
        return [
          ...nextData.results
        ]
      });
    }
  
    request();
  }, [current]);

  //Trigger navigations
  function nextPage() {
    counter.current = 0;

    updatePage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    });
  }

  function prevPage() {
    counter.current = 0;

    updatePage(prev => {
      return {
        ...prev,
        current: page?.prev
      }
    });
  }

  
  return (
    <div className={styles.container}>
      <Head>
        <title> Rick and Morty | Characters </title>
        <meta 
          name="description" 
          content="This is a simple static site displaying the various characters in the sci-fi series, Rick and Morty" 
        />
        <link 
          rel="icon" 
          sizes='32X32'
          href="/good_favicon.ico" 
        />
      </Head>
      <h1 className={styles.first}> Rick and Morty </h1>
      <p className={styles.second}> List of Characters </p>
     {/*Controls to navigate between pages*/}
      <div className={styles.controls}>
        <button value='Prev' onClick={prevPage}> Prev </button>
        <button value='Next' onClick={nextPage}> Next </button> 
      </div>

      <ul className={styles.footer}>
        {!loading && <div className={styles.grid}>
          <Image 
            alt='Loader'
            loader={imageLoader} 
            unoptimized 
            src={Loader} 
            width={200} 
            height={200}
            className={styles.animation}
          />
          <h3> Loading... </h3>
        </div>}
        {loading && results.map((character) => {
          //Destructuring the character object
          const {id, name, image} = character
          return (
            <Link key={id} href={`/character/${id}`}>
              <li key={id} className={`animate__animated animate__fadeInUp`}>
                <p> {name} </p>
                <Image 
                  priority
                  loader={imageLoader}
                  unoptimized
                  alt={name} 
                  src={image} 
                  width="200" 
                  height="200"
                />
              </li>
            </Link>
          );
        })}
      </ul>

    </div>
  );
};

//Fetching data from API and pasing them as props to the index.tsx component
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(defaultEndPoint);

  //Assigning the data to interfaces in the types.ts file 
  const { info, results }: GetCharacterResults = await res.json();

  
  return {
    props: {
      info: info,
      characters: results,
    }
  };
};

export default Home
