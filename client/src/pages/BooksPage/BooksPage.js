import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios/axiosMainInstance';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../components/Loader/Loader';
import ListBooks from './ListBooks';
import { BOOKS_CREATE_PATH } from '../../router/routes/book';

const BooksPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [books, setBooks] = useState([]);
  const history = useHistory();

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await axios('/books');
      const data = res.data;
      setBooks(data); 
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
    
  }

  const createBook = () => {
    history.push(BOOKS_CREATE_PATH);
  };

  const deleteBook = async id => {
    setMessage(null);
    const res = await axios.delete(`/books/${id}`);
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
          }}>Books Details</Typography>
          <Button variant="contained" color="primary" onClick={() => createBook()}>
              Create Book
          </Button>

          {!books.length ? <h1>No Book found</h1>: <ListBooks data={books} fetchData={fetchData} deleteBook={deleteBook} />}

          <div>
            {message && <Alert severity={message.status}>{message.text}</Alert>}
          </div>
        </>
      }
    </Container>
  )
}

export default BooksPage;