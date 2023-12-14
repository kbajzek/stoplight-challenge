import React from 'react';
import styles from './Light.module.css';

const Light = ( props ) => {
  return (
    <div className={[styles.light, styles[`${props.type}-${props.on ? 'on' : 'off'}`]].join(" ")}>
    </div>
  )
}

export default Light;