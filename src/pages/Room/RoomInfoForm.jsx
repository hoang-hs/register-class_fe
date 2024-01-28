import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import TextInput from '../../components/TextInput';
import {Modal} from 'bootstrap';
import axios from 'axios';

const RoomInfoForm = forwardRef(function ({token, getRooms}, ref) {
    const [formType, setFormType] = useState('add');

    const [id, setId] = useState(0);
    const [number, setNumber] = useState('');
    const [description, setDescription] = useState('');
    const [building, setBuilding] = useState('');
    const [totalInventory, setTotalInventory] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfo(props) {
            setFormType(props.formType);

            setId(props.id || 0);
            setNumber(props.number || '');
            setDescription(props.description || '');
            setBuilding(props.building || '');
            setTotalInventory(props.total_inventory || '');
        },
    }));

    const modal = Modal.getInstance(document.querySelector('#roomInfo'));

    console.log(id);

    const addNewRoom = useCallback(() => {
        axios({
            method: 'post',
            url: `http://34.101.208.43:8080/api/rooms`,
            data: {
                number,
                description,
                building,
                total_inventory: parseInt(totalInventory),
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, number, description, building, totalInventory]);

    const updateRoomInfo = useCallback(() => {
        if (!id) return;
        axios({
            method: 'put',
            url: `http://34.101.208.43:8080/api/rooms/${id}`,
            data: {
                number,
                description,
                building,
                total_inventory: parseInt(totalInventory),
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, number, description, building, totalInventory]);

    const callToAction = () => {
        formType === 'add' ? addNewRoom() : updateRoomInfo();
        getRooms();
    };

    return (
        <div
            className='modal fade'
            id='roomInfo'
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
                            Thông tin phòng học
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className='modal-body d-flex flex-column gap-3'>
                        <h5 className='fw-semibold mb-0 text-secondary'>
                            Thông tin
                        </h5>
                        <TextInput
                            label='Tên phòng học'
                            value={number}
                            setValue={setNumber}
                        />
                        <TextInput
                            type='Mô tả'
                            label='Mô tả'
                            value={description}
                            setValue={setDescription}
                        />
                        <TextInput
                            label='Tòa nhà'
                            value={building}
                            setValue={setBuilding}
                        />
                        <TextInput
                            type='Sức chứa'
                            label='Sức chứa'
                            value={totalInventory}
                            setValue={setTotalInventory}
                        />
                    </div>
                    <div className='modal-footer border-top-0'>
                        <button
                            type='button'
                            className='btn btn-outline-secondary fw-semibold'
                            data-bs-dismiss='modal'
                        >
                            Đóng
                        </button>
                        <button
                            type='button'
                            className='btn btn-danger fw-semibold'
                            data-bs-dismiss='modal'
                            onClick={callToAction}
                        >
                            {formType === 'add'
                                ? 'Thêm phòng học'
                                : 'Cập nhật thông tin'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default RoomInfoForm;
