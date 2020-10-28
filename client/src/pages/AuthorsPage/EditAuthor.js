import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AUTHORS_PATH } from '../../router/routes/author';
import axios from '../../api/axios/axiosMainInstance';
import Alert from '@material-ui/lab/Alert';
import { Container } from '@material-ui/core';
import Loader from '../../components/Loader/Loader';

const EditAuthor = () => {

  const { authorId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState({});
  const [message, setMessage] = useState(null);

  const fetchAuthor = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/authors/${authorId}`);
      console.log({res});
      setAuthor(res.data);
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthor();
  }, [])

  const saveAuthor = async (e) => {
    e.preventDefault();
    setMessage(null);

    console.log(JSON.stringify({ 
      firstName: author.firstName, 
      lastName: author.lastName,
    }));

    // const res = await axios.put(`/authors/${author._id}`, JSON.stringify({ 
    //   firstName: author.firstName, 
    //   lastName: author.lastName,
    // }));

    const res = await axios({
      url: `/authors/${authorId}`,
      method: 'PUT',
      data: {
        firstName: author.firstName, 
        lastName: author.lastName,
      },
    });

    console.log({res});

    setMessage({
      text: res.message,
      status: res.status
    });
  }

  const handleChange = e => setAuthor({ ...author, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="sm">
      {
        isLoading? <Loader />:
        <>
        <Typography variant="h4" style={{display: 'flex', justifyContent: 'center'}}>Update Author</Typography>
          <form style={{
            flexFlow: 'row wrap',
          }}>
            <TextField placeholder="First Name" fullWidth margin="normal" name="firstName" defaultValue={author.firstName} onChange={handleChange}/>
            <TextField placeholder="Last name" fullWidth margin="normal" name="lastName" defaultValue={author.lastName} onChange={handleChange}/>
            <Button variant="contained" color="primary" onClick={saveAuthor} style={{marginTop: '20px'}}>Update</Button>
            
            <div style={{marginTop: '20px'}}>
              {message && <Alert severity={message.status}>{message.text}</Alert>}
            </div>

          </form>
        </>
      }
    </Container>
  );
}

export default EditAuthor;