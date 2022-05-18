import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

// material
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import { emailError, passwordError } from '../../../utils/helpError';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------
// const ROLES = [
//   { title: 'staff' },
//   { title: 'develop' },
//   { title: 'supporter' }
// ];
export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z].[A-Za-z]/,
        'Mail must be domain | @abc.zxc'
      ),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
      role: 1,
      acceptTerms: true
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        console.log('submit');
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          role: values.role,
          email: values.email,
          password: values.password,
          confirmPassword: values.password,
          acceptTerms: values.acceptTerms
        }).then((exp) => {
          if (exp) {
            if (exp?.message === 'ERROR') {
              enqueueSnackbar('Register Failed!', {
                variant: 'error',
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                )
              });
            } else {
              enqueueSnackbar(exp.message, {
                variant: 'success',
                action: (key) => (
                  <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                )
              });
              window.location.href = '/dashboard';
            }
          }
        });

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        // console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code || error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          autoComplete="username"
          name="username"
          type="username"
          label="Username"
          {...getFieldProps('username')}
          error={Boolean(touched.username && errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          fullWidth
          autoComplete="username"
          name="email"
          type="email"
          label="Email address"
          {...getFieldProps('email')}
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit).helperText
          }
          sx={{ my: 2 }}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={
            Boolean(touched.password && errors.password) ||
            passwordError(errors.afterSubmit).error
          }
          helperText={
            (touched.password && errors.password) ||
            passwordError(errors.afterSubmit).helperText
          }
        />
        <TextField
          fullWidth
          autoComplete="comfirm-password"
          type={showPassword ? 'text' : 'password'}
          label="Comfirm Password"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={
            Boolean(touched.password && errors.password) ||
            passwordError(errors.afterSubmit).error
          }
          helperText={
            (touched.password && errors.password) ||
            passwordError(errors.afterSubmit).helperText
          }
          sx={{ my: 2 }}
        />
        {/* <Autocomplete
          id="combo-box-demo"
          options={ROLES}
          getOptionLabel={(option) => option.title}
          sx={{ my: 2 }}
          {...getFieldProps('role')}
          renderInput={(params) => (
            <TextField {...params} label="Select role " variant="outlined" />
          )}
        /> */}
        <Box>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Register
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
