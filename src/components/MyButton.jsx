import { useState } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'antd-mobile'

import mySvg from '../assets/my.svg'
import notMySvg from '../assets/not-my.svg'

const MyButton = ( { setState = false } ) => { // 식당 id 값도 api 연결 후에 추가하기
    
    const [selected, setSelected] = useState(setState);
    const mySelected = () => {
        setSelected(!selected);
        // 로컬스토리지에 저장하는 로직 구현
    }
    
    return (
        <div onClick={mySelected}>
            {selected ? (<Image src={mySvg} width={40} />) : (<Image src={notMySvg} width={40} />)}
        </div>
    )
}

MyButton.propTypes = {
    setState: PropTypes.bool,
}

export default MyButton;