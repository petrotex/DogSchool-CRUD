// src/components/DogList.js
import { useState, useEffect } from 'react';
import api from '../api';
import { Link, useLocation } from 'react-router-dom';
import '../styles/DogList.css';

function DogList() {
  const [dogs, setDogs] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const teamId = params.get('team');

  const handleDelete = async (dogId) => {
    try {
      await api.delete(`/dogs/${dogId}/`);
      const updatedDogs = dogs.filter(dog => dog.id !== dogId);
      setDogs(updatedDogs);
    } catch (error) {
      console.error('Erro ao deletar cão:', error);
    }
  };

  useEffect(() => {
    api.get(`/dogs/?team=${teamId}`)
      .then(response => {
        setDogs(response.data.results);
      })
      .catch(error => {
        console.error('Erro ao buscar cães:', error);
      });
  }, [teamId]);

  return (
    <div className="p-6 backdrop-blur-sm min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-cyan-900 via-blue-800 to-cyan-600 text-cyan-700">
      <div className="header flex flex-col space-y-8">
        <h1 className="text-6xl text-shadow bg-gradient-to-r from-emerald-400 to-orange-600 bg-clip-text text-transparent henny-penny-regular">Lista de Cães</h1>
        <Link to={`/dogs/create?team=${teamId}`} className="border-2 border-zinc-100 px-8 py-4 bg-gradient-to-r
         from-teal-400 to-blue-500 text-white hover:text-white rounded-lg font-bold transform hover:-translate-y-1
          transition duration-400">
            Criar Novo Cão
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-8 w-full max-w-5xl px-4">
        {dogs.map(dog => (
          <li key={dog.id} className="bg-white bg-opacity-15 backdrop-blur-lg shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border rounded-lg overflow-hidden mx-auto mt-4">
            <div className="min-h-[245px]">
              {dog.bodyimage && <img src={dog.bodyimage} alt={`Imagem de ${dog.name}`} className="w-full h-auto rounded-lg" />}
            </div>
            <div className="p-6 text-center">
              <Link className="text-4xl text-stone-100 hover:text-lime-400 font-bold itim-regular" to={`/dogs/${dog.id}/detail`}>
                {dog.name}
              </Link>
              <p className="text-white italic mt-4">Data de Publicação: {new Date(dog.created_at).toLocaleDateString()}</p>
              <div className="flex justify-center space-x-3 mt-4">
                <Link to={`/dogs/${dog.id}/edit`} className="text-white hover:text-white bg-blue-700 hover:bg-cyan-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Editar</Link>
                <button onClick={() => { if (window.confirm("Tem certeza que deseja deletar este cachorro?")) handleDelete(dog.id) }} className="flex items-center justify-center rounded text-white text-sm tracking-wider font-medium border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-600">
                  <span className="border-r border-white pr-3">Excluir</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/teams" >
        <button type="button" className="my-4 text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">Voltar para Listagem</button>
      </Link>
    </div>
  );
}

export default DogList;
