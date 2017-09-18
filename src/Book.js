import React, { Component } from 'react'
import PropTypes from 'prop-types'
import humanize from 'string-humanize'
import BookRating from './BookRating'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'


class Book extends Component {

  state = {
    showModal: false
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.array.isRequired
  }

  handleModalVisibility = showModal => {
    this.setState({ showModal });
  }

  render() {
    const { book, shelfs, onUpdateBookShelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div
            onClick={() => this.handleModalVisibility(true)}
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.smallThumbnail : 'https://placehold.it/128x193'}")` }}>
          </div>
          <div className="book-shelf-changer">
            <select
              name="shelf"
              value={book.shelf}
              onChange={(e) => onUpdateBookShelf(book, e.target.value)}>
              <option value="" disabled>Move to</option>
              <option value="">None</option>
              {shelfs
                .map(shelf => (
                <option key={shelf} value={shelf}>{humanize(shelf)}</option>
              ))}
            </select>
          </div>
        </div>
        <BookRating book={book} />
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(', ') : 'unknown'}
        </div>
        <a href="" className='book-see-more' onClick={e => {
          e.preventDefault()
          this.handleOpenModal()
        }}>See more</a>

        <ReactModal
           isOpen={this.state.showModal}
           contentLabel={book.title}>
           <div className='book-modal'>
             <button
               style={{float: 'right'}}
               onClick={() => this.handleModalVisibility(false)}>Close</button>

             <div className="book">
               <div className="book-top">
                 <div
                   onClick={() => this.handleModalVisibility(true)}
                   className="book-cover"
                   style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : 'https://placehold.it/128x193'}")` }}>
                 </div>
                 <div className="book-shelf-changer">
                   <select
                     name="shelf"
                     value={book.shelf}
                     onChange={(e) => onUpdateBookShelf(book, e.target.value)}>
                     <option value="" disabled>Move to</option>
                     <option value="">None</option>
                     {shelfs
                       .map(shelf => (
                       <option key={shelf} value={shelf}>{humanize(shelf)}</option>
                     ))}
                   </select>
                 </div>
               </div>
               <BookRating book={book} />
               <div className="book-title">{book.title}</div>
               <div className="book-authors">
                 {book.authors ? book.authors.join(', ') : 'unknown'}
               </div>
               <div className="book-categories">
                 {book.categories && (
                   book.categories.map(category => (
                     <Link
                       key={category}
                       to={{
                         pathname: '/search',
                         search: `?query=${category}`
                       }}>{category}</Link>
                   ))
                 )}
               </div>
               <div className="book-description">{book.description}</div>
               <div className="book-actions">
                 <a href={book.infoLink} target="_blank" className='btn'>Buy</a>
                 <a href={book.previewLink} target="_blank" className='btn'>Preview</a>
               </div>
             </div>
           </div>
        </ReactModal>

      </div>
    )
  }
}

export default Book
