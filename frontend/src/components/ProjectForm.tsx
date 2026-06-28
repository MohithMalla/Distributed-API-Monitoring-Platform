import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import * as api from "../api/project.api";

const ProjectForm = () => {
  const { id } = useParams(); // Grabs the :id from the URL (if it exists)
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(isEditMode);

  // If we are editing, fetch the existing project data to fill the form
  useEffect(() => {
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          const res = await api.getProjectById(id);
          // Assuming backend returns the project object directly or inside data
          const project = res.data?.data || res.data; 
          setFormData({ name: project.name, description: project.description });
        } catch (error) {
          console.error("Failed to fetch project", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // PUT request to update
        await api.updateProject(id, formData);
      } else {
        // POST request to create
        await api.createProject(formData);
      }
      // Go back to the main projects page after success
      navigate("/projects");
    } catch (error) {
      console.error("Failed to save project", error);
    }
  };

  if (loading) return <MainLayout><div className="p-6">Loading form...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="p-6">
        <h1>{isEditMode ? "Edit Project" : "Create New Project"}</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px", marginTop: "20px" }}>
          
          <label>
            Project Name
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </label>

          <label>
            Description
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </label>

          <button type="submit" className="btn-primary">
            {isEditMode ? "Save Changes" : "Create Project"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProjectForm;