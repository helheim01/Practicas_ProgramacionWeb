import React, { useState } from 'react';

function FormularioNombre() {
  const [nombre, setNombre] = useState('');

  // Event listener para cambios en el input
  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  // Event listener para limpiar el input
  const handleLimpiar = () => {
    setNombre('');
  };

  // Determinar si el nombre es largo (más de 10 caracteres)
  const esNombreLargo = nombre.length > 10;

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
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 100%;
        }

        h1 {
          color: #1e293b;
          margin-bottom: 10px;
          font-size: 2em;
          text-align: center;
        }

        .subtitle {
          color: #64748b;
          text-align: center;
          margin-bottom: 30px;
          font-size: 0.95em;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          color: #475569;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 0.95em;
        }

        input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1.1em;
          color: #1e293b;
          transition: all 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .button-container {
          margin-bottom: 25px;
        }

        button {
          width: 100%;
          padding: 12px 24px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }

        button:active {
          transform: translateY(0);
        }

        button:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          box-shadow: none;
        }

        .mensaje {
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          font-size: 1.3em;
          font-weight: 600;
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .mensaje.normal {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
        }

        .mensaje.largo {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .mensaje.vacio {
          background: #f1f5f9;
          color: #94a3b8;
          font-style: italic;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .info {
          margin-top: 15px;
          text-align: center;
          color: #64748b;
          font-size: 0.9em;
        }

        .contador {
          display: inline-block;
          padding: 4px 10px;
          background: #f1f5f9;
          border-radius: 6px;
          font-weight: 600;
          color: #475569;
        }

        .contador.alerta {
          background: #fef3c7;
          color: #d97706;
        }

        @media (max-width: 600px) {
          .card {
            padding: 30px 20px;
          }

          h1 {
            font-size: 1.6em;
          }

          .mensaje {
            font-size: 1.1em;
          }
        }
      `}</style>

      <div className="card">
        <h1>Formulario de Nombre</h1>
        <p className="subtitle">Escribe tu nombre y mira la magia ✨</p>

        <div className="form-group">
          <label htmlFor="nombre">Ingresa tu nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleChange}
            placeholder="Escribe aquí..."
          />
        </div>

        <div className="button-container">
          <button 
            onClick={handleLimpiar}
            disabled={nombre === ''}
          >
            🗑️ Limpiar
          </button>
        </div>

        <div className={`mensaje ${nombre === '' ? 'vacio' : esNombreLargo ? 'largo' : 'normal'}`}>
          {nombre === '' ? (
            'Esperando tu nombre...'
          ) : (
            `¡Hola, ${nombre}!`
          )}
        </div>

        {nombre !== '' && (
          <div className="info">
            Caracteres: <span className={`contador ${esNombreLargo ? 'alerta' : ''}`}>
              {nombre.length}
            </span>
            {esNombreLargo && ' ⚠️ ¡Nombre largo detectado!'}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <FormularioNombre />;
}