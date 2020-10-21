import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {addBookReview,clearNewBook} from '../../Store/actions'

class AddReview extends Component {
    
    state = {
        formdata:{
            name:'',
            author:'',
            pages:'',
            review:'',
            price:'',
        }
    }

//to handle the data entry by react controled component.....
    handleChange = (event,name) => {
        //making the copy of the state,to prevent direct mutation....
        let newformdata = { ...this.state.formdata}

        newformdata[name]= event.target.value

        this.setState({
            formdata:newformdata
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        // console.log(this.state.formdata)
        this.props.dispatch(addBookReview({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))
    }

    showNewBook =(book) => (
        book.post ?
        <div className='conf_link'>
            Saved !! <Link to={`/books/${book.bookId}`}>
                click to preview
            </Link>
        </div>
        :null
    )

    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add Review</h2>

                    <div className='form_element'>
                        <input
                            type='text'
                            placeholder='Enter name'
                            value={this.state.formdata.name}
                            onChange={(event)=>this.handleChange(event,'name')}
                        />
                    </div>
                    <div className='form_element'>
                        <input
                            type='text'
                            placeholder='Enter author'
                            value={this.state.formdata.author}
                            onChange={(event)=>this.handleChange(event,'author')}

                        />
                    </div>
                    <textarea
                        value={this.state.formdata.review}
                        onChange={(event)=>this.handleChange(event,'review')}

                    />
                    <div className='form_element'>
                        <input
                            type='number'
                            placeholder='Enter Pages'
                            value={this.state.formdata.pages}
                            onChange={(event)=>this.handleChange(event,'pages')}
                        />
                    </div>
                    <div className='form_element'>
                        <select 
                            value={this.state.formdata.rating}
                            onChange={(event)=>this.handleChange(event,"rating")}
                        
                        >
                                <option val='1'>1</option>
                                <option val='2'>2</option>
                                <option val='3'>3</option>
                                <option val='4'>4</option>
                                <option val='5'>5</option>
                        </select>
                    </div>
                    <div className='form_element'>
                        <input
                            type='number'
                            placeholder='Enter price'
                            value={this.state.formdata.price}
                            onChange={(event)=>this.handleChange(event,"price")}

                        />
                    </div>

                    <button type='submit'>Add Review</button>
                    {
                        this.props.books.newbook ?
                            this.showNewBook(this.props.books.newbook)
                        :null
                    }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        books:state.books
    }
}

export default connect(mapStateToProps)(AddReview);