import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getBook,updateBookReview,deleteBook} from '../../Store/actions'

class EditReview extends PureComponent {
    
    state = {
        formdata:{
            _id:this.props.match.params.id,
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
        this.props.dispatch(updateBookReview(this.state.formdata))
        
    }

    deletePost =()=> {

        this.props.dispatch(deleteBook(this.props.match.params.id))

    }
    redirectUser =() => {
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')
        },1000)
    }

//this will load the data to show on the component using the book id...
    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }
//after the data is loaded this lifecycle will fill the state with the new data recieved
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        let book = nextProps.books.book;
        this.setState({
            formdata:{
                _id:book._id,
                name:book.name,
                author: book.author,
                review:book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price,
            }
        })

    }

    render() {
        let books = this.props.books
        return (
            <div className="rl_container article">
                {
                    books.updateBook ?
                        <div className='edit_confirm'>
                            post Updated !! <Link to={`/books/${books.book._id}`}>
                                click to check Update
                            </Link>
                        </div>
                        :null
                }
                {
                    books.deletePost ?
                        <div className='red_tag'>
                            post Deleted !! 
                            {this.redirectUser()}
                        </div>
                        :null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit Review</h2>

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

                    <button type='submit'>Edit Review</button>
                    <div className='delete_post'>
                        <div className='button' onClick={this.deletePost}>
                                Delete Review
                        </div>

                    </div>
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

export default connect(mapStateToProps)(EditReview);