import React, { Component } from 'react';
import {connect}  from 'react-redux';
import moment from 'moment-js';
import {getUserPost} from '../../Store/actions'
import {Link} from 'react-router-dom';

class UserPost extends Component {

    componentWillMount(){
        this.props.dispatch(getUserPost(this.props.user.login.id))
    }

    showPosts = (user) => (
        user.userPosts ?
            user.userPosts.map((item)=>(
              <tr key={item._id}>
                  <td>
                      <Link to={`/user/edit-post/${item._id}`} >
                          {item.name}
                      </Link>

                  </td>
                  <td>{item.author}</td>
                  <td>
                      {moment(item.createAt).format('MM/DD/YY')}
                  </td>
              </tr>  
            ))
        :null
    )


    render() {
        console.log(this.props)
         let user = this.props.user
        return (
            <div className="user_posts">
                <h4>Your reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Review</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showPosts(user)}
                    </tbody>
                </table> 
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(UserPost);