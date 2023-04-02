import React, { useState, useRef } from 'react'
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton';
import { SearchField, SearchFormValues } from '@/interface/from';
export interface FormSearchProps {
	fields: SearchField[];
	onSubmit?: (Searchs: SearchFormValues) => void;
	onReset?: (Searchs: SearchFormValues) => void;
	onChange?: (Searchs: string, value: any) => void;
	initialValues?: SearchFormValues
}
const Form = styled('form')({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
});
const ButtonGroup = styled('div')(({ theme }) => ({
	margin: theme.spacing(1)
}))

const FormSearch: React.FC<FormSearchProps> = ({ fields, initialValues, onSubmit, onReset, onChange }) => {
	const _initialValues = useRef({} as SearchFormValues)
	fields.forEach((field) => {
		_initialValues.current[field.name] = '';
	});
	_initialValues.current = { ..._initialValues.current, ...initialValues }
	const [values, setValues] = useState<SearchFormValues>(_initialValues.current);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
		onChange && onChange(event.target.name, event.target.value)
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit && onSubmit(values);
	};

	const handleClear = () => {
		setValues(_initialValues.current);
		onReset && onReset(_initialValues.current);
	};

	return (
		<Form onSubmit={handleSubmit} >
			{fields.map((field) => (
				<TextField
					key={field.name}
					name={field.name}
					label={field.label}
					type={field.type || 'text'}
					variant="outlined"
					value={values[field.name]}
					onChange={handleChange}
					sx={{ m: 1 }}
				/>
			))}
			<ButtonGroup >
				<Button type="submit" variant="contained" color="primary" startIcon={<SearchIcon />}>
					Search
				</Button>
				<IconButton onClick={handleClear}>
					<ClearIcon />
				</IconButton>
			</ButtonGroup>
		</Form>
	);
};

export default FormSearch;