import { Route, Routes } from "react-router"
import { Apartments } from "./Apartments"
import { Home } from "./Home"
import { Register } from "./Register"
import { Login } from "./Login"
import { AddApartment } from "./AddApartment"
import './style.css'
import { RemoveOrUpdateApartment } from "./RemoveOrUpdateApartment"
import { UpdateApartment, UpdateApatment } from "./UpdateApartment"
export const Routing = () => {
    // הצהרות על ניתובים
    return <>
        {/* תגית עוטפת לכל הניתובים */}
        <Routes>
            {/* הצהרה על ניתוב בודד */}
            {/* path - url ניתוב - מה נכתוב בשורת ה */}
            {/* element - הקומפוננטה שנטען עבור הניתוב */}
            <Route path="apartments" element={<Apartments></Apartments>}></Route>
            <Route path= "register" element={<Register></Register>}></Route>
            <Route path="" element={<Home></Home>}></Route>
            <Route path="home" element={<Home></Home>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="addapartment" element={<AddApartment></AddApartment>}></Route>
            <Route path="removeorupdateapartment" element={<RemoveOrUpdateApartment></RemoveOrUpdateApartment>}></Route>
            <Route path="updateapartment" element={<UpdateApartment></UpdateApartment>}></Route>
        </Routes>
        

    </>
}