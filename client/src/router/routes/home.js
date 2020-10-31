import { lazy } from "react";

export const HOME_PATH = '/';

export const HOME = {
  path: HOME_PATH,
  component: lazy(() => import('../../pages/HomePage/HomePage')),
  isExact: true,
};

export default [
  HOME,
];