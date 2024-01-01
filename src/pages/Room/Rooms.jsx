import {useEffect, useRef, useState} from 'react';
import './Rooms.scss';
import axios from 'axios';
import RoomInfoForm from './RoomInfoForm';
import {Tooltip} from 'bootstrap';
import DeleteRoom from './DeleteRoom';
import Pagination from '../../components/Pagination';
import {useOutletContext} from 'react-router';

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime());
}

const Rooms = () => {
    const token = useOutletContext();

    const formRef = useRef(null);
    const deleteRoomRef = useRef(null);
    // const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [metaRecord, setMetaRecord] = useState({});
    const [currentPage, setCurrentPage] = useState('');

    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );

    const getRooms = async (query = '') => {
        // setLoading(true);
        const response = await axios({
            method: 'get',
            url: `http://34.128.115.142:8080/api/rooms?${query}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        const {records, meta_record} = response?.data || {};
        setRooms(records || []);
        setMetaRecord((state) => ({
            prev_query: meta_record?.prev_query || '',
            next_query: meta_record?.next_query || '',
        }));
    };

    useEffect(() => {
        getRooms(currentPage);
    }, [currentPage]);

    if (rooms.length)
        return (
            <>
                <RoomInfoForm
                    ref={formRef}
                    token={token}
                    getRooms={getRooms}
                />
                <DeleteRoom ref={deleteRoomRef} token={token}/>
                <div className='d-flex justify-content-between w-100 mb-4'>
                    <h2 className='fw-bold mb-0'>Phòng học</h2>
                    <button
                        type='button'
                        className='btn btn-danger fw-semibold'
                        data-bs-toggle='modal'
                        data-bs-target='#roomInfo'
                        onClick={() =>
                            formRef?.current?.updateInfo({formType: 'add'})
                        }
                    >
                        <i className='fa-solid fa-plus me-2'></i>
                        Thêm phòng học
                    </button>
                </div>
                <Pagination
                    metaRecord={metaRecord}
                    setCurrentPage={setCurrentPage}
                />
                <table className='mt-3 table table-hover border'>
                    <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Tên phòng</th>
                        <th scope='col'>Mô tả</th>
                        <th scope='col'>Tòa nhà</th>
                        <th scope='col'>Sức chứa</th>
                        <th scope='col'>Ngày tạo</th>
                        <th scope='col'>Ngày cập nhật</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room, roomIdx) => (
                        <tr key={roomIdx}>
                            {Object.values(room).map(
                                (value, valueIdx) => {
                                    return (
                                        <td
                                            key={valueIdx}
                                            scope={!valueIdx ? 'row' : ''}
                                        >
                                            {isIsoDate(value)
                                                ? new Date(
                                                    value
                                                ).toLocaleDateString()
                                                : value}
                                        </td>
                                    );
                                }
                            )}
                            <td className='table-actions d-flex align-items-center'>
                                <button
                                    className='action'
                                    data-bs-toggle='modal'
                                    data-bs-target='#roomInfo'
                                    onClick={() =>
                                        formRef?.current?.updateInfo({
                                            ...room,
                                            formType: 'edit',
                                        })
                                    }
                                >
                                    <i
                                        className='fa-solid fa-pen'
                                        data-bs-toggle='tooltip'
                                        data-bs-placement='top'
                                        data-bs-custom-class='custom-tooltip'
                                        data-bs-title='Thay đổi thông tin'
                                    ></i>
                                </button>
                                <button
                                    className='action'
                                    data-bs-toggle='modal'
                                    data-bs-target='#deleteRoom'
                                    onClick={() =>
                                        deleteRoomRef?.current?.updateInfoToDelete(
                                            {
                                                id: room.id,
                                                name: room.name,
                                            }
                                        )
                                    }
                                >
                                    <i
                                        className='fa-solid fa-trash'
                                        data-bs-toggle='tooltip'
                                        data-bs-placement='top'
                                        data-bs-custom-class='custom-tooltip'
                                        data-bs-title='Xóa phòng học'
                                    ></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    metaRecord={metaRecord}
                    setCurrentPage={setCurrentPage}
                />
            </>
        );
};

export default Rooms;
