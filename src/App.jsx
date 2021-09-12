import Home from './pages/home/Home'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './components/darkMode/globalStyles';
import { lightTheme, darkTheme } from './components/darkMode/Theme';
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import "./app.css";
import Login from './components/Login/Login';
import useToken from './components/App/useToken';

const App = () => {
    const keyArr = [];
    const [nightModeOn, setNightModeOn] = useState(true);

    window.addEventListener("keydown", (event) => {
      const keyWord = "nightmode";
      keyArr.push(event.key);
  
      if (keyArr.length > keyWord.length) {
        keyArr.shift();
      }
  
      if (keyWord === keyArr.join("")) {
        setNightModeOn(!nightModeOn);
      }
    });

    // Get token from the custom hook
    const { token, setToken } = useToken();
    // Pass the setToken function to the Login component if the token is falsy
    if(!token){
      return <Login setToken={setToken} />
    }

    return (
        <ThemeProvider theme={nightModeOn? lightTheme : darkTheme}>
            <>
            <GlobalStyles />
            <div className="wrapper">
              <Router>
                <Switch>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/home">
                    <Home theme={nightModeOn}/>
                  </Route>
                </Switch>
              </Router>
            </div>
            </>
        </ThemeProvider>
    )
    
}

export default App
