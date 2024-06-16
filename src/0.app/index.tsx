
import { FC } from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './app-router';
import { store } from '../4.entities/game';

const App: FC = () => {
  return (   
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  )
}

export default App;