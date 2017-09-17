import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    shelfs: [],
    loading: true
  }

  getBooks() {
    BooksAPI
      .getAll()
      .then(books => {

        const shelfs = [...new Set(books.map(b => b.shelf))]


        this.setState({
          shelfs,
          books,
          loading: false
        })
        console.log('BOOKS', books)
      })
  }

  bookAlreadyExists(bookId) {
    return this.state.books.filter(book => book.id === bookId).length
  }

  onUpdateBookShelf(book, newShelf) {
    book.shelf = newShelf
    BooksAPI.update(book.id, newShelf)
      .then(response => {
        this.setState(currentState => {
          books: this.bookAlreadyExists(book.id) ?
                      currentState.books.concat([book]) :
                      currentState.books.push(book)
        })
      })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {

    const { shelfs, books, loading } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            shelfs={shelfs}
            books={books}
            loading={loading}
            onUpdateBookShelf={(book, newShelf) => this.onUpdateBookShelf(book, newShelf)} />
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks
            shelfs={shelfs}
            onUpdateBookShelf={(book, newShelf) => this.onUpdateBookShelf(book, newShelf)} />
        )}  />
      </div>
    )
  }
}

export default BooksApp
