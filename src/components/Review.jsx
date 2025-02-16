import PropTypes from 'prop-types'

import Tag from './Tag';

import '../styles/review.css'

const Review = ( { userName, tags, content, date } ) => {
    return (
        <div className="review-container">
            <div className="review-header">
                <div className="review-person">
                    {userName}
                </div>
                {tags ? ( tags.map(item => (
                    <Tag title={item} key={item} />
                ))
                ) : null}
            </div>
            <div className="review-content">
                {content}
            </div>
            <div className="review-footer">
                {date}
            </div>
        </div>

    );
}

Review.propTypes = {
    userName: PropTypes.string.isRequired,
    tags: PropTypes.array,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default Review;