import React, { useState } from 'react'
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../../api/axios/axiosMainInstance';
import Alert from '@material-ui/lab/Alert';
import { Container, makeStyles } from '@material-ui/core';
import Loader from '../../components/Loader/Loader';

const TextFieldStyled = styled(TextField)`
  .MuiFormHelperText-root {
    margin-left: 0;
  }
`;

const useStyle = makeStyles({
  root: {

    '.MuiFormHelperText-root': {
      marginLeft: 0,
    }
  }
})

const CreateAuthor = () => {

  const { 
    register, 
    handleSubmit, 
    watch, 
    errors, 
    reset, 
    control,
    formState
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      firstName: "",
      lastName: "",
    }
  });
  // const onSubmit = data => console.log(data);

  console.log({
    formState
  });

  const { isDirty, isSubmitting, isSubmitted, dirtyFields } = formState;

  console.log({
    watch,
    errors,
  })

  // const author_Default = {
  //   firstName: "",
  //   lastName: "",
  // };

  // const [author, setAuthor] = useState(author_Default);
  const [message, setMessage] = useState(null);

  const classes = useStyle();

  const saveAuthor = async (data) => {

    console.log({
      data
    });

    const author = {
      firstName: data.firstName,
      lastName: data.lastName,
    }

    // e.preventDefault();
    setMessage(null);

    const res = await axios({
      url: "/authors",
      method: "post",
      data: author,
    });

    console.log({res});

    setMessage({
      text: res.message,
      status: res.status
    });

    if(res.status === 'success') {
      // setAuthor(author_Default);
      reset();
    }
  }

  // const handleChange = e => setAuthor({ ...author, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{display: 'flex', justifyContent: 'center'}}>Create Author</Typography>
      <form 
        style={{
          flexFlow: 'row wrap'
        }}
        onSubmit={handleSubmit(saveAuthor)}
      >
        <TextFieldStyled 
          inputRef={register({
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Please enter at least 3 characters",
            },
            maxLength: {
              value: 10,
              message: "Please enter at most 10 characters",
            }
          })} 
          error={true || !!errors.firstName}
          helperText={true ? "tatatatatatt ": errors.firstName ? errors.firstName.message: null}
          placeholder="First Name" 
          // defaultValue="First name"
          fullWidth 
          margin="normal" 
          name="firstName" 
          variant="outlined"
          // value={author.firstName} 
          // onChange={handleChange}
        />
        {/* <TextField 
          inputRef={register({
            required: true,
            min: {
              value: 3,
              message: "TESTESTSETSETSTESS",
            },
            max: 10
          })} 
          placeholder="Last name" 
          // defaultValue="Last name"
          fullWidth 
          margin="normal" 
          name="lastName" 
          variant="outlined"
          // value={author.lastName} 
          // onChange={handleChange}
        /> */}
        <Controller
          name="lastName"
          as={<TextField
            className={classes.root}
            fullWidth 
            placeholder="Last name" 
            margin="normal"
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message: null}
          />}
          control={control}
          rules={{
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Please enter at least 3 characters",
            },
            maxLength: {
              value: 10,
              message: "Please enter at most 10 characters",
            }
           }}
        />
        <Button type="submit" variant="contained" color="primary" style={{marginTop: '20px'}}>Create</Button>
           
        {isSubmitting && <Loader />}


        <div style={{marginTop: '20px'}}>
          {message && <Alert severity={message.status}>{message.text}</Alert>}
        </div>
      </form>
    </Container>
  );
}

export default CreateAuthor;