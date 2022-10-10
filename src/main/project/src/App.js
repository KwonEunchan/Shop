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
import Cart from "./components/Cart";
import axios from "axios";

function App() {
    const [loginView, setLoginView] = useState(false)
    const [joinView, setJoinView] = useState(false)
    const [cookies] = useCookies()

    return (<div className="App">
        <Header setLoginView={setLoginView}></Header>
        <Routes>
            <Route path="/" element={
                <>
                    <Intro></Intro>
                    <Shopping></Shopping>
                </>
            }/>
            <Route path="/join" element={
                <Join></Join>
            }/>
        </Routes>
        {loginView && <Login setLoginView={setLoginView}></Login>}
        {cookies.id && <Cart></Cart>}
    </div>);
}

export default App;
