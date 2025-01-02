// Este código define um componente chamado AppRouter que representa as rotas da aplicação. Ele utiliza o Router do React Router para envolver a aplicação e fornecer a navegação baseada em rotas. As rotas são definidas dentro do componente Routes.

// Importa os componentes necessários do react-router-dom e os componentes da aplicação
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DogList from './components/DogList' // Lista de cães
import CreateDog from './components/EditDog' // Componente para criar ou editar cães
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import EditDog from './components/EditDog' // Componente para editar um cão
import ReadDog from './components/ReadDog' // Componente para visualizar os detalhes de um cão

import TeamList from './components/times/TeamList';
import CreateTeam from './components/times/EditTeam';
import EditTeam from './components/times/EditTeam';

// Define o componente AppRouter que contém as rotas da aplicação
function AppRouter() {
  return (
    // Define o componente Router para envolver a aplicação e fornecer navegação baseada em rotas
    <Router>
      {/* Define as rotas da aplicação */}
      <Routes>
        {/* Rota para a página de login (pública) */}
        <Route path="/" element={<Login />} />
        {/* Rotas protegidas que requerem autenticação */}
        <Route element={<PrivateRoute />}>
          {/* Rota para a listagem de cães */}
          <Route path="/dogs" element={<DogList />} />
          {/* Rota para criar um novo cão */}
          <Route path="/dogs/create" element={<CreateDog/>} />
          {/* Rota para editar um cão existente */}
          <Route path="/dogs/:dogId/edit" element={<EditDog/>} />
          {/* Rota para visualizar os detalhes de um cão */}
          <Route path="/dogs/:dogId/detail" element={<ReadDog/>} />

          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/create" element={<CreateTeam/>} />
          <Route path="/teams/:teamId/edit" element={<EditTeam/>} />
          {/* Rota para visualizar os detalhes de um cão
          <Route path="/teams/create" element={<TeamDog/>} />
          <Route path="/teams/:teamId/edit" element={<TeamDog/>} /> 
          <Route path="/teams/:teamId/detail" element={<TeamDog/>} />*/}
          

        </Route>
      </Routes>
    </Router>
  )
}

// Exporta o componente AppRouter
export default AppRouter
