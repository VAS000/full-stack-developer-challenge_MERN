import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../../api/axios/axiosMainInstance';
import Alert from '@material-ui/lab/Alert';
import { Container } from '@material-ui/core';
import Loader from '../../components/Loader/Loader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateBook = () => {

  const classes = useStyles();

  const book_Default  = {
    name: "",
    ISBN: "",
    authorID: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [book, setBook] = useState(book_Default);
  const [message, setMessage] = useState(null);

  const fetchAuthors = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/authors');
      const data = res.data;
      setAuthors(data); 
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAuthors();
  }, [])

  const saveBook = async (e) => {
    e.preventDefault();
    setMessage(null);

    const res = await axios({
      url: "/books",
      method: "post",
      data: book,
    });

    console.log({res});

    setMessage({
      text: res.message,
      status: res.status
    });

    if(res.status === 'success') {
      setBook(book_Default);
    }
  }

  const handleChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="sm">
      {
        isLoading? <Loader />:
        <>
        <Typography variant="h4" style={{display: 'flex', justifyContent: 'center'}}>Create Book</Typography>
          <form style={{
            flexFlow: 'row wrap'
          }}>
            <TextField placeholder="Book Name" fullWidth margin="normal" name="name" value={book.name} onChange={handleChange}/>
            <TextField placeholder="ISBN" fullWidth margin="normal" name="ISBN" value={book.ISBN} onChange={handleChange}/>
            
            <TextField
              fullWidth
              id="Author"
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
              </TextField>

            {/* <TextField placeholder="authorID - Change to SELECT Last name" fullWidth margin="normal" name="authorID" value={book.authorID} onChange={handleChange}/> */}
            
            <Button variant="contained" color="primary" onClick={saveBook} style={{marginTop: '20px'}}>Create</Button>
            
            <div style={{marginTop: '20px'}}>
              {message && <Alert severity={message.status}>{message.text}</Alert>}
            </div>

          </form>
        </>
      }
      
    </Container>
  );
}

export default CreateBook;