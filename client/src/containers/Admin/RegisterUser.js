import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUsers,userRegistration} from '../../Store/actions'

class RegisterUser extends Component {

    state = {
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:'',
    }

    componentWillMount(){
        this.props.dispatch(getUsers())
    }

    handleInputName = (event)=>{
        this.setState({name:event.target.value})
    }
    handleInputLastname = (event)=>{
        this.setState({lastname:event.target.value})
    }
    handleInputEmail = (event)=>{
        this.setState({email:event.target.value})
    }
    handleInputPassword = (event)=>{
        this.setState({password:event.target.value})
    }

    //to clear the form after submit..........
    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error !! Try Again'})
        }else{
            this.setState({
                name:'',
                email:'',
                lastname:'',
                password:'',
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''})
        this.props.dispatch(userRegistration({
            name:this.state.name,
            lastname:this.state.lastname,
            email:this.state.email,
            password:this.state.password,
        },this.props.user.users))
    }

    showUsers = (user)=>(
        user.users ?
            user.users.map(user =>(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                </tr>
            ))
        :null
    )

    render() {
        console.log(this.props)
        let user = this.props.user
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>


                    <div className='form_element'>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>
                    <div className='form_element'>
                        <input
                            type='text'
                            placeholder='Enter Lastname'
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>
                    <div className='form_element'>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className='form_element'>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type='submit'>Add User</button>

                </form>
                <div className='current_user'>
                    <h4>Current User</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(RegisterUser);