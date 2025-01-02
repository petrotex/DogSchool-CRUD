import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  
    
    // Página de login
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
