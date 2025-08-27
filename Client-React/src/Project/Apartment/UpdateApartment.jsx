import { useSelector } from "react-redux"
import {  getApartments, getCategories, getCities, updateApartment } from "../api"
import { useEffect, useState } from "react"
import swal from "sweetalert"
import { useNavigate } from "react-router"

export const UpdateApartment=()=>{


    const currentAdvertiser = useSelector(store => store.currentAdvertiser)
    const currentApartment = useSelector(store => store.currentApartment)
    const [allCategories, setallCategories] = useState()
    const [category, setCategory] = useState()
    const [allCities, setallCities] = useState()
    const [city, setCity] = useState()
    const [errors, setErrors] = useState({})
    const [Img, setImg] = useState()
    const navigate = useNavigate()
    const [AllApart, setAllApart] = useState()

    useEffect(() => {
        // קריאת שרת
        getCategories()
            .then(x => {

                setallCategories(x.data)
                console.log(x.data);

            })
            .catch(err => {
                console.log(err);
            })

        getCities()
            .then(x => {

                setallCities(x.data)
                console.log(x.data);

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

    const checkName = (value) => {
        let nameRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
        if (!value.match(nameRegex)) {
            setErrors({ ...errors, apartmentname: ' הכנס שם  בעברית בלבד*' })
        }
        else {
            setErrors({ ...errors, apartmentname: '' })
        }
    }

    const checkDescription = (value) => {
        let descriptionRegex = /^[א-ת]{2}[א-ת" "]{0,200}$/
        if (!value.match(descriptionRegex)) {
            setErrors({ ...errors, description: 'הכנס תאור בעברית בלבד עד 200 תוים*' })
        }
        else {
            setErrors({ ...errors, description: '' })
        }
    }

    const checkAddress = (value) => {
        let addressRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
        if (!value.match(addressRegex)) {
            setErrors({ ...errors, address: ' הכנס כתובת בעברית בלבד*' })
        }
        else {
            setErrors({ ...errors, address: '' })
        }
    }

    const checkNumBeds = value => {
        let numBedsRegex = /^[0-9]{1,2}$/
        if (!value.match(numBedsRegex)) {
            setErrors({ ...errors, numBeds: ' הכנס מספרים בלבד מוגבל ל-30 מיטות*' })
        }
        else {
            setErrors({ ...errors, numBeds: '' })
        }
    }
    const checkPrice = value => {
        let priceRegex = /^[0-9]{3,5}$/
        if (!value.match(priceRegex)) {
            setErrors({ ...errors, price: ' הכנס מספרים בלבד מוגבל ל10000 ש"ח ללילה*' })
        }
        else {
            setErrors({ ...errors, price: '' })
        }
    }

    const cityId = (name) => {

        for (let i = 0; i < allCities.length; i++) {
            console.log(allCities);
            if (allCities[i].name === name) {
                //setIdCity(allCities[i])
                
                setCity(allCities[i]._id)
                console.log(allCities[i]._id);
            }
        }
    }
    const categoryId = (name) => {

        for (let i = 0; i < allCategories.length; i++) {
            console.log(allCategories);
            
            if (allCategories[i].name === name) {
                //setIdCity(allCities[i])
                setCategory(allCategories[i]._id)
                console.log(allCategories[i]._id);
            }
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
       
       
        const apartment = {
            
            name: event.target[0].value,
            description: event.target[1].value,
            img: Img,
            category: category,
            city: city,
            address: event.target[5].value,
            numBeds: event.target[6].value,
            price: event.target[7].value,
            advertiser: currentAdvertiser._id
        }
        console.log(apartment);
        
        if(!errors.apartmentname==''||!errors.description==''||!errors.address==''||!errors.numBeds==''||!errors.price==''){
            swal(`שגיאה `, 'קיימת שגיאה במילוי הנתונים אנא בדוק טופס', 'error')
            console.log(errors);
                        
        }
        else{
            updateApartment(currentApartment._id, apartment)
            .then(()=>{  
              
              swal(`${currentAdvertiser.email}`, `הדירה ${apartment.name} עודכנה בהצלחה`, 'success')
              navigate(`/apartments`)
            
            }
        )
        .catch(x => {
            console.log(x);
            
            swal(`אחד הנתונים שהזנת שגויים`, 'עידכון נכשל ', 'error')
      
        })
        }
          }
return <>
    <div className="add">
        <h1>עידכון דירה</h1>

        <form onSubmit={(e) => add(e)}>

            {/* רק אותיות */}
            <label htmlFor="apartmentname" className="lable">הכנס שם דירה</label>
            <div className="d1"><input type="text" id='apartmentname' placeholder="שם" className="input" required onChange={(e) => checkName(e.target.value)}  defaultValue={currentApartment.name}></input>
                <p className="error">{errors.apartmentname}</p>
            </div>
            {/* 9 ספרות */}
            <label htmlFor="description" className="lable">הכנס תאור דירה</label>
            <div className="d1"><input type="text" id='description' placeholder="תאור" className="input" onChange={(e) => checkDescription(e.target.value)} defaultValue={currentApartment.description}></input>
                <p className="error">{errors.description}</p>
            </div>

            <h4>בחר תמונה מתוך המאגר:</h4>
            <select className="select" onChange={(e) => savePic(e.target.value)}>
                <option className="option" disabled selected>{currentApartment.img}</option>
                {/* הפרמטר הראשון - האיבר הנוכחי במערך */}
                {/* הפרמטר השני - האינדקס */}
                { AllApart&&AllApart.map((item, index) => <option className="option" key={index} value={item.img}>{item.img}</option>)}
            </select>

            {/*10 ספרות  */}
            <select className="select" onChange={(e) => categoryId(e.target.value)}>
                <option className="option"disabled  selected >{currentApartment.category}</option>
                {allCategories&&allCategories.map((item, index) => <option className="option" key={index} value={item.name}>{item.name}</option>)}
            </select><br></br>

            <select className="select" onChange={(e) => cityId(e.target.value)}>
                <option className="option" disabled selected >{currentApartment.city}</option>
                {allCities&&allCities.map((item, index) => <option className="option" key={index} value={item.name}>{item.name}</option>)}
            </select><br></br>

            <label htmlFor="address" className="lable">הכנס כתובת דירה</label>
            <div className="d1"><input type="text" id='address' placeholder="כתובת" className="input" required onChange={(e) => checkAddress(e.target.value)} defaultValue={currentApartment.address}></input>
                <p className="error">{errors.address}</p>
            </div>

            <label htmlFor="numBeds" className="lable"> הכנס מספר מיטות </label>
            <div className="d1"><input type="text" id='numBeds' placeholder="מספר מיטות" className="input" required onChange={(e) => checkNumBeds(e.target.value)} defaultValue={currentApartment.numBeds}></input>
                <p className="error">{errors.numBeds}</p></div>

            <label htmlFor="price" className="lable"> הכנס מחיר דירה ללילה  </label>
            <div className="d1"><input type="text" id='price' placeholder=" מחיר דירה ללילה" className="input" required onChange={(e) => checkPrice(e.target.value)} defaultValue={currentApartment.price}></input>
                <p className="error">{errors.price}</p></div>

    
    <input className="input" type={'submit'} />


</form >
</div >
</>
}

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router";
// import swal from "sweetalert";
// import { addApartment, getCategories, getCities, updateApartment } from "../api";
// import './style.css'
// import { useSelector } from "react-redux";

// export const UpdateApatment= () => {

//     const navigate = useNavigate()
//     const [errors, setErrors] = useState({})
//     const [allCities, setAllCities] = useState()
//     const [allCategories, setAllCategories] = useState()
//     const [idCity, setIdCity] = useState()
//     const [idCategory, setIdCategory] = useState()
//     // const [flag, setFlag] = useState(true)
//    // let counter = 0;
//     const currentAdvertiser = useSelector (store => store.currentAdvertiser)
//     const currentApartment = useSelector (store => store.currentApartment)
//     console.log(currentApartment);
    
//       useEffect(() => {
//             // קריאת שרת
//             getCategories()
//                 .then(x => {
//                     setAllCategories(x.data)
//                     console.log(x.data);
//                     // console.log(list);
                    
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })
//             getCities()
//                 .then(x => {
//                     setAllCities(x.data)
//                     console.log(x.data);
//                     // console.log(list);
                    
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })
//         }, [])

      
//         const cityById=(cityName)=>{
//             console.log(cityName);
//          for(let i=0;i<allCities.length;i++)
//             if(allCities[i].name===cityName){
//                 console.log(allCities[i]);
//                 setIdCity(allCities[i]._id)
//             }
//          }
//          const categoryById=(categoryName)=>{
//             console.log(categoryName);
//          for(let i=0;i<allCategories.length;i++)
//             if(allCategories[i].name===categoryName){
//                 console.log(allCategories[i]);
//                 setIdCategory(allCategories[i]._id)
//             }
//          }
//     const checkName = (value) => {
//        let nameRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
//         // match
//         // value.match(/regex/)
//         if (!value.match(nameRegex)) {
//             setErrors({ ...errors, name: 'הכנס שם בעברית בלבד *' })
//         }
//         else {
//             setErrors({ ...errors, name: '' })
//             //counter += 1
//         }
//     }

//     const checkDescription = (value) => {
//         let desRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
//          // match
//          // value.match(/regex/)
//          if (!value.match(desRegex)) {
//              setErrors({ ...errors, description: 'הכנס שם בעברית בלבד *' })
//          }
//          else {
//              setErrors({ ...errors, description: '' })
//              //counter += 1
//          }
//      }
//      const checkAddress = (value) => {
//         let desRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
//          // match
//          // value.match(/regex/)
//          if (!value.match(desRegex)) {
//              setErrors({ ...errors, description: 'הכנס שם בעברית בלבד *' })
//          }
//          else {
//              setErrors({ ...errors, description: '' })
//              //counter += 1
//          }
//      }
 
  

//     const checkNumBeds = (value) => {
//         let visaRegex = /^[0-9]{1,2}$/
//         if (!value.match(visaRegex)) {
//             setErrors({ ...errors, numBeds: 'מספר מיטות לא תקין*' })
//         }
//         else {
//             setErrors({ ...errors, numBeds: '' })
//             //counter += 1
//         }
//     }
//     const checkPrice = (value) => {
//         let visaRegex = /^[0-9]{3,5}$/
//         if (!value.match(visaRegex)) {
//             setErrors({ ...errors, price: ' מחיר לא תקין*' })
//         }
//         else {
//             setErrors({ ...errors, price: '' })
//             //counter += 1
//         }
//     }
    
//     const update = (event) => {
//         event.preventDefault();
//         console.log(event);
//         // if (counter != 7) {
//         //     swal(`שגיאה `, 'קיימת שגיאה במילוי הנתונים אנא בדוק טופס', 'error')
//         //     navigate(`/register`)
//         // }
//         //else {


//             const apartment = {
//                 name: event.target[0].value,
//                 description: event.target[1].value,
//                 city:idCity,
//                 category:idCategory,
//                 address: event.target[4].value,
//                 numBeds: event.target[5].value,
//                 price: event.target[6].value,
//                 advertiser:currentAdvertiser._id
//             }

//             if (!errors.name==''||!errors.description==''||!errors.address==''||!errors.numBeds==''||!errors.price=='') {
//                 swal(`שגיאה`,'קיימת שגיאה במילוי הנתונים אנא בדוק טופס','error')
//                 console.log(apartment);
//                 console.log(errors);
                
                
//               }
//               else  {
//                 updateApartment(apartment)
//                   .then(()=>{
//                       console.log(apartment);
                     
//                       swal(`דירה ${apartment.name}`, ' עוכנה בהצלחה  ', 'success')
//                            navigate(`/apartments`)    
//                   })
//                   .catch((x)=>{
//                       console.log(apartment);
//                       console.log(x);
//                       swal(` ${apartment.name}`, '  עדכון הדירה נכשל', 'error')
//                           //    dis(setCurrentAdvertiser(advertiser))
//                           navigate(`/apartments`)    
//                           //  localStorage.setItem('token', x.data.token)  
//                   })
//               }
         
//             }
           
//        // }
    
//     return <> <div className="add">
//         <h1>הוספת דירה</h1>
//         {/* { codeU: '100', userName: 'נחמי', id: '328183603', phone: '0556723622', password: '622', visaNum: '4580345612895674', ex: '07/27', cvv: '456', typeCode: '2' }, */}
//         {/* איך עושים משתנים שהמשתמש לא יכול לגשת קוד אוטומטי, משתמש רגיל/ מנהל */}
        
//         <form onSubmit={(e) => update(e)}>

//             {/* רק אותיות */}
//             <label htmlFor="name" className="lable">הכנס שם לדירתך</label>
//             <div className="d1"><input type="text" id='name' placeholder=" שם" className="input" required onChange={(e) => checkName(e.target.value)} value={currentApartment.name}></input>
//             <p className="error">{errors.name}</p>
//             </div>

//             <label htmlFor="description" className="lable"> תאור נוסף לדירה </label>
//             <div className="d1"><input type="text" id='description' placeholder="תיאור" className="input"  onChange={(e) => checkDescription(e.target.value)} value={currentApartment.description}></input>
//             <p className="error">{errors.description}</p>
//             </div>

//             <select className="select" onChange={(e) => categoryById(e.target.value)}>
//                     <option className="option"  selected value={currentApartment.category.name}>{currentApartment.category.name}</option>
//                     {allCategories&&allCategories.map((item, index) => <option className="optionC" key={index} value={item.name}>{item.name}</option>)}
//                 </select>

//                 <select className="select" onChange={(e) => cityById(e.target.value)}>
//                     <option className="option" selected value={currentApartment.city.name}>{currentApartment.city.name}</option>
//                     {/* הפרמטר הראשון - האיבר הנוכחי במערך */}
//                     {/* הפרמטר השני - האינדקס */}
//                     {allCities&&allCities.map((item, index) => <option className="optionC" key={index} value={item.name}>{item.name}</option>)}
//                 </select>  

//                  <label htmlFor="address" className="lable"> כתובת </label>
//             <div className="d1"><input type="text" id='address' placeholder="כתובת" className="input"  onChange={(e) => checkAddress(e.target.value)} value={currentApartment.address}></input>
//             <p className="error">{errors.address}</p>
//             </div>  
//             {/* 9 ספרות */}
//             <label htmlFor="numBeds" className="lable"> הכנס מספר מיטות</label>
//             <div className="d1"><input type="text" id='numBeds' placeholder="מספר מיטות" className="input"  onChange={(e) => checkNumBeds(e.target.value)} value={currentApartment.numBeds} ></input>
//             <p className="error">{errors.numBeds}</p></div>
           
//             <label htmlFor="price" className="lable"> הכנס מחיר </label>
//             <div className="d1"><input type="text" id='price' placeholder=" מחיר" className="input"  onChange={(e) => checkPrice(e.target.value)} value={currentApartment.price}></input>
//             <p className="error">{errors.price}</p></div>
//             <input className="input" type={'submit'} />


//         </form>
//         </div>

//     </>
// }