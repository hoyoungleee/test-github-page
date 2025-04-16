import AuthContext from './Location.js';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialLocation = searchParams.get('location') || '서초동';
  const [myLocation, setMyLocation] = useState(initialLocation);

  const pick = (choose) => {
    setMyLocation(choose);
    navigate(`?location=${choose}`);
  };
  return (
    <AuthContext.Provider value={{ myLocation, pick }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
