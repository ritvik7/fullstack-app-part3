import React from 'react'

const Person = ({person, handleDelete}) => 
  <div>
    {person.name} {person.number} <button onClick={handleDelete(person.id)}>delete</button>
  </div>

const Persons = ({persons, handleDelete}) => 
  <div>
    {persons.map(person => 
        <Person key={person.name} person={person} handleDelete={handleDelete}/>
    )}
  </div>

export {Persons}