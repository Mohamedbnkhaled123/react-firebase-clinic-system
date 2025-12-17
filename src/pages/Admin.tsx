import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import logo from '../assets/logo.png';
import { bookingService } from '../services/bookingService';
import type { Booking } from '../types/Booking';

export default function Admin() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();
    const { showConfirm } = useAlert();

    useEffect(() => {
        // Auth Check
        if (!sessionStorage.getItem('isAdmin')) {
            navigate('/login');
            return;
        }

        const unsubscribe = bookingService.subscribeToBookings((fetchedBookings) => {
            setBookings(fetchedBookings);
        });

        return () => unsubscribe();
    }, [navigate]);

    const updateStatus = async (id: string, status: Booking['status']) => {
        try {
            await bookingService.updateStatus(id, status);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteBooking = async (id: string) => {
        try {
            await bookingService.deleteBooking(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAction = (action: 'update' | 'delete', id: string, status?: Booking['status']) => {
        if (action === 'update' && status) {
            if (status === 'confirmed') {
                showConfirm('هل تريد تأكيد الحجز', () => updateStatus(id, status), { title: 'تأكيد الحجز', icon: 'info', confirmText: 'نعم، أكد الحجز', cancelText: 'تراجع' });
            } else if (status === 'rejected') {
                showConfirm('هل انت متأكد من رفض الحجز', () => updateStatus(id, status), { title: 'رفض الحجز', icon: 'warning', confirmText: 'نعم، ارفض', cancelText: 'تراجع' });
            } else {
                showConfirm('هل أنت متأكد من تغيير حالة الحجز؟', () => updateStatus(id, status), { title: 'تأكيد الإجراء', icon: 'warning', confirmText: 'نعم، غيّر الحالة', cancelText: 'تراجع' });
            }
        } else if (action === 'delete') {
            showConfirm('هل أنت متأكد من حذف هذا الحجز نهائياً؟', () => deleteBooking(id), { title: 'حذف الحجز', icon: 'error', confirmText: 'نعم، احذف', cancelText: 'تراجع' });
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        navigate('/');
    };

    const filteredBookings = bookings.filter((b: Booking) => filter === 'all' || b.status === filter);

    // Stats
    const stats = {
        total: bookings.length,
        pending: bookings.filter((b: Booking) => b.status === 'pending').length,
        confirmed: bookings.filter((b: Booking) => b.status === 'confirmed').length,
        today: bookings.filter((b: Booking) => b.date === new Date().toISOString().split('T')[0]).length
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
        completed: 'bg-blue-100 text-blue-700'
    };

    const statusLabels = {
        pending: 'قيد الانتظار',
        confirmed: 'مؤكد',
        rejected: 'مرفوض',
        completed: 'مكتمل'
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm z-50 sticky top-0">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="شعار عيادة باريس" className="h-10 w-auto" />
                        <span className="font-bold text-lg text-slate-700">لوحة التحكم</span>
                    </div>

                    <button onClick={handleLogout}
                        className="text-slate-500 hover:text-red-500 font-medium transition-colors flex items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                            </path>
                        </svg>
                        خروج
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-slate-900">الحجوزات</h1>
                    <div className="flex gap-3">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:border-primary outline-none focus:ring-2 focus:ring-primary/20">
                            <option value="all">جميع الحالات</option>
                            <option value="pending">قيد الانتظار</option>
                            <option value="confirmed">مؤكد</option>
                            <option value="completed">مكتمل</option>
                            <option value="cancelled">ملغى</option>
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-sm mb-1">إجمالي الحجوزات</div>
                        <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-sm mb-1">قيد الانتظار</div>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-sm mb-1">مؤكدة</div>
                        <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-sm mb-1">اليوم</div>
                        <div className="text-2xl font-bold text-primary">{stats.today}</div>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Desktop Table View */}
                    <div className="overflow-x-auto hidden md:block">
                        <table className="w-full text-right">
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                                <tr>
                                    <th className="px-6 py-4 font-medium">المريض</th>
                                    <th className="px-6 py-4 font-medium">الخدمة</th>
                                    <th className="px-6 py-4 font-medium">التاريخ</th>
                                    <th className="px-6 py-4 font-medium">الحالة</th>
                                    <th className="px-6 py-4 font-medium">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-slate-500">
                                            <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                            </svg>
                                            <p>لا توجد حجوزات حتى الآن</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{booking.name}</div>
                                                <div className="text-sm text-slate-500" dir="ltr">{booking.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-700">{booking.service}</div>
                                                {booking.message && <div className="text-xs text-slate-400 mt-1 truncate max-w-xs" title={booking.message}>{booking.message}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {booking.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                                                    {statusLabels[booking.status]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {booking.status === 'pending' && (
                                                        <>
                                                            <button onClick={() => handleAction('update', booking.id, 'confirmed')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="قبول">
                                                                <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                            </button>
                                                            <button onClick={() => handleAction('update', booking.id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="رفض">
                                                                <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                            </button>
                                                        </>
                                                    )}
                                                    {booking.status === 'confirmed' && (
                                                        <button onClick={() => handleAction('update', booking.id, 'completed')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="إكمال">
                                                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        </button>
                                                    )}
                                                    {['confirmed', 'rejected', 'completed'].includes(booking.status) && (
                                                        <button onClick={() => handleAction('delete', booking.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                                                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block md:hidden">
                        {filteredBookings.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">
                                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                </svg>
                                <p>لا توجد حجوزات حتى الآن</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {filteredBookings.map((booking) => (
                                    <div key={booking.id} className="p-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{booking.name}</h3>
                                                <p className="text-sm text-slate-500" dir="ltr">{booking.phone}</p>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                                                {statusLabels[booking.status]}
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-sm mb-3">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">الخدمة:</span>
                                                <span className="text-slate-700 font-medium">{booking.service}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">التاريخ:</span>
                                                <span className="text-slate-700">{booking.date}</span>
                                            </div>
                                            {booking.message && (
                                                <div className="text-xs text-slate-400 pt-1 border-t border-slate-100">
                                                    <span className="font-medium">ملاحظات:</span> {booking.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleAction('update', booking.id, 'confirmed')} className="px-3 py-2 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors font-medium">
                                                        قبول
                                                    </button>
                                                    <button onClick={() => handleAction('update', booking.id, 'rejected')} className="px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium">
                                                        رفض
                                                    </button>
                                                </>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <button onClick={() => handleAction('update', booking.id, 'completed')} className="px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium">
                                                    إكمال
                                                </button>
                                            )}
                                            {['confirmed', 'rejected', 'completed'].includes(booking.status) && (
                                                <button onClick={() => handleAction('delete', booking.id)} className="px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium">
                                                    حذف
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
