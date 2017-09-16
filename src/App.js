import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => {
        this.setState({
          books,
          loading: false
        })
        console.log('BOOKS', books)
      })

  }

  render() {

    const { books, loading } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={books} loading={loading} />
        )} />
        <Route exact path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
