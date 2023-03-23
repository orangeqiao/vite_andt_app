import { useEffect } from 'react'
import './index.less'
import styles from './index.module.less'
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from "@/store/modules/user";
import _ from 'lodash';
import type { AnyAction } from "@reduxjs/toolkit";

const User: React.FC<{}> = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserList({ currentPage: 2, pageSize: 10 }) as unknown as AnyAction);
	}, [])
	const { list } = useSelector((store: any) => store.user);
	return (
		<div className="User">
			<div className='czq'>user css</div>
			<div className={styles.czq}>user css module</div>
			<ul style={{ padding: 0 }}>list:
				{_.map(list, (item: { name: string }, key: number) => <li key={key}>{item.name}</li>)}
			</ul>

		</div>
	)
}

export default User
