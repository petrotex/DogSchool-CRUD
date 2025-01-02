import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api'; // Importa o módulo da API
import miniBackgroundTeam from '../../assets/miniBackgroundDog.jpg'; // Imagem de fundo
import FileUpload from "../FileUpload";

function EditTeam() {
  const { teamId } = useParams(); // Obtém o ID do time da URL
  const navigate = useNavigate(); // Função para navegação entre rotas

  // Estados para nome e imagem do time
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [currentImage, setCurrentImage] = useState(''); // Imagem atual do time

  // Busca os detalhes do time quando o `teamId` mudar
  useEffect(() => {
    if (!teamId) return; // Se não houver teamId, não faz nada

    api.get(`/teams/${teamId}/`) // Busca detalhes do time pela API
      .then(response => {
        setName(response.data.name); // Atualiza o nome
        setImage(response.data.image); // Atualiza a imagem
        setCurrentImage(response.data.image); // Salva a imagem atual para comparação
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do time:', error);
      });
  }, [teamId]);

  // Função para lidar com a alteração da imagem do time
  const handleImageChange = (file) => {
    setImage(file); // Atualiza o estado bodyImage com o arquivo selecionado
  };

  // Função para envio do formulário (criação/edição)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Cria um objeto FormData
      formData.append('name', name); // Adiciona o nome ao FormData

      // Adiciona a nova imagem ao FormData se for diferente da imagem atual
      if (image && image !== currentImage) {
        formData.append('image', image);
      }

      if (teamId) {
        // Se `teamId` existir, atualiza o time (PUT)
        await api.put(`/teams/${teamId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Time atualizado com sucesso!');
      } else {
        // Se `teamId` não existir, cria um novo time (POST)
        await api.post(`/teams/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Time criado com sucesso!');
      }

      navigate('/teams'); // Redireciona para a listagem de times
    } catch (error) {
      console.error('Erro ao salvar o time:', error.response?.data || error);
    }
  };

  return (
    <div
      className="absolute inset-0 min-h-screen w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${miniBackgroundTeam})`,
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Centraliza o formulário usando flexbox */}
      <div className="flex items-center justify-center h-full">
        <div className="edit-team-container bg-blue-300 backdrop-blur-sm bg-opacity-30 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="atma-medium bg-gradient-to-r text-shadow from-lime-200 to-lime-400 bg-clip-text text-transparent henny-penny-regular">
            {teamId ? 'Editar Time' : ' Adicionar Novo Time '}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-3 flex flex-col items-center">
              {/* Exibe a imagem atual do time, se existir */}
              {currentImage && (
                <div className="flex justify-center">
                  <img
                    src={currentImage}
                    alt="Imagem do Time"
                    className="mb-4 team-image size-3/5"
                  />
                </div>
              )}
              {/* Input para selecionar uma nova imagem do time */}
              <FileUpload 
              buttonText="Escolher Imagem" // Aqui você define o texto que aparecerá no botão
              placeholderText="Nenhuma imagem de Time selecionada" // Texto para exibir quando nenhum arquivo for selecionado
              onFileChange={handleImageChange} // Passa a função que será chamada quando o arquivo for selecionado
              inputId="teamInput" // Passando outro id único
              />
            </div>
            {/* Input para o nome do time */}
            <div className="my-6 w-full">
              <input
                className="bg-blue-900 text-white placeholder:text-gray-400"
                type="text"
                placeholder="Nome do Time"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Botão para salvar (criar ou editar) */}
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
            >
              {teamId ? 'Salvar' : 'Criar'}
            </button>
            {/* Link para voltar para a listagem */}
            <Link to="/teams">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Voltar para Listagem
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTeam;