/* eslint-disable react/prop-types */

import { useState } from 'react';
import './index.scss'


export default function TaskList({data}){
  let data1= data;
  let [exibirDiv, setExibirDiv] = useState(true);
  let [mudarTitulo,setMudarTitulo] = useState('');
  let [x, setX] = useState(1)
  let [selectedTaskId, setSelectedTaskId] = useState(2)
  let [deleteOrEdit, setDeleteOrEdit] = useState(true)
  let [edit,setEdit] = useState()
  

  function deleteCard(id){
    setExibirDiv(false)
    setMudarTitulo('excluir');
    setSelectedTaskId(id);
    setDeleteOrEdit(false)
    setEdit(false)
    }
  
    function deleteCardNo(){
      setExibirDiv(true);
      setDeleteOrEdit(true);
    }

    function deleteCardYes(){
    data1.splice(selectedTaskId, 1);
    setExibirDiv(true);
    setDeleteOrEdit(true)
    }

    function editCard(id){
      setExibirDiv(false);
      setMudarTitulo('editar');
      setSelectedTaskId(id);
      setDeleteOrEdit(false);
      setEdit(true);
    }
  
    function editCardNo(){
      setExibirDiv(true);
      setDeleteOrEdit(true);
    }
    
    function editCardYes(){
      let newTask = document.getElementById('newTaskTitle').value;
      let newDescription = document.getElementById('newTaskDescription').value;
      
      if(newTask != ''){
        let editedTask = new task(selectedTaskId + 1, newTask, newDescription );

        data1.splice(selectedTaskId, 1, editedTask);     
        setX(x + 1);
        setExibirDiv(true);
        setDeleteOrEdit(true);
        
      }else{
        alert('Digite o novo nome dessa tarefa. A descrição é opcional.')
      }
    }

  function adicionarTask(){
      let valorInput = document.getElementById('inputTask').value;
      
      if(valorInput == ''){
        return alert('Digite o título da sua tarefa antes de adicionar.')
      } else {
      let novaTask = new task(data1.length + 1, valorInput);
      data1.push(novaTask);
      document.getElementById('inputTask').value = '';
      setX(x + 1);
      }
    }
  
  class task {
    constructor(id,title,description){
      this.id = id;
      this.title = title;
      this.description = description;
    }
  }

  return (
            <div className='tasklist'>
              <div className="title">
                <p>Otimize seu tempo e se organize com o nosso Planejador Diário.</p>
              </div>
              {exibirDiv ? 
                <>
                  <div className='content'>
                    <p>Tarefa</p>
                    <p>Status</p>
                    <p>Opções</p>
                  </div>
                  <div className='whitebar'>
                  </div>
                  {data1.map((itens, index) => (
                  <div key={index} className='taskAdd'>
                    <p>{itens.title}</p>
                    <input className='inputCheckBox' type='checkbox'></input>
                    <div className='imagens'>
                        <img onClick={() => {
                        editCard(index);
                      }} 
                        src="Pencil.svg" alt="" />
                        <img onClick={() => {
                        deleteCard(index);
                        }} src="Trash.svg" alt="" />
                    </div>
                </div>
                ))}
                  <input placeholder='Digite uma nova tarefa' id="inputTask" className='inputTask' type='text' />
                  <button onClick={() => {adicionarTask()}}>+</button>
                </> : null}
              {deleteOrEdit ? 
                null : 
                  edit == true ? 
                  <div className="container">
                    <h1 id="titulo1">Deseja {mudarTitulo} esse item?</h1>
                    <p>{data1[selectedTaskId].description}</p>
                    <div className='editInputs'>
                      <input placeholder='Digite o novo título da tarefa' id="newTaskTitle" className='editInput' type='text' />
                      <input placeholder='Digite a nova descrição da tarefa' id="newTaskDescription" className='editInput' type='text' />
                    </div>
                    <div className='buttons'>
                      <button onClick={() => {editCardNo()}} className='blueButton'>Não</button>
                      <button onClick={() => {editCardYes()}}>Sim</button>
                    </div>
                  </div>
              : 
              <div className="container">
              <h1 id="titulo1">Deseja {mudarTitulo} esse item?</h1>
              <p>{data1[selectedTaskId].description}</p>
              <div className='buttons'>
                <button onClick={() => {deleteCardNo()}} className='blueButton'>Não</button>
                <button onClick={() => {deleteCardYes()}}>Sim</button>
              </div>
          </div>
               }
          </div>
          )}
