import Link from 'next/link';
import { useState } from 'react'
import styles from '../styles/Home.module.css'


const Buttons = () => {
  /*function nextPage(e: any) {
    e.preventDefault();
    setCounter(counter + 1);
  };*/


  const [counter, setCounter] =useState(2);

  return (
   <div className={styles.controls}>
     <Link href={`?page=${counter}`}>
       <button value='Prev'> Prev </button>
     </Link>
     <Link href={`?page=${counter}`}>
       <button value='Next'> Next </button> 
     </Link>
   </div>
  );
}

export default Buttons