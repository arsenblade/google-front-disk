import React from 'react'
import styles from './Input.module.scss'

const Input = (props) => {
  return (
    <input className={styles.input} value={props.value} onChange={(e) => props.setValue(e.target.value)} type={props.type} placeholder={props.placeholder}/>
  )
}

export default Input