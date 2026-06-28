import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import * as api from "../api/project.api";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // State for the new monitor form
  const [showMonitorForm, setShowMonitorForm] = useState(false);
  const [monitorForm, setMonitorForm] = useState({
    name: "",
    url: "",
    method: "GET",
    intervalSeconds: 60, 
    expectedStatus: 200  // Added because your schema requires it
  });

  const loadDetails = async () => {
    try {
      const res = await api.getProjectById(id);
      setProjectData(res.data?.data || res.data);
    } catch (error) {
      console.error("Error fetching details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  const handleMonitorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      await api.createMonitor(id, monitorForm);
      // Reset form and hide it
      setMonitorForm({ name: "", url: "", method: "GET", intervalSeconds: 60, expectedStatus: 200    });
      setShowMonitorForm(false);
      // Reload project details to show the newly added monitor!
      loadDetails(); 
    } catch (error) {
      console.error("Failed to create monitor", error);
    }
  };

  if (loading) return <MainLayout><div className="p-6">Loading details...</div></MainLayout>;
  if (!projectData) return <MainLayout><div className="p-6">Project not found.</div></MainLayout>;

  return (
    <MainLayout>
      <div className="p-6">
        <button onClick={() => navigate("/projects")} style={{ marginBottom: "20px" }}>
          ← Back to Projects
        </button>
        
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>{projectData.name}</h1>
            <p>{projectData.description}</p>
          </div>
          <button className="btn-primary" onClick={() => setShowMonitorForm(!showMonitorForm)}>
            <Plus size={18} /> Add Monitor
          </button>
        </header>

        {/* --- ADD MONITOR FORM --- */}
        {showMonitorForm && (
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", marginTop: "20px" }}>
            <h3>Create New Monitor</h3>
                <form 
                    onSubmit={handleMonitorSubmit} 
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px", alignItems: "flex-end" }}
                >
                    <label style={{ flex: "1 1 200px" }}>Name
                    <input type="text" required style={{ width: "100%", padding: "8px" }}
                        value={monitorForm.name} 
                        onChange={(e) => setMonitorForm({...monitorForm, name: e.target.value})} />
                    </label>

                    <label style={{ flex: "2 1 300px" }}>URL to Check
                    <input type="url" required style={{ width: "100%", padding: "8px" }}
                        value={monitorForm.url} 
                        onChange={(e) => setMonitorForm({...monitorForm, url: e.target.value})} />
                    </label>

                    <label>Method
                    <select style={{ padding: "8px" }} value={monitorForm.method} 
                        onChange={(e) => setMonitorForm({...monitorForm, method: e.target.value})}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    </label>

                    <label>Interval (sec)
                    <input type="number" required min="10" style={{ width: "80px", padding: "8px" }}
                        value={monitorForm.intervalSeconds} 
                        onChange={(e) => setMonitorForm({...monitorForm, intervalSeconds: Number(e.target.value)})} />
                    </label>

                    <label>Expected Status
                    <input type="number" required style={{ width: "80px", padding: "8px" }}
                        value={monitorForm.expectedStatus} 
                        onChange={(e) => setMonitorForm({...monitorForm, expectedStatus: Number(e.target.value)})} />
                    </label>

                    <button type="submit" className="btn-primary" style={{ padding: "8px 16px" }}>Save</button>
                </form>
          </div>
        )}

        {/* --- MONITOR LIST --- */}
        <h2 style={{ marginTop: "40px" }}>Active Monitors</h2>
        {projectData.monitors && projectData.monitors.length > 0 ? (
          <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
            {projectData.monitors.map((monitor: any) => (
              <div key={monitor.id} style={{ border: "1px solid #e2e8f0", padding: "16px", borderRadius: "12px" }}>
                <strong>{monitor.name}</strong> 
                <span style={{ marginLeft: "10px", color: "#64748b" }}>{monitor.method} {monitor.url}</span>
                <p style={{ marginTop: "8px" }}>Status: {monitor.status || "Pending"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ marginTop: "16px", color: "#64748b" }}>No monitors found. Create one above!</p>
        )}
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;