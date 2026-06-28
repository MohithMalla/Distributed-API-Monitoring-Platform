import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { AlertTriangle } from "lucide-react";
// import { getIncidents } from "../api/incident.api";

const Incidents = () => {
  const [incidents,setIncidents]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    (async()=>{
      try{
        // const res:any=await getIncidents();
        // setIncidents(res.data?.data ?? res.data ?? []);
        setIncidents([
          { id: 1, monitor: { name: "Monitor 1" }, reason: "API endpoint down", status: "OPEN", createdAt: new Date(), resolvedAt: null },
          { id: 2, monitor: { name: "Monitor 2" }, reason: "High latency detected", status: "RESOLVED", createdAt: new Date(), resolvedAt: new Date() }
        ]);
      }catch(e){
        console.error(e);
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Incidents</h1>
          <p className="text-slate-500 mt-2">
            Track monitor outages and recoveries
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600">
          <AlertTriangle size={18}/>
          Incident History
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Monitor</th>
              <th className="text-left p-4">Reason</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Started</th>
              <th className="text-left p-4">Resolved</th>
            </tr>
          </thead>

          <tbody>
          {loading ? (
            <tr><td className="p-6" colSpan={5}>Loading...</td></tr>
          ) : incidents.length===0 ? (
            <tr><td className="p-6" colSpan={5}>No incidents found.</td></tr>
          ) : (
            incidents.map((i:any)=>(
              <tr key={i.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{i.monitor?.name ?? i.monitorId}</td>
                <td className="p-4">{i.reason}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${i.status==="OPEN"?"bg-red-500":"bg-green-500"}`}>
                    {i.status}
                  </span>
                </td>
                <td className="p-4">{i.createdAt ? new Date(i.createdAt).toLocaleString() : "-"}</td>
                <td className="p-4">{i.resolvedAt ? new Date(i.resolvedAt).toLocaleString() : "-"}</td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Incidents;
