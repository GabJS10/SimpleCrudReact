import React from 'react';

function TableData({ character, deleted, setDataForId }) {



     return (
          <tr>
               <td>{character.name}</td>
               <td>{character.ki}</td>
               <td>{character.breed}</td>
               <td>
                    <button onClick={e => setDataForId(character)}>Update</button>
                    <button onClick={e => deleted(character.id)}>Delete</button>
               </td>
          </tr>
     )
}


function Table({ data, deleted, setDataForId }) {
     return (
          <div>
               <table>
                    <thead>
                         <tr>
                              <th>Nombre</th>
                              <th>Ki</th>
                              <th>Raza</th>
                              <th>Acciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         {data.map(character => <TableData key={character.id} character={character} deleted={deleted} setDataForId={setDataForId} />)}

                    </tbody>
               </table>
          </div>

     )
}

export default Table;