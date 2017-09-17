import React, { Component } from 'react'
import PropTypes from 'prop-types'
import humanize from 'string-humanize'


class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.array.isRequired,
  }

  render() {
    const { book, shelfs } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              {shelfs.map(shelf => (
                <option key={shelf} value="{shelf}">{humanize(shelf)}</option>
              ))}
              <option value="">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors.join(', ')}
        </div>
      </div>
    )
  }
}

export default Book
