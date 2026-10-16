import React from "react";
import { MapPin, Calendar, Clock, ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/components.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = React.useState(false);

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((p) => !p);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const capacityPercent = Math.round((event.attendees / event.maxCapacity) * 100);

  return (
    <article className="event-card" onClick={handleCardClick} id={`event-card-${event.id}`}>
      {/* Image */}
      <div className="event-card-img-wrapper">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-img"
          loading="lazy"
        />
        <span className="event-card-category">{event.category}</span>
        <button
          className="event-card-favorite"
          onClick={handleLike}
          aria-label="Add to favorites"
        >
          <Heart
            size={14}
            color={liked ? "#ef4444" : "#fff"}
            fill={liked ? "#ef4444" : "none"}
          />
        </button>
      </div>

      {/* Body */}
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-meta">
          <div className="event-card-meta-item">
            <Calendar size={13} />
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          <div className="event-card-meta-item">
            <MapPin size={13} />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Capacity bar */}
        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
            <span>{event.attendees.toLocaleString()} attending</span>
            <span>{capacityPercent}% full</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${capacityPercent}%` }} />
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          {event.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="event-card-footer">
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.1rem" }}>Starting from</div>
            <div className="event-card-price">${event.price}</div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => { e.stopPropagation(); navigate(`/events/${event.id}`); }}
            id={`view-event-${event.id}`}
          >
            View <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
