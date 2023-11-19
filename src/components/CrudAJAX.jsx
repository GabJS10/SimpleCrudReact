import React, { useState, useEffect } from 'react';

import Table from './Table';
import Form from './Form';
import MyFetch from '../helpers/fetchHook';
import Loader from './Loader';
import Message from './Message';
function CrudAJAX() {
     const [data,setData] = useState(null) 
     const [dataForId,setDataForId] = useState(null) 
     const [breed,setBreed] = useState([])
     const [isLoading,setIsLoading] = useState(null)
     const [error,setError] = useState(null)
     const url = "http://127.0.0.1:8000/api/characters/"
     const my_fetch = MyFetch()


     useEffect(() => {
          my_fetch.
          optionsCors(url)
          .then((res) => {
               if (!JSON.stringify(res)) {
                    setBreed(res.actions.POST.breed.choices)
               }
          })

     },[])

     useEffect(() => {
          setIsLoading(true)
          my_fetch.
          get(url)
          .then((res) => {
               if (!JSON.stringify(res)) {
                    setData(res)
                    setIsLoading(false)
               }
          })

     },[url])

     const Create = (dataEntry) => {
          my_fetch.post(url,{data:dataEntry})
          .then(res => {
               if(!res.error){
                    setData([...data,res])
                    setError(null)
               }else{
                    setError(res)
               }
          })
     }

     const Update = (dataEntry) => {
          my_fetch.put(`${url}${dataEntry.id}/`,{data:dataEntry})
          .then(res => {
               if(!res.error){
                    setData(data.map(el => el.id === res.id ? res : el))
                    setError(null)
               }else{
                    setError(res)
               }

          })
     }

     const deleted = (id) => {
          my_fetch.deleted(`${url}${id}/`)
          .then(res => {
               let newData = data.filter(el => el.id != id)
               setData(newData)
          })
     }

     return ( 
          <div>
               <h1>Basic CRUD with Ajax</h1>
               <article className='grid-1-2'> 
                    <Form Create = {Create} Update = {Update} dataForId={dataForId} setDataForId={setDataForId} metadata={breed}/>
                    {isLoading && <Loader/>}
                    {error && <Message msg={`${error.code}-${error.message}`} bgColor="#dc3545"/>}
                    {data && <Table data={data} deleted={deleted} setDataForId={setDataForId}/>}
               </article>
          </div>
      );

}

export default CrudAJAX