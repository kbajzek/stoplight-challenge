import React, { useEffect, useState } from 'react';
import styles from './Stoplight.module.css';
import Light from '../Light/Light';
import Dropdown from '../Dropdown/Dropdown';

const Stoplight = () => {

  const sequence = [
    { color: 'green', duration: 3 },
    { color: 'yellow', duration: 1 },
    { color: 'red', duration: 2 }
  ]

  const [value, setValue] = useState(null);
  const [currentSequence, setCurrentSequence] = useState({ index: 0, count: 0 });
  const [options, setOptions] = useState([])
  console.log(options)
  useEffect(() => {
    fetch("https://api.airtable.com/v0/appjuYzrkcZSHPVwe/tble4bytQzCyqRhcU", {
      headers: {Authorization: 'Bearer patmyDVBqXLB4LM6B.7d4d6f87347df8ab518b7f1d78ac703b3bbe9be69556b7950ff15fe36b138125'}
    })
    .then(response => response.json())
    .then(data => {
      const rows = data.records.map(record => {
        return {
          name: record.fields.SequenceName,
          lights: JSON.parse(record.fields.Lights),
          sequence: JSON.parse(record.fields.Sequence)
        }
      })
      setOptions(rows)
      setValue(rows[0].name)
    })
  },[])

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

  const changeValue = (value) => {
    setValue(value)

  }

  let stopLight = <div>Loading</div>
  if(value){
    stopLight = (<div className={styles.general}>
      <div className={styles.stoplight}>
        {/* {options.find( option => option.name === value).lights.map(option => )} */}
        <Light on={sequence[currentSequence.index].color === 'red'} type={'red'} />
        <Light on={sequence[currentSequence.index].color === 'yellow'} type={'yellow'} />
        <Light on={sequence[currentSequence.index].color === 'green'} type={'green'} />
      </div>
      <Dropdown value={value} changeValue={changeValue} options={options} />
    </div>)
  }

  return (
    {stopLight}
  )
}

export default Stoplight;