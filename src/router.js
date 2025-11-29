import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import App from "./App";
import Auth from "./Auth";


export default function Router() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setLoading(false);
  }, []);

  // עד שהטוקן נטען – לא מציג כלום
  if (loading) return null;

  return (
    <BrowserRouter>
 

<Routes>
  <Route path="/auth" element={<Auth setToken={setToken} />} />
  <Route path="/" element={token ? <App /> : <Navigate to="/auth" />} />
</Routes>

    </BrowserRouter>
  );
}
