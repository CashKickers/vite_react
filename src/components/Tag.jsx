import PropTypes from 'prop-types';

import '../styles/review.css'

const Tag = ( {title, size = 'small'} ) => {
    return (
        <div className={`tag tag-${size}`}>
            {title}
        </div>
    );
}

Tag.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.arrayOf('small', 'big'),
}

export default Tag;