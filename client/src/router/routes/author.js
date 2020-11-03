import { lazy } from "react";

export const AUTHORS_PATH = '/authors';
export const AUTHORS_CREATE_PATH = `${AUTHORS_PATH}/create`;
export const AUTHORS_EDIT_PATH = `${AUTHORS_PATH}/edit/:authorId`;

export const AUTHORS = {
  path: AUTHORS_PATH,
  component: lazy(() => import('../../pages/AuthorsPage/AuthorsPage')),
  isExact: true,
};

export const AUTHORS_CREATE = {
  path: AUTHORS_CREATE_PATH,
  // component: lazy(() => import('../../pages/AuthorsPage/CreateAuthor')),
  component: lazy(() => import('../../pages/AuthorsPage/CreateAuthorValidation')),
  isExact: true,
};

export const AUTHORS_EDIT =  {
  path: AUTHORS_EDIT_PATH,
  component: lazy(() => import('../../pages/AuthorsPage/EditAuthor')),
  isExact: true,
};


export default [
  AUTHORS_CREATE,
  AUTHORS_EDIT,
  AUTHORS, 
];