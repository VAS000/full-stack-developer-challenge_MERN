import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AUTHORS_PATH } from '../../router/routes/author';
import axios from '../../api/axios/axiosMainInstance';
import Alert from '@material-ui/lab/Alert';
import { Container } from '@material-ui/core';

const CreateAuthor = () => {

  const [author, setAuthor] = useState({});
  const [message, setMessage] = useState(null);


  const saveAuthor = async (e) => {
    e.preventDefault();
    setMessage(null);

    console.log(JSON.stringify({ 
      firstName: author.firstName, 
      lastName: author.lastName,
    }));

    const res = await axios({
      url: "/authors",
      method: "post",
      data: JSON.stringify(author),
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
      <Typography variant="h4" style={{display: 'flex', justifyContent: 'center'}}>Add Author</Typography>
      <form style={{
        display: 'flex',
        flexFlow: 'row wrap'
      }}>
        <TextField placeholder="First Name" fullWidth margin="normal" name="firstName" defaultValue={author.firstName} onChange={handleChange}/>
        <TextField placeholder="Last name" fullWidth margin="normal" name="lastName" defaultValue={author.lastName} onChange={handleChange}/>
        <Button variant="contained" color="primary" onClick={saveAuthor}>Create</Button>
        
        <div>
          {message && <Alert severity={message.status}>{message.text}</Alert>}
        </div>

      </form>
    </Container>
  );
}

export default CreateAuthor;