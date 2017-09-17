import React from 'react'

const BookRating = props => (
  <div className={`book-rating ${props.book.averageRating ? 'rated' : ''}`}>
    <i className="book-rating-icon"></i>
    {props.book.averageRating && (
      <div className="rate">{props.book.averageRating}</div>
    )}
    {!props.book.averageRating && (
      <div className="unrated">unrated</div>
    )}
  </div>
)

export default BookRating
