import React from 'react'
import { Route } from 'react-router-dom'
import AlertContainer from 'react-alert'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import humanize from 'string-humanize'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    shelfs: [],
    loading: true
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
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

    const bookAlreadyExists = this.bookAlreadyExists(book.id)

    this.setState(currentState => {
      books:  bookAlreadyExists ?
              currentState.books.concat([book]) :
              currentState.books.push(book)
    })

    BooksAPI.update(book, newShelf)
      .then(response => {
        this.msg.show(bookAlreadyExists ? `Book moved to ${humanize(newShelf)}` : `Book added to ${humanize(newShelf)}`, {
          type: 'success'
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
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
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
            books={books}
            onUpdateBookShelf={(book, newShelf) => this.onUpdateBookShelf(book, newShelf)} />
        )}  />
      </div>
    )
  }
}

export default BooksApp
