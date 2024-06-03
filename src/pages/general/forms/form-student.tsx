import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';

const FormStudent: React.FC = () => {

  const [estado, setEstado] = React.useState<string>('');
  const [estado2, setEstado2] = React.useState<string>('');


  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const timer = React.useRef<any>();

  const buttonSx: React.CSSProperties = {
    ...(success && {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    }),
  };
  

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
 
    setEstado(event.target.value as string);
    formik.setFieldValue('role', event.target.value as string);
    console.log("hola . " + event.target.value)
  };

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
 
  
    formik.setFieldValue('city', event.target.value as string);
    setEstado2(event.target.value as string)
    console.log("hola . " + event.target.value)

  };
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
          formik.setFieldValue('secure_url', data.secure_url);
          formik.setFieldValue('public_id', data.public_id);
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
      lastname: '',
      email: '',
      password: '',
      phone: '',
      secure_url: '',
      public_id: '',
      city: '',
      role:'',
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
        lastname: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      phone: Yup
      .string()
      .max(255)
      .required('Phone is required'),
      role: Yup
      .string()
      .max(255)
      .required('Role is required'),
    }),
    onSubmit: async (values, helpers) => {
     
      try {
        const jsonData = JSON.stringify(values);
        
        const response = await fetch(`/users`, {
          method: 'POST',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          console.log('Solicitud POST exitosa');
          helpers.setStatus({ success: true });
          helpers.setErrors({ submit: "Usuario agregado" });
          helpers.setSubmitting(true);
        } else {
          // Manejar errores en caso de una respuesta no exitosa
          const errorData = await response.json();
          console.error('Error en la solicitud POST:', errorData);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: errorData.message });
          helpers.setSubmitting(false);
        }
      } catch (error) {
 
      }
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
                Ingresa los datos del estudiante aqui
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
                    error={!!(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Last Name"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="name"
                    value={formik.values.lastname}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{  position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        component="label"  // Indica que el componente es un label para el input de tipo archivo
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



export default FormStudent;
