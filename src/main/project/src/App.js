import logo from './logo.svg';
import './App.css';
import './styles/style.scss'
import Header from './components/Header'
import Intro from "./components/Intro";
import Shopping from "./components/Shopping";

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Intro></Intro>
        <Shopping></Shopping>
    </div>
  );
}

export default App;
