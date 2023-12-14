import React, { useEffect, useState } from 'react';
import styles from './Stoplight.module.css';
import Light from '../Light/Light';

const Stoplight = () => {

  const sequence = [
    { color: 'green', duration: 3 },
    { color: 'yellow', duration: 1 },
    { color: 'red', duration: 2 }
  ]
  const [currentSequence, setCurrentSequence] = useState({ index: 0, count: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSequence( prevCurrentSequence => { 
        console.log(prevCurrentSequence)
        if(prevCurrentSequence.count === sequence[prevCurrentSequence.index].duration){
          return {
            index: prevCurrentSequence.index === sequence.length - 1 ? 0 : prevCurrentSequence.index + 1,
            count: 1
          }
        }else{
          return {
            index: prevCurrentSequence.index,
            count: prevCurrentSequence.count + 1
          }
        }
      })
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.general}>
      <div className={styles.stoplight}>
        <Light on={sequence[currentSequence.index].color === 'red'} type={'red'} />
        <Light on={sequence[currentSequence.index].color === 'yellow'} type={'yellow'} />
        <Light on={sequence[currentSequence.index].color === 'green'} type={'green'} />
      </div>
    </div>
  )
}

export default Stoplight;