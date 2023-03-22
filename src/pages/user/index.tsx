import { useEffect } from 'react'
import './index.less'
import styles from './index.module.less'

function User() {
	return (
		<div className="User">
			<div className='czq'>user css</div>
			<div className={styles.czq}>user css module</div>

		</div>
	)
}

export default User
