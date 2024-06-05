import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { saveOne } from '../../../API/general-http-request';

const FormClasses: React.FC = () => {


  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      description: Yup
        .string()
        .max(255)
        .required('Last Name is required'),

    }),
    onSubmit: async (values, helpers) => {
      console.log("data",values)
      const save = async () => {
        const res =await saveOne(values,'classes');
     
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: res.message });
        helpers.setSubmitting(false);
      }
      save();
     

    }
    
  });
  
  return (
    <>

      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: 2,
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Typography variant="h4">
               Enter Classes information
              </Typography>
         
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="Description"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.description}
                />

                
  

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': {  width: '50ch' },
                  }}
                  autoComplete="off"
                >

         
                </Box>
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};



export default FormClasses;
