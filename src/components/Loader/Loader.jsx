import React from 'react'
import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={styles.general}>
        <div className={styles.loaderContainer}>
            <div className={styles.ldsDualRing}></div>
        </div>
        <span className={styles.text}>Loading...</span>
    </div>
  )
}

export default Loader