import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCounter } from '@/store/modules/about';

const About: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const { counter } = useSelector((store: any) => store.about);
	const [value, setValue] = useState(counter);
	useEffect(() => {
		console.log(counter);
	}, [counter])


	return (<div>
		<input type={'number'} value={value} onChange={event => setValue(event.target.value)} />
		<button onClick={() => dispatch(setCounter({ counter: value }))}>保存</button>
		<div>保存值：{counter}</div>
	</div>)
}

export default About;