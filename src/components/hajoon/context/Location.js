import { createContext } from 'react';

const AuthContext = createContext({
  myLocation: '',
  pick: () => {}, // 각 하위 컴포넌트에서 전역으로 데이터를 끌어올려야함 ㅠㅠㅠ
});

export default AuthContext;
