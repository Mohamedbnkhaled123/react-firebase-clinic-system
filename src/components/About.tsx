
import aboutExam from '../assets/about_exam.png';

export default function About() {
    return (
        <section id="about" className="py-20 bg-soft-bg/20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                            <img src={aboutExam} alt="طبيب يفحص مريض" className="w-full h-full object-cover" />
                        </div>
                        <div className="static md:absolute md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl max-w-[200px] md:max-w-xs mt-4 md:mt-0">
                            <p className="text-2xl md:text-4xl font-bold text-primary mb-1">+15</p>
                            <p className="text-slate-600 font-medium text-sm md:text-base">سنة من الخبرة في طب الأسنان التجميلي</p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <span className="text-primary font-semibold tracking-wider text-sm">عن عيادة باريس</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2 mb-6">حيث يلتقي الفن بعلم طب الأسنان</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            تأسست عيادتنا لإحضار الأناقة والدقة الباريسية لرعاية الأسنان، وتقدم عيادة باريس مزيجاً فريداً من الفخامة والتميز الطبي.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            يستخدم فريقنا من المتخصصين المدربين دولياً أحدث التقنيات لضمان راحتك وتقديم نتائج تتجاوز التوقعات. نحن نؤمن بأن كل ابتسامة هي تحفة فنية في انتظار الظهور.
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-slate-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                معدات حديثة متطورة
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                بيئة مريحة ومهدئة
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                خطط علاج مخصصة
                            </li>
                        </ul>

                        <a href="#contact"
                            className="text-primary font-semibold hover:text-accent-active inline-flex items-center gap-2 transition-colors group">
                            تعرف على فريقنا
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
