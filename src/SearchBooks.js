import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AlertContainer from 'react-alert'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {

  static propTypes = {
    shelfs: PropTypes.array,
    books: PropTypes.array,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  state = {
    searching: false,
    results: []
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
  }

  search(query) {
    if(!query) {
      this.setState({ results: [] })
      return
    }

    if(query.length < 3) return

    if(this.state.searching) return

    this.setState({ searching: true })

    BooksAPI.search(query, 20)
      .then(results => {
        if(results.error) {
          results = []
          this.msg.show('You need to type something valid to search books', {
            type: 'error'
          })
          this.setState({'searching': false})
        } else {
          results = results.map(book => {
            const bookInAShelf = this.props.books.filter(b => b.id === book.id)
            if(bookInAShelf.length) book.shelf = bookInAShelf[0].shelf
            return book
          })
        }
        this.setState({ searching: false, results })
      })

  }

  render () {

    const { results, searching = false } = this.state
    const { shelfs, onUpdateBookShelf } = this.props

    return (

      <div className="search-books">
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="search-books-bar">
          <Link to="/" className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={event => this.search(event.target.value)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searching && (
              <li>Searching</li>
            ) || (
              results.map(book => (
                <li key={book.id}>
                  <Book book={book} shelfs={shelfs} onUpdateBookShelf={onUpdateBookShelf} />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
