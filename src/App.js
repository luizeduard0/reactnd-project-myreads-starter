import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => this.setState({ books }))

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookShelf} />
        <Route exact path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
