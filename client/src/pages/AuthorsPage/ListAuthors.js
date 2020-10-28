import React from 'react';
import { useHistory} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const ListAuthors = ({ data, deleteAuthor }) => {
  
  const history = useHistory();

  const editAuthor = id => {
    // window.localStorage.setItem("authorId", id);
    history.push(`/authors/edit/${id}`);
  }

  return (
    <Table aria-label="Authors List">
      <TableHead>
          <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">FirstName</TableCell>
              <TableCell align="right">LastName</TableCell>
              <TableCell colSpan={2} align='center'>[Actions]</TableCell>
          </TableRow>
      </TableHead>
      <TableBody>
          {data.map(row => (
              <TableRow key={row._id}>
                  <TableCell component="th" scope="row">{row._id}</TableCell>
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right" onClick={() => editAuthor(row._id)}><EditIcon /></TableCell>
                  <TableCell align="right" onClick={() => deleteAuthor(row._id)}><DeleteIcon /></TableCell>
              </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default ListAuthors;