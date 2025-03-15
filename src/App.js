import { useDispatch } from 'react-redux';
import { CreateAccount } from './pages/CreateAccount/CreateAccount';
import { MainPage } from './pages/MainPage/MainPage';
import { initializeApp } from 'firebase/app';
import './App.css';
import { useEffect } from 'react';
import firebaseConfig from './firebase.config';
import { getFirestore } from 'firebase/firestore/lite';
import { setFirebaseDB } from './store/actions/firebaseDB';
import { Routes, Route, BrowserRouter } from "react-router";
import { CreateTransaction } from './pages/CreateTransaction/CreateTransaction';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // initiate DB connection
    const app = initializeApp(firebaseConfig);
    const firebaseDB = getFirestore(app);
    dispatch(setFirebaseDB(firebaseDB));
    console.log('DB LOADED')
  }, [])

  return (
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route index element={<CreateAccount />}/>
              <Route path="main" element={<MainPage />}/>
              <Route path="transaction" element={<CreateTransaction />}/>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
