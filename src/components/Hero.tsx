
import heroDoctor from '../assets/hero_doctor.png';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-soft-bg/30 to-white">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="lg:w-1/2 text-center lg:text-right">
                        <div
                            className="inline-block px-4 py-1.5 bg-blue-50 text-primary rounded-full text-sm font-semibold mb-6 tracking-wide">
                            رعاية أسنان متميزة
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                            ابتسم <br />
                            <span className="text-primary relative">
                                بثقة
                                <svg className="absolute w-full h-3 -bottom-1 right-0 text-accent/30" viewBox="0 0 100 10"
                                    preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            استمتع بعلاجات أسنان عالمية المستوى في بيئة فاخرة وهادئة مستوحاة من أناقة باريس.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#contact"
                                className="bg-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-accent-active transition-all shadow-xl shadow-primary/30 hover:shadow-primary/40 transform hover:-translate-y-0.5">
                                احجز زيارتك
                            </a>
                            <a href="#services"
                                className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-medium hover:border-primary hover:text-primary transition-colors">
                                استكشف خدماتنا
                            </a>
                        </div>

                        <div
                            className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>خبراء معتمدون</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>أحدث التقنيات</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 max-w-sm mx-auto group">
                            <img src={heroDoctor} alt="طبيب أسنان محترف"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                        </div>

                        {/* Floating Badge */}
                        <div
                            className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">تقييم 5.0</div>
                                <div className="text-xs text-slate-500">بناءً على +500 تقييم</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
