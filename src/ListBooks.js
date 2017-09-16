import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array
  }

  render() {

    const { loading, books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            {loading && ( <p>Loading...</p> )}

            {!loading && (
              <div>
                {books.length &&
                  ( <BookShelf /> ) ||
                  ( <p>No shelfs to display.</p> )}
              </div>
            )}


          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
