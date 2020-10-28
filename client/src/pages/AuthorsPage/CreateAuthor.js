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

  const author_Default = {
    firstName: "",
    lastName: "",
  };

  const [author, setAuthor] = useState(author_Default);
  const [message, setMessage] = useState(null);

  const saveAuthor = async (e) => {
    e.preventDefault();
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
      setAuthor(author_Default);
    }
  }

  const handleChange = e => setAuthor({ ...author, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{display: 'flex', justifyContent: 'center'}}>Create Author</Typography>
      <form style={{
        flexFlow: 'row wrap'
      }}>
        <TextField placeholder="First Name" fullWidth margin="normal" name="firstName" value={author.firstName} onChange={handleChange}/>
        <TextField placeholder="Last name" fullWidth margin="normal" name="lastName" value={author.lastName} onChange={handleChange}/>
        <Button variant="contained" color="primary" onClick={saveAuthor}>Create</Button>
        
        <div style={{marginTop: '20px'}}>
          {message && <Alert severity={message.status}>{message.text}</Alert>}
        </div>

      </form>
    </Container>
  );
}

export default CreateAuthor;