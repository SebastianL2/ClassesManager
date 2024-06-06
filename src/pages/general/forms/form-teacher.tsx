import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import { saveOne } from '../../../API/general-http-request';
import { useGlobalState } from '../global/GlobalStateContext';

const FormTeacher: React.FC = () => {



  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const {setUpdate} = useGlobalState();
  const timer = React.useRef<any>();

  const buttonSx: React.CSSProperties = {
    ...(success && {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    }),
  };
  



  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    console.log("esta es tu imagen", selectedFile)
    handleButtonClick();
    if (selectedFile) {

      const url = `https://api.cloudinary.com/v1_1/ddsuzqzgh/image/upload`;
      
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append('upload_preset', 'v8xxvhbs');
        
        const response = await fetch(url, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Datos de la imagen: ', data);
          formik.setFieldValue('url', data.secure_url);
          setSuccess(true);
          setLoading(false);
        } else {
          console.error('Error al subir la imagen a Cloudinary.');
        }
      } catch (error) {
        console.error('Error en la solicitud a Cloudinary:', error);
      }
      
      
    }
  };
 
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    
    }
  };
 

  const formik = useFormik({
    initialValues: {
      name: '',
      last_name: '',
      email: '',
      url:'',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      last_name: Yup
        .string()
        .max(255)
        .required('Last Name is required'),

    }),
    onSubmit: async (values, helpers) => {
      console.log("data",values)
      const save = async () => {
        const res =await saveOne(values,'teachers');
        setUpdate(values.email);
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
               Enter Teacher information
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
              <Box
                    component="form"
                    sx={{
                    '& > :not(style)': { width: '50ch' },
                    }}
                
                    autoComplete="off"
                >
                <div style={{ display: 'flex' }}>
                    <TextField style={{ marginRight: '20px' }}
                    error={!!(formik.touched.last_name && formik.errors.last_name)}
                    fullWidth
                    helperText={formik.touched.last_name && formik.errors.last_name}
                    label="Last Name"
                    name="last_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="name"
                    value={formik.values.last_name}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{  position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        component="label"  
                    >
                        <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                        {success ? <CheckIcon /> : <AccountBoxIcon/>}
                    </Fab>
                        {loading && (
                        <CircularProgress
                            size={68}
                            sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -5,
                            zIndex: 1,
                            }}
                        />
                        )}
                    </Box>
                    
                    </Box>
                
                </div>
                </Box>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
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
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};



export default FormTeacher;
