import React, { useState } from 'react';

function ListaTareas() {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  // Event listener para cambios en el input
  const handleChange = (e) => {
    setTarea(e.target.value);
  };

  // Event listener para agregar tarea
  const handleAgregarTarea = () => {
    if (tarea.trim() !== '') {
      setTareas([...tareas, tarea]);
      setTarea(''); // Limpiar el input después de agregar
    }
  };

  // Event listener para detectar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAgregarTarea();
    }
  };

  // Event listener para eliminar tarea
  const handleEliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

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
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        h1 {
          color: #1e293b;
          margin-bottom: 10px;
          font-size: 2.2em;
          text-align: center;
        }

        .subtitle {
          color: #64748b;
          text-align: center;
          margin-bottom: 30px;
          font-size: 0.95em;
        }

        .input-container {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
        }

        input {
          flex: 1;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1em;
          color: #1e293b;
          transition: all 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        button {
          padding: 14px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          white-space: nowrap;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        button:active {
          transform: translateY(0);
        }

        button:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .lista-container {
          min-height: 200px;
        }

        .lista-tareas {
          list-style: none;
        }

        .tarea-item {
          background: #f8fafc;
          padding: 16px;
          margin-bottom: 12px;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          animation: aparecer 0.3s ease;
        }

        @keyframes aparecer {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tarea-item:hover {
          background: #f1f5f9;
          border-color: #e2e8f0;
        }

        .tarea-texto {
          color: #334155;
          font-size: 1.05em;
          flex: 1;
          word-break: break-word;
        }

        .btn-eliminar {
          padding: 8px 16px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9em;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-left: 10px;
        }

        .btn-eliminar:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .mensaje-vacio {
          text-align: center;
          color: #94a3b8;
          font-style: italic;
          padding: 40px 20px;
          font-size: 1.1em;
        }

        .contador {
          text-align: center;
          color: #64748b;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          font-weight: 600;
        }

        .numero {
          color: #667eea;
          font-size: 1.2em;
        }

        @media (max-width: 600px) {
          .card {
            padding: 30px 20px;
          }

          h1 {
            font-size: 1.8em;
          }

          .input-container {
            flex-direction: column;
          }

          button {
            width: 100%;
          }
        }
      `}</style>

      <div className="card">
        <h1>📝 Lista de Tareas</h1>
        <p className="subtitle">Agrega tus tareas pendientes</p>

        <div className="input-container">
          <input
            type="text"
            value={tarea}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe una tarea..."
          />
          <button 
            onClick={handleAgregarTarea}
            disabled={tarea.trim() === ''}
          >
            ➕ Agregar
          </button>
        </div>

        <div className="lista-container">
          {tareas.length === 0 ? (
            <div className="mensaje-vacio">
              No hay tareas aún. ¡Agrega una para comenzar!
            </div>
          ) : (
            <ul className="lista-tareas">
              {tareas.map((t, index) => (
                <li key={index} className="tarea-item">
                  <span className="tarea-texto">{t}</span>
                  <button 
                    className="btn-eliminar"
                    onClick={() => handleEliminarTarea(index)}
                  >
                    🗑️ Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {tareas.length > 0 && (
          <div className="contador">
            Total de tareas: <span className="numero">{tareas.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <ListaTareas />;
}