import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import api from '../api';
import '../styles/EditDog.css';
import FileUpload from "./FileUpload";
import InputField from './InputDog';
import miniBackgroundDog from '../assets/miniBackgroundDog.jpg';

function EditDog() {
  const { dogId } = useParams();
  const [fileName, setFileName] = useState("Insira a imagem de Corpo");
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const teamId = params.get('team');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Nenhum arquivo de Corpo anexado");
  };

  const handleFileUpload = (file) => {
    console.log("Arquivo selecionado:", file);
  };

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [bodyImage, setBodyImage] = useState('');
  const [nameImage, setNameImage] = useState('');
  const [currentBodyImage, setCurrentBodyImage] = useState('');
  const [currentNameImage, setCurrentNameImage] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [strength, setStrength] = useState('');
  const [observation, setObservation] = useState('');
  const [agility, setAgility] = useState('');
  const [intelligence, setIntelligence] = useState('');
  const [item, setItem] = useState('');
  const [team, setTeam] = useState(teamId);

  useEffect(() => {
    if (!dogId) return;

    api.get(`/dogs/${dogId}/`)
      .then(response => {
        const dogData = response.data;
        setName(dogData.name);
        setContent(dogData.content);
        setBodyImage(dogData.bodyimage);
        setNameImage(dogData.nameimage);
        setCurrentBodyImage(dogData.bodyimage);
        setCurrentNameImage(dogData.nameimage);
        setAge(dogData.age);
        setRace(dogData.race);
        setWeight(dogData.weight);
        setHeight(dogData.height);
        setGender(dogData.gender);
        setStrength(dogData.strength);
        setObservation(dogData.observation);
        setAgility(dogData.agility);
        setIntelligence(dogData.intelligence);
        setTeam(dogData.team);
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do cão:', error);
      });
  }, [dogId]);

  const handleBodyImageChange = (file) => {
    setBodyImage(file);
  };

  const handleNameImageChange = (file) => {
    setNameImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('content', content);
      formData.append('item', 1);
      formData.append('team', team);

      if (bodyImage && bodyImage !== currentBodyImage) {
        formData.append('bodyimage', bodyImage);
      }
      if (nameImage && nameImage !== currentNameImage) {
        formData.append('nameimage', nameImage);
      }

      formData.append('age', age);
      formData.append('race', race);
      formData.append('height', height);
      formData.append('weight', weight);
      formData.append('gender', gender);
      formData.append('strength', strength);
      formData.append('observation', observation);
      formData.append('agility', agility);
      formData.append('intelligence', intelligence);

      if (dogId) {
        await api.put(`/dogs/${dogId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Cão atualizado com sucesso!');
      } else {
        await api.post(`/dogs/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Cão criado com sucesso!');
      }
  
      // Use 'team' diretamente no redirecionamento após salvar
      navigate(`/dogs?team=${team}`);
    } catch (error) {
      console.error('Erro ao salvar cão:', error.response?.data || error);
    }
  };

  return (
    <div
      className="absolute inset-0 min-h-screen w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${miniBackgroundDog})`, backgroundRepeat: 'repeat' }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="edit-dog-container bg-blue-300 backdrop-blur-sm bg-opacity-30 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="atma-medium bg-gradient-to-r text-shadow from-lime-200 to-lime-400 bg-clip-text text-transparent henny-penny-regular">
            {dogId ? 'Editar Cão' : 'Adicionar Novo Cão'}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-3 flex flex-col items-center">
              {currentBodyImage && (
                <div className="flex justify-center">
                  <img src={currentBodyImage} alt="Imagem do Corpo do Cão" className="dog-body-image size-2/5" />
                </div>
              )}
              <FileUpload
                buttonText="Escolher Imagem"
                placeholderText="Nenhuma imagem de Corpo selecionada"
                onFileChange={handleBodyImageChange}
                inputId="bodyImageInput"
              />
            </div>
            <div className="flex flex-col items-center">
              {currentNameImage && (
                <div className="flex justify-center">
                  <img src={currentNameImage} alt="Imagem do Nome do Cão" className="dog-name-image" />
                </div>
              )}
              <FileUpload
                buttonText="Escolher Imagem"
                placeholderText="Nenhuma imagem de Nome selecionada"
                onFileChange={handleNameImageChange}
                inputId="nameImageInput"
              />
            </div>
            <div className="grid grid-cols-3 gap-1 gap-y-0">
              <InputField value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
              <InputField value={age} onChange={(e) => setAge(e.target.value)} placeholder="Idade" />
              <InputField value={race} onChange={(e) => setRace(e.target.value)} placeholder="Raça" />
              <InputField value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Altura" />
              <InputField value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Peso" />
              <InputField value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gênero" />
            </div>
            <div className="grid grid-cols-4 gap-0.5 gap-y-0">
              <InputField value={strength} onChange={(e) => setStrength(e.target.value)} placeholder="ATK" />
              <InputField value={observation} onChange={(e) => setObservation(e.target.value)} placeholder="OBS" />
              <InputField value={agility} onChange={(e) => setAgility(e.target.value)} placeholder="AGI" />
              <InputField value={intelligence} onChange={(e) => setIntelligence(e.target.value)} placeholder="INT" />
            </div>
            <InputField value={content} onChange={(e) => setContent(e.target.value)} placeholder="Conteúdo" isTextArea={true} />
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
            >
              {dogId ? 'Salvar' : 'Criar'}
            </button>
            {teamId && (
              <Link to={`/dogs?team=${teamId}`}>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Voltar
                </button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDog;
