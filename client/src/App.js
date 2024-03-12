import './App.css';
import React, { Fragment } from 'react';
import InputTodo from './InputTodo';
import ListTodo from './ListTodo';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
