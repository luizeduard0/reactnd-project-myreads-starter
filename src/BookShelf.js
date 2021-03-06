import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import humanize from 'string-humanize'

class BookShelf extends Component {

  static propTypes = {
    shelf: PropTypes.string.isRequired,
    shelfs: PropTypes.array,
    books: PropTypes.array,
    onUpdateBookShelf: PropTypes.func.isRequired
  }


  render() {

    const { shelf, shelfs, onUpdateBookShelf, books } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{humanize(shelf)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === shelf)
                  .map(book => (
                    <li key={book.id}>
                      <Book book={book} shelfs={shelfs} onUpdateBookShelf={onUpdateBookShelf} />
                    </li>
                  ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
