import React from 'react'
import styles from './index.scss'

const Star = props => {
  const a = [1, 2, 3, 4, 5]
  const count = Number(props.count) > a.length ? a.length : Number(props.count)
  const name = new Date().getTime()
  return (
    <p className={styles['star']}>
      <input className={styles['ipt']} type="radio" name={name} value="0" defaultChecked />
      {a.map(item => (item === count ? <input className={styles['ipt']}  key={item} type="radio" name={name} value={item} defaultChecked /> : <input className={styles['ipt']}  key={item} type="radio" name={name} value={item} />))}
    </p>
  )
}

export default Star
