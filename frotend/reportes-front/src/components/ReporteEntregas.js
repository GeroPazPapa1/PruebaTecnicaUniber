import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './ReporteEntregas.css'; // Importa el archivo CSS para personalizar los estilos

function ReporteEntregas() {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reporte-entregas')
      .then(response => response.json())
      .then(data => {
        setEntregas(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="reporte-entregas-container">
      <h2>Reporte de Entregas</h2>
      <Table responsive striped bordered hover className="tabla-reportes">
        <thead>
          <tr>
            <th>ID de Entrega</th>
            <th>Items de la Entrega</th>
            <th>Fecha de Entrega</th>
            <th>Identificador de la Entrega</th>
            <th>Factura Relacionada</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map(entrega => (
            <tr key={entrega.ID_DE_ENTREGA}>
              <td>{entrega.ID_DE_ENTREGA}</td>
              <td>{entrega.ITEMS_DE_LA_ENTREGA}</td>
              <td>{entrega.FECHA_DE_ENTREGA}</td>
              <td>{entrega.IDENTIFICADOR_DE_LA_ENTREGA}</td>
              <td>{entrega.FACTURA_RELACIONADA}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReporteEntregas;
