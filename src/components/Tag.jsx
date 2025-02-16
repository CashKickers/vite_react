import PropTypes from 'prop-types';
import { useState } from 'react'

import { useAppDispatch } from "../store/hooks";
import { selectCategory } from '../store/reviewSlice';

import '../styles/review.css'

const Tag = ( {title, size = 'small', isCategory = false, selected} ) => {
    // redux
    const dispatch = useAppDispatch();
    
    const [isSelected, setIsSelected] = useState(selected);

    const onClick = () => {
        if (!isCategory) return;
        setIsSelected(!isSelected)
        dispatch(selectCategory(title))
    }

    return (
        <div
            className={`tag tag-${size} ${isCategory ? (isSelected ? '' : 'tag-unselected'):''}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

Tag.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.arrayOf('small', 'big'),
    isCategory: PropTypes.bool,
    selected: PropTypes.bool,
}

export default Tag;