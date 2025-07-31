
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { MainDalleFirstImage } from './pages/MainDalleFirstImage';
import EditorWrapper from './components/Editor/EditorWrapper';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dfi" element={<MainDalleFirstImage />} />
          <Route 
            path="/editor" 
            element={<EditorWrapper />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
