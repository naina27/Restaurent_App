import React,{useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

 import './Cform.css';
const FormData=(props)=>{

const[dishname, setDishname]=useState(undefined);
const[fieldname, setFieldname]=useState(undefined);
const[images, setImages]=useState(undefined);

    const handleChangeDishname = (e) => {
    setDishname(e.target.value)
     }
    const handleChangeFieldname = (e) => {
    setFieldname(e.target.value)
   }
   const handleChangeImages = (e) => {
    setImages(e.target.value)
   }

   const handleSubmit = async(e) => {
    e.preventDefault()
    const payload={
       dishname:dishname,
        fieldname:fieldname,
        images:images
    }
   console.log('Payload data',payload);
   const res=await axios.post('http://localhost:1000/createdish',payload)
   .then((res)=> 
   {console.log(res)},
   (error)=>{
       console.log(error);
   }
   );
}

    return (
      <div class="maindiv">
        <form onSubmit={handleSubmit}>
        <h2>Add Your Fev Dishes</h2>
        <p>
          <label>
            Dish Name:
            <input type="text" name="dishname" onChange={handleChangeDishname} />
          </label>
          </p>
          <p>
          <label>Images:
          <input type="file" name="images" onChange={handleChangeImages}/>
          </label>
          </p>
          <p>
          <label>Fieldname:
          <input type="text" name="fieldname" onChange={handleChangeFieldname}/>
          </label>
          </p>
          <button type="submit">Add</button>
        </form>
        <Link to="/menulist">
     <button type="button">
         Show MenuPannel
     </button>
     </Link>

      </div>
    )
  }

export default FormData
