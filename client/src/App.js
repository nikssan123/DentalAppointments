import "./App.css";
import Appointments from "./Appointments";
import AdminPage from "./Components/AdminPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Appointments />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
