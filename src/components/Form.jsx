import React, { useEffect, useState } from 'react';

const initialForm = {
     name:"",
     ki:"",
     breed:"",
     id:0
}

function Form({Create, Update, dataForId, setDataForId, metadata }) {

     const [form, setForm] = useState(initialForm);
     useEffect(() => {
          if(dataForId) setForm(dataForId)
     },[dataForId])

   
     const handleChange = (e) => {
       setForm({
         ...form,
         [e.target.name]: e.target.value,
       });
     };

     const handleSubmit = (e) => {
          e.preventDefault()

          if(form.id){
               Update(form)
          }else{
               Create(form)
          }

          handleReset()
     }

     const handleReset = (e) => {
          setForm(initialForm)
          setDataForId(null)
     }


     return (
     <div>
          <form onSubmit={handleSubmit}>
               <h3>{dataForId ? "Update a DBZ Character" : "Add a DBZ Character"}</h3>
               <input type="text" placeholder='Insert the name' name='name' value={form.name} onChange={handleChange}/>
               <br />
               <input type="number" placeholder='Insert the power (Ki)' name='ki' value={form.ki} onChange={handleChange}/>
               <br />
               <p>Elige tu raza</p>
                    <select name="breed" onChange={handleChange} value={form.breed}>
                         <option value="">- - -</option>
                         {metadata && metadata.map((el) => <option key={el.value} value={el.value}>{el.display_name}</option>)}
                    </select>
               <br />
               <input type="submit" value="Send" />
               <input type="button" value="Clear" onClick={handleReset}/>
               <br />
          </form>
     </div>
     );
}

export default Form;