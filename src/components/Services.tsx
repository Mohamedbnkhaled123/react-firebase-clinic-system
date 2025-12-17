import toothExtractionArrow from '../assets/tooth_extraction_arrow.png';
import toothFilling from '../assets/tooth_filling.png';
import toothWhitening from '../assets/tooth_whitening.png';
import generalCare from '../assets/general_care.png';
import deepCleaning from '../assets/deep_cleaning.png';
import rootCanal from '../assets/root_canal.png';

export default function Services() {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider text-sm">خبرتنا</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2">خدمات أسنان عالمية</h2>
                    <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Service 1 */}
                    <div className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 active:border-primary/30 focus:border-primary/30 shadow-lg shadow-slate-200/50 hover:shadow-primary/10 active:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 cursor-pointer" tabIndex={0}>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-active:bg-primary group-active:text-white group-focus:bg-primary group-focus:text-white transition-colors">
                            <img src={toothWhitening}
                                className="w-8 h-8 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert group-focus:brightness-0 group-focus:invert"
                                alt="تبييض الأسنان" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">تبييض الأسنان</h3>
                        <p className="text-slate-600 leading-relaxed">احصل على ابتسامة أكثر إشراقاً بتقنية الليزر المتطورة لنتائج فورية وطويلة الأمد.</p>
                    </div>

                    {/* Service 2 - Tooth Extraction */}
                    <div className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 active:border-primary/30 focus:border-primary/30 shadow-lg shadow-slate-200/50 hover:shadow-primary/10 active:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 cursor-pointer" tabIndex={0}>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-active:bg-primary group-active:text-white group-focus:bg-primary group-focus:text-white transition-colors duration-200">
                            <img src={toothExtractionArrow}
                                className="w-8 h-8 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert group-focus:brightness-0 group-focus:invert"
                                alt="خلع الاسنان" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">خلع الاسنان</h3>
                        <p className="text-slate-600 leading-relaxed">خلع الأسنان المتضررة والضروس بمهارة عالية وبدون ألم.</p>
                    </div>

                    {/* Service 3 */}
                    <div className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 active:border-primary/30 focus:border-primary/30 shadow-lg shadow-slate-200/50 hover:shadow-primary/10 active:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 cursor-pointer" tabIndex={0}>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-active:bg-primary group-active:text-white group-focus:bg-primary group-focus:text-white transition-colors duration-200">
                            <img src={toothFilling}
                                className="w-8 h-8 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert group-focus:brightness-0 group-focus:invert"
                                alt="حشو عادي" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">حشو عادي</h3>
                        <p className="text-slate-600 leading-relaxed">ترميم الأسنان المتضررة بحشوات تجميلية عالية الجودة تدوم طويلاً.</p>
                    </div>

                    {/* Service 4 */}
                    <div className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 active:border-primary/30 focus:border-primary/30 shadow-lg shadow-slate-200/50 hover:shadow-primary/10 active:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 cursor-pointer" tabIndex={0}>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-active:bg-primary group-active:text-white group-focus:bg-primary group-focus:text-white transition-colors">
                            <img src={rootCanal}
                                className="w-8 h-8 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert group-focus:brightness-0 group-focus:invert"
                                alt="حشو عصب" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">حشو عصب</h3>
                        <p className="text-slate-600 leading-relaxed">علاج جذور الأسنان بأحدث التقنيات لإنقاذ الأسنان وتخفيف الألم.</p>
                    </div>

                    {/* Service 5 */}
                    <div className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 active:border-primary/30 focus:border-primary/30 shadow-lg shadow-slate-200/50 hover:shadow-primary/10 active:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 cursor-pointer" tabIndex={0}>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-active:bg-primary group-active:text-white group-focus:bg-primary group-focus:text-white transition-colors">
                            <img src={deepCleaning}
                                className="w-8 h-8 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert group-focus:brightness-0 group-focus:invert"
                                alt="تنظيف عميق" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">تنظيف عميق</h3>
                        <p className="text-slate-600 leading-relaxed">إزالة شاملة للبلاك والجير للحفاظ على لثة صحية ومنع التسوس.</p>
                    </div>

                    {/* Service 6 */}
                    <div className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 active:border-primary/30 focus:border-primary/30 shadow-lg shadow-slate-200/50 hover:shadow-primary/10 active:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 cursor-pointer" tabIndex={0}>
                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-active:bg-primary group-active:text-white group-focus:bg-primary group-focus:text-white transition-colors">
                            <img src={generalCare}
                                className="w-8 h-8 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert group-focus:brightness-0 group-focus:invert"
                                alt="رعاية عامة" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">رعاية عامة</h3>
                        <p className="text-slate-600 leading-relaxed">فحوصات دورية وحشوات ورعاية وقائية لجميع أفراد العائلة.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
