// import tip from './img/טיפים.png'
import back from './img/20.png'
// import s from './img/סניפים.png'
// import serves from './img/שירות.png'
import b from './img/35.png'
import { useNavigate } from 'react-router'
export const Home=()=>{
    const navigate=useNavigate()
    const set=()=>{
        navigate('/allapartments')
    }
    return<>
    <div id='home'>
    <div  className="mnav1">  .דירונופש  </div>
    <div ><img src={b} className='home11' onClick={(e)=>set()}></img>   
   <img src={back}className='home1' onClick={(e)=>set()}></img></div>
   
   {/* <div ><img src={s} className='home1'></img></div>
   <div ><img src={serves}className='home1' ></img></div>
    <div ><img src={tip} className='home1'></img></div> */}
    </div>
    </>
}