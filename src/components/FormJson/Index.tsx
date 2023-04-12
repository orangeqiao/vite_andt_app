import React, { useEffect, forwardRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email format').required('Email is required'),
	// password: Yup.string().required('Password is required'),
});



const FormComponent = () => {
	const initialValues = {
		name: '',
		email: '',
		password: '',
		sex: false
	};

	const onSubmitCallback = (values: any, { setSubmitting }: any) => {
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2))
			setSubmitting(false)
		}, 400)
	};


	const MyInput = ({ label, ...props }: any) => {
		const [field, meta] = useField(props);
		return (
			<>
				<label htmlFor={props.name}>{label}</label>
				<input {...field} {...props} />
				{meta.touched && meta.error ? (
					<div>{meta.error}</div>
				) : null}
			</>

		)

	}
	const MyCheckout = ({ children, ...props }: any) => {
		const [field, meta] = useField({ ...props, type: 'checkbox' });
		return (
			<div>
				<label>
					<input type='checkbox' {...field} {...props} />{children}
				</label>
				{meta.touched && meta.error ? (
					<div>{meta.error}</div>
				) : null}

			</div>

		)

	}

	return (
		<Formik initialValues={initialValues}
			onSubmit={onSubmitCallback

			}
			validationSchema={validationSchema}
		>
			{({ errors, touched, values, handleChange, handleBlur, isSubmitting, getFieldProps }) => (
				<Form>
					<Stack spacing={2}>
						<MyInput type='text' label="name" name="name" />
						<MyCheckout name="sex" >ss</MyCheckout>
						<label htmlFor='email'>email</label>
						<input type="email"
							{...getFieldProps('email')}
						/>
						<ErrorMessage name='email' component={'div'} />
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Submit
						</Button>
					</Stack>
				</Form>
			)}



		</Formik>

	);
};

export default forwardRef(FormComponent);