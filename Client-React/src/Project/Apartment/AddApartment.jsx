import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { addApartment, getApartments, getCategories, getCities } from "../api";
import './style.css'
import { useSelector } from "react-redux";

export const AddApartment = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [allCities, setAllCities] = useState()
    const [AllApart, setAllApart] = useState()
    const [allCategories, setAllCategories] = useState()
    const [idCity, setIdCity] = useState()
    const [Img, setImg] = useState()
    const [idCategory, setIdCategory] = useState()
    // const [flag, setFlag] = useState(true)
   // let counter = 0;
    const currentAdvertiser = useSelector (store => store.currentAdvertiser)
      useEffect(() => {
            // קריאת שרת
            getCategories()
                .then(x => {
                    setAllCategories(x.data)
                    console.log(x.data);
                    // console.log(list);
                    
                })
                .catch(err => {
                    console.log(err);
                })
            getCities()
                .then(x => {
                    setAllCities(x.data)
                    console.log(x.data);
                    // console.log(list);
                    
                })
                .catch(err => {
                    console.log(err);
                })
                getApartments()
                .then(x => {
                    setAllApart(x.data)
                    console.log(x.data);
                    // console.log(list);
                    
                })
                .catch(err => {
                    console.log(err);
                })
                
        }, [])

      
        const cityById=(cityName)=>{
            console.log(cityName);
         for(let i=0;i<allCities.length;i++)
            if(allCities[i].name===cityName){
                console.log(allCities[i]);
                setIdCity(allCities[i]._id)
            }
         }
         const categoryById=(categoryName)=>{
            console.log(categoryName);
         for(let i=0;i<allCategories.length;i++)
            if(allCategories[i].name===categoryName){
                console.log(allCategories[i]);
                setIdCategory(allCategories[i]._id)
            }
         }
    const checkName = (value) => {
       let nameRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
        // match
        // value.match(/regex/)
        if (!value.match(nameRegex)) {
            setErrors({ ...errors, name: 'הכנס שם בעברית בלבד *' })
        }
        else {
            setErrors({ ...errors, name: '' })
            //counter += 1
        }
    }

    const checkDescription = (value) => {
        let desRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
         // match
         // value.match(/regex/)
         if (!value.match(desRegex)) {
             setErrors({ ...errors, description: 'הכנס שם בעברית בלבד *' })
         }
         else {
             setErrors({ ...errors, description: '' })
             //counter += 1
         }
     }
     const checkAddress = (value) => {
        let desRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
         // match
         // value.match(/regex/)
         if (!value.match(desRegex)) {
             setErrors({ ...errors, description: 'הכנס שם בעברית בלבד *' })
         }
         else {
             setErrors({ ...errors, description: '' })
             //counter += 1
         }
     }
 
  

    const checkNumBeds = (value) => {
        let visaRegex = /^[0-9]{1,2}$/
        if (!value.match(visaRegex)) {
            setErrors({ ...errors, numBeds: 'מספר מיטות לא תקין*' })
        }
        else {
            setErrors({ ...errors, numBeds: '' })
            //counter += 1
        }
    }
    const checkPrice = (value) => {
        let visaRegex = /^[0-9]{3,5}$/
        if (!value.match(visaRegex)) {
            setErrors({ ...errors, price: ' מחיר לא תקין*' })
        }
        else {
            setErrors({ ...errors, price: '' })
            //counter += 1
        }
    }
    
    const savePic = (event) => {
        for (let i = 0; i < AllApart.length; i++) {
            if (AllApart[i].img == event) {
                setImg(AllApart[i].img)
            }
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


            const apartment = {
                name: event.target[0].value,
                description: event.target[1].value,
                img:Img,
                city:idCity,
                category:idCategory,
                address: event.target[5].value,
                numBeds: event.target[6].value,
                price: event.target[7].value,
                advertiser:currentAdvertiser._id
            }

            if (!errors.name==''||!errors.description==''||!errors.address==''||!errors.numBeds==''||!errors.price=='') {
                swal(`שגיאה`,'קיימת שגיאה במילוי הנתונים אנא בדוק טופס','error')
                console.log(apartment);
                console.log(errors);
                
                
              }
              else  {
                addApartment(apartment)
                  .then(()=>{
                      console.log(apartment);
                     
                      swal(`דירה ${apartment.name}`, ' נוספה בהצלחה למערכת ', 'success')
                           navigate(`/apartments`)    
                  })
                  .catch((x)=>{
                      console.log(apartment);
                      console.log(x);
                      swal(` ${apartment.name}`, '  הוספת הדירה כשלה', 'error')
                          //    dis(setCurrentAdvertiser(advertiser))
                          navigate(`/apartments`)    
                          //  localStorage.setItem('token', x.data.token)  
                  })
              }
         
            }
           
       // }
    
    return <> <div className="add">
        <h1>הוספת דירה</h1>
        {/* { codeU: '100', userName: 'נחמי', id: '328183603', phone: '0556723622', password: '622', visaNum: '4580345612895674', ex: '07/27', cvv: '456', typeCode: '2' }, */}
        {/* איך עושים משתנים שהמשתמש לא יכול לגשת קוד אוטומטי, משתמש רגיל/ מנהל */}
        
        <form onSubmit={(e) => add(e)}>

            {/* רק אותיות */}
            <label htmlFor="name" className="lable">הכנס שם לדירתך</label>
            <div className="d1"><input type="text" id='name' placeholder=" שם" className="input" required onChange={(e) => checkName(e.target.value)}></input>
            <p className="error">{errors.name}</p>
            </div>

            <label htmlFor="description" className="lable"> תאור נוסף לדירה </label>
            <div className="d1"><input type="text" id='description' placeholder="תיאור" className="input"  onChange={(e) => checkDescription(e.target.value)}></input>
            <p className="error">{errors.description}</p>
            </div>

            <h4>בחר תמונה מתוך המאגר:</h4>
            <select className="select" onChange={(e) => savePic(e.target.value)}>
                <option className="option" disabled selected>בחר תמונה:</option>
                {/* הפרמטר הראשון - האיבר הנוכחי במערך */}
                {/* הפרמטר השני - האינדקס */}
                { AllApart&&AllApart.map((item, index) => <option className="option" key={index} value={item.img}>{item.img}</option>)}
            </select>

            <select className="select" onChange={(e) => categoryById(e.target.value)}>
                    <option className="option" disabled selected>בחר קטגוריה :</option>
                    {allCategories&&allCategories.map((item, index) => <option className="optionC" key={index} value={item.name}>{item.name}</option>)}
                </select>

                <select className="select" onChange={(e) => cityById(e.target.value)}>
                    <option className="option" disabled selected>בחר עיר :</option>
                    {/* הפרמטר הראשון - האיבר הנוכחי במערך */}
                    {/* הפרמטר השני - האינדקס */}
                    {allCities&&allCities.map((item, index) => <option className="optionC" key={index} value={item.name}>{item.name}</option>)}
                </select><br></br>

                 <label htmlFor="address" className="lable"> כתובת </label>
            <div className="d1"><input type="text" id='address' placeholder="כתובת" className="input"  onChange={(e) => checkAddress(e.target.value)}></input>
            <p className="error">{errors.address}</p>
            </div>  
            {/* 9 ספרות */}
            <label htmlFor="numBeds" className="lable"> הכנס מספר מיטות</label>
            <div className="d1"><input type="text" id='numBeds' placeholder="מספר מיטות" className="input"  onChange={(e) => checkNumBeds(e.target.value)}></input>
            <p className="error">{errors.numBeds}</p></div>
           
            <label htmlFor="price" className="lable"> הכנס מחיר </label>
            <div className="d1"><input type="text" id='price' placeholder=" מחיר" className="input"  onChange={(e) => checkPrice(e.target.value)}></input>
            <p className="error">{errors.price}</p></div>
            <input className="input" type={'submit'} />


        </form>
        </div>

    </>
}