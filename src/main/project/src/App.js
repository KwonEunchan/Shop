import logo from './logo.svg';
import './App.css';
import './styles/style.scss'
import Header from './components/Header'
import Intro from "./components/Intro";
import Shopping from "./components/Shopping";
import Login from "./components/Login";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Join from "./components/Join";

function App() {
    const [loginView, setLoginView] = useState(false)
    const [joinView, setJoinView] = useState(false)

    return (<div className="App">
        <Header setLoginView={setLoginView}></Header>
        <Routes>
            <Route path="/" element={
                <>
                    <Intro></Intro>
                    <Shopping></Shopping>
                    }
                </>
            }/>
            <Route path="/join" element={
                <Join></Join>
            }/>
        </Routes>
        {loginView && <Login setLoginView={setLoginView}></Login>}
    </div>);
}

export default App;
