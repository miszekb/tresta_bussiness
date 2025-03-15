import { useDispatch } from 'react-redux';
import { CreateAccount } from './pages/CreateAccount/CreateAccount';
import { MainPage } from './pages/MainPage/MainPage';
import { initializeApp } from 'firebase/app';
import './App.css';
import { useEffect } from 'react';
import firebaseConfig from './firebase.config';
import { getFirestore } from 'firebase/firestore/lite';
import { setFirebaseDB } from './store/actions/firebaseDB';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // initiate DB connection
    const app = initializeApp(firebaseConfig);
    const firebaseDB = getFirestore(app);
    dispatch(setFirebaseDB(firebaseDB));
  }, [])

  return (
      <div className="App">
        <CreateAccount/>
        {/* <MainPage/> */}
      </div>
  );
}

export default App;
