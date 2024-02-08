import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReporteVentas from "./components/ReporteVentas";
import ReporteEntregas from "./components/ReporteEntregas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reporte-ventas" element={<ReporteVentas />} />
        <Route path="/reporte-entregas" element={<ReporteEntregas />} />
      </Routes>
    </Router>
  );
}

export default App;
