import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Fleet from "./components/Fleet";
import Features from "./components/Features";
import Plans from "./components/Plans";
import AppDrivers from "./components/AppDrivers";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import CtaBanner from "./components/CtaBanner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Fleet />
        <Features />
        <Plans />
        <AppDrivers />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
