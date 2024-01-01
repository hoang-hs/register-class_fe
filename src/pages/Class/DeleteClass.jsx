import axios from 'axios';
import { forwardRef, useImperativeHandle, useState } from 'react';

const DeleteClass = forwardRef(function ({ token }, ref) {
    const [classId, setClassId] = useState(0);
    const [className, setClassName] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfoToDelete({ id, name }) {
            setClassId(id);
            setClassName(name);
        },
    }));

    const deleteClass = () => {
        axios({
            method: 'delete',
            url: `http://34.128.115.142:8080/api/classes/${classId}`,
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
            id='deleteClass'
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
                            Xóa lớp học {className || 'này'} khỏi hệ thống?
                        </h1>
                    </div>
                    <div className='modal-body'>
                        Thông tin của lớp học đã xóa{' '}
                        <span className='fw-semibold text-dark'>
                            không thể khôi phục.
                        </span>
                    </div>
                    <div className='modal-footer border-top-0'>
                        <button
                            type='button'
                            className='btn btn-outline-dark fw-semibold'
                            data-bs-dismiss='modal'
                            onClick={deleteClass}
                        >
                            Xóa lớp học
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

export default DeleteClass;
