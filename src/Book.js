import React from 'react'
import './App.css'
class Book extends React.Component{
    //note that there is no need to use state for this component because all
    //data are passed and used directly through the props (from the books component)
    
    //getAuthors: if there is more than 1 author for a book, this function
    //returns all authors followed by ',' except the last author
    getAuthors = () => `${this.props.book.authors.map( au => 
                                `${au}, `)}`.slice(0, `${this.props.book.authors.map( au => 
                                    `${au}, `)}`.lastIndexOf(","));
    handleChange = (selected) => {
        //get the changed book:
        let b= this.props.book;
        //change the changed book shelf to the chosen shelf: 
        b.shelf = selected.target.value;
        //if changing the book shelf happend to a book in the search results:
        if(this.props.moveBook === undefined){
            this.props.addBookFromSearch(b)
        }
        //else if changing the book shelf happend in the library books 
        else 
        this.props.moveBook(b);
    }
        
    render(){
        return(
            <li> 
                <div className="book">
                    <div className="book-top">
                            <div className="book-cover" style={{width: 128, height: 193}}>
                                {
                                /*if the book doesn't have picture property in the server,
                                show "N/A", else if image exists, show the image*/
                                this.props.book.imageLinks === undefined ? 
                                
                                <p style = {{textAlign:"center"}}>N/A</p>
                                :
                                <img src = {`${this.props.book.imageLinks.thumbnail}`} style ={{width:'100%', height:'100%'}} />
                                }
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChange} 
                              defaultValue={ //default value equal the book's shelf
                                  this.props.book.shelf}>
                                <option value="move" disabled>Move to...</option>        
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title"></div>
                          <div className="book-title">{this.props.book.title}</div>
                          <div className="book-authors">{
                              //if the book doesn't have authors in the server:
                             this.props.book.authors === undefined ? "no authors"
                             : //if there is authors, check if there is more than one:
                            (this.props.book.authors.length === 1 ? 
                            this.props.book.authors[0] : this.getAuthors()) //get all authors for this book
                        }
                    </div>
                </div>
            </li>
        )
    }
}
export default Book