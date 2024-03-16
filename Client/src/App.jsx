import { useEffect, useReducer } from 'react';
import AuthContext from './config/context/auth-context';
import { authManager } from './config/context/auth-manager';
import AppRouter from './router/AppRouter';
import './output.css';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { signed: false };
};

function App() {
  const [user, dispatch] = useReducer(authManager, {}, init);
  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  /*useEffect -> (callback, dependencies)
    dependencies -> [user]
    Si hay un cambio en user -> callback Se ejecuta nuevamente
    
  */

  //React.Fragment
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}
export default App;
