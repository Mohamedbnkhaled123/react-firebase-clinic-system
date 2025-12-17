import { useState, useEffect } from 'react';

// Import images
import hajjOthman from '../assets/hajj_othman.png';
import abdelAal from '../assets/abdel_aal.png';
import metwally from '../assets/metwally.png';
import hassan from '../assets/hassan.png';
import mahmoud from '../assets/mahmoud.png';
import amSayed from '../assets/am_sayed.png';
import omYoussef from '../assets/om_youssef.png';
import yasminAhmed from '../assets/yasmin_new.png';
import youssefAbdelSalam from '../assets/youssef_abdel_salam.png';

const testimonials = [
    {
        id: 1,
        name: "الحاج عثمان",
        text: "تسلم يدك يا دكتور الوجع راح والضرس بقي كيف الحديد ربنا يبارك في صحتك.",
        image: hajjOthman,
        rating: 5
    },
    {
        id: 2,
        name: "عبد العال",
        text: "والله العيادة دي كيف الفندق نظافة ومعاملة زين الزين ما شوفتش دكتور شاطر اكدة من زمان",
        image: abdelAal,
        rating: 5
    },
    {
        id: 3,
        name: "متولي",
        text: "كنت خايف قوي من خلع الضرس بس الدكتور يده تتلف في حرير ما حسيتش بحاجة واصل.",
        image: metwally,
        rating: 5
    },
    {
        id: 4,
        name: "حسن",
        text: "التركيبات اللي عملتها زي الفل، باكل عليها الزلط دلوقت. الله يعمر بيتك يا دكتور.",
        image: hassan,
        rating: 5
    },
    {
        id: 5,
        name: "محمود",
        text: "يا بوي على النظافة والترتيب، حاجة تشرف بصحيح. والدكتور بشوش ويسمع منك للآخر.",
        image: mahmoud,
        rating: 5
    },
    {
        id: 6,
        name: "عم سيد",
        text: "العيادة نظيفة جوي ومريحة، ويد الدكتور خفيفة ما حسيتش بأي وجع واصل. دكتور شاطر بصحيح.",
        image: amSayed,
        rating: 5
    },
    {
        id: 7,
        name: "ام يوسف",
        text: "يا ولدي يدك تتلف في حرير، بسم الله ما شاء الله عليك فنان. والعيادة تفتح النفس من نظافتها.",
        image: omYoussef,
        rating: 5
    },
    {
        id: 8,
        name: "ياسمين احمد",
        text: "العيادة فيها أجهزة حديثة جوي، والدكتور يده تتوزن بالدهب، ريحني من الوجع بمهارته.",
        image: yasminAhmed,
        rating: 5
    },
    {
        id: 9,
        name: "يوسف عبد السلام",
        text: "الدكتور فنان وبيفهم في شغله زين، والعيادة مرتبة ومجهزة على أعلى مستوى. تسلم يدك يا دكتور.",
        image: youssefAbdelSalam,
        rating: 5
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Auto-scroll (optional, but nice)
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            prevSlide(); // RTL: swipe left = previous
        }
        if (isRightSwipe) {
            nextSlide(); // RTL: swipe right = next
        }
    };

    return (
        <section id="testimonials" className="py-20 bg-soft-bg/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider text-sm">آراء العملاء</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2">ماذا يقول مرضانا</h2>
                    <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="relative max-w-4xl mx-auto overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(${currentIndex * 100}%)` }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg text-center relative">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-serif">"</div>
                                    <p className="text-slate-600 text-lg italic mb-6 pt-4">"{testimonial.text}"</p>
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-200 rounded-full mb-2 overflow-hidden border-2 border-primary/20">
                                            {testimonial.image ? (
                                                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <svg className="w-full h-full text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                        <div className="flex text-yellow-400 text-sm mt-1 justify-center">
                                            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slider Controls */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={prevSlide} aria-label="الشريحة السابقة"
                            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <button onClick={nextSlide} aria-label="الشريحة التالية"
                            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
