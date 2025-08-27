import { useEffect, useState } from "react";
import { getByAdvertiserId, getCategories, getCities, removeApartment } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { Apart } from "./Apart";
import Swal from "sweetalert2"
import { setCurrentApartment } from "./redux/Action";
import { useNavigate } from "react-router";


export const RemoveOrUpdateApartment=()=>{
    const [list, setList] = useState()
    const [allCategories, setallCategories] = useState()
    const [allCities, setallCities] = useState()
    const navigate=useNavigate()
    const dis = useDispatch()
    const currentAdvertiser=useSelector(store=>store.currentAdvertiser)


    useEffect(() => {
        
        // קריאת שרת
        getByAdvertiserId(currentAdvertiser._id)
            .then(x => {
            
                setList(x.data)
                    console.log(x.data);
                
            })
            .catch(err => {
                console.log(err);
            })
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
      
    }, [])

    const delApart=(ind)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "האם אתה בטוח?",
            text: "לאחר המחיקה לא ניתן להתחרט",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "אישור",
            cancelButtonText: "ביטול",
            reverseButtons: true
        })
       
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "נמחק",
                    text: " המחיקה בוצעה בהצלחה",
                    icon: "success"
                });
                // dis(deleteCar(ind))
                removeApartment(ind)
                .then(()=>{
                   navigate('/apartments')

                })
                .catch(()=>{

                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                  swalWithBootstrapButtons.fire({
                    title: "!בוטל",
                    text: "הדירה מופיעה במאגר ההשכרה",
                    icon: "info"
                  });
            }
        });
    
    }
    const cityId = (id) => {

        for (let i = 0; i < allCities.length; i++) {
            if (allCities[i]._id === id) {
                return allCities[i].name
            }
            return null
        }
    }
    const categoryId = (id) => {

        for (let i = 0; i < allCategories.length; i++) {
            if (allCategories[i]._id === id) {
                return allCategories[i].name
               
            }
            return null
        }
    }
    const updateApart=(apartment)=>{
        apartment.city=cityId(apartment.city)
        apartment.category=categoryId(apartment.category)
        dis(setCurrentApartment(apartment))
        // console.log(ind);
        
        
    navigate('/updateapartment')

        
        
    }
     
    return<><div className="AllC"> 
    {list&&list.map((x,index) =><div > <Apart key={index} apartment={x}></Apart>
    {currentAdvertiser&&<button id="del"onClick={() => delApart(x._id)}>מחק דירה</button>}
    {currentAdvertiser&&<button id="del"onClick={() => updateApart(x)}>עדכון דירה</button>}
    </div>)}
    {/* {change&&change.map((x,index) =><div > <Apart key={index} apartment={x}></Apart>
    {<button id="del"onClick={() => delApart(x._id)}>מחק דירה</button>}
    {<button id="del"onClick={() => updateApart(x)}>עדכון דירה</button>}
    </div>)} */}
    </div>
    </>
}