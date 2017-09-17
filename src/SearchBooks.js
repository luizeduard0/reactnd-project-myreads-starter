import React, { Component } from 'react'
import BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  state = {
    searching: false,
    results: []
  }

  search(query) {
    if(!query) return

    this.setState({ searching: true })

    console.log('SEARCHING FOR', query)

    BooksAPI.search(query, 20)
      .then(results => this.setState({ searching: false, results }))

  }

  render () {

    const { results, searching } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input onChange={event => this.search(event.target.value)} type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searching && (
              <li>Searching</li>
            ) || (
              results.map(book => (
                <li key={book.id}><Book book={book} /></li>
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
