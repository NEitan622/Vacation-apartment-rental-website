import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { register } from "../api";
import { setCurrentAdvertiser } from "./redux/Action";
import './style.css'
export const Register = () => {
   
    const dis = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
  
//    // useEffect במקום! לעשות!!!!!
//     const users = useSelector(store => store.users)

    
const checkEmail = (value) => {
    let emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!value.match(emailRegex)) {
        setErrors({ ...errors, email: 'כתובת מייל לא תקינה*' })
    }
    else {
        setErrors({ ...errors, email: '' })
       // counter += 1
    }
}
    const checkPhone = (value) => {
        let phoneRegex = /^[0-9]{10}$/
        if (!value.match(phoneRegex)) {
            setErrors({ ...errors, phoneNumber: 'מספר נייד לא תקין*' })
        }
        else {
            setErrors({ ...errors, phoneNumber: '' })
           // counter += 1
        }
    }
    const checkPhone2 = (value) => {
        let phoneRegex = /^[0-9]{10}$/
        if (!value.match(phoneRegex)) {
            setErrors({ ...errors, phoneNumber2: 'מספר נייד לא תקין*' })
        }
        else {
            setErrors({ ...errors, phoneNumber2: '' })
           // counter += 1
        }
    }
    const checkPass = value => {
        if (value.length < 8) {
            setErrors({ ...errors, password: 'סיסמה קצרה מידי*' })
        }
        else if (value.length > 12) {
            setErrors({ ...errors, password: 'סיסמה ארוכה מידי*' })
        }
        else {
            setErrors({ ...errors, password: '' })
            //counter += 1
        }
    }

    
     const add = (event) => {
        event.preventDefault();
        console.log(event);
        // if (counter != 7) {
        //     swal(`שגיאה `, 'קיימת שגיאה במילוי הנתונים אנא בדוק טופס', 'error')
        //     navigate(`/register`)
        // }
        //else {


            const advertiser = {
                email: event.target[0].value,
                password: event.target[1].value,
                phoneNumber: event.target[2].value,
                phoneNumber2: event.target[3].value,
                apartments:[]
            }
            //לשלוף בuseeffect את כל המפרסמים 
            // let u = users.filter(x => x.id == user.id)[0] במקום זה
            if (errors.email!=''||errors.phoneNumber!=''||errors.password!='') {
              swal(`שגיאה`,'קיימת שגיאה במילוי הנתונים אנא בדוק טופס','error')
              console.log(advertiser);
              console.log(errors);
              
              
            }
            else  {
                register(advertiser)
                .then(x=>{
                    console.log(advertiser);
                   
                    swal(`שלום ${advertiser.email}`, ' נרשמת בהצלחה למערכת ', 'success')
                         dis(setCurrentAdvertiser(x.data.advertiser))
                         navigate(`/apartments`)
                         localStorage.setItem('token', x.data.token)     
                })
                .catch(()=>{
                    console.log(advertiser);
                    
                    swal(`שלום ${advertiser.email}`, 'מייל זה קיים במערכת הינך מועבר לכניסה', 'info')
                        //    dis(setCurrentAdvertiser(advertiser))
                         navigate(`/login`)
                        //  localStorage.setItem('token', x.data.token)  
                })
            }

    }
    return <> <div className="registerform">
        <h1>טופס הרשמה</h1>
    
        <form onSubmit={(e) => add(e)}>

            {/* רק אותיות */}
            <label htmlFor="email" className="lable">הכנס מייל</label>
            <div className="d1"><input type="text" id='email' placeholder="email" className="input" required onChange={(e) => checkEmail(e.target.value)}></input>
            <p className="error">{errors.email}</p>
            </div>   
             {/* */}
             <label htmlFor="password" className="lable"> צור סיסמא </label>
            <div className="d1"><input type="password" id='password' placeholder="סיסמא" className="input" required onChange={(e) => checkPass(e.target.value)} ></input>
            <p className="error">{errors.password}</p></div>
            {/*10 ספרות  */}
            <label htmlFor="phone" className="lable">הכנס מספר נייד</label><br></br>
            <div className="d1"><input  type="text" id='phone' placeholder="מספר נייד" className="input" required onChange={(e) => checkPhone(e.target.value)}></input>
            <p className="error">{errors.phoneNumber}</p></div>
            {/*10 ספרות  */}
            <label htmlFor="phone" className="lable"> (לא חובה) 2הכנס מספר נייד</label><br></br> 
            <div className="d1"><input  type="text" id='phone' placeholder="מספר נייד" className="input" onChange={(e) => checkPhone2(e.target.value)}></input>
            <p className="error">{errors.phoneNumber2}</p></div>
            
            <input className="input" type={'submit'} />


        </form>
        </div>

    </>
}