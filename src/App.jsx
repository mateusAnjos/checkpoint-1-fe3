import { useState } from 'react'
import './App.css'


function App() {
 const [id, setId] = useState("");
 const [title, setTitle] = useState("");
 const [category, setCategory] = useState("");
 const [date, setDate] = useState("");
 const [description, setDescription] = useState("");

 const [validateTitle, setValidateTitle] = useState("");
 const [validateCategory, setValidateCategory] = useState("");
 const [validateDate, setValidateDate] = useState("");
 const [validateDescription, setValidateDescription] =useState("");
 const [taskList, setTaskList] = useState([]); 

 


function addItem(event){
  event.preventDefault();
  
  if(validate()) return
  

  function validate(){
    let validado = false;
    if(title === ""){
      setValidateTitle("Campo Obrigatório!")
      validado = true;
    }else {
      setValidateTitle("");
    }

    if(category === "" ){
      setValidateCategory("Campo Obrigatório!")
      validado = true
    }else { setValidateCategory('');
    }

    if(date === "" ){
      setValidateDate("Campo Obrigatório!")
      validado = true
    }else {
      setValidateDate("");
    }
    if(description === "" ){
      setValidateDescription("Campo Obrigatório!")
      validado = true
    }else {
      setValidateDescription("");
    }
    return validado;
  }
  
  if(id){
  const copyTaskList = [...taskList];

  const index = copyTaskList.findIndex((task)=> task.id === id);

  copyTaskList[index].title = title;
  copyTaskList[index].category = category;
  copyTaskList[index].date = date;
  copyTaskList[index].description = description;

  setTaskList(copyTaskList);

  } else{
    setTaskList([...taskList, 
      {
        id: Date.now(),
        title,
        category,
        date,
        description,    
      },
    ]);
  }

  

setId("");
setTitle("");
setCategory("");
setDate("");
setDescription("");

}


function deleteItem(id){
  if(confirm("Deseja realmente apagar esse card?")) {
      const result = taskList.filter((item)=>item.id !== id);
      setTaskList(result);
  }
}

function stateFiller(item){
  setId(item.id);
  setTitle(item.title);
  setCategory(item.category);
  setDate(item.date);
  setDescription(item.description);
}




  return (
    
    <div className="container">
      <div className="boxCadastro">
        <form onSubmit={addItem}>
         <h2 id="formTitle">{id ? "Editar" : "Cadastrar"} Tarefa</h2>

         <input type="text" value={title} placeholder='Título' maxLength={40}  onChange={(event) => setTitle(event.target.value)}/>
         <small id='validateTitle'>{validateTitle}</small>

        <select name="categorias"   value={category}  id="cat" onChange={(event)=>setCategory(event.target.value)}>
          <option value="" disabled selected>Selecione a Categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Lazer">Lazer</option>
          <option value="Prioridade">Prioridade</option>
          <option value="Outros">Outros</option>
        </select>
        <small>{validateCategory}</small>
        
        <input type="date" value={date} placeholder="Data" onChange={(event) => setDate(event.target.value)} />
        <small>{validateDate}</small>
        
        <input placeholder="Descrição" value={description} type="text" maxLength={200} onChange={(event) => setDescription(event.target.value)}/>
        <small>{validateDescription}</small>
        

        <input type="submit" value={id ? "Salvar" : "Cadastrar"}  />
        </form>
      </div>
      
      <div className='boxTarefas'>
        <header>
          <h1>Minhas Tarefas</h1>
          <p>Total: {taskList.length} tarefas</p>
        </header>
        
        {taskList.length > 0 ?(
          <ul>
          {taskList.map((item) => (
            <li key={item.id}>
            <div className='card'>
              <div className='cardLeft'>
                <h2 className='cardTitle'>{item.title}</h2>
                <h3 className='cardCategory'>{item.category}</h3>
                <p className='cardDescription'>{item.description}</p>
              </div>
           
          
            <div className='cardRight'>
              <p className='cardDate'> {item.date.split('-').reverse().join('/')} </p>
              <div className="btns">
                <button className='editBtn'onClick={() => stateFiller(item)}></button>
                <button className='deleteBtn' onClick={() => deleteItem(item.id)}></button>
              </div>
            </div>
            </div>
          </li>
          ))}
          </ul>
        ) : (
          <p>Nenhum card cadastrado</p>
        )}

        
      </div>
    </div>
  )
}

export default App
