import React, { useEffect, useState } from 'react';
import Loader from "../Loader/Loader";
import HeroSection from '../HeroSection/HeroSection';
import ContactSection from '../ContactSection/ContactSection';
import StatusSection from '../StatusSection/StatusSection';
import Testimonials from '../Testimonials/Testimonials';
import FAQs from '../../Page/FAQs/FAQs';


const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <HeroSection />
            <StatusSection></StatusSection>
            
            <Testimonials></Testimonials>
            <FAQs></FAQs>
            <ContactSection></ContactSection>
            
        </div>
    );
};

export default Home;
