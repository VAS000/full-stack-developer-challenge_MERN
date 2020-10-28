import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../../api/axios/axiosMainInstance';
import Alert from '@material-ui/lab/Alert';
import { Container } from '@material-ui/core';
import Loader from '../../components/Loader/Loader';
import { BOOKS_PATH } from '../../router/routes/book';

const BookDetails = () => {

  const history = useHistory();
  const { bookId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchBook = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/books/${bookId}`);
      console.log({res});
      if(!res.data) {
        history.push(BOOKS_PATH);
      }else {
        setBook(res.data);
        setIsLoading(false)
      }
    } catch(e){
      setIsLoading(false);
      setMessage({
        status: 'error',
        message: e.message,
      });
    }
  }

  useEffect(() => {
    fetchBook();
  }, [])

  return (
    <Container maxWidth="sm">
      {
        isLoading? <Loader />:
        <>
        <Typography variant="h2" style={{display: 'flex', justifyContent: 'center'}}>Book Details</Typography>
          
          {!!book ? <div>
            <p>Book Name: {book.name}</p>
            <p>ISBN: {book.ISBN}</p>
            <p>Author Name: {book.author ? `${book.author.firstName} ${book.author.lastName}` : '-'} </p>

            <p>TODO:// Beautify this page (ex: add images and some extra text/details)</p>
          </div>: 
          <div style={{marginTop: '20px'}}>
            {message && <Alert severity={message.status}>{message.text}</Alert>}
          </div>
          }
        </>
    }
    </Container>
  );
}

export default BookDetails;