import '../assets/styles/components/input_box.css';
import React from 'react';

// se setea que type por defecto sea text

export default function InputBox({
  name, setter, value, type = 'text',
}) {
  return (
        <div className = 'input_login'>
            <p>{name}</p>
            <input
                type = {type}
                value={value}
                onChange={(event) => { setter(event.target.value); }}
            ></input>

        </div>
  );
}
