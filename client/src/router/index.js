import authorRoutes from './routes/author';
import bookRoutes from './routes/book';
import homeRoutes from './routes/home';

export default [
  ...authorRoutes,
  ...bookRoutes,
  ...homeRoutes,
];