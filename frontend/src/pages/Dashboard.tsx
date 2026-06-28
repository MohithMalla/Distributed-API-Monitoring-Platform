import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDashboard } from "../api/dashboard.api";
import "../styles/dashboard.css"; 
import { socket } from "../socket/socket";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowDownRight,
  ChevronRight
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);



useEffect(() => {

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    loadDashboard();

    socket.on("monitor-status", () => {

        loadDashboard();

    });

    socket.on("incident-created", () => {

        loadDashboard();

    });

    socket.on("incident-resolved", () => {

        loadDashboard();

    });

    return () => {

        socket.off("monitor-status");

        socket.off("incident-created");

        socket.off("incident-resolved");

    };

}, []);

  // useEffect(() => {
  //   const loadDashboard = async () => {
  //     try {
  //       const response = await getDashboard();
  //       setDashboard(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadDashboard();
  // }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-container">
          <div className="loading-content">
            <div className="spinner"></div>
            <div className="loading-text">Loading Dashboard...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const avgLatency =dashboard?.averageLatency ?? 0;

  const uptime =dashboard?.uptimePercentage ?? 100;

  const chartData = dashboard?.recentLogs?.map((log: any) => ({
    time: new Date(log.checkedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    latency: Math.round(log.responseTime),
  })) || [];

console.log("Dashboard Data:", dashboard);

  return (
    <MainLayout>
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          
          {/* STATS ROW */}
          <div className="stats-grid">
            
            {/* Total Monitors */}
            <div className="stat-card">
              <div className="stat-border border-dark"></div>
              <p className="stat-label">Total Monitors</p>
              <div className="stat-value-row">
                <h3 className="stat-value">{dashboard?.totalMonitors || 0}</h3>
                <span className="stat-badge badge-blue">+2 New</span>
              </div>
            </div>

            {/* Healthy APIs */}
            <div className="stat-card">
              <div className="stat-border border-green"></div>
              <p className="stat-label">Healthy APIs</p>
              <div className="stat-value-row">
                <h3 className="stat-value text-green">{dashboard?.healthyMonitors || 0}</h3>
                <CheckCircle2 className="icon-green" size={22} strokeWidth={2.5} />
              </div>
            </div>

            {/* Down APIs */}
            <div className="stat-card">
              <div className="stat-border border-red"></div>
              <p className="stat-label">Down APIs</p>
              <div className="stat-value-row">
                <h3 className="stat-value text-red">{dashboard?.downMonitors || 0}</h3>
                <AlertCircle className="icon-red" size={22} strokeWidth={2.5} />
              </div>
            </div>

            {/* Open Incidents */}
            <div className="stat-card">
              <div className="stat-border border-gray"></div>
              <p className="stat-label">Open Incidents</p>
              <div className="stat-value-row">
                <h3 className="stat-value">{dashboard?.openIncidents || 0}</h3>
                <span className="stat-badge badge-red">Priority: High</span>
              </div>
            </div>

            {/* Avg Latency */}
            <div className="stat-card">
              <p className="stat-label">Avg Latency</p>
              <div className="stat-value-row">
                <h3 className="stat-value">
                  {avgLatency}<span className="stat-unit">ms</span>
                </h3>
                <span className="stat-trend trend-green">
                  <ArrowDownRight size={14} className="trend-icon" /> 12%
                </span>
              </div>
            </div>
          </div>

          {/* CHARTS ROW */}
          <div className="charts-grid">
            
            {/* Area Chart Container */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h2 className="section-title">Response Time (Latency)</h2>
                  <p className="section-subtitle">Global average over the last 24 hours</p>
                </div>
                <div className="chart-filters">
                  <button className="filter-btn active">24h</button>
                  <button className="filter-btn">7d</button>
                  <button className="filter-btn">30d</button>
                </div>
              </div>

              <div className="chart-body">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} 
                      dy={10} 
                    />
                    <YAxis hide={true} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="latency" 
                      stroke="#2563eb" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorLatency)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Global Availability Map Box */}
            <div className="availability-card">
              <h2 className="section-title mb-4">Global Availability</h2>
              
              <div className="availability-map">
                <div className="map-overlay"></div>
                
                {dashboard?.recentLogs?.slice(0,3).map((log: any, index: number) => (
                  <div 
                    key={log.id || index} 
                    className={`availability-item ${!log.isHealthy ? 'item-degraded' : ''}`}
                  >
                    <span className="item-name">
                      {log.monitor?.name || 'Unknown Region'}
                    </span>
                    <span className={`item-status ${log.isHealthy ? 'text-green' : 'text-red'}`}>
                      {log.isHealthy ? `${uptime}%` : "Degraded"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT MONITORS GRID */}
          <div className="recent-monitors-section">
            <div className="section-header">
              <h2 className="section-title">Recent Monitors</h2>
              <button className="view-all-btn">
                View all monitors <ArrowRight size={16} className="btn-icon" strokeWidth={2.5} />
              </button>
            </div>

            <div className="monitors-grid">
              {dashboard?.recentLogs?.slice(0, 4).map((log: any) => (
                <div key={log.id} className="monitor-card">
                  
                  {/* Top: Name & Status Badge */}
                  <div className="monitor-header">
                    <div className="monitor-title-wrapper">
                      <h4 className="monitor-title">{log.monitor?.name}</h4>
                    </div>
                    <span className={`monitor-status-badge ${log.isHealthy ? 'badge-up' : 'badge-down'}`}>
                      {log.isHealthy ? "UP" : "DOWN"}
                    </span>
                  </div>
                  
                  {/* Subtitle / URL */}
                  <p className="monitor-url">{log.monitor?.url}</p>
                  
                  {/* Middle: Method & Latency */}
                  <div className="monitor-metrics">
                    <span className="monitor-method">{log.monitor?.method || 'GET'}</span>
                    <span className={`monitor-latency ${log.isHealthy ? 'text-dark' : 'text-danger'}`}>
                      {Math.round(log.responseTime)}ms
                    </span>
                  </div>
                  
                  {/* Bottom: Progress Bar & Time */}
                  <div className="monitor-footer">
                    <div className={`monitor-progress ${log.isHealthy ? 'progress-green' : 'progress-red'}`}></div>
                    <p className={`monitor-time ${log.isHealthy ? 'text-muted' : 'text-danger'}`}>
                      {log.isHealthy ? 'Last checked recently' : 'Timed out: Connection Refused'}
                    </p>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

          {/* OPEN INCIDENTS TABLE */}
          <div className="incidents-section">
            <div className="section-header mb-6">
              <h2 className="section-title">Open Incidents</h2>
              <span className="incidents-count">
                Showing {dashboard?.recentIncidents?.length || 0} incidents
              </span>
            </div>
            
            <div className="table-responsive">
              <table className="incidents-table">
                <thead>
                  <tr>
                    <th className="col-id">Incident ID</th>
                    <th className="col-service">Service</th>
                    <th className="col-impact">Impact</th>
                    <th className="col-date">Date / Time</th>
                    <th className="col-status">Status</th>
                    <th className="col-action"></th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard?.recentIncidents?.map((incident: any) => (
                    <tr key={incident.id}>
                      <td className="cell-id text-muted font-mono tracking-tight">
                        #{incident.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="cell-service pr-4">
                        <p className="service-name">{incident.monitor?.name || 'Unknown Service'}</p>
                        <p className="service-reason">{incident.reason}</p>
                      </td>
                      <td className="cell-impact">
                        <span className="impact-badge">Critical</span>
                      </td>
                      <td className="cell-date text-medium">
                        {new Date(incident.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="cell-status">
                        <div className="status-wrapper">
                          <div className={`status-dot ${incident.status === 'investigating' ? 'dot-red' : 'dot-blue'}`}></div> 
                          {incident.status || 'Investigating'}
                        </div>
                      </td>
                      <td className="cell-action text-right">
                        <ChevronRight className="action-icon" size={18} />
                      </td>
                    </tr>
                  ))}
                  
                  {(!dashboard?.recentIncidents || dashboard.recentIncidents.length === 0) && (
                     <tr>
                       <td colSpan={6} className="empty-table-cell">No open incidents right now.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* FOOTER */}
          <div className="dashboard-footer">
            MonitorPro © {new Date().getFullYear()} • Last Updated:
{new Date(dashboard.lastUpdated).toLocaleTimeString()} • Latency {avgLatency}ms
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;