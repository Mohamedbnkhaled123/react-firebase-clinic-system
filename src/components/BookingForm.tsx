import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAlert } from '../context/AlertContext';
import { bookingService } from '../services/bookingService';

export default function BookingForm() {
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate Phone
        let cleanedPhone = formData.phone.replace(/\D/g, '');
        if (cleanedPhone.startsWith('20')) {
            cleanedPhone = '0' + cleanedPhone.substring(2);
        }
        const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;

        if (!egyptianPhoneRegex.test(cleanedPhone)) {
            await showAlert('هذا الرقم غير صحيح', { title: 'خطأ', icon: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {
            await bookingService.createBooking({
                ...formData,
                phone: cleanedPhone
            });

            await showAlert('شكراً لك! تم استلام طلب موعدك. سنتواصل معك قريباً للتأكيد.', { title: 'تم بنجاح', icon: 'success' });
            setFormData({ name: '', phone: '', date: '', service: '', message: '' });

        } catch (error) {
            console.error(error);
            await showAlert('حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى.', { title: 'خطأ', icon: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-soft-bg/10 -skew-x-12 -translate-x-20"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-2/5 bg-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>

                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-2">احجز موعد</h3>
                            <p className="text-blue-100 mb-8">احجز زيارتك اليوم واتخذ الخطوة الأولى نحو ابتسامتك المثالية.</p>

                            <div className="space-y-6">
                                {/* Contact Details */}
                                <div className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-blue-200 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <div>
                                        <p className="font-semibold">الموقع</p>
                                        <a href="https://maps.app.goo.gl/kvPYKKkUfAE3Sn2y5" target="_blank" rel="noopener noreferrer" className="text-blue-100 text-sm hover:text-white transition-colors underline underline-offset-4">
                                            برج الأطباء الدور الخامس، جرجا - سوهاج
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-blue-200 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <div>
                                        <p className="font-semibold">الهاتف</p>
                                        <p className="text-blue-100 text-sm" dir="ltr">+20 2 1234 5678</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-blue-200 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <div>
                                        <p className="font-semibold">البريد الإلكتروني</p>
                                        <p className="text-blue-100 text-sm" dir="ltr">contact@parisclinic.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm text-blue-200">ساعات العمل:</p>
                            <p className="font-medium">السبت - الخميس: 9:00 ص - 8:00 م</p>
                        </div>
                    </div>

                    <div className="md:w-3/5 p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">الاسم بالكامل</label>
                                    <input type="text" id="name" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">رقم الهاتف</label>
                                    <input type="number" id="phone" required maxLength={11} placeholder="01xxxxxxxxx" dir="ltr"
                                        value={formData.phone} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">التاريخ</label>
                                    <div className="relative flex">
                                        <input type="text" id="date" readOnly
                                            value={formData.date}
                                            className="w-full px-4 py-3 rounded-r-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                        <input type="date" id="date-picker" className="sr-only"
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                                        <button type="button"
                                            onClick={() => {
                                                const dateInput = document.getElementById('date-picker') as HTMLInputElement;
                                                if (dateInput) {
                                                    // Cast to any to avoid TypeScript errors with showPicker
                                                    if (typeof (dateInput as any).showPicker === 'function') {
                                                        (dateInput as any).showPicker();
                                                    } else {
                                                        dateInput.click();
                                                    }
                                                }
                                            }}
                                            className="px-4 bg-primary text-white rounded-l-lg hover:bg-accent-active transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">الخدمة المطلوبة</label>
                                    <select id="service" required aria-label="اختر الخدمة"
                                        value={formData.service} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/50 hover:shadow-md outline-none transition-all duration-300 ease-in-out appearance-none cursor-pointer [&>option]:transition-colors [&>option]:duration-200 [&>option:hover]:bg-primary/10">
                                        <option value="" disabled>اختر الخدمة</option>
                                        <option value="checkup">كشف وتشخيص</option>
                                        <option value="cleaning">تنظيف وتلميع</option>
                                        <option value="whitening">تبييض الأسنان</option>
                                        <option value="filling">حشو عادي</option>
                                        <option value="root_canal">حشو عصب</option>
                                        <option value="extraction">خلع الأسنان</option>
                                        <option value="other">خدمة أخرى</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">ملاحظات إضافية (اختياري)</label>
                                <textarea id="message" rows={3}
                                    value={formData.message} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting}
                                className="w-full bg-primary text-white font-medium py-3.5 rounded-lg hover:bg-accent-active transition-colors shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? 'جاري الحجز...' : 'احجز الان'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
