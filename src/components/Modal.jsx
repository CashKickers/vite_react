import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types'
import { Button, Image } from 'antd-mobile'

import MyButton from './MyButton'
// 그래프 모듈 임포트

import { restaurantApi } from "../api/restaurant"
import { reviewSummaryApi } from "../api/reviewSummary"

import '../styles/global.css'
import '../styles/modal.css'

import modalCloseIcon from '../assets/modal-close.svg'
import addressIcon from '../assets/address.svg'
import flavorIcon from '../assets/flavor.svg'
import priceIcon from '../assets/price.svg'
import cleanIcon from '../assets/clean.svg'
import customerIcon from '../assets/customer.svg'
import moodIcon from '../assets/mood.svg'

const Modal = ( { isOpen, onClose, id, my = null } ) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    // 식당 기본 정보
    const [name, setName] = useState(null);
    const [isMy, setIsMy] = useState((my !== null) ? my : (state && state.my));
    const [address, setAddress] = useState(null);
    // 리뷰 변화
    const [month, setMonth] = useState(0);
    const [changeStatus, setChangeStatus] = useState();
    // 리뷰 요약
    const reviewSumIcons = [
        {type: 'flavor', icon: flavorIcon},
        {type: 'price', icon: priceIcon},
        {type: 'clean', icon: cleanIcon},
        {type: 'customer', icon: customerIcon},
        {type: 'mood', icon: moodIcon}
    ];
    const [reviewSums, setReviewSums] = useState([{ type: '', icon: '', content: ''}]);
    // 이미지
    const [imageLinks, setImageLinks] = useState([]);

    // 식당 정보 불러오는 api
    const loadRestaurant = async () => {
        try {
        const data = await restaurantApi({ id }); // Call the function with the correct parameters
        console.log(data);

        if (data && id === data.id) {
            setName(data.name);
            setAddress(data.address);
        }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    };

    // 자세히보기 버튼 클릭 시 디테일 페이지로 이동
    const onClick = () => {
        if (navigate) navigate('/details', {state: {from: 'map', my: my}})
    }

    useEffect(()=> {
        setIsMy((my !== null) ? my : (state && state.my))
        console.log("Modal: ", my, (state && state.my), (my !== null) ? my : (state && state.my), isMy);
    }, [my, state, isMy]);

    useEffect(()=> {
        if (isOpen) {
            loadRestaurant(id);
        }
        else {
            setName(null);
            setAddress(null);
        }
    }, [isOpen])

    return (
        <>
        {
            isOpen ? (
                <div className="modal">
                    {/* 상단 */}
                    <div className="modal-header">
                        <div className="modal-header-info">
                            <div className="modal-header-name">
                                <div style={{paddingRight: "7px"}}>{name}</div>
                                {/* <MyButton setState={my} id={id} /> */}
                                <MyButton setState={isMy} id={id} />
                            </div>
                            <Image src={modalCloseIcon} width="50px" onClick={onClose} />
                        </div>
                        <div className="modal-header-address">
                            <Image src={addressIcon} width="13px" />
                            <span style={{paddingLeft: "2px"}}>{address}</span>
                        </div>
                    </div>

                    <div style={{overflowY: "auto"}}>
                        {/* 그래프 */}
                        <div className="modal-content">
                                {/* 1번 멘트 */}
                                <div>
                                    <span className="bold">5개월 간</span>의 리뷰가
                                </div>
                                {/* 그래프 */}
                                <div>
                                    그래프 ~~ !!
                                </div>
                                {/* 2번 멘트 */}
                                <div>
                                    점점 <span className="bold">긍정적</span>으로 변하고 있어요!
                                </div>
                        </div>

                        {/* 요약 정보 */}
                        <div className='modal-header2'>리뷰 요약</div>
                        <div className='modal-info'>* 생성형 AI가 요약한 리뷰입니다.</div>
                        <div className="modal-content">
                            {reviewSums.map((type, icon, content) => {
                                <div className='modal-review-sum' key={type}>
                                    <Image src={icon} width={15} />
                                    <span>
                                        {content}
                                    </span>
                                </div>
                            })}
                        </div>

                        <div className="modal-header2">대표 이미지</div>
                        {/* <div className="modal-content"> */}
                        {/* 이미지 */}
                        <div className="modal-image">
                            <div className="modal-image-1">
                                <Image src={imageLinks[0]} fit='fill' />
                            </div>
                            <div className="modal-image-2">
                                <Image src={imageLinks[1]} fit='contain' />
                                <Image src={imageLinks[2]} fit='contain' />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                    <div className="modal-footer">
                        <Button
                            block
                            shape='rounded'
                            style={{ backgroundColor: 'var(--yellow)', color: '#fff' }}
                            onClick={onClick}
                        >
                            자세히 보기
                        </Button>
                    </div>

                </div>
            ) : null
        }
        </>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    my: PropTypes.bool || null,
}

export default Modal;