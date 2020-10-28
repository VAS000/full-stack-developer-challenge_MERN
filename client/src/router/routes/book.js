import { lazy } from "react"; 

export const BOOKS_PATH = '/books';
export const BOOKS_CREATE_PATH = `${BOOKS_PATH}/create`;
export const BOOKS_EDIT_PATH = `${BOOKS_PATH}/edit/:bookId`;
export const BOOKS_DETAILS_PATH = `${BOOKS_PATH}/:bookId`;

export const BOOKS = {
  path: BOOKS_PATH,
  component: lazy(() => import('../../pages/BooksPage/BooksPage')),
  isExact: true,
};

export const BOOKS_CREATE = {
  path: BOOKS_CREATE_PATH,
  component: lazy(() => import('../../pages/BooksPage/CreateBook')),
  isExact: true,
};

export const BOOKS_EDIT =  {
  path: BOOKS_EDIT_PATH,
  component: lazy(() => import('../../pages/BooksPage/EditBook')),
  isExact: true,
};

export const BOOKS_DETAILS =  {
  path: BOOKS_DETAILS_PATH,
  component: lazy(() => import('../../pages/BooksPage/BookDetails')),
  isExact: true,
};

export default [
  BOOKS_CREATE,
  BOOKS_EDIT,
  BOOKS_DETAILS,
  BOOKS, 
];