import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => {
        this.setState({ books })
        console.log('BOOKS', books)
      })

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListBooks} />
        <Route exact path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
