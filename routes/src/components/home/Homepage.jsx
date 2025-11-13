import React from "react";
import { Link } from "react-router-dom";
import RankPredictor from "./RankPredictor";
import CollegeReviewAI from "./CollegeReviewAI";

// ✅ Helper component for Testimonial Cards
const TestimonialCard = ({ imageSrc, name, college, feedback, delay }) => (
  <div
    className="bg-neutral-800 rounded-xl shadow-xl overflow-hidden flex flex-col justify-between p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center space-x-4">
      <img
        src={imageSrc}
        alt={name}
        className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm text-gray-400">{college}</p>
      </div>
    </div>
    <p className="text-gray-300 mt-4 italic">“{feedback}”</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      {/* ✅ Hero Section */}
      <section className="text-center py-24 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900">
        <h1 className="text-5xl font-extrabold mb-6 text-indigo-400">
          Welcome to College Counselling Portal
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore colleges, predict your rank, and get expert mentorship to make
          smarter admission decisions.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/mentor-login"
            className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-lg"
          >
            Mentor Login
          </Link>
          <Link
            to="/student-login"
            className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Student Login
          </Link>
        </div>
      </section>

      {/* ✅ Rank Predictor Section */}
      <div className="mt-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Rank Predictor
        </h2>
        <p className="text-gray-300 text-center mb-10">
          Predict your chances of getting into your dream college based on your
          exam rank.
        </p>
        <RankPredictor />
      </div>

      {/* ✅ College Review AI Section */}
      <div className="mt-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          AI College Review
        </h2>
        <p className="text-gray-300 text-center mb-10">
          Get instant AI-generated reviews about colleges and make informed
          decisions.
        </p>
        <CollegeReviewAI />
      </div>

      {/* ✅ Testimonials Section */}
      <div className="mt-24 px-6 md:px-20 pb-20">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-12">
          What Students Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <TestimonialCard
            imageSrc="https://randomuser.me/api/portraits/men/12.jpg"
            name="Rahul Verma"
            college="IIT Bombay"
            feedback="The Rank Predictor helped me shortlist the best colleges easily!"
          />
          <TestimonialCard
            imageSrc="https://randomuser.me/api/portraits/women/32.jpg"
            name="Anjali Mehta"
            college="NIT Trichy"
            feedback="The College Review AI gave me honest insights about placements."
            delay="0.2s"
          />
          <TestimonialCard
            imageSrc="https://randomuser.me/api/portraits/men/47.jpg"
            name="Saurabh Yadav"
            college="IIIT Allahabad"
            feedback="A complete platform for students — from counselling to feedback!"
            delay="0.4s"
          />
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="bg-neutral-800 text-center py-6 text-gray-400">
        © {new Date().getFullYear()} College Counselling Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
