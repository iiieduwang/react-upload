import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      users:[]
    }
  }
  componentDidMount(){
    //ajax call
    this.getUsers();
  }
  getUsers(){
    fetch("/api/users")  //http://localhost:3000/api/users
      .then(res => res.json())
      .then(users => {
        console.log(users)
        this.setState({ users:users})
      })
  }
  loadHandler = () => {
    this.getUsers();
  }
  render() {
    return (
      <div className="container">
      <button type="button" className="btn btn-primary mt-3" data-toggle="modal" data-target="#formModal">
  新增
</button>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>頭像</th>
              <th>姓名</th>
              <th>年紀</th>
              <th>電子郵件</th>
            </tr>
          </thead>
          <tbody>
          {this.state.users.map(user=>
            <tr key={user.id}>
                <td><img src={"uploads/" + user.photo} className="img-thumbnail" /> </td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
            </tr>           
          )}
          </tbody>
        </table>
         <UserForm loadHandler = {this.loadHandler} />
      </div>
    );
  }
}

export default App;
