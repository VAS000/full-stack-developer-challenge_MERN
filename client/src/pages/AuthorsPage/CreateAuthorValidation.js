import React, { useState, useCallback } from 'react'
import styled from 'styled-components';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../../api/axios/axiosMainInstance';
import Alert from '@material-ui/lab/Alert';
import { Container, makeStyles } from '@material-ui/core';
import Loader from '../../components/Loader/Loader';
import { DevTool } from "@hookform/devtools";


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const wait = async (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


const TextFieldStyled = styled(TextField)`
  .MuiFormHelperText-root {
    margin-left: 4px;
  }
`;

const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {

      console.log({
        data
      })
      try {

        const values = await validationSchema.validate(data, {
          abortEarly: false,
          strict: true,
        });

        console.log("values: ", values);

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        console.log({useCallbackErrors: errors});
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            // (allErrors, currentError) => {
            //   console.log({
            //     allErrors,
            //     currentError
            //   })
            //   return {
            //     ...allErrors,
            //     [currentError.path]: {
            //       type: currentError.type ?? "validation",
            //       message: currentError.message
            //     }
            //   }
            // },
            {}
          )
        };
      }
    },
    [validationSchema]
  );

const yupSchema = yup.object({
  firstName:
  
  yup.string("First name should be a string") // Since input element value is always a string, this is just an additional check
  .required("First Name Name should not be empty")
  .min(3, "Please enter at least 3 characters!!!!!!!!!")
  .max(10, "Please enter at most 10 characters!!!!!!!!!")
  .matches(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/, 'Invalid First name!')
  // .test('is-unique',
  // 'Email should be unique!!!',
  // async (value, context) => {
  //   console.log("Validating Async");
  //   await new Promise(resolve => {
  //     setTimeout(() => resolve(value.length > 10), 3000);
  //   });
  //   console.log("Resolved!!");
  // })
  ,
  lastName: yup.string("Last name should be a string")
  .required("Last Name Name should not be empty")
  // .string("First Name is not valid!")
  .min(3, "Please enter at least 3 characters!!!!!!!!!")
  .max(10, "Please enter at most 10 characters!!!!!!!!!")
  .matches(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/, 'Invalid First name!'),
});


yupSchema.validate({  firstName: 1232132131313131, lastName: "313213" }, {
  abortEarly: false
}).catch(function (err) {
  console.log({err});
});

const CreateAuthorValidation = () => {

  const { 
    register, 
    handleSubmit, 
    watch, 
    errors, 
    reset, 
    control,
    formState,
    setError
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(yupSchema),

    // resolver: useYupValidationResolver(yupSchema)
    // resolver: joiResolver(schema)
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
  const checkIfUnique = async (value) => {
    console.log("Validating onChange ")
    console.log(value);
    await wait(1000);
    if(value.length > 5) {
      setError('firstName', {
        type: 'unique',
        message: "This should be unique!!!"
      });
      await wait(500);
      console.log({updatedErrors: errors});
    }
    console.log("Validation Completed onChange");
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
            // validate: async value => new Promise(resolve => {
            //   setTimeout(resolve, 2000);
            // }) || 'error message!!!!!'
          })} 
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message: null}
          placeholder="First Name" 
          // defaultValue="First name"
          fullWidth 
          margin="normal" 
          name="firstName" 
          variant="outlined"
          // value={author.firstName} 
          // onBlur={ev => {
          //   // dont fire API if the user delete or not entered anything
          //   if (ev.target.value !== "" || ev.target.value !== null) {
          //     checkIfUnique(ev.target.value);
          //   }
          // }}
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
          as={<TextFieldStyled
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
      <DevTool control={control} />
    </Container>
    
  );
}

export default CreateAuthorValidation;