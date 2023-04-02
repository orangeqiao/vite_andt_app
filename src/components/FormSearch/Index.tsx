import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { styled } from '@mui/material/styles';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { SearchField, SearchFormValues } from '@/interface/from';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { width } from '@mui/system';
export interface FormSearchProps {
	fields: SearchField[];
	onSubmit?: (formData: SearchFormValues) => void;
	onReset?: (formData: SearchFormValues) => void;
	onChange?: (fields: string, value: any) => void;

	initialValues?: SearchFormValues
}
interface ChildRef {
	setFieldsValue?: (formData: SearchFormValues) => void;
}
const Form = styled('form')({
	width: '100%',
});
const FormButtonWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: '16px',
	marginTop: '16px'
});

function FormSearch({ fields, initialValues, onSubmit, onReset, onChange }: FormSearchProps, ref: React.Ref<ChildRef>) {
	const _initialValues = useRef({} as SearchFormValues)

	const [formData, setFormData] = useState<SearchFormValues>(() => {
		fields.forEach((field) => {
			_initialValues.current[field.name] = '';
		});
		return _initialValues.current = { ..._initialValues.current, ...initialValues }
	});

	const handleChange = (name: any, value: any) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		onChange && onChange(name, value)
	};
	useImperativeHandle(ref, () => ({
		setFieldsValue: (formData: SearchFormValues) => {
			setFormData((prev) => ({
				...prev,
				...formData
			}));
		}
	}));
	const Item = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit && onSubmit(formData);
	};

	const handleClear = () => {
		setFormData(_initialValues.current);
		onReset && onReset(_initialValues.current);
	};

	return (
		<Form onSubmit={handleSubmit} >
			<Grid container rowSpacing={1} columns={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{fields.map((field) => (
					<Grid item key={field.name}>
						{
							field.type === 'date' ?
								<DatePicker
									label={field.label}
									value={formData[field.name] ? dayjs(formData[field.name]) : null}
									onChange={(newValue) => handleChange(field.name, newValue ? dayjs(newValue).valueOf() : null)}
									slotProps={{
										textField: {
											InputLabelProps: {
												shrink: true,
											}
										},
									}}
								/>
								: field.type === 'select' ?
									<TextField
										InputLabelProps={{
											shrink: true,
										}}
										select
										sx={{ width: 210 }}
										name={field.name}
										label={field.label}
										value={formData[field.name]}
										onChange={(event) => handleChange(event.target.name, event.target.value)}
									>
										{field.options ? field.options.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										)) : null}
									</TextField> 
								
									: <TextField
										name={field.name}
										label={field.label}
										InputLabelProps={{
											shrink: true,
										}}
								
										type={field.type || 'text'}
										variant="outlined"
										value={formData[field.name]}
										onChange={(event) => handleChange(event.target.name, event.target.value)}
									/>
						}

					</Grid>
				))}
			</Grid>
			<Grid item >
				<FormButtonWrapper >
					<Button type="submit" variant="contained" color="primary">
						Search
					</Button>
					<Button type='button' variant="contained" color="primary" onClick={handleClear}>
						重置
					</Button>
				</FormButtonWrapper>
			</Grid>

		</Form>

	);
};

export default forwardRef(FormSearch); 