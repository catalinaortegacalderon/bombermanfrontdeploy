import '../../assets/styles/components/buttons/BackButton.css';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const history = useNavigate(); // hook para navegar paths
  const goBack = () => {
    history(-1);
  };

  return (

        <button
            className='boton_componente'
            onClick={goBack}
        >
            Volver
        </button>

  );
}
