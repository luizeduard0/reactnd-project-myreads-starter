import React, { Component }  from 'react'
import PropTypes from 'prop-types'

const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

class SearchTermsSuggestion extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render() {
    return (
        <div className='search-terms-suggestions'>
        <h2>
          Don't know how to start?
          <small>Try using one of the terms bellow</small>
        </h2>
        <ol>
          {searchTerms.map(term => (
            <li key={term}>
              <a href="" onClick={(event) => {
                event.preventDefault()
                this.props.onClick(term)
              }}>
                {term}
              </a>
            </li>
          ))}
        </ol>
      </div>
    )
  }

}

export default SearchTermsSuggestion
