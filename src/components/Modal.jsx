import PropTypes from 'prop-types'
import { Button, Image } from 'antd-mobile'

import '../styles/global.css'
import '../styles/modal.css'

import modalClose from '../assets/modal-close.svg'
import address from '../assets/address.svg'

const Modal = ( { isOpen, onClose, id, } ) => {

    return (
        <>
        {
            isOpen ? (
                <div className="modal">
                    {/* 상단 */}
                    <div className="modal-header">
                        <div className="modal-header-info">
                            <div className="modal-header-name">
                                <div>광화문 한옥집</div>
                                {/* My-button 버튼 */}
                            </div>
                            <Image src={modalClose} width="50px" onClick={onClose} />
                        </div>
                        <div className="modal-header-address">
                            <Image src={address} width="15px" />
                            <span style={{paddingLeft: "5px"}}>서울특별시 종로구 새문안로5가길 7 세종클럽 지하 1층</span>
                        </div>
                    </div>

                    <div style={{overflowY: "auto"}}>
                        {/* 그래프 */}
                        <div className="modal-content">
                                {/* 1번 멘트 */}
                                <div>
                                    이 식당은 <span className="bold">5개월 간</span>
                                </div>
                                {/* 그래프 */}
                                <div>
                                    그래프 들어갈 공간
                                </div>
                                {/* 2번 멘트 */}
                                <div>
                                    평점이 <span className="bold">꾸준히 오르고</span> 있어요!
                                </div>
                        </div>

                        {/* 요약 정보 */}
                        <div className="modal-content">
                            <div className='modal-header2'>리뷰 요약</div>
                            <div className='modal-review-sum'>
                                <Image src={address} width={15} />
                                <span>
                                    맛에 대한 평가가 대체적으로 좋아요
                                </span>
                            </div>
                            <div className='modal-review-sum'>
                                <Image src={address} width={15} />
                                <span>
                                    맛에 대한 평가가 대체적으로 좋아요
                                </span>
                            </div>
                            <div className='modal-review-sum'>
                                <Image src={address} width={15} />
                                <span>
                                    맛에 대한 평가가 대체적으로 좋아요
                                </span>
                            </div>
                            <span>* 생성형 AI가 요약한 리뷰입니다.</span>
                        </div>

                        <div className="modal-content">
                            <div className="modal-header2">대표 이미지</div>
                            {/* 이미지 */}
                            <div className="modal-image">
                                <div className="modal-image-1">
                                    <Image src={address} />
                                </div>
                                <div className="modal-image-2">
                                    <Image src={address} />
                                    <Image src={address} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <Button
                            shape='rounded'
                            style={{ backgroundColor: 'var(--yellow)', color: '#fff' }} 
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
}

export default Modal;