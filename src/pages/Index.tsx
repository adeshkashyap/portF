import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/ui/Hero";
import About from "@/pages/About";
import Skills from "@/pages/Skills";
import TechRadar from "@/components/ui/TechRadar";
import Projects from "@/pages/Projects";
import Timeline from "@/components/ui/Timeline";
import APIDemo from "@/components/ui/APIDemo";
import Services from "@/pages/Services";
import HireUs from "@/components/ui/HireUs";
import Testimonials from "@/components/ui/Testimonials";
import Contact from "@/pages/Contact";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/ui/Chatbot";
import { Helmet } from "react-helmet-async";
import ImpactMetrics from "@/components/ui/ImpactMetrics";
import CaseStudies from "@/components/ui/CaseStudies";
import TransparencyWidget from "@/components/ui/TransparencyWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Adesh Kumar — Full Stack Developer | MERN • Laravel • AI • Cloud</title>
        <meta
          name="description"
          content="Full Stack Developer with 4+ years experience building scalable web apps, APIs (REST, GraphQL), AI automation, and cloud-native solutions."
        />
        <meta name="author" content="Adesh Kumar" />
        <meta name="keywords" content="Full Stack, MERN, Laravel, GraphQL, Microservices, DevOps, AI, Cloud, React, Node" />
        <meta property="og:title" content="Adesh Kumar — Full Stack Developer" />
        <meta property="og:description" content="I build scalable and intelligent software for startups and enterprises." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />
      <Hero />
      <div className="container mx-auto px-4 mt-10">
        <ImpactMetrics />
      </div>
      <About />
      <Skills />
      <TechRadar />
      <CaseStudies />
      <Projects />
      <Timeline />
      <APIDemo />
      <Services />
      <HireUs />
      <Testimonials />
      <Contact />
      <TransparencyWidget />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
