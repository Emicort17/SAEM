import { NavigationContainer } from '@react-navigation/native'; 7
import { AuthProvider, useAuth } from './config/context/AuthContext';
import Mainroutes from './routes/mainroutes';
import OtherRoutes from './routes/otherRoutes';

const MainApp = () => {
  const { userData } = useAuth();

  if (userData === null) {
    return (
      <OtherRoutes/>
    )
  } else {
    return  (  <Mainroutes />)
  }
};

App = () => {
  return (
    <AuthProvider>
          <NavigationContainer>

        <MainApp />
        </NavigationContainer>

    </AuthProvider>



  )
}
export default App;