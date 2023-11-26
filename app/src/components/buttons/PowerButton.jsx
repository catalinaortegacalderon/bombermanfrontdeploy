import '../../assets/styles/components/buttons/PowerButton.css';
import img_vida from '../../assets/images/vida.png';
import img_bomba from '../../assets/images/bomba.png';

export default function PowerButton(props) {
  // voy a tener que pasar el tipo de boton, y cuanto vale.
  // const history = useNavigate() // hook para navegar paths
  // const goBack = () => {
  //     history(-1);
  // }
  const { title } = props;
  const { image } = props;
  const { money } = props;
  const { item_info } = props;

  let vida_base = null;
  let bomba_base = null;

  if (item_info && item_info.length !== 0) {
    vida_base = item_info[0];
    bomba_base = item_info[1];
  }

  let content = null;
  if (money !== '0') {
    content = <p>{money}</p>;
  }
  const { onClick } = props;

  return (
        // <button className='power-button'
        // onClick={}></button>
        <button className='power-button' onClick={onClick}>
            <div className='title'><p>{title}</p></div>
            <div className='image'><img src={image}/></div>
            {vida_base !== null || bomba_base !== null ? (
                <div className='info'>
                    <div className='info-details'>
                        <img src={img_vida}/>
                        <p>{vida_base}</p>
                    </div>
                    <div className='info-details'>
                        <img src={img_bomba}/>
                        <p>{bomba_base}</p>
                    </div>
                </div>
            ) : null}
            <div className='content'>{content}</div>

        </button>
  );
}
