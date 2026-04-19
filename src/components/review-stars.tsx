import { IoStar } from "react-icons/io5";

export function ReviewStars({ value }: { value: number }) {
  return (
    <div className="review-stars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) =>
        index < value ? <IoStar key={index} className="review-stars__icon is-filled" /> : <IoStar key={index} className="review-stars__icon" />,
      )}
    </div>
  );
}
