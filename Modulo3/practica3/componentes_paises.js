import React, { useState } from 'react';

export default function App() {
  // Datos de países y sus provincias
  const datos = {
    Argentina: ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán'],
    España: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'],
    México: ['Ciudad de México', 'Jalisco', 'Nuevo León', 'Puebla', 'Guanajuato'],
    Chile: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta']
  };

  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');

  // Cuando cambia el país, reiniciamos la provincia
  const handleCambioPais = (e) => {
    setPaisSeleccionado(e.target.value);
    setProvinciaSeleccionada('');
  };

  const handleCambioProvincia = (e) => {
    setProvinciaSeleccionada(e.target.value);
  };

  // Obtener provincias del país seleccionado
  const provinciasDisponibles = paisSeleccionado ? datos[paisSeleccionado] : [];

  return (
    <div className="container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 100%;
        }

        h1 {
          color: #2d3748;
          margin-bottom: 10px;
          font-size: 2em;
          text-align: center;
        }

        .subtitle {
          color: #718096;
          text-align: center;
          margin-bottom: 30px;
          font-size: 0.95em;
        }

        .form-group {
          margin-bottom: 25px;
        }

        label {
          display: block;
          color: #4a5568;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 0.95em;
        }

        select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1em;
          color: #2d3748;
          background-color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 40px;
        }

        select:hover {
          border-color: #cbd5e0;
        }

        select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        select:disabled {
          background-color: #f7fafc;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .resultado {
          margin-top: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          color: white;
          text-align: center;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .resultado h3 {
          margin-bottom: 8px;
          font-size: 1.1em;
        }

        .resultado p {
          font-size: 1.2em;
          font-weight: 600;
        }

        .resultado.vacio {
          background: #f7fafc;
          color: #a0aec0;
          font-style: italic;
        }

        @media (max-width: 600px) {
          .card {
            padding: 30px 20px;
          }

          h1 {
            font-size: 1.5em;
          }
        }
      `}</style>

      <div className="card">
        <h1>Selects Dependientes</h1>
        <p className="subtitle">Selecciona un país para ver sus provincias</p>

        <div className="form-group">
          <label htmlFor="pais">País:</label>
          <select 
            id="pais"
            value={paisSeleccionado} 
            onChange={handleCambioPais}
          >
            <option value="">-- Selecciona un país --</option>
            {Object.keys(datos).map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="provincia">Provincia / Estado:</label>
          <select 
            id="provincia"
            value={provinciaSeleccionada} 
            onChange={handleCambioProvincia}
            disabled={!paisSeleccionado}
          >
            <option value="">
              {paisSeleccionado 
                ? '-- Selecciona una provincia --' 
                : '-- Primero selecciona un país --'}
            </option>
            {provinciasDisponibles.map((provincia) => (
              <option key={provincia} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
        </div>

        {paisSeleccionado && provinciaSeleccionada && (
          <div className="resultado">
            <h3>Selección actual:</h3>
            <p>{provinciaSeleccionada}, {paisSeleccionado}</p>
          </div>
        )}

        {!paisSeleccionado && (
          <div className="resultado vacio">
            <p>Selecciona un país para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}