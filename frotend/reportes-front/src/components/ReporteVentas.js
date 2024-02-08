import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './ReporteVentas.css'; // Importa el archivo CSS para personalizar los estilos

function ReporteVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reporte-ventas')
      .then(response => response.json())
      .then(data => {
        // Formatear las fechas para eliminar el huso horario UTC
        const ventasFormateadas = data.map(venta => ({
          ...venta,
          'FECHA DE LA VENTA': new Date(venta['FECHA DE LA VENTA']).toLocaleDateString()
        }));
        setVentas(ventasFormateadas);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Reporte de Ventas</h2>
      <Table responsive striped bordered hover className="tabla-reportes">
        <thead>
          <tr>
            <th>ID de Movimiento</th>
            <th>Total en Pesos</th>
            <th>Fecha de Venta</th>
            <th>Comprobante Factura</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta['ID DE MOVIMIENTO DE VENTAS']}>
              <td>{venta['ID DE MOVIMIENTO DE VENTAS']}</td>
              <td>{venta['TOTAL DEL MOVIMIENTO EN PESOS']}</td>
              <td>{venta['FECHA DE LA VENTA']}</td>
              <td>{venta['COMPROBANTE FACTURA']}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReporteVentas;
