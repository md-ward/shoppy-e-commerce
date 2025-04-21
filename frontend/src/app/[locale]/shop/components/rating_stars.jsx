import { gsap } from "gsap";
import PropTypes from "prop-types";
import { useState } from "react";

const RatingComponent = ({ className, readOnly, rate, starSize = 40 }) => {
  let [rating, setRating] = useState(rate || 0);

  const handleStarClick = (index) => {
    if (!readOnly) {
      animateStars(index);
      setRating(index + 1);
    }
  };

  const animateStars = (index) => {
    gsap.fromTo(
      `.star-${index}`,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: "back.out(1.7)" },
    );
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starType = i < rating ? "star-bold" : "star-outline";
      stars.push(
        <img
          key={i}
          style={{ width: starSize, height: starSize }}
          className={`star ${
            readOnly == false ? `star-${i}` : ""
          } cursor-pointer`}
          src={`/assets/${starType}.svg`}
          alt="Star"
          onClick={() => handleStarClick(i)}
        />,
      );
    }
    return stars;
  };

  return <div className={className}>{renderStars()}</div>;
};

RatingComponent.propTypes = {
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  rate: PropTypes.number,
  starSize: PropTypes.number,
};

RatingComponent.defaultProps = {
  readOnly: false,
};

export default RatingComponent;
