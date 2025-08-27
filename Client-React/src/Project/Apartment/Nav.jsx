import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './style.css'

export const Nav = () => {
 
    const advertiser = useSelector(x => x.currentAdvertiser)
    return <>

        {/* <div className='image'><img src={logo} ></img></div> */}

        <div className='nav'>
            {advertiser && <label className='username'>{advertiser.email}</label>}
        

            <div ><NavLink to={'apartments'} className='link'>הדירות שלנו</NavLink></div>
            <div ><NavLink to={'register'} className='link'>הרשמה</NavLink></div>
            <div ><NavLink to={'login'} className='link'>כניסה</NavLink></div>
            <div ><NavLink to={'home'} className='link'>דף הבית</NavLink></div>
        </div>

        {advertiser.email && <div className="mnav">
            <NavLink to={'removeorupdateapartment'} className='mlink' >עדכון ומחיקת דירה  </NavLink>
            <NavLink to={'addapartment'} className='mlink' >הוספת דירה  </NavLink>
            <NavLink to={'addcategory'} className='mlink' > הוספת קטגוריה  </NavLink>
            
        </div>}

    </>
}