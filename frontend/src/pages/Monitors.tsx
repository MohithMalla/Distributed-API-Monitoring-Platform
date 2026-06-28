import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Plus, RefreshCcw } from "lucide-react";
// import { getMonitors } from "../api/monitor.api";

const Monitors = () => {
  const [monitors,setMonitors]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    (async()=>{
      try{
        // const res:any=await getMonitors();
        // setMonitors(res.data?.data ?? res.data ?? []);
        setMonitors([
          { id: 1, name: "Monitor 1", method: "GET", url: "https://api.example.com/endpoint1", lastStatus: "UP", averageLatency: 150 },
          { id: 2, name: "Monitor 2", method: "POST", url: "https://api.example.com/endpoint2", lastStatus: "DOWN", averageLatency: 300 }
        ]);
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Monitors</h1>
          <p className="text-slate-500 mt-2">Monitor your APIs and services</p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-slate-50">
            <RefreshCcw size={18}/> Refresh
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <Plus size={18}/> New Monitor
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Method</th>
              <th className="text-left p-4">URL</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Latency</th>
            </tr>
          </thead>

          <tbody>
          {loading ? (
            <tr><td className="p-6" colSpan={5}>Loading...</td></tr>
          ) : monitors.length===0 ? (
            <tr><td className="p-6" colSpan={5}>No monitors found.</td></tr>
          ) : (
            monitors.map((m:any)=>(
              <tr key={m.id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-medium">{m.name}</td>
                <td className="p-4">{m.method}</td>
                <td className="p-4 max-w-sm truncate">{m.url}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${m.lastStatus==="UP"?"bg-green-500":"bg-red-500"}`}>
                    {m.lastStatus ?? "UNKNOWN"}
                  </span>
                </td>
                <td className="p-4">{m.averageLatency ?? "-"} ms</td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Monitors;
