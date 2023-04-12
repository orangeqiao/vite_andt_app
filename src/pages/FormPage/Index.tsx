import React, { useRef } from 'react';
import FormJson from '@/components/FormJson/Index';
import { SearchField, SearchFormValues } from '@/interface/from';

const fields: SearchField[] = [
	{ label: 'Name', name: 'name', type: 'text' },
	{ label: 'username', name: 'username', type: 'text' },
	// {
	// 	label: 'name2', name: 'name2', type: 'select', options: [{ value: '1', label: 'Option 1' },
	// 	{ value: '2', label: 'Option 2' },
	// 	{ value: '3', label: 'Option 3' },]
	// },
	{ label: 'Age', name: 'age', type: 'number' },
	// { label: 'Date', name: 'date', type: 'date' },
];

const FormSearchPage: React.FC = () => {
	const handleSearch = (filters: SearchFormValues) => {
		console.log('Search filters:', filters);
	};

	const handleChange = (name: string, value: any) => {
		console.log('handleChange:', name, value);
	};
	const searchRef = useRef(null as any)
	const handleClick = (event: React.FormEvent<HTMLDivElement>) => {
		if (searchRef.current) {
			searchRef.current.setFieldsValue && searchRef.current.setFieldsValue({
				name: '122',
				age: 122
			})
		}

	}

	return (
		<div>
			<div onClick={handleClick}>改变form的值</div>
			<FormJson   />
		</div>
	);
};
export default FormSearchPage