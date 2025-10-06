import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import placeholder from "@/assets/placeholder.svg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "CEO, TechVentures",
      avatar: placeholder,
      content: "Adesh and his team delivered an exceptional WhatsApp AI assistant that transformed our customer engagement. The response time improved by 70% instantly!",
      rating: 5,
      company: "Real Estate",
    },
    {
      name: "Priya Patel",
      role: "Founder, MediConnect",
      avatar: placeholder,
      content: "The B2B medicine platform they built handles ₹10M+ monthly transactions seamlessly. Their expertise in GraphQL and MongoDB optimization is outstanding.",
      rating: 5,
      company: "Healthcare",
    },
    {
      name: "Amit Verma",
      role: "CTO, SpaceHub",
      avatar: placeholder,
      content: "Professional, efficient, and technically brilliant. The coworking platform with automated invoicing and rent tracking exceeded all our expectations.",
      rating: 5,
      company: "Co-working",
    },
    {
      name: "Sarah Johnson",
      role: "Director, PropertyPro",
      avatar: placeholder,
      content: "The real estate management system with SEO tools and automated listings generated 3x more leads for our business. Highly recommended!",
      rating: 5,
      company: "Real Estate",
    },
  ];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            What our clients say about working with us
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, Keyboard]}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            navigation={{ nextEl: ".testimonials-next", prevEl: ".testimonials-prev" }}
            keyboard={{ enabled: true }}
            spaceBetween={24}
            slidesPerView={1}
            className="pb-16"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Card className="glass-card p-8 md:p-12 relative">
                    <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/20" />
                    <div className="relative z-10">
                      <div className="flex justify-center mb-4">
                        <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full border border-border/60 object-cover" />
                      </div>
                      <div className="flex gap-1 mb-4 justify-center">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl text-center mb-8 leading-relaxed">"{t.content}"</p>
                      <div className="text-center">
                        <p className="font-bold text-lg">{t.name}</p>
                        <p className="text-muted-foreground text-sm">{t.role}</p>
                        <p className="text-primary text-sm mt-1">{t.company}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              aria-label="Previous testimonial"
              className="testimonials-prev w-10 h-10 rounded-full border border-border hover:border-primary transition-colors flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next testimonial"
              className="testimonials-next w-10 h-10 rounded-full border border-border hover:border-primary transition-colors flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
