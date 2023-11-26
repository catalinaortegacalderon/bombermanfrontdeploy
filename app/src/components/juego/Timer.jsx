import '../../assets/styles/components/juego/Timer.css';

export default function Timer(props) {
  return (
        <div className="timer">
            <div className="titulo">
                <p>{props.titulo}</p>
            </div>
            <div className="rectangulo">
                <p>00:00</p>
            </div>
        </div>
  );
}
