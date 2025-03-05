import React from 'react'

import styles from './Pagination.module.css'

const Pagination = () => {
  return (
    <footer className={styles.pagination}>
        <ul>
            <li> <a href="#">&lt;&lt;</a>  </li>
            <li> <a href="#">&lt;</a>  </li>
            <li> <a href="#">1</a>  </li>
            <li> <a href="#">2</a> </li>
            <li> <a href="#">3</a> </li>
            <li> <a href="#">4</a> </li>
            <li> <a href="#">5</a> </li>
            <li> <a href="#">&gt;</a>  </li>
            <li> <a href="#">&gt;&gt;</a>  </li>
        </ul>
    </footer>
  )
}

export default Pagination