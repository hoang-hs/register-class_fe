import { useState } from 'react';
import './Login.scss';
import { roles } from '../../constants';
import TextInput from '../../components/TextInput';
import { useAuthenication } from '../../hooks/useAuthenication';
import { Navigate } from 'react-router';

const Login = () => {
    const { getToken, login } = useAuthenication();

    const [role, setRole] = useState('STUDENT');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (getToken()) return <Navigate to='/' replace />;

    return (
        <div id='login_page' className='d-flex'>
            <section id='image' className='w-50 h-100' />
            <section className='w-50 d-flex flex-column align-items-center justify-content-center'>
                <h1 className='fw-bold text-danger-emphasis mb-5'>
                    Đăng ký học tập
                </h1>
                <div className='d-flex flex-column align-items-center gap-3'>
                    <h3 className='fw-semibold text-secondary-emphasis mb-3'>
                        Đăng nhập
                    </h3>

                    <div>
                        <label className='form-label fw-semibold'>
                            Vai trò
                        </label>
                        <div className='d-flex align-items-center gap-2'>
                            {/* <span className='fw-semibold me-2'>Bạn là: </span> */}
                            {roles.map(({ role: userRole, label }, index) => (
                                <span key={index}>
                                    <input
                                        type='radio'
                                        className='btn-check'
                                        name='role'
                                        id={userRole}
                                        autoComplete='off'
                                        checked={role === userRole}
                                    />
                                    <label
                                        className={`btn ${
                                            role === userRole
                                                ? 'fw-semibold'
                                                : 'text-secondary'
                                        }`}
                                        htmlFor={userRole}
                                        onClick={() => setRole(userRole)}
                                    >
                                        {label}
                                    </label>
                                </span>
                            ))}
                        </div>
                    </div>

                    <TextInput
                        type='text'
                        label='Username'
                        value={username}
                        setValue={setUsername}
                    />

                    <TextInput
                        type='password'
                        label='Password'
                        value={password}
                        setValue={setPassword}
                    />

                    <button
                        className='mt-4 btn btn-danger w-100 fw-bold'
                        onClick={() => login({ username, password, role })}
                    >
                        Đăng nhập
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Login;
