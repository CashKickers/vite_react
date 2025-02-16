import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'antd-mobile'

import mySvg from '../assets/my.svg'
import notMySvg from '../assets/not-my.svg'

// const MyButton = ( { setState, id = null } ) => { // 식당 id 값도 api 연결 후에 추가하기

//     const [selected, setSelected] = useState(setState);
//     const [mySet, setMySet] = useState(() => {
//         const storedSet = localStorage.getItem('my');
//         if (storedSet) {
//             try {
//                 return new Set(JSON.parse(storedSet));
//             } catch (error) {
//                 console.error('Error parsing JSON from localStorage:', error);
//             }
//         }
//         return new Set();
//     });

//     // 로컬스토리지에서 값 가져오기
//     // useEffect(() => {
//     //     if (id === null) return;
//     //     const storedSet = localStorage.getItem('my');
//     //     if (storedSet) {
//     //         try {
//     //             const parsedSet = new Set(JSON.parse(storedSet));
//     //             setMySet(parsedSet);
//     //             setSelected(parsedSet.has(id));
//     //         } catch (error) {
//     //             console.error('Error parsing JSON from localStorage:', error);
//     //         }
//     //     }
//     // }, [id]);

//     // // setState가 변경될 때 selected 업데이트
//     // useEffect(() => {
//     //     setSelected(setState);
//     // }, [setState]);

//     // 로컬스토리지에 값 저장하기
//     const saveToLocalStorage = (set) => {
//         try {
//             const arrayFromSet = Array.from(set);
//             localStorage.setItem('my', JSON.stringify(arrayFromSet));
//         } catch (error) {
//             console.error('Error saving to localStorage:', error);
//         }
//     };

//     // Set에 값 추가하고 저장하는 함수
//     const addToSet = (value) => {
//         if (typeof value === 'object' && value !== null) {
//             console.warn('Skipping object with circular structure:', value);
//             return; // 객체라면 저장하지 않음
//         }
//         const newSet = new Set(mySet);
//         newSet.add(value);
//         setMySet(newSet);
//         saveToLocalStorage(newSet);
//     };

//     // Set에 값을 삭제하고 저장하는 함수
//     const deleteFromSet = (value) => {
//         const newSet = new Set(mySet);
//         if (mySet.has(value)) newSet.delete(value);
//         setMySet(newSet);
//         saveToLocalStorage(newSet);
//     }

//     // selected 상태 변경 감지하여 mySet 조작
//     useEffect(() => {
//         if (id !== null) {
//             console.log("before: ", localStorage.getItem('my'), selected);
//             if (selected) addToSet(id);
//             else deleteFromSet(id);

//             console.log("After: ", localStorage.getItem('my'), selected);
//         }
//     }, [selected]);

//     // 버튼 클릭 핸들러
//     const mySelected = () => {
//         setSelected((prev) => !prev);
//     };

//     return (
//         <div onClick={mySelected}>
//             {selected ? (<Image src={mySvg} width={30} />) : (<Image src={notMySvg} width={30} />)}
//         </div>
//     )
// }

// MyButton.propTypes = {
//     setState: PropTypes.bool.isRequired || null,
//     id: PropTypes.number,
// }

// export default MyButton;

const MyButton = ({ setState, id = null }) => {
    const [selected, setSelected] = useState(setState);
    const [mySet, setMySet] = useState(() => {
        const storedSet = localStorage.getItem('my');
        if (storedSet) {
            try {
                return new Set(JSON.parse(storedSet));
            } catch (error) {
                console.error('Error parsing JSON from localStorage:', error);
            }
        }
        return new Set();
    });

    // setState가 변경될 때 selected 값 업데이트
    useEffect(() => {
        setSelected(setState);
    }, [setState]);

    // 로컬스토리지에 값 저장하기
    const saveToLocalStorage = (set) => {
        try {
            localStorage.setItem('my', JSON.stringify(Array.from(set)));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    // Set에 값 추가 및 삭제
    const toggleSet = () => {
        const newSet = new Set(mySet);
        if (selected) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setMySet(newSet);
        saveToLocalStorage(newSet);
        setSelected(!selected);
    };

    return (
        <div onClick={toggleSet}>
            {selected ? <Image src={mySvg} width={30} /> : <Image src={notMySvg} width={30} />}
        </div>
    );
};

MyButton.propTypes = {
    setState: PropTypes.bool.isRequired,
    id: PropTypes.number,
};

export default MyButton;
