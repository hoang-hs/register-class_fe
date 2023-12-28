import { Navigate, Outlet } from 'react-router';
import Sidebar from '../Sidebar';
import { useAuthenication } from '../../hooks/useAuthenication';

const Main = () => {
    const { getToken } = useAuthenication();
    const token = getToken();

    if (!token) return <Navigate to='/login' replace />;
    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='px-5 py-4 w-100 bg-light overflow-hidden'>
                <Outlet context={token} />
            </div>
        </div>
    );
};

export default Main;
