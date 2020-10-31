import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../../api/axios/axiosMainInstance';
import Alert from '@material-ui/lab/Alert';
import { Container } from '@material-ui/core';
import Loader from '../../components/Loader/Loader';
import MenuItem from '@material-ui/core/MenuItem';

const EditBook = () => {

  const { bookId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [book, setBook] = useState({
    name: "",
    ISBN: "",
    authorID: "",
  });
  const [message, setMessage] = useState(null);
  
  const fetchBook = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/authors');
      setAuthors(res.data); 

      const res2 = await axios.get(`/books/${bookId}`);
      const data = res2.data;

      console.log({data});
      
      setBook({
        name: data.name,
        ISBN: data.ISBN,
        authorID: data.author._id,
      });
      
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }, [bookId]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook])

  const saveBook = async (e) => {
    e.preventDefault();
    setMessage(null);

    console.log({book});

    const res = await axios({
      url: `/books/${bookId}`,
      method: 'PUT',
      data: {
        name: book.name, 
        ISBN: book.ISBN,
        authorID: book.authorID,
      },
    });

    console.log({res});

    setMessage({
      text: res.message,
      status: res.status
    });
  }

  const handleChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="sm">
      {
        isLoading? <Loader />:
        <>
          <Typography variant="h4" style={{display: 'flex', justifyContent: 'center'}}>Update Book</Typography>
          <form style={{
            flexFlow: 'row wrap',
          }}>
            <TextField placeholder="Book Name" fullWidth margin="normal" name="name" value={book.name} onChange={handleChange}/>
            <TextField placeholder="ISBN" fullWidth margin="normal" name="ISBN" value={book.ISBN} onChange={handleChange}/>
            
            {authors.length && <TextField
              fullWidth
              id="authorID"
              select
              label="Author"
              name="authorID"
              value={book.authorID}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
             >
              {authors.length && authors.map(author => (
                <MenuItem key={author._id} value={author._id}>{`${author.firstName} ${author.lastName}`}</MenuItem>
              ))}
            </TextField>}

            <Button variant="contained" color="primary" onClick={saveBook} style={{marginTop: '20px'}}>Update</Button>
            
            <div style={{marginTop: '20px'}}>
              {message && <Alert severity={message.status}>{message.text}</Alert>}
            </div>

          </form>
        </>
      }
    </Container>
  );
}

export default EditBook;