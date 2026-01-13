import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const totalStars = 5;
export const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="d-flex align-items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className="text-warning" />
      ))}
      {halfStar && <FaStarHalfAlt className="text-warning" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-warning" />
      ))}
    </div>
  );
};
export default Stars;
