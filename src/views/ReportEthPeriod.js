// import { useEffect, useState } from 'react';
// import { TextField, Box, Typography } from '@material-ui/core';
// import { format } from 'date-fns';
// import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';

// import { DatePicker, LoadingButton } from '@material-ui/lab';

// import { exportExcelEthByPeriod } from '../redux/slices/transaction';
// import useIsMountedRef from '../hooks/useIsMountedRef';

// export default function ReportEthPeriod() {
//   const dispatch = useDispatch();

//   const isMountedRef = useIsMountedRef();
//   const [value, setValue] = useState(new Date());

//   const formik = useFormik({
//     initialValues: {
//       datetime: value
//     },
//     validationSchema: null,
//     onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
//       try {
//         const period = format(new Date(value), 'yyyyMMdd');
//         dispatch(exportExcelEthByPeriod(period));
//         if (isMountedRef.current) {
//           setSubmitting(false);
//         }
//       } catch (error) {
//         console.error(error);
//         resetForm();
//         if (isMountedRef.current) {
//           setSubmitting(false);
//           setErrors({ afterSubmit: error.code || error.message });
//         }
//       }
//     }
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Typography variant="h6" marginBottom="15px">
//         Export Excel Transaction
//       </Typography>
//       <DatePicker
//         views={['date']}
//         label="Just date"
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(params) => (
//           <TextField fullwidth {...params} margin="normal" helperText={null} />
//         )}
//       />
//       <Box
//         sx={{
//           mt: 4,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}
//       >
//         <LoadingButton type="submit" variant="contained">
//           Export
//         </LoadingButton>
//       </Box>
//     </form>
//   );
// }
