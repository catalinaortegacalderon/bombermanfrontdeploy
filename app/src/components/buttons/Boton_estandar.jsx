import '../../assets/styles/components/buttons/Boton_estandar.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function StandardButton({ text, redirect_function }) {
  const history = useNavigate(); // hook para navegar paths

  return (
        <button
            className="boton_estandar"
            onClick={redirect_function}>
            {text}
        </button>
  );
}
