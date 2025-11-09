import React from 'react';
// *** CORE IMPORTS ***
// Ensure these paths are correct for your project structure
import CollegeReviewAI from './CollegeReviewAI'; 
import RankPredictor from './RankPredictor'; 

// Helper component for Testimonial Cards (unchanged)
const TestimonialCard = ({ imageSrc, name, college, feedback, delay }) => (
    <div
        className="bg-neutral-800 rounded-xl shadow-xl overflow-hidden flex flex-col items-center p-6 transform hover:scale-[1.185] transition duration-500 ease-in-out border border-orange-500/20 animate-fadeIn"
        style={{ animationDelay: delay }}
    >
        <div className="w-24 h-24 mb-4 rounded-full border-3 border-orange-500 overflow-hidden shadow-inner flex-shrink-0">
            {/* NOTE: Ensure the path to these images is correct in your project */}
            <img src={imageSrc} alt={`${name}'s profile`} className="w-full h-full object-cover" />
        </div>
        <div className="text-center w-full flex-grow">
            <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
            <p className="text-sm text-orange-400 font-medium mb-3 tracking-wide">{college}</p>
            <p className="text-gray-400 text-sm italic leading-relaxed">
                "{feedback}"
            </p>
        </div>
    </div>
);


const Homepage = () => {

    const benefits = [
        "Personalized Choice Filling based on your rank and preferences",
        "Mentoring from **IITians** (Experts in college admissions)",
        "Dedicated mentor groups for **real-time help**",
        "Focus on **government colleges** & fee-waiver seats",
        "Scholarship guidance and application help",
        "Strategic counselling to increase your chances into top colleges",
        "Support for **AKTU, HBTU, and MMMUT** counselling",
        "One-to-one calls to your preferred college seniors and faculty"
    ];

    const testimonials = [
        { imageSrc: '/5.jpg', name: 'Satyam K. Maurya', college: 'IET Lucknow (CSE)', feedback: 'Set time bound goal helps me during counseling when I was confused which college to fill. Thanks to STBG team for the perfect suggestion.', delay: '0s' },
        { imageSrc: '/4.jpg', name: 'Saurabh Mishra', college: 'HBTU Kanpur (Chemical)', feedback: 'STBG helped me a lot in my counselling. I didn\'t have the knowledge, but STBG provided every information. Because of them, I am here in HBTU.', delay: '0.2s' },
        { imageSrc: '/3.jpg', name: 'Abdul Quadir', college: 'NIT Allahabad', feedback: 'That\'s great Sandeep sir and all teachers. You are really working very hard. Sandeep brother, you are genuinely helpful for me in my college counseling.', delay: '0.4s' },
        { imageSrc: '/2.jpg', name: 'Deepanshu Kesarwani', college: 'AKGEC CSE (AI & ML)', feedback: 'Great work by STBG. Best YouTube Channel for Counselling must join this. Thank you sir.', delay: '0.6s' },
    ];


    return (
        // Main container uses a dark background
        <div className='bg-neutral-900 min-h-screen font-sans antialiased text-white'>

            {/* 1. --- Hero Section (Dark Theme) --- */}
            <section className='bg-neutral-900 text-white py-28 md:py-36 px-4 sm:px-6 lg:px-8 text-center'>
                <div className='max-w-4xl mx-auto'>
                    
                    <p className='text-gray-400 text-sm mb-4 animate-fadeInUp' style={{ animationDelay: '0.1s' }}>
                        Supported by IITian Mentors & Trusted by Thousands of Students
                    </p>

                    <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-6 animate-fadeInUp'>
                        Unlock Your <span className='text-orange-500'>Dream College</span> Potential
                    </h1>
                    <p className='text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fadeInUp' style={{ animationDelay: '0.2s' }}>
                        Personalized counselling and 24/7 expert guidance to secure your admission in top engineering colleges.
                    </p>

                    {/* CTA Buttons - THEMED AND STYLED */}
                    <div className='flex flex-col items-center space-y-4 animate-fadeInUp' style={{ animationDelay: '0.3s' }}>
                        
                        {/* Row 1: Primary Conversion */}
                        <div className="flex justify-center space-x-4 w-full max-w-lg">
                            <a
                                href="https://docs.google.com/forms/d/your-form-id/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                // *** PRIMARY ORANGE STYLE ENHANCED ***
                                className="px-6 py-4 flex-1 
                                           bg-gradient-to-t from-orange-600 to-orange-500 text-white 
                                           font-bold rounded-xl shadow-xl shadow-orange-500/40 
                                           hover:from-grey-600 hover:to-grey-500 
                                           transition duration-300 transform hover:scale-[1.03] text-lg"
                            >
                                Get Free Mentor Call
                            </a>
                            <a
                                href="#program-cta"
                                // *** SECONDARY GRAY STYLE ENHANCED ***
                                className="px-6 py-4 flex-1 
                                           bg-gradient-to-t from-orange-600 to-orange-500 text-white 
                                           font-semibold rounded-xl shadow-lg shadow-black/40 
                                           hover:from-gray-600 hover:to-gray-500 
                                           transition duration-300 transform hover:scale-[1.03] text-lg"
                            >
                                Explore Full Program
                            </a>
                        </div>
                        
                        {/* Row 2: Free Utility Tools (Themed as secondary CTAs) */}
                        <div className="flex justify-center space-x-4 w-full max-w-lg  mt-4">
                             <a
                                href="#predictor-section" 
                                // *** SECONDARY GRAY STYLE ENHANCED ***
                                className="px-6 py-4 flex-1 
                                           bg-gradient-to-t from-orange-600 to-orange-500 text-white 
                                           font-semibold rounded-xl shadow-lg shadow-black/40 
                                           hover:from-gray-600 hover:to-gray-500 
                                           transition duration-300 transform hover:scale-[1.03] text-lg"
                            >
                                Rank Prediction 🎯
                            </a>
                            <a
                                href="#ai-review-section"
                                // *** SECONDARY GRAY STYLE ENHANCED ***
                                className="px-6 py-4 flex-1 
                                           bg-gradient-to-t from-orange-600 to-orange-500 text-white 
                                           font-semibold rounded-xl shadow-lg shadow-black/40 
                                           hover:from-gray-600 hover:to-gray-500 
                                           transition duration-300 transform hover:scale-[1.03] text-lg"
                            >
                           All College Review AI🤖
                            </a>
                        </div>
                        
                    </div>

                    {/* Placeholder Image - Using the provided file name */}
                    <div className='mt-20 animate-fadeInUp' style={{ animationDelay: '0.4s' }}>
                     
                         <p className="text-gray-500 text-sm mt-6">
                            Trusted by students gaining admission to IITs, NITs, and top state engineering colleges.
                        </p>
                    </div>

                </div>
            </section>
            
            {/* --- Separator --- */}
            <hr className='border-gray-800' />


            {/* 2. *** EMBEDDED RANK PREDICTOR SECTION *** */}
            {/* The ID allows the Hero button to scroll directly here */}
            <div id="predictor-section" className="py-12 bg-neutral-900">
                <RankPredictor /> 
            </div>
            
            {/* --- Separator --- */}
            <hr className='border-gray-800' />


            {/* 3. --- College Review AI Section --- */}
            {/* The ID allows the Hero button to scroll directly here */}
            <div id="ai-review-section">
                <CollegeReviewAI /> 
            </div>


            {/* 4. --- How It Works Section (Program Benefits) --- */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-800 border-t border-gray-700">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-white mb-16 text-center tracking-tight">
                        How Our Expert Counselling Works
                    </h2>
                    
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Feature Card 1: The Process */}
                        <div className="bg-neutral-900 rounded-xl shadow-xl p-8 border-t-4 border-orange-500 flex flex-col justify-between transform hover:scale-[1.01] transition duration-300">
                            <div>
                                <div className="text-orange-500 mb-4">
                                    <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 text-center">The Simple 2-Step Process</h3>
                                <ol className="list-decimal list-inside space-y-4 text-gray-300 text-lg">
                                    <li className='pl-2'>
                                        Submit your details via our counselling form and complete the **registration**.
                                    </li>
                                    <li className='pl-2'>
                                        Receive a personalized call from our expert counsellor to discuss **branch, college location, and budget**.
                                    </li>
                                </ol>
                            </div>
                            <p className="mt-8 text-sm text-gray-500 border-t pt-4 border-gray-700 text-center">
                                Our goal: Secure you the best government college with your desired branch.
                            </p>
                        </div>

                        {/* Feature Card 2: Key Benefits */}
                        <div className="lg:col-span-2 bg-neutral-900 rounded-xl shadow-xl p-8 border-t-4 border-orange-500 flex flex-col justify-between transform hover:scale-[1.01] transition duration-300">
                            <div>
                                <div className="text-orange-500 mb-4">
                                    <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">Exclusive Program Benefits</h3>
                                <div className='grid sm:grid-cols-2 gap-6'>
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start bg-neutral-800 rounded-lg border border-gray-700 p-4 transition duration-300 hover:bg-orange-900/50 hover:shadow-md"
                                        >
                                            <div className="w-5 h-5 mt-0.5 mr-4 flex-shrink-0">
                                                <svg className='text-orange-400' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: benefit.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Program CTA (Anchor Target for Hero Button) */}
                    <div id="program-cta" className="max-w-3xl mx-auto bg-orange-600 text-white rounded-2xl shadow-2xl shadow-orange-500/50 p-12 mt-20 text-center transition duration-500 hover:shadow-2xl transform hover:scale-[1.01] border-4 border-white">
                        <h3 className="text-4xl font-extrabold mb-4 tracking-tight">
                            Ready to Lock In Your Dream College?
                        </h3>
                        <p className="text-xl mb-2 font-normal opacity-95">
                            Secure personalized choice filling and our elite **24×7 mentor support**.
                        </p>
                        <p className="text-base opacity-80 mb-8">
                            Register now to gain access to expert strategies and real-time guidance.
                        </p>
                        <a   
                            href="https://your-payment-link.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-14 py-4 bg-white text-orange-600 text-xl font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 uppercase tracking-wider"
                        >
                            Enroll & Pay Now →
                        </a>
                    </div>
                </div>
            </section>
            
            <hr className='border-gray-700 my-16' />

            {/* 5. --- Testimonials Section (Dark Theme Background) --- */}
            <section className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 bg-neutral-800 rounded-3xl shadow-2xl shadow-black/50 p-12 border border-gray-700">
                <h2 className="text-4xl font-extrabold text-orange-500 mb-12 text-center tracking-tight">
                    Our Past Students Experience 🎓
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((data, index) => (
                        <TestimonialCard key={index} {...data} />
                    ))}
                </div>
            </section>

            {/* 6. --- Footer (Dark Theme) --- */}
            <div id="f" className='py-10 text-center text-gray-500 text-sm bg-black border-t border-gray-700'>
               
            </div>

        </div>
    );
}

export default Homepage;