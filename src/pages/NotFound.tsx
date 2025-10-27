import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
        <h1 className='text-4xl font-bold text-gray-800'> 400 </h1>
        <p className='mt-2 text-gray-600'>Page not found</p>
        <button
            onClick={() => navigate ('/')}
            className='mt-4 text-blue-600 hover:underline'
        >
            Go Home
        </button>
    </div>
  );
};

export default NotFound