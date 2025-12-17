import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import logo from '../assets/logo.png';

export default function Login() {
    const [password, setPassword] = useState('');
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        // Auth Check
        if (sessionStorage.getItem('isAdmin')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password === 'alaa123') {
            sessionStorage.setItem('isAdmin', 'true');
            navigate('/admin');
        } else {
            await showAlert('كلمة المرور غير صحيحة', { title: 'خطأ', icon: 'error' });
            setPassword('');
        }
    };

    return (
        <div className="bg-slate-50 text-slate-800 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <img src={logo} alt="شعار عيادة باريس" className="h-16 w-auto mb-4" />
                        <h1 className="text-2xl font-bold text-slate-900">أهلا دكتور علاء !</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">كلمة المرور</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="أدخل كلمة المرور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit"
                            className="w-full bg-primary text-white font-medium py-3.5 rounded-lg hover:bg-accent-active transition-colors shadow-lg shadow-primary/30">
                            دخول
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/" className="text-sm text-slate-500 hover:text-primary transition-colors">العودة للرئيسية</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
