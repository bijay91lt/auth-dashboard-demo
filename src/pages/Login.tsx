import { useAuth } from '../contexts/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useToast } from "../contexts/toasts";
// import { useTheme } from '../contexts/theme';

type LoginFormInputs = {
    email: string;
    password: string;
}

const Login = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    // const { theme, toggleTheme} = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors }, 
        reset,
    } = useForm<LoginFormInputs> ();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data.email, data.password);
            reset();
            navigate('/dashboard', {replace: true});
        } catch {
            showToast('Invalid email or password', 'error');
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {/* Theme Toggle Button */}
            {/* <button

            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
            {theme === 'light' ? '🌙' : '☀️'}
            </button> */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Sign in</h2>

                {errors.root?.message && (
                    <div className="p-2 text-red-600 bg-red-100 rounded text-sm">
                        {errors.root.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" action="">
                    <div>
                        <label htmlFor="email" className="block text-sm font-mediun">
                            Email
                        </label>
                        <input type="text" 
                            id="email"
                            {...register('email', {
                                required: 'Email is required', 
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            // type="email"
                            className="w-full px-3 py-2 mt-1 border rounded"
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input type="text" 
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength:{
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                },
                            })}
                            // type="password"
                            className="w-full px-3 py-2 mt-1 border rounded"
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...': 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;