import Image from 'next/image'
import imageLoader from '../imageLoader';
import styles from '../styles/Home.module.css'
import { GetCharacterResults } from "../types";
import { GetStaticPaths, GetStaticProps } from "next";


const Characters = ({info, results}: GetCharacterResults) => {
  console.log(info);
  console.log(results);
  
  return (
    <div className={styles.container}>
  
      <h1 className={styles.first}> Rick and Morty </h1>
      <p className={styles.second}> List of Characters </p>
      <ul className={styles.footer}>
        {results.map((character) => {
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
  )
}


//Pre-rendering all pages in the Rick and Morty API
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https:/rickandmortyapi.com/api/character`);
  const data = await res.json();
  console.log(data);

  const pages: number[] = [...(data.info.pages + 1).keys()].slice(1);
  console.log(pages);

  const paths = pages.map((path: number) => {
    return {
      params: {
        id: path.toString(),
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`https:/rickandmortyapi.com/api/character?page=${id}`)
  const { info, results }: GetCharacterResults = await res.json();

  return {
    props: {
      info: info,
      results: results
    }
  }
}

export default Characters