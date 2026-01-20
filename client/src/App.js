import "./App.css";
import Appointments from "./Appointments";
import { AdminCalendar } from "./Components/AdminCalendar";
import AdminPage from "./Components/AdminPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Appointments />} />
                    <Route path="/admin" element={<AdminPage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
