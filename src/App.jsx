import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router-config';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
