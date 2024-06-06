import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import { saveOne } from '../../../API/general-http-request';
import { useGlobalState } from '../global/GlobalStateContext';
import { Class } from '@mui/icons-material';

const FormClasses: React.FC = () => {


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
      description: '',
      url:'',
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
      
      const save = async () => {
        const res =await saveOne(values,'classes');
        setUpdate(values.name);
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
                      
                    '& > :not(style)': { width: '50ch' },
                    }}
                
                    autoComplete="off"
                >
                <div style={{ display: 'flex' }}>
                  
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{  position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        component="label"  
                    >
                        <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                        {success ? <CheckIcon /> : <Class/>}
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
