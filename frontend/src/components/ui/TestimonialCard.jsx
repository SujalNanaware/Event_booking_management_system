import React from "react";
import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
      <p className="testimonial-text">"{testimonial.text}"</p>
      <div className="testimonial-author">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="testimonial-avatar"
        />
        <div>
          <p className="testimonial-name">{testimonial.name}</p>
          <p className="testimonial-role">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
