import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function HandleAddProject() {
    // setProjects([...projects, project]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Diego Fernandes'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Homepage">
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
        </ul>
      </Header>
      <Header title="Projects">
        {/* <img width={300} src={backgroundImage} alt="Background"/> */}
        
        <ul>
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>
      </Header>

      <button type="button" onClick={HandleAddProject}>Adicionar projeto</button>
    </>
  ); 
}

export default App;
