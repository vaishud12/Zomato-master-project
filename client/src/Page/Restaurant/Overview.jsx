import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";

// components
import MenuCollection from "../../components/restaurant/MenuCollection";
import MenuSimilarRestaurantcard from "../../components/restaurant/MenuSimilarRestaurantcard";
import { NextArrow, PrevArrow } from "../../components/CarousalArrow";
import ReviewCard from "../../components/restaurant/Reviews/reviewCard";
import Mapview from "../../components/restaurant/Mapview";

import { getImage } from "../../Redux/Reducer/Image/Image.action";
import { getReviews } from "../../Redux/Reducer/Reviews/review.action";

const Overview = () => {
  const [menuImage, setMenuImages] = useState({ images: [] });
  const [Reviews, setReviewss] = useState([]);

  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const reduxState = useSelector(
    (globalStore) => globalStore.restaurant.selectedRestaurant.restaurant
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxState) {
      dispatch(getImage(reduxState?.menuImage)).then((data) => {
        const images = [];
        data.payload.image.images.map(({ location }) => images.push(location));
        setMenuImages(images);
      });
      dispatch(getReviews(reduxState?._id)).then((data) =>
        setReviewss(data.payload.reviews)
      );
    }
  }, []);


  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const getLatLong = (mapAddress) => {
    return mapAddress?.split(",").map((item) => parseFloat(item));
  };

  return (
    <>
      <div className="flex flex col md:flex-row relative">
        <div className="w-full md:w-8/12">
          <h2 className="font-semibold text-lg md:text-xl my-4">
            About this place
          </h2>
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Menu</h4>
            <Link to={`/restaurant/${id}/menu`}>
              <span className="flex items-center gap-1 text-zomato-400">
                See all menu <IoMdArrowDropright />
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <MenuCollection
              menuTitle="Menu"
              pages="3"
              image={[
                "https://b.zmtcdn.com/data/menus/428/18582428/93084de4c642df3dec0b5b4fdccefaad.jpg",
                "https://b.zmtcdn.com/data/menus/278/18629278/41530836ad2d603888610977507c5f30.jpg"
              ]}
            />
          </div>
          <h4 className="text-lg font-medium my-4">Cuisines</h4>
          <div className="flex flex-wrap gap-2">
            {reduxState?.cuisine.map((data) => (
              <span className="border border-gray-600 text-blue-600 px-2 py-1 rounded-full">
                {data}
              </span>
            //   <span className="border border-gray-600 text-blue-600 px-2 py-1 rounded-full">
            //   Street Food
            // </span>
            // <span className="border border-gray-600 text-blue-600 px-2 py-1 rounded-full">
            //   Street Food
            // </span>
            
            ))}
          </div>
          <div className="my-4">
            <h4 className="text-lg font-medium">Average Cost</h4>
            <h6>₹{reduxState?.averageCost}100 for one order (approx.)</h6>
            <small className="text-gray-500">
              Exclusive of applicable taxes and charges, if any
            </small>
          </div>
          <div className="my-4">
            <h4 className="text-lg font-medium">Similar Restaurants</h4>
            <div>
              <Slider {...settings}>
              <MenuSimilarRestaurantcard
                  image="https://b.zmtcdn.com/data/pictures/chains/5/18711475/4be376adb66b75764946d00a7dcf9991_featured_v2.jpg?output-format=webp"
                  title="tea"
                />
                <MenuSimilarRestaurantcard
                  image="https://b.zmtcdn.com/data/pictures/chains/5/18711475/4be376adb66b75764946d00a7dcf9991_featured_v2.jpg?output-format=webp"
                  title="tea"
                />
                <MenuSimilarRestaurantcard
                  image="https://b.zmtcdn.com/data/pictures/chains/5/18711475/4be376adb66b75764946d00a7dcf9991_featured_v2.jpg?output-format=webp"
                  title="tea"
                />
                <MenuSimilarRestaurantcard
                  image="https://b.zmtcdn.com/data/pictures/chains/5/18711475/4be376adb66b75764946d00a7dcf9991_featured_v2.jpg?output-format=webp"
                  title="tea"
                />
                <MenuSimilarRestaurantcard
                  image="https://b.zmtcdn.com/data/pictures/chains/5/18711475/4be376adb66b75764946d00a7dcf9991_featured_v2.jpg?output-format=webp"
                  title="tea"
                />
                <MenuSimilarRestaurantcard
                  image="https://b.zmtcdn.com/data/pictures/chains/5/18711475/4be376adb66b75764946d00a7dcf9991_featured_v2.jpg?output-format=webp"
                  title="tea"
                />
                <MenuSimilarRestaurantcard
                  image="https://b.zmtcdn.com/data/pictures/chains/5/18711475/4be376adb66b75764946d00a7dcf9991_featured_v2.jpg?output-format=webp"
                  title="tea"
                />
              </Slider>
            </div>       
          </div>
          <div className="my-4">
            <h4 className="text-lg font-medium">
              Rate your delivery experience
            </h4>
            <div>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <div className="my-4 w-full md:hidden flex flex-col gap-4">
            <Mapview 
              title="Mumbai Xpress"
              phno="+918805270556"
              mapLocation={[12.988134202889283, 77.59405893120281]}
              address="15, Sigma Central Mall, Vasanth Nagar, Cuminingham Road, Banglore"
            />
          </div>
          <div className="my-4 flex flex-col gap-4">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>      
        <aside
          style={{ height: "fit-content" }}
          className="hidden md:flex md:w-4/12 sticky rounded-xl top-2 bg-white p-3 shadow-md flex flex-col gap-4"
        >
          <Mapview 
            title="Mumbai Xpress"
            phno="+918805270556"
            mapLocation={[12.988134202889283, 77.59405893120281]}
            address="15, Sigma Central Mall, Vasanth Nagar, Cuminingham Road, Banglore"
          />
        </aside>
      </div>
    </>
  );
};
export default Overview;



