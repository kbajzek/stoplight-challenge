import React, { useEffect, useState } from 'react';
import styles from './Stoplight.module.css';
import Light from '../Light/Light';
import Dropdown from '../Dropdown/Dropdown';

const Stoplight = () => {

  const [value, setValue] = useState(null);
  const [currentSequence, setCurrentSequence] = useState({ index: 0, count: 0 });
  const [options, setOptions] = useState([])

  const changeValue = (value) => {
    setValue(value)
    setCurrentSequence({ index: 0, count: 0 })
  }

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
      changeValue(rows[0].name)
    })
  },[])

  useEffect(() => {
    if(!value) return;
    const interval = setInterval(() => {
      setCurrentSequence( prevCurrentSequence => { 
        const sequence = options.find( option => option.name === value).sequence
        if(prevCurrentSequence.count === sequence[prevCurrentSequence.index].duration){
          return {
            index: prevCurrentSequence.index === sequence.length - 1 ? 0 : prevCurrentSequence.index + 1,
            count: 500
          }
        }else{
          return {
            index: prevCurrentSequence.index,
            count: prevCurrentSequence.count + 500
          }
        }
      })
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [value]);

  let stopLight = <div>Loading</div>;
  if(value){
    const fullObject = options.find( option => option.name === value)
    const lightsObject = fullObject.lights
    const sortedLights = Object.keys(lightsObject).sort((a,b) => lightsObject[a].position < lightsObject[b].position ? -1 : 1)
    stopLight = (
      <div className={styles.general}>
        <div className={styles.stoplight}>
          {sortedLights.map(sortedLight => {
            return <Light 
              key={sortedLight}
              on={fullObject.sequence[currentSequence.index].colors.includes(sortedLight)} 
              type={lightsObject[sortedLight].color} 
            />
          })}
        </div>
        <Dropdown value={value} changeValue={changeValue} options={options} />
      </div>
    )
  }

  return (
    <>
      {stopLight}
    </>
  )
}

export default Stoplight;