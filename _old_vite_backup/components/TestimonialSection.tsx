import React from 'react';
import { TESTIMONIALS } from '../constants';

const TestimonialSection: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu chuyện thành công</h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-gray-200">
                 <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.096 14.017 14.742 16.292 12.291L18.995 9.074L15.908 9.074L15.908 4L22 4L22 10.966L18.598 15.035C16.891 16.716 16.923 17.512 16.923 21L14.017 21ZM5.016 21L5.016 18C5.016 16.096 5.016 14.742 7.291 12.291L9.995 9.074L6.908 9.074L6.908 4L12.999 4L12.999 10.966L9.598 15.035C7.891 16.716 7.923 17.512 7.923 21L5.016 21Z" /></svg>
              </div>

              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed italic relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center mt-auto border-t border-gray-100 pt-6">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{testimonial.author}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;