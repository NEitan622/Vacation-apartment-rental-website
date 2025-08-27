import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { setCurrentUser } from "./redux/Actions";
import swal from "sweetalert"
import { setCurrentAdvertiser } from "./redux/Action";
import { login } from "../api";
import './style.css'

export const Login = () => {

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    //useSelector - שליפת נתונים מהסטייט - מקבל ביטוי למבדא שמקבל את הסטור ושולף מהסטייט את המשתנה הרצוי
    // const users = useSelector(store => store.users)
    // console.log(users);
    //useDispach -  - הפעלת פעולות - יצירת פעולות מסוג זה ושליחת פעולה עם הערך הרצוי
    const dis = useDispatch()



    const checkEmail = (value) => {
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!value.match(emailRegex)) {
            setErrors({ ...errors, email: 'כתובת מייל לא תקינה*' })
        }
        else {
            setErrors({ ...errors, email: '' })
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

        }
    }

    const connect = (event) => {
        event.preventDefault();
        const advertiser = {
            email: event.target[0].value,
            password: event.target[1].value,
        }


if(errors.email!=''||errors.password!='')
    swal(`הנתונים שהזנת שגויים  `, 'אנא נסה שוב', 'error')
else{
        login(advertiser)
            .then(x => {
                //history.ts:501 No routes matched location "/allcars/%D7%9E%D7%A8%D7%99%D7%9D" 
                //שגיעה המופיעה בעת הרצה כאשר המשתמש שמור אך לא מפריעה להרצה ולקישורים
                swal(`שלום ${advertiser.email}`, ' נכנסת בהצלחה', 'success')
                dis(setCurrentAdvertiser(x.data.advertiser))
              console.log(x.data.advertiser);
              console.log(x.data.advertiser);
              console.log(x.data.advertiser);

                navigate(`/apartments`)
                localStorage.setItem('token', x.data.token)
            })
            .catch(() => {
                    swal(`הנתונים שהזנת שגויים  `, 'אנא נסה שוב', 'error')

            })
            // const a = useSelector(store => store.currentAdvertiser)
            // console.log(a)

    }
    }
    return <>
        <div className="loginform">
            <h1>כניסה</h1>

            <form onSubmit={(e) => connect(e)}>
                <label htmlFor="email" >הכנס כתובת מייל </label>
                <div className="d1"><input type="text" id="email" className="input" placeholder=" כתובת מייל" required onChange={(e) => checkEmail(e.target.value)} />
                    <p className="error">{errors.email}</p></div>

                <label htmlFor="password" >הכנס סיסמא</label>
                <div className="d1"><input type="password" id="password" className="input" placeholder=" סיסמא" required onChange={(e) => checkPass(e.target.value)} />
                    <p className="error">{errors.password}</p></div>

                <input type={"submit"} className="input" />
            </form>
        </div>
    </>

}

