import axios from 'axios';
import { forwardRef, useImperativeHandle, useState } from 'react';

const DeleteRoom = forwardRef(function ({ token }, ref) {
    const [roomId, setRoomId] = useState(0);
    const [roomName, setRoomName] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfoToDelete({ id, name }) {
            setRoomId(id);
            setRoomName(name);
        },
    }));

    const deleteRoom = () => {
        axios({
            method: 'delete',
            url: `http://34.128.115.142:8080/api/rooms/${roomId}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    };

    return (
        <div
            ref={ref}
            className='modal fade'
            id='deleteRoom'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex='-1'
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header border-bottom-0'>
                        <h1
                            className='modal-title fs-4 fw-bold'
                            id='staticBackdropLabel'
                        >
                            Xóa phòng học {roomName || 'này'} khỏi hệ thống?
                        </h1>
                    </div>
                    <div className='modal-body'>
                        Thông tin của phòng học đã xóa{' '}
                        <span className='fw-semibold text-dark'>
                            không thể khôi phục.
                        </span>
                    </div>
                    <div className='modal-footer border-top-0'>
                        <button
                            type='button'
                            className='btn btn-outline-dark fw-semibold'
                            data-bs-dismiss='modal'
                            onClick={deleteRoom}
                        >
                            Xóa phòng học
                        </button>
                        <button
                            type='button'
                            className='btn btn-danger fw-semibold'
                            data-bs-dismiss='modal'
                        >
                            Không xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DeleteRoom;
