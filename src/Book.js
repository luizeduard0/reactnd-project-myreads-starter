import React, { Component } from 'react'
import PropTypes from 'prop-types'
import humanize from 'string-humanize'


class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.array.isRequired
  }

  render() {
    const { book, shelfs, onUpdateBookShelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.smallThumbnail : 'https://placehold.it/128x193'}")` }}></div>
          <div className="book-shelf-changer">
            <select
              name="shelf"
              value={book.shelf}
              onChange={(e) => onUpdateBookShelf(book, e.target.value)}>
              <option value="" disabled>Move to</option>
              <option value="">None</option>
              {shelfs
                .map(shelf => (
                <option key={shelf} value={shelf}>{humanize(shelf)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(', ') : 'unkown'}
        </div>
      </div>
    )
  }
}

export default Book
