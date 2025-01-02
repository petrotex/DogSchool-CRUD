import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../api";
import StarRating from "../components/StarRating";
import "../styles/ReadDog.css";

function ReadDog() {
  const { dogId } = useParams();
  const [teamId, setTeamId] = useState(null); // ID do time associado ao cão

  // Definindo o estado para cada atributo do cão
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [bodyImage, setBodyImage] = useState('');
  const [nameImage, setNameImage] = useState('');
  const [owner, setOwner] = useState('');
  const [item, setItem] = useState({
    id: null,
    name: '',
    content: '',
    image: ''
  });

  // Etc
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const mapGender = (gender) => {
    if (gender === 'M') return 'Masculino';
    if (gender === 'F') return 'Feminino';
    return 'Indefinido';
  };
  
  // Atributos para avaliação do cão
  const [strength, setStrength] = useState(0);
  const [observation, setObservation] = useState(0);
  const [agility, setAgility] = useState(0);
  const [intelligence, setIntelligence] = useState(0);

  useEffect(() => {
    api.get(`/dogs/${dogId}/`)
      .then(response => {
        const data = response.data;
        setName(response.data.name);
        setContent(response.data.content);
        setBodyImage(response.data.bodyimage);
        setNameImage(response.data.nameimage);
        setOwner(response.data.owner); // Assumindo que isso retorna um objeto ou ID
        setItem(response.data.item);

        // Etc
        setAge(response.data.age);
        setRace(response.data.race);
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setGender(mapGender(response.data.gender));
        
        // Atribuindo os valores dos atributos de avaliação
        setStrength(response.data.strength);
        setObservation(response.data.observation);
        setAgility(response.data.agility);
        setIntelligence(response.data.intelligence);
        setTeamId(data.team_id); // Captura o ID do time associado ao cão
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do cão:', error);
      });
  }, [dogId]);

  return (
    <div className="inset-0 min-h-screen w-full bg-gradient-to-b from-slate-900 via-blue-800 to-cyan-500 text-cyan-700">
      <div className="read-dog-container justify-center items-center flex flex-col">
        {nameImage && (
          <img src={nameImage} alt="Imagem do Nome" className="name-image" />
        )}
            <p className="p-1 text-justify text-xl text-white" style={{ lineHeight: "1.5", padding: "60px" }}>
            {content}
            </p>
            <div className="my-12 gap-4 w-max mx-auto rounded-lg overflow-hidden flex mt-4">
      <button type="button"
        className="px-6 py-3 text-white text-sm tracking-wider font-semibold border-none outline-none hover:bg-blue-700">{age} Anos</button>
      <button type="button"
        className="px-6 py-3 text-white text-sm tracking-wider font-semibold border-none outline-none hover:bg-blue-700">{race}</button>
      <button type="button"
        className="px-6 py-3 text-white text-sm tracking-wider font-semibold border-none outline-none hover:bg-blue-700">{gender}</button>
       <button type="button"
        className="px-6 py-3 text-white text-sm tracking-wider font-semibold border-none outline-none hover:bg-blue-700">{height}m</button>
       <button type="button"
        className="px-6 py-3 text-white text-sm tracking-wider font-semibold border-none outline-none hover:bg-blue-700">{weight}kg</button>
            </div>
        <div className="grid grid-rows-1 grid-flow-col gap-2">
          {bodyImage && (
            <div className="row-span-1 col-span-2 flex justify-center">
              <img
                src={bodyImage}
                alt="Imagem do Cão"
                className="dog-image fixed-size"
              />
            </div>
          )}
          <div className="row-span-1 col-span-2 flex flex-col justify-center items-center">

            {/* Exibindo as estrelas para cada atributo */}
            <div className="grid grid-cols-2 gap-2">
            <div className="bg-orange-600 py-2.5 shadow-xl shadow-orange-200 text-white border-none outline-none active:shadow-inner p-2 rounded-lg text-sm tracking-wider font-medium border border-current outline-non mb-4">
              <h4 className="text-white text-lg">Força</h4>
              <StarRating value={strength} />
            </div>
            <div className="bg-orange-600 py-2.5 shadow-xl shadow-orange-200 text-white border-none outline-none active:shadow-inner p-2 rounded-lg text-sm tracking-wider font-medium border border-current outline-non mb-4">
              <h4 className="text-white text-lg">Agilidade</h4>
              <StarRating value={agility} />
            </div>
            <div className="bg-orange-600 py-2.5 shadow-xl shadow-orange-200 text-white border-none outline-none active:shadow-inner p-2 rounded-lg text-sm tracking-wider font-medium border border-current outline-non mb-4">
              <h4 className="text-white text-lg">Observação</h4>
              <StarRating value={observation} />
            </div>
            <div className="bg-orange-600 py-2.5 shadow-xl shadow-orange-200 text-white border-none outline-none active:shadow-inner p-2 rounded-lg text-sm tracking-wider font-medium border border-current outline-non mb-4">
              <h4 className="text-white text-lg">Inteligência</h4>
              <StarRating value={intelligence} />
            </div>
            </div>
            <div className="text-center text-white mt-4">
              {item && item.name && (
                <>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p>{item.content}</p>
                  <img src={item.image} alt={item.name} className="item-image mt-2 size-28" />
                </>
              )}
            </div>

          </div>
        </div>
        {/* Link com o parâmetro 'team' na URL */}
        {teamId && (
          <Link to={`/dogs?team=${teamId}`}>
            <button
              type="button"
              className="my-4 text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Voltar
            </button>
          </Link>
        )}

      </div>
    </div>
  );
}

export default ReadDog;
