import React, { useState } from 'react';
import edit from './pencil.png';
import del from './delete.png';
import './App.css';

let item = [];
let subItem = {};

function App() {
 
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState("");  

  function dateChange(event){
    setDate(event.target.value);
  } 
  function distanceChange(event){
    setDistance(event.target.value);
  }

  function splitDate(origDate){
    let parts = origDate.split('.');
    let splittedDate = Number(parts[2] + parts[1] + parts[0]);
    return splittedDate;
  }
  /*
  function sortDate (){
    item.sort((prev, next) => {
      if ( prev.date > next.date ) return -1;
      if ( prev.date > next.date ) return 1;
  });
  */
  function sortDate (){
    item.sort((prev, next) => {
      if ( splitDate(prev.date) > splitDate(next.date) ) return -1;
      if ( splitDate(prev.date) > splitDate(next.date) ) return 1;
  });  
  
  }

  function newEntry (){
    let i;
    let flag = true;
    let cyrDistance;
      for (i = 0; i < item.length; i++ ){
        if (item[i].date === date){
          flag = false; 
          cyrDistance = Number(item[i].distance) + Number(distance);
          item[i].distance = Number(item[i].distance) + Number(distance);
          setResult(cyrDistance);
          sortDate ();
          setDistance("");
          setDate("");
        }
      }
    
      if (flag) {
        subItem.date = date;
        subItem.distance = distance; 
        setResult(item.splice(0, 0, subItem));
        sortDate ();
        subItem = {};
        setDistance("");
        setDate("");
      }
    
  }

  const delEntry = (param) => {
    setResult(item.splice(param, 1));
  };
  const editEntry = (param) => {
    setDistance(item[param].distance);
    setDate(item[param].date);
    setResult(item.splice(param, 1));

  }

  let rows = item.map(function(elem, index){
  return <>
    <tr key={`row-${index}`}>
      <td className = "cell date-item" key={`tr-${index}`}>
        {elem.date}
      </td>
      <td className = "cell distance-item" key={`distance-${index}`}>
         {elem.distance}
      </td>
      <td className = "cell edit-item" key={`edit-${index}`}>
        <span className="edit-item" onClick={() => editEntry(index)}><img src={edit} title = "Редактировать запись" alt=""/></span>
        <span className="delete-item" onClick={() => delEntry(index)}><img src={del} title = "Удалить запись" alt=""/></span>
      </td>   
    </tr>
  </>
  }
  )
  let tableClass = "clean";
  if (!result.isArray){
  tableClass = "bordered";
  }
  return <>
    <div className="App">
      <div className="form">
        <label><span>Дата (ДД.ММ.ГГ)</span>
          <input className="date" onChange={dateChange} value={date}/>
        </label>
        <label><span>Пройдено, км</span>
          <input className="distance" onChange={distanceChange} value={distance} />
        </label>        
        <button className="button" onClick={newEntry}>OK</button>
      </div>
      <table className={tableClass}>
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено, км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>;
}

export default App;
