import React from 'react'

const Field = (props) => 
  <div>
      {props.name} :<input value={props.value} onChange={props.handleValue}/>
  </div>

const PersonForm = ({name, number, handlers: {handlePerson, handleName, handleNumber}}) => 
    <form onSubmit={handlePerson}>
        <Field name='name' value={name} handleValue={handleName} />
        <Field name='number' value={number} handleValue={handleNumber} />
        <button type="submit">add</button>
    </form>

export {PersonForm}
      