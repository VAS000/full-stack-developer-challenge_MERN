import React from 'react';
import { useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({
  table: {
    //maxWidth: 960,
    //margin: 'auto',
  },
});

const ListBooks = ({ data, deleteBook }) => {
  
  const classes = useStyles();
  const history = useHistory();

  const editBook = id => {
    console.log({id})
    history.push(`/books/edit/${id}`);
  }

  const goToDetails = id => {
    console.log({id})
    history.push(`/books/${id}`);
  }

  return (
    <Table className={classes.table} aria-label="Books List">
      <TableHead>
          <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">ISBN</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell colSpan={3} align='center'>[Actions]</TableCell>
          </TableRow>
      </TableHead>
      <TableBody>
          {data.map(row => (
              <TableRow key={row._id}>
                  <TableCell component="th" scope="row">{row._id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.ISBN}</TableCell>
                  <TableCell align="right">
                    {row.author ? `${row.author.firstName} ${row.author.lastName}`: '-' }
                  </TableCell>
                  <TableCell align="right" onClick={() => editBook(row._id)}><EditIcon /></TableCell>
                  <TableCell align="right" onClick={() => deleteBook(row._id)}><DeleteIcon /></TableCell>
                  <TableCell align="right" onClick={() => goToDetails(row._id)}><VisibilityIcon /></TableCell>
                  
              </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default ListBooks;