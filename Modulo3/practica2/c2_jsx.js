import React from 'react';
//PASOS

    //Crear la aplicación React
    //    npx create-react-app mi-tarjetas
    //    cd mi-tarjetas

    //Copiar todo este codigo, en mi-tarjetas/src/App.js

    //En la carpeta public, poner las imagenes

    //Ejecutar: npm start




// Componente TarjetaPersonal
function TarjetaPersonal({ nombre, profesion, imagen, habilidades }) {
  return (
    <div className="tarjeta">
      <img src={imagen} alt={nombre} className="imagen-perfil" />
      <h2 className="nombre">{nombre}</h2>
      <p className="profesion">Profesión: {profesion}</p>
      <div className="habilidades">
        <h3>Habilidades:</h3>
        <ul>
          {habilidades.map((habilidad, index) => (
            <li key={index}>{habilidad}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Componente Principal
export default function App() {
  // Datos de las personas
  const personas = [
    {
      nombre: "Ada Lovelace",
      profesion: "Programadora",
      imagen: "1.jpg",
      habilidades: ["Matemáticas", "Lógica", "Visión de futuro"]
    },
    {
      nombre: "Alan Turing",
      profesion: "Criptógrafo",
      imagen: "2.jpg",
      habilidades: ["Códigos", "Matemáticas", "Computación"]
    },
    {
      nombre: "Grace Hopper",
      profesion: "Científica de la Computación",
      imagen: "3.jpg",
      habilidades: ["Compiladores", "COBOL", "Liderazgo"]
    }
  ];

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          background: #f5f5f5;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        h1 {
          color: #2c3e50;
          text-align: left;
          margin-bottom: 40px;
          font-size: 2.5em;
          padding-left: 20px;
        }

        .contenedor-tarjetas {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          max-width: 1200px;
          padding: 0 20px;
        }

        .tarjeta {
          background: white;
          border-radius: 12px;
          padding: 20px;
          width: 280px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tarjeta:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .imagen-perfil {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .nombre {
          color: #2c3e50;
          font-size: 1.5em;
          margin-bottom: 8px;
        }

        .profesion {
          color: #7f8c8d;
          font-size: 1em;
          margin-bottom: 15px;
        }

        .habilidades h3 {
          color: #34495e;
          font-size: 1.1em;
          margin-bottom: 10px;
        }

        .habilidades ul {
          list-style: none;
          padding: 0;
        }

        .habilidades li {
          color: #555;
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
        }

        .habilidades li:before {
          content: "•";
          color: #3498db;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2em;
          }

          .contenedor-tarjetas {
            justify-content: center;
          }

          .tarjeta {
            width: 100%;
            max-width: 350px;
          }
        }
      `}</style>

      <h1>Tarjetas de Personas</h1>
      
      <div className="contenedor-tarjetas">
        {personas.map((persona, index) => (
          <TarjetaPersonal
            key={index}
            nombre={persona.nombre}
            profesion={persona.profesion}
            imagen={persona.imagen}
            habilidades={persona.habilidades}
          />
        ))}
      </div>
    </div>
  );
}