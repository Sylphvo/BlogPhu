import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Box, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//

import { MIconButton } from '../../@material-extend';
// ----------------------------------------------------------------------

ComposeMailUser.propTypes = {
  profile: PropTypes.object
};

// eslint-disable-next-line react/prop-types
export default function ComposeMailUser({ profile, sx }) {
  const { email } = profile;
  const { sendMail } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const mailSchema = Yup.object({
    toAddress: Yup.string()
      .email('Invalid email!')
      .required('Email is required'),
    subject: Yup.string().required('Subject is required')
  });

  const formik = useFormik({
    initialValues: {
      toAddress: email,
      subject: '',
      message: ''
    },
    validationSchema: mailSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await sendMail({
          toAddress: values.toAddress,
          subject: values.subject,
          message: values.message
        }).then((e) => {
          console.log(e);
          if (e.message === 200) {
            enqueueSnackbar(`send mail to ${values.toAddress} successful!`, {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
          } else {
            enqueueSnackbar(`send mail to ${values.toAddress} failed!`, {
              variant: 'error',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
          }
        });

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
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" marginBottom="15px">
          New Message
        </Typography>
        <TextField
          fullWidth
          id="toAddress"
          name="toAddress"
          disabled
          value={formik.values.toAddress}
          onChange={formik.handleChange}
          label="To Address"
          placeholder="Email address"
          error={formik.touched.toAddress && Boolean(formik.errors.toAddress)}
          helperText={formik.touched.toAddress && formik.errors.toAddress}
          sx={{ mb: 1, ...sx }}
        />
        <TextField
          sx={{ mb: 1, ...sx }}
          fullWidth
          id="subject"
          name="subject"
          onChange={formik.handleChange}
          value={formik.values.subject}
          label="Subject"
          placeholder="Subject"
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
        />
        <TextField
          fullWidth
          multiline
          rows={5}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          placeholder="Content"
          sx={{
            borderColor: 'transparent',
            flexGrow: 1
          }}
        />

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* <Box sx={{ display: 'flex' }}>
            <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
              <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
            </IconButton>
          </Box> */}
          <LoadingButton type="submit" variant="contained">
            Send Mail
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
}
