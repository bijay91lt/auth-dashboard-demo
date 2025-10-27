import { useToast } from '../contexts/toasts';
import { useAuth } from '../contexts/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogout = () => {
        logout();
        showToast('You have been logged out', 'info');
        navigate('/login', {replace: true});
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
            <div className='p-8 bg-white rounded shadow text-center'>
                <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
                <p className='mb-4'> Welcome, <strong>{user?.name}</strong>!</p>
                <button
                    onClick={handleLogout}
                    className='px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700'  
                >
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Dashboard;