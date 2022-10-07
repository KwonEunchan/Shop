import logo from './logo.svg';
import './App.css';
import './styles/style.scss'
import Header from './components/Header'
import Intro from "./components/Intro";

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Intro></Intro>
    </div>
  );
}

export default App;
