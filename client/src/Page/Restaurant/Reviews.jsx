import React, { useState } from "react";

// components
import ReviewCard from "../../components/restaurant/Reviews/reviewCard";
import AddReviewCard from "../../components/restaurant/Reviews/AddReviewCard";

const Reviews = () => {
    const [reviews] = useState(["", "", ""]);
    return (
        <>
          <div className="w-full flex flex-col md:flex-row relative">
            <div className="w-full md:w-8/12 flex flex-col gap-3">
                <div className="md:hidden">
                   <AddReviewCard />
                </div>
                {reviews.map((review) => (
                    <ReviewCard {...review} />
                ))}
            </div>
            <aside
              style={{ height: "fit-content" }}
              className="hidden md:flex items-start md:w-4/12 sticky rounded-xl top-2 bg-white p-3 shadow-md flex flex-col gap-3"
            >
              <AddReviewCard />
            </aside>
          </div>
        </>
      );
    };
    
export default Reviews;