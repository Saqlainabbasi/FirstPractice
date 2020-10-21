//
//this file will be responsible for the verifing if the user is login or not.......
//

import React,{ Component} from 'react';
import {connect} from 'react-redux';
import {auth} from '../Store/actions'

//creating a hof function that will recieve a Component as a prop
// and return new inhance Component....

export default function(ComposedClass,reload){

//composedClass is the component to be authenticated......

//creating a class to authenticate the component....

class Authenticate extends Component {
    
    state = {
        loading:true
    }

    componentWillMount(){
        this.props.dispatch(auth())
    }
    
    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        this.setState({loading:false})

        if(!nextProps.user.login.isAuth){

            if(reload){
                this.props.history.push('/login')
            }

        }else{
            if(reload === false){
                this.props.history.push('/user')
            }
        }

    }
    
    render(){
        if(this.state.loading){
            return <div className="loader">loading.....</div>
        }
        return(
            <ComposedClass {...this.props} user={this.props.user}/>
        )
    }
 }

 function mapStateToProps(state){
     return{
         user:state.user
        }
}
    return connect(mapStateToProps)(Authenticate)


}