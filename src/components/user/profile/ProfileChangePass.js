import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import {
  Box,
  Input,
  Button,
  Divider,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  FormHelperText
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useFormik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { QuillEditor } from '../../editor';
import { passwordError, emailError } from '../../../utils/helpError';

// ----------------------------------------------------------------------

ProfilePostInput.propTypes = {
  sx: PropTypes.object
};

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const { sendMail } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleAttach = () => {
    fileInputRef.current.click();
  };
  const PassSchema = Yup.object().shape({
    OldPassWord: Yup.string('Enter your old password')
      .required('Old password is required')
      .matches(/^[A-Za-z0-9._%+-]/),
    NewPassword: Yup.string('Enter your new password')
      .required('New password is required')
      .matches(/^[A-Za-z0-9._%+-]/),
    ReNewPassword: Yup.string('Re-enter your new password')
      .required('Re-enter new password is required')
      .matches(/^[A-Za-z0-9._%+-]/)
  });

  const formik = useFormik({
    initialValues: {
      OldPassWord: '',
      NewPassword: '',
      ReNewPassword: ''
    },
    validationSchema: PassSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.code || error.message });
        }
      }
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const handleShowPassword1 = () => {
    setShowPassword1((show) => !show);
  };
  const handleShowPassword2 = () => {
    setShowPassword2((show) => !show);
  };
  const handleShowPassword3 = () => {
    setShowPassword3((show) => !show);
  };
  return (
    <div>
      <form>
        <Typography variant="h6" marginBottom="15px">
          Change Password
        </Typography>
        <TextField
          id="oldpass"
          name="oldpass"
          label="Old Password"
          placeholder="Old Password"
          variant="standard"
          type={showPassword1 ? 'text' : 'password'}
          // {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword1} edge="end">
                  <Icon icon={showPassword1 ? eyeFill : eyeOffFill} />
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
          id="newpass"
          name="newpass"
          label="New Password"
          placeholder="New Password"
          variant="standard"
          type={showPassword2 ? 'text' : 'password'}
          // {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword2} edge="end">
                  <Icon icon={showPassword2 ? eyeFill : eyeOffFill} />
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
          id="confirmpass"
          name="confirmpass"
          label="New Password Confirm"
          placeholder="Old Password Confirm"
          variant="standard"
          type={showPassword3 ? 'text' : 'password'}
          // {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword3} edge="end">
                  <Icon icon={showPassword3 ? eyeFill : eyeOffFill} />
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

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <LoadingButton type="submit" variant="contained">
            Change
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
}
