import React from 'react';
import CollegeReviewAI from "./CollegeReviewAI";
import RankPredictor from './RankPredictor';

// Helper component for Testimonial Cards
const TestimonialCard = ({ imageSrc, name, college, feedback, delay }) => (
  <div
    className="bg-neutral-800 rounded-xl shadow-xl overflow-hidden flex flex-col items-center p-6 transform hover:scale-[1.185] transition duration-500 ease-in-out border border-orange-500/20 animate-fadeIn"
    style={{ animationDelay: delay }}
  >
    <div className="w-24 h-24 mb-4 rounded-full border-3 border-orange-500 overflow-hidden shadow-inner flex-shrink-0">
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
  const testimonials = [
    { imageSrc: '/5.jpg', name: 'Satyam K. Maurya', college: 'IET Lucknow (CSE)', feedback: 'Set time bound goal helps me during counseling when I was confused which college to fill. Thanks to STBG team for the perfect suggestion.', delay: '0s' },
    { imageSrc: '/4.jpg', name: 'Saurabh Mishra', college: 'HBTU Kanpur (Chemical)', feedback: 'STBG helped me a lot in my counselling. I didn\'t have the knowledge, but STBG provided every information. Because of them, I am here in HBTU.', delay: '0.2s' },
    { imageSrc: '/3.jpg', name: 'Abdul Quadir', college: 'NIT Allahabad', feedback: 'That\'s great Sandeep sir and all teachers. You are really working very hard. Sandeep brother, you are genuinely helpful for me in my college counseling.', delay: '0.4s' },
    { imageSrc: '/2.jpg', name: 'Deepanshu Kesarwani', college: 'AKGEC CSE (AI & ML)', feedback: 'Great work by STBG. Best YouTube Channel for Counselling must join this. Thank you sir.', delay: '0.6s' },
  ];

  return (
    <div className='bg-black min-h-screen font-sans antialiased text-white'>

      {/* 1. Hero Section */}
      <section className='bg-neutral-900 text-white py-28 md:py-36 px-4 sm:px-6 lg:px-8 text-center'>
        <div className='max-w-4xl mx-auto'>
          <p className='text-gray-400 text-sm mb-4 animate-fadeInUp'>
            Supported by IITian Mentors & Trusted by Thousands of Students
          </p>

          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-6'>
            Unlock Your <span className='text-orange-500'>Dream College</span> Potential
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto'>
            Personalized counselling and 24/7 expert guidance to secure your admission in top engineering colleges.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col items-center space-y-4'>
            <div className="flex justify-center space-x-4 w-full max-w-lg">
              <a href="https://docs.google.com/forms/d/your-form-id/viewform" target="_blank" rel="noopener noreferrer"
                className="px-6 py-4 flex-1 bg-gradient-to-t from-orange-600 to-orange-500 text-white font-bold rounded-xl shadow-xl shadow-orange-500/40 hover:from-grey-600 hover:to-grey-500 transition duration-300 transform hover:scale-[1.03] text-lg">
                Get Free Mentor Call
              </a>
              <a href="#program-cta"
                className="px-6 py-4 flex-1 bg-gradient-to-t from-orange-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-black/40 hover:from-gray-600 hover:to-gray-500 transition duration-300 transform hover:scale-[1.03] text-lg">
                Explore Full Program
              </a>
            </div>

            <div className="flex justify-center space-x-4 w-full max-w-lg mt-4">
              <a href="#predictor-section"
                className="px-6 py-4 flex-1 bg-gradient-to-t from-orange-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-black/40 hover:from-gray-600 hover:to-gray-500 transition duration-300 transform hover:scale-[1.03] text-lg">
                Rank Prediction 🎯
              </a>
              <a href="#ai-review-section"
                className="px-6 py-4 flex-1 bg-gradient-to-t from-orange-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-black/40 hover:from-gray-600 hover:to-gray-500 transition duration-300 transform hover:scale-[1.03] text-lg">
                All College Review AI 🤖
              </a>
            </div>
          </div>

          <div className='mt-20'>
            <p className="text-gray-500 text-sm mt-6">
              Trusted by students gaining admission to IITs, NITs, and top state engineering colleges.
            </p>
          </div>
        </div>
      </section>

      <hr className='border-gray-800' />

      {/* 2. Rank Predictor */}
      <div id="predictor-section" className="py-12 bg-neutral-900">
        <RankPredictor />
      </div>

      {/* 3. College Review AI (smaller section under Rank Predictor) */}
      <section
        id="ai-review-section"
        className="py-16 bg-neutral-950 flex justify-center items-center"
      >
        <div className="w-full max-w-3xl bg-neutral-900 border border-orange-500/20 rounded-2xl shadow-2xl shadow-orange-500/10 p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-orange-400">
            College Review AI 🤖
          </h2>
          <CollegeReviewAI />
        </div>
      </section>

      <hr className='border-gray-800' />

      {/* 4. Testimonials Section */}
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

      {/* Footer */}
      <div id="f" className='py-10 text-center text-gray-500 text-sm bg-black border-t border-gray-700'>
        © 2025 STBG Counselling | All rights reserved.
      </div>
    </div>
  );
};

export default Homepage;
