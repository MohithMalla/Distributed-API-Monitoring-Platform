// import { useEffect, useState } from "react";
// import MainLayout from "../layouts/MainLayout";
// import { 
//   Plus, Trash2, Pencil, AlertCircle, CheckCircle2, 
//   ArrowRight, LayoutGrid, List, Filter 
// } from "lucide-react";
// import * as api from "../api/project.api";
// import "../styles/projects.css"; // IMPORTANT: Import your new CSS file here

// const Projects = () => {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const loadProjects = async () => {
//     try {
//       const res = await api.getProjects();
//       const projectsArray = Array.isArray(res.data) 
//         ? res.data 
//         : (res.data?.data || []);
//       setProjects(projectsArray);
//     } catch (e) {
//       console.error("Error loading projects", e);
//       setProjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   return (
//     <MainLayout>
//       <div className="projects-wrapper p-6">
        
//         {/* Top Header */}
//         <header className="page-header">
//           <div>
//             <h1 className="page-title">Projects</h1>
//             <p className="page-subtitle">Manage and monitor your API groups and infrastructure stacks.</p>
//           </div>
//           <button className="btn-primary">
//             <Plus size={18} strokeWidth={2.5} /> New Project
//           </button>
//         </header>

        

//         {/* Projects Grid */}
//         {loading ? (
//           <div style={{ color: '#64748b' }}>Loading projects...</div>
//         ) : (
//           <div className="projects-grid">
            
//             {projects.map((p) => {
//               const isCritical = p.down > 0;
              
//               return (
//                 <div key={p.id} className={`project-card ${isCritical ? 'critical' : ''}`}>
//                   {isCritical && <div className="badge-critical">Critical</div>}
                  
//                   <div className="card-header">
//                     <h2 className="card-title">{p.name}</h2>
//                     <div className="card-actions">
//                       <button onClick={() => api.deleteProject(p.id).then(loadProjects)}>
//                         <Trash2 size={16} />
//                       </button>
//                       <button>
//                         <Pencil size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   <p className="card-desc">{p.description}</p>

//                   <div className="metrics-container">
//                     <div className="metric-box total">
//                       <span className="metric-value">{p.total || 0}</span>
//                       <span className="metric-label">Total</span>
//                     </div>
//                     <div className="metric-box healthy">
//                       <span className="metric-value">{p.healthy || 0}</span>
//                       <span className="metric-label">Healthy</span>
//                     </div>
//                     <div className="metric-box down">
//                       <span className="metric-value">{p.down || 0}</span>
//                       <span className="metric-label">Down</span>
//                     </div>
//                   </div>

//                   <div className="card-footer-info">
//                     <div className={`uptime-badge ${isCritical ? 'critical' : 'healthy'}`}>
//                       {isCritical ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
//                       {p.uptime || 0}% Uptime
//                     </div>
//                     <span className="created-date">Created {p.createdAt || 'recently'}</span>
//                   </div>

//                   <button className={`card-btn ${isCritical ? 'btn-investigate' : 'btn-view'}`}>
//                     {isCritical ? (
//                       <>Investigate <span style={{fontWeight: '900', fontSize: '16px'}}>!</span></>
//                     ) : (
//                       <>View <ArrowRight size={18} /></>
//                     )}
//                   </button>
//                 </div>
//               );
//             })}

//             {/* New Project Placeholder Card */}
//             <div className="new-project-card">
//               <div className="new-icon-wrapper">
//                 <Plus size={24} strokeWidth={2.5} />
//               </div>
//               <h3 className="new-title">New Project</h3>
//               <p className="new-desc">
//                 Group your related services and infrastructure for easier monitoring.
//               </p>
//             </div>

//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default Projects;





import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  Plus,
  Trash2,
  Pencil,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { io } from "socket.io-client";
import * as api from "../api/project.api";
import "../styles/projects.css";

const socket = io("http://localhost:5000");

