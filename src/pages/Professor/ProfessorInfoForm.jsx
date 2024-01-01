import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import TextInput from '../../components/TextInput';
import {Modal} from 'bootstrap';
import axios from 'axios';

const ProfessorInfoForm = forwardRef(function ({token, getProfessors}, ref) {
    const [formType, setFormType] = useState('add');

    const [id, setId] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfo(props) {
            setFormType(props.formType);

            setId(props.id || 0);
            setUsername(props.username || '');
            setPassword(props.password || '');
            setName(props.name || '');
            setEmail(props.email || '');
            setPhoneNumber(props.phone_number || '');
            setAddress(props.address || '');
        },
    }));

    const modal = Modal.getInstance(document.querySelector('#professorInfo'));

    console.log(id);

    const addNewProfessor = useCallback(() => {
        axios({
            method: 'post',
            url: `http://34.128.115.142:8080/api/professors`,
            data: {
                username,
                password,
                name,
                email,
                phone_number: phoneNumber,
                address: address,
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, username, password, name, email, phoneNumber, address]);

    const updateProfessorInfo = useCallback(() => {
        if (!id) return;
        axios({
            method: 'put',
            url: `http://34.128.115.142:8080/api/professors/${id}`,
            data: {
                username,
                password,
                name,
                email,
                phone_number: phoneNumber,
                address: address,
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, username, password, name, email, phoneNumber, address]);

    const callToAction = () => {
        formType === 'add' ? addNewProfessor() : updateProfessorInfo();
        getProfessors();
    };

    return (
        <div
            className='modal fade'
            id='professorInfo'
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
                            Thông tin giảng viên
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
                            Thông tin đăng nhập
                        </h5>
                        <TextInput
                            label='Tên đăng nhập'
                            value={username}
                            setValue={setUsername}
                        />
                        <TextInput
                            type='password'
                            label='Mật khẩu'
                            value={password}
                            setValue={setPassword}
                        />

                        <h5 className='fw-semibold mb-0 mt-4 text-secondary'>
                            Thông tin chung
                        </h5>
                        <TextInput
                            label='Tên'
                            value={name}
                            setValue={setName}
                        />
                        <TextInput
                            type='email'
                            label='Email'
                            value={email}
                            setValue={setEmail}
                        />
                        <TextInput
                            label='Số điện thoại'
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                        />
                        <TextInput
                            type='địa chỉ'
                            label='Địa chỉ'
                            value={address}
                            setValue={setAddress}
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
                                ? 'Thêm giảng viên'
                                : 'Cập nhật thông tin'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfessorInfoForm;
