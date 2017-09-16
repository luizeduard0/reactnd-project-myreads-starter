import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array
  }

  render() {

    const { shelf, books } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === shelf)
                  .map(book => (
                    <li key={book.id}>
                      <Book book={book} />
                    </li>
                  ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
