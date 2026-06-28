import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Monitors from "./pages/Monitors";
import Incidents from "./pages/Incidents";
import Settings from "./pages/Settings";
import ProjectForm from "./components/ProjectForm";
import ProjectDetails from "./components/ProjectDetails";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects"
                element={
                    <ProtectedRoute>
                        <Projects />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/monitors"
                element={
                    <ProtectedRoute>
                        <Monitors />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/incidents"
                element={
                    <ProtectedRoute>
                        <Incidents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            <Route path="/projects" element={<Projects />} />
      <Route path="/projects/create" element={<ProjectForm />} />
      {/* :id is a dynamic parameter we can read in the component */}
      <Route path="/projects/edit/:id" element={<ProjectForm />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />

        </Routes>

    );

}

export default App;