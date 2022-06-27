import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import imageLoader from '../../imageLoader';
import styles from  "../../styles/Home.module.css";
import { GetCharacterResults, Character } from "../../types";

const defaultEndPoint = 'https:/rickandmortyapi.com/api/character';

export const Info = styled.div`
  width: 80%;
  margin: 4rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenlyy;
  align-items: center;

  .tabs {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const CharacterInfo = ({ results }: any) => {

  return (
    <div className={styles.container}>
      <Head>
        <title> {results.name} | Rick and Morty Characters </title>
        <meta 
          name="description" 
          content="This is a simple static site displaying the various characters in the sci-fi series, Rick and Morty" 
        />
        <link 
          rel="icon" 
          sizes='32X32'
          href="../../good_favicon.ico" 
        />
      </Head>
      <h1 className={styles.title}> {results.name} </h1>
      <Info>
        <div className="tabs">
          <Image 
            priority
            loader={imageLoader}
            unoptimized
            alt={results.name} 
            src={results.image} 
            width="200" 
            height="200"
          />
        </div>
        <div className='tabs'>
          <p> Status: {results.status} </p>
          <p> Species: {results.species} </p>
          <p> Location: {results.location.name} </p>
          <p> Gender: {results.gender} </p>
          <p> Origin: {results.origin.name} </p>
        </div>
      </Info>
      <Link href='/'>
        <button value='Back to Home'> Back Home </button>
      </Link>
    </div>
  );
}


export const getStaticPaths = async () => {
  const res = await fetch(`${defaultEndPoint}`);
  const { results }: GetCharacterResults = await res.json();

  return {
    paths: results.map((character)=> {
      return {
        params: {
          id: String(character.id),
        }
      }
    }),
    fallback: false
  }
  
}

export const getStaticProps = async ({ params }: {params: {id: string}}) => {
  const res = await fetch(`${defaultEndPoint}/${params.id}`);
  const results: Character = await res.json();

  return {
    props: {
      results: results
    }
  }

}


export default CharacterInfo
