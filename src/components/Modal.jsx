import { useState, useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';

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

    // 식당 기본 정보
    const [name, setName] = useState(null);
    const [isMy, setIsMy] = useState((my !== null) ? my : false); // 왜 제대로 저장이 되지 않는 것인가...
    const [address, setAddress] = useState(null);
    // 리뷰 변화
    const [month, setMonth] = useState(0);
    const [changeStatus, setChangeStatus] = useState();
    // 리뷰 요약
    const reviewSumIcons = {
        '맛': flavorIcon,
        '가격': priceIcon,
        '청결도': cleanIcon,
        '고객응대': customerIcon,
        '분위기': moodIcon
    };
    const [reviewSums, setReviewSums] = useState([{ type: '', icon: '', content: ''}]);
    // 이미지
    const [imageLinks, setImageLinks] = useState([]);

    // api
    // - 식당 정보
    const loadRestaurant = async () => {
        try {
            const data = await restaurantApi({ id }); // Call the function with the correct parameters
            console.log("restaurant: ", data);

            if (data && id === data.id) {
                setName(data.name);
                setAddress(data.address);
                setImageLinks(data.images);
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    };
    // - 그래프
    // - 리뷰 요약
    const loadReviewSummary = async () => {
        try {
            const data = await reviewSummaryApi({ id });
            console.log("review summary: ", data);

            if (data && id === data.id) {
                const reviewSumData = data.map(value => (
                    {
                        'type': value.category,
                        'icon': reviewSumIcons[value.category],
                        'content': value.contents,
                    }
                ))
                setReviewSums(reviewSumData);
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생: ', error);
        }
    }

    // 자세히보기 버튼 클릭 시 디테일 페이지로 이동
    const onClick = () => {
        if (navigate) navigate('/details', {state: {from: 'map', }})
    }

    useEffect(()=> {
        console.log(id, my, isMy)
        if (isOpen) {
            loadRestaurant();
            loadReviewSummary();
        }
        else {
            setName(null);
            setAddress(null);
            setImageLinks([]);
            setReviewSums([]);
        }
    }, [isOpen])

    // useEffect(() => {
    //     if (isOpen) {
    //         const myList = localStorage.getItem('my');
    //         if (myList) {
    //             try {
    //                 const parsedSet = new Set(JSON.parse(myList));
    //                 setIsMy(parsedSet.has(id)); 
    //             } catch (error) {
    //                 console.error('Error parsing JSON from localStorage:', error);
    //             }
    //         } else {
    //             setIsMy(false);
    //         }
    //     }
    // }, [isOpen, id]);

    useEffect(() => {
        if (isOpen) {
            if (my !== null) {
                setIsMy(my); // my 값이 있으면 우선 적용
            } else {
                const myList = localStorage.getItem('my');
                if (myList) {
                    try {
                        const parsedSet = new Set(JSON.parse(myList));
                        setIsMy(parsedSet.has(id));
                    } catch (error) {
                        console.error('Error parsing JSON from localStorage:', error);
                    }
                } else {
                    setIsMy(false);
                }
            }
        }
    }, [isOpen, id, my]);
    

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
                                <MyButton setState={isMy} id={id} />
                                {/* <MyButton setState={setIsMy} id={id} /> */}

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
                                {/* 그래프 */}
                                <div>
                                    그래프 ~~ !!
                                </div>
                                {/* 멘트 */}
                                <div>
                                    점점 <span className="bold">긍정적</span>으로 변하고 있어요!
                                </div>
                        </div>

                        {/* 요약 정보 */}
                        <div className='modal-header2'>리뷰 요약</div>
                        <div className='modal-info'>* 생성형 AI가 요약한 리뷰입니다.</div>
                        <div className="modal-content">
                        {reviewSums.length > 0 ? (
                            reviewSums.map((review) => (
                                <div className='modal-review-sum' key={review.type}>
                                    <Image src={review.icon} width={15} />
                                    <span>
                                        {review.content}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div style={{textAlign: "center", padding: "5px 10px"}}>
                                맛, 가격, 청결도, 고객응대, 분위기와 관련된 리뷰가 부족합니다.
                            </div>
                        )}
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