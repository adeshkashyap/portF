import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import placeholder from "@/assets/placeholder.svg";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "",
      avatar: placeholder,
      content: "We launched a WhatsApp assistant with Adesh. Responses are faster, and customers actually enjoy using it—big win for our team.",
      rating: 5,
      company: "Real Estate",
    },
    {
      name: "Priya Patel",
      role: "",
      avatar: placeholder,
      content: "Their B2B platform feels rock‑solid. Orders flow smoothly and the dashboards finally make sense. It saves us time every day.",
      rating: 5,
      company: "Healthcare",
    },
    {
      name: "Amit Verma",
      role: "",
      avatar: placeholder,
      content: "The coworking system is simple, quick, and reliable. Billing runs itself now. We just focus on our members.",
      rating: 5,
      company: "Co‑working",
    },
    {
      name: "Sarah Johnson",
      role: "",
      avatar: placeholder,
      content: "Listings publish automatically and our leads jumped. The small UX touches made a noticeable difference for our agents.",
      rating: 5,
      company: "Real Estate",
    },
    {
      name: "Karan Mehta",
      role: "",
      avatar: placeholder,
      content: "Our tour portal finally feels effortless—packages, dates, and payments are all smooth. Support tickets dropped within weeks.",
      rating: 5,
      company: "Tour & Travel",
    },
    {
      name: "Neha Gupta",
      role: "",
      avatar: placeholder,
      content: "Hiring pipelines are clearer and faster now. We shortlist in hours instead of days, and managers love the new dashboards.",
      rating: 5,
      company: "HR Hiring",
    },
    {
      name: "Rohit Kulkarni",
      role: "",
      avatar: placeholder,
      content: "Our school site is easy for parents and staff. Notices, fees, and attendance just work—no training needed.",
      rating: 5,
      company: "School Web App",
    },
    {
      name: "Pooja Nair",
      role: "",
      avatar: placeholder,
      content: "Stock moves are tracked end‑to‑end. Reorders happen on time and the monthly reports are finally accurate.",
      rating: 5,
      company: "Inventory Management",
    },
    {
      name: "Vikas Singh",
      role: "",
      avatar: placeholder,
      content: "The rental portal handles bookings, deposits, and delivery slots without hassle. Weekend spikes are no longer stressful.",
      rating: 5,
      company: "LED TV Rent",
    },
    {
      name: "Anita Desai",
      role: "",
      avatar: placeholder,
      content: "Table turns improved and kitchen tickets are clearer. Staff adopted it quickly, and customers noticed the speed.",
      rating: 5,
      company: "Restaurant Management",
    },
    {
      name: "Dr. Arjun Malhotra",
      role: "",
      avatar: placeholder,
      content: "Appointments and reminders run on autopilot. No‑shows dropped, and our front desk is finally calm.",
      rating: 5,
      company: "Doctor Appointment",
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
                        <div
                          className="w-16 h-16 rounded-full border border-border/60 bg-muted/60 text-foreground flex items-center justify-center font-bold"
                          aria-label={`Reviewer initials for ${t.name}`}
                        >
                          {getInitials(t.name)}
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4 justify-center">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl text-center mb-8 leading-relaxed">"{t.content}"</p>
                      <div className="text-center">
                        <p className="font-bold text-lg">{t.name.toUpperCase()}</p>
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
