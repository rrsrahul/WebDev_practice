import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import {connect} from 'react-redux';

class Persons extends Component {
   
    render () {
        console.log(this.props.people)
        return (
            
            <div>
                <AddPerson personAdded={this.props.personAdded} />
                {this.props.people.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.personRemoved(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        people:state.people
    }
}
const mapDispatchToProps = dispatch =>
{
    return {
        personAdded:(name,age)=>{ dispatch({type:'ADD',name:name,age:age})},
        personRemoved:(id)=>{dispatch({type:'REM',id:id})}
    }
    //Comment

}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);