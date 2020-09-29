import React, { Component } from 'react';
import Person from './Person/Person';
//import UserInput from './UserInput/UserInput'

import './App.css';
//import UserOutput from './UserOutput/UserOutput';




class App extends Component
{

  state={
    persons:[
      {name:'Rahul',age:10},
      {name:'Rrs',age:12},
      {name:'Heisen',age:22}
    ],
    showPersons:false
  }
  switchNameHandler = (newName)=>
  {
      this.setState({
        persons:[
          {name:'Rahul',age:10},
          {name:'Rrs',age:12},
          {name:newName,age:22}
        ]
      });
      //Setstate merges the arguement passed with the State, and does not discard other state values
  }
  nameChangedHandler = (event)=>
  {
    this.setState({
      persons:[
        {name:'Rahul',age:10},
        {name:event.target.value,age:12},
        {name:'Heisen',age:22}
      ],
      
    });
  }
  togglePersonsHandler = ()=>
  {
      let doesShow = this.state.showPersons;
      this.setState({showPersons:!doesShow});
  }
  render()
  {

    let persons = null;

    if(this.state.showPersons)
    {
      persons= (
        <div>
        <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}/>
        <Person 
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age}
        changed={this.nameChangedHandler}
        click ={this.switchNameHandler.bind(this,'Heisenbergs')} />
        <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age}/>

      </div>
      );
    }

    return (
      <div className="App">
         <h1>Functional React Programming</h1>
        <h1>Hi First React App</h1>
        <button onClick={this.togglePersonsHandler} >Switch</button>
          {persons}
      </div>
    );


  }

}


/*

class App extends Component
{

  state={
    userName:'None'
  }
 onNameChange  = (event)=>
  {
    this.setState(
      {
        userName:event.target.value
      }
    )
  }


  render()
  { 
   return ( <div className='App'>
          <UserInput change={this.onNameChange.bind(this)} username={this.state.userName}/>
        <UserOutput username={this.state.userName}/>
    </div>
   )
  }
}
*/
/*
React Hooks Syntax 
const App = props =>
{
 const [personsState,setPersonState] = useState({
    persons:[
      {name:'Rahul',age:10},
      {name:'Rrs',age:12},
      {name:'Heisen',age:22}
    ]
  });

  //does not merge the state, it replaces the old state data with the new state data
  const switchNameHandler = ()=>
  {
      setPersonState({
        persons:[
          {name:'Rahul',age:10},
          {name:'Rrs',age:12},
          {name:'Heisenberg',age:22}
        ]
      });
      //Setstate merges the arguement passed with the State, and does not discard other state values
  }

    return (
      <div className="App">
         <h1>Functional React Programming</h1>
        <h1>Hi First React App</h1>
        <button onClick={switchNameHandler} >Switch</button>
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
        <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
       
      </div>
    );


  
}
*/

/*function App() {
  


  return (
    <div className="App">
       <h1>Functional React Programming</h1>
      <h1>Hi First React App</h1>
      <Person name="Rahul" age="10"/>
      <Person name="R2" age="13"/>
      <Person name="Ra" age="11"/>
    </div>
  );
}*/

export default App;