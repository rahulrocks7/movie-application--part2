import React, { useState } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Typography } from "@material-ui/core";

const RatingStars = () => {
  const [ratedValue, setRatedValue] = useState(-1);
  const stars = Array(5).fill(0);
  const handleRating = (index) => {
    setRatedValue(index);
  };
  return (
    <>
      {stars.map((star, index) => {
        return (
          <StarBorderIcon
            key={index}
            style={
              ratedValue >= index ? { color: "yellow" } : { color: "black" }
            }
            onClick={() => handleRating(index)}
          />
        );
      })}
    </>
  );
};

export default RatingStars;
