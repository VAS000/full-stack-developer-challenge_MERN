// import { lazy } from "react"; 
// TODO: lazy load pages/components
import React from 'react';

export const HOME_PATH = '/';

export const HOME = {
  path: HOME_PATH,
  component: () => <div>Home!</div>,
  isExact: true,
};

export default [
  HOME, 
];