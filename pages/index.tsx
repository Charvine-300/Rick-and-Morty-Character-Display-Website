import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import imageLoader from '../imageLoader';
import styles from '../styles/Home.module.css'
import { Character, GetCharacterResults, Info } from '../types';



const Home: NextPage<{ info: Info, characters: Character[] }> = ({info, characters}) => {
  console.log(info);
  console.log(characters);
  
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
          href="/logo.png" 
        />
      </Head>
      <h1 className={styles.first}> Rick and Morty </h1>
      <p className={styles.second}> List of Characters </p>
      <ul className={styles.footer}>
        {characters.map((character) => {
          return (
            <li key={character.id}>
              <p> {character.name} </p>
              <Image 
                loader={imageLoader}
                unoptimized
                alt={character.name} 
                src={character.image} 
                width="200" 
                height="200"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

//Fetching data from API and pasing them as props to the index.tsx component
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https:/rickandmortyapi.com/api/character`)

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
