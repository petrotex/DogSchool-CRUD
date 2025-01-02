// Importa o hook useState do React para gerenciar o estado e o hook useNavigate do react-router-dom para navegação entre rotas
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

// Importa as imagens necessárias
import pawLogo from '../assets/iconeschool.png'

// Importa o arquivo de estilo CSS
import '../styles/Login.css'

// Define o componente Login
function Login() {
  // Define estados para o nome de usuário e senha
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Obtém a função de navegação do hook useNavigate
  const navigate = useNavigate()

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Faz uma solicitação POST para a API para obter o token de acesso
      const response = await api.post(`/login/`, { username, password })
      // Armazena o token de acesso no localStorage
      localStorage.setItem('token', response.data.access)
      // Redireciona para a página de listagem de posts após o login bem-sucedido
      navigate('/teams/')
    } catch (error) {
      // Registra qualquer erro ocorrido ao fazer login
      console.error('Erro ao fazer login:', error)
    }
  }

  // Retorna a interface do componente Login
  return (
    <div className="absolute inset-0 min-h-screen w-full bg-gradient-to-r from-cyan-900 via-blue-800 to-cyan-600 text-cyan-700"> 
  <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-43">
    <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
      <div>
        <a href="https://pawpatrol.fandom.com/wiki/PAW_Patrol_Wiki" target = '_blank  '>
          <img 
            src={pawLogo}
            alt="logo"
            className="w-52 mb-12 inline-block"
          />
        </a>
        <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
          Fazer o cadastro para adentrar no Lookup dos Caninos
        </h2>
        <p className="line-through text-sm mt-2 text-white">
          qualquer esquecimento de cadastro, basta adicionar "admin" nos dois XD
        </p>
        <p className="text-sm mt-6 text-white">
          Caso não possua conta, entre em<a href="http://127.0.0.1:8000/admin/auth/user/" target = '_blank' className="text-white font-semibold underline ml-1">Django Admin</a>
        </p>
      </div>

      <form className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full" onSubmit={handleSubmit}>
        <h3 className="text-3xl font-extrabold mb-12">
          Entre com sua Conta
        </h3>

        <div>
          <input
            name="username"
            type="text"
            required
            className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 text-gray-700"
            placeholder="Coloque seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            required
            className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 text-gray-700"
            placeholder="Coloque sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-sky-950 hover:bg-[#1e2741] focus:outline-none">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  )
}

// Exporta o componente Login
export default Login