const Projects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const loadProjects = async () => {

    try {

      setLoading(true);

      const res = await api.getProjects();

      const arr = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setProjects(arr);

    } catch (e) {

      console.error(e);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProjects();

    socket.on("monitor-status", loadProjects);

    socket.on("incident-created", loadProjects);

    socket.on("incident-resolved", loadProjects);

    return () => {

      socket.off("monitor-status", loadProjects);

      socket.off("incident-created", loadProjects);

      socket.off("incident-resolved", loadProjects);

    };

  }, []);

  const filteredProjects = useMemo(() => {

    return projects.filter((p) =>

      p.name

        .toLowerCase()

        .includes(search.toLowerCase())

    );

  }, [projects, search]);

  const handleDelete = async () => {

    if (!selectedProject) return;

    try {

      await api.deleteProject(selectedProject.id);

      setDeleteModal(false);

      setSelectedProject(null);

      loadProjects();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <MainLayout>

      <div className="projects-wrapper p-6">

        <header className="page-header">

          <div>

            <h1 className="page-title">

              Projects

            </h1>

            <p className="page-subtitle">

              Manage and monitor your API groups and infrastructure stacks.

            </p>

          </div>

          <button

            className="btn-primary"

            onClick={() => navigate("/projects/create")}

          >

            <Plus

              size={18}

              strokeWidth={2.5}

            />

            New Project

          </button>

        </header>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 28,
            gap: 20
          }}
        >

          <input

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            placeholder="Search projects..."

            style={{

              flex: 1,

              padding: "13px 18px",

              borderRadius: 12,

              border: "1px solid #e2e8f0",

              fontSize: 15,

              outline: "none"

            }}

          />

        </div>

        {loading ? (

          <div

            style={{

              padding: 40,

              color: "#64748b"

            }}

          >

            Loading Projects...

          </div>

        ) : filteredProjects.length === 0 ? (

          <div

            style={{

              background: "#fff",

              padding: 60,

              borderRadius: 20,

              textAlign: "center"

            }}

          >

            <h2>No Projects Found</h2>

            <p>

              Create your first monitoring project.

            </p>

          </div>

        ) : (

          <div className="projects-grid">

            {filteredProjects.map((p) => {

              const isCritical =

                (p.down || 0) > 0;

              return (

                <div

                  key={p.id}

                  className={`project-card ${

                    isCritical

                      ? "critical"

                      : ""

                  }`}

                >

                  {isCritical && (

                    <div className="badge-critical">

                      Critical

                    </div>

                  )}

                  <div className="card-header">

                    <h2 className="card-title">

                      {p.name}

                    </h2>

                    <div className="card-actions">

                      <button

                        onClick={() => {

                          setSelectedProject(p);

                          setDeleteModal(true);

                        }}

                      >

                        <Trash2 size={16} />

                      </button>

                      <button

                        onClick={() =>

                          navigate(

                            `/projects/edit/${p.id}`

                          )

                        }

                      >

                        <Pencil size={16} />

                      </button>

                    </div>

                  </div>

                  <p className="card-desc">

                  {p.description || "No description available"}

                </p>

                <div className="metrics-container">

                  <div className="metric-box total">

                    <span className="metric-value">

                      {p.total ?? 0}

                    </span>

                    <span className="metric-label">

                      Total

                    </span>

                  </div>

                  <div className="metric-box healthy">

                    <span className="metric-value">

                      {p.healthy ?? 0}

                    </span>

                    <span className="metric-label">

                      Healthy

                    </span>

                  </div>

                  <div className="metric-box down">

                    <span className="metric-value">

                      {p.down ?? 0}

                    </span>

                    <span className="metric-label">

                      Down

                    </span>

                  </div>

                </div>

                <div className="card-footer-info">

                  <div

                    className={`uptime-badge ${

                      isCritical

                        ? "critical"

                        : "healthy"

                    }`}

                  >

                    {

                      isCritical

                      ?

                      <AlertCircle size={16}/>

                      :

                      <CheckCircle2 size={16}/>

                    }

                    {p.uptime ?? 100}% Uptime

                  </div>

                  <span className="created-date">

                    Created{" "}

                    {

                      p.createdAt

                      ?

                      new Date(

                        p.createdAt

                      ).toLocaleDateString()

                      :

                      "Recently"

                    }

                  </span>

                </div>

                <button

                  className={`card-btn ${

                    isCritical

                    ?

                    "btn-investigate"

                    :

                    "btn-view"

                  }`}

                  onClick={()=>

                    navigate(

                      `/projects/${p.id}`

                    )

                  }

                >

                  {

                    isCritical

                    ?

                    <>

                      Investigate

                      <span

                        style={{

                          fontWeight:900,

                          fontSize:16

                        }}

                      >

                        !

                      </span>

                    </>

                    :

                    <>

                      View

                      <ArrowRight size={18}/>

                    </>

                  }

                </button>

                </div>

                );

                })}

                <div

                className="new-project-card"

                onClick={()=>

                navigate(

                "/projects/create"

                )

                }

                style={{

                cursor:"pointer"

                }}

                >

                <div className="new-icon-wrapper">

                <Plus

                size={24}

                strokeWidth={2.5}

                />

                </div>

                <h3 className="new-title">

                New Project

                </h3>

                <p className="new-desc">

                Group your related services and infrastructure for easier monitoring.

                </p>

                </div>

                </div>

                )}

                {

                deleteModal && (

                <div

                style={{

                position:"fixed",

                top:0,

                left:0,

                right:0,

                bottom:0,

                background:"rgba(0,0,0,.45)",

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                zIndex:999

                }}

                >

                <div

                style={{

                background:"#fff",

                width:420,

                borderRadius:20,

                padding:28

                }}

                >

                <h2>

                Delete Project

                </h2>

                <p

                style={{

                marginTop:12,

                color:"#64748b"

                }}

                >

                Are you sure you want to delete

                <b>

                {" "}

                {selectedProject?.name}

                </b>

                ?

                </p>

                <div

                style={{

                display:"flex",

                justifyContent:"flex-end",

                gap:12,

                marginTop:30

                }}

                >

                <button

                onClick={()=>

                setDeleteModal(false)

                }

                style={{

                padding:"10px 20px",

                borderRadius:10,

                border:"1px solid #e2e8f0",

                background:"#fff"

                }}

                >

                Cancel

                </button>

                <button

                onClick={handleDelete}

                style={{

                padding:"10px 20px",

                borderRadius:10,

                background:"#ef4444",

                color:"#fff",

                border:"none"

                }}

                >

                Delete

                </button>

                </div>

                </div>

                </div>

                )
                
                }

                </div>

                </MainLayout>

                );

                };

                export default Projects;