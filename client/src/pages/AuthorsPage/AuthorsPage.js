import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios/axiosMainInstance';
import ListAuthors from './ListAuthors';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AUTHORS_CREATE_PATH } from '../../router/routes/author';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../components/Loader/Loader';

const AuthorsPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const history = useHistory();

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await axios('/authors');
      const data = res.data;
      setAuthors(data); 
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
    
  }

  const createAuthor = () => {
    history.push(AUTHORS_CREATE_PATH);
  };

  const deleteAuthor = async id => {
    setMessage(null);
    const res = await axios.delete(`/authors/${id}`);
    setMessage({
      text: res.message,
      status: res.status,
    });
    if(res.status === 'success') {
      fetchData();
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Container maxWidth="md" justify="center">
      {
        isLoading ? <Loader /> :
        <>
          <Typography variant="h4" style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>Authors Details</Typography>
          <Button variant="contained" color="primary" onClick={() => createAuthor()}>
              Create Author
          </Button>

          {!authors.length ? <h1>No Author found</h1>: <ListAuthors data={authors} fetchData={fetchData} deleteAuthor={deleteAuthor} />}

          <div>
            {message && <Alert severity={message.status}>{message.text}</Alert>}
          </div>
        </>
      }
    </Container>
  )
}

export default AuthorsPage;