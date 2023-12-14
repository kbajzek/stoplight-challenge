import React from 'react';
import styles from './Light.module.css';

const Light = ( props ) => {
  return (
    <div className={styles.light} style={{ backgroundColor: props.type, opacity: props.on ? '100%' : '30%' }}>
    </div>
  )
}

export default Light;