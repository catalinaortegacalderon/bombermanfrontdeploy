import '../../assets/styles/components/buttons/RegisterButton.css';
import { useNavigate } from 'react-router-dom';

export default function JugarButton() {
  const history = useNavigate(); // hook para navegar paths
  const redirect_jugar = () => {
    history('/partida');
  };

  return (
        <button className="boton_componente"
        onClick={redirect_jugar}>
            Jugar
        </button>

  );
}
