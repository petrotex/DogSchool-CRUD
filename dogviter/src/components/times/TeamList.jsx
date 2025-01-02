// src/components/teams/TeamList.js
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import LogoutButton from '../LogoutButton';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(3);

  const handleDelete = async (teamId) => {
    try {
      await api.delete(`/teams/${teamId}/`);
      const updatedTeams = teams.filter(team => team.id !== teamId);
      setTeams(updatedTeams);
    } catch (error) {
      console.error('Erro ao deletar time:', error);
    }
  };

  useEffect(() => {
    api.get('/teams/')
      .then(response => {
        setTeams(response.data.results);
      })
      .catch(error => {
        console.error('Erro ao buscar times:', error);
      });
  }, []);

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);
  const totalPages = Math.ceil(teams.length / teamsPerPage);

  return (
    <div className="p-6 backdrop-blur-sm min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-cyan-900 via-blue-800 to-cyan-600 text-cyan-700">
      <div className="header flex flex-col space-y-8">
        <h1 className="text-6xl text-shadow bg-gradient-to-r from-emerald-400 to-orange-600 bg-clip-text text-transparent henny-penny-regular">Lista de Times</h1>
        <Link to="/teams/create" className="border-2 border-zinc-100 px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">Criar Novo Time</Link>
        <LogoutButton />
      </div>
      <ul className="mb-6 grid grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {currentTeams.map(team => (
          <li key={team.id} className="py-4 bg-white bg-opacity-15 backdrop-blur-lg shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border rounded-lg overflow-hidden mx-auto mt-4">
            <div className="min-h-[245px]">
              <Link to={`/dogs?team=${team.id}`}>
                {team.image && <img src={team.image} alt={`Imagem de ${team.name}`} className="w-full h-auto rounded-lg" />}
              </Link>
            </div>
            <div className="p-6 text-center">
              <div className="text-4xl text-stone-100 hover:text-lime-400 font-bold itim-regular">
                {team.name}
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <Link to={`/teams/${team.id}/edit`} className="text-white hover:text-white bg-blue-700 hover:bg-cyan-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Editar</Link>
                <button onClick={() => { if (window.confirm("Tem certeza que deseja deletar este time?")) handleDelete(team.id) }} className="flex items-center justify-center rounded text-white text-sm tracking-wider font-medium border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600">
                  <span className="border-r border-white pr-3">Excluir</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default TeamList;
