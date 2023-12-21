import Students from "./pages/Student";
import Professor from "./pages/Professor";

export const routes = [
    {
        path: '/sinh-vien',
        title: 'Sinh viên',
        element: <Students />
    },
    {
        path: '/giang-vien',
        title: 'Giảng viên',
        element: <Professor/>
    },
    {
        path: '/phong-hoc',
        title: 'Phòng học',
        element: <div className='flex-fill'>Phòng học</div>
    },
    {
        path: '/khoa-hoc',
        title: 'Khóa học',
        element: <div className='flex-fill'>Khóa học</div>
    },
    {
        path: '/lop-hoc',
        title: 'Lớp học',
        element: <div className='flex-fill'>Lớp học</div>
    }
]

export const roles = [
    { role: 'STUDENT', label: 'Sinh viên' },
    { role: 'PROFESSOR', label: 'Giảng viên' },
    { role: 'ADMIN', label: 'Quản trị viên' }
];