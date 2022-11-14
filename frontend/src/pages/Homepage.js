import React from "react";
import { data } from "../components/data";
import Masonry from "react-masonry-css";

const Homepage = () => {
  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className='w-full'>
      <Masonry
        breakpointCols={breakPoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {data.map((item) => {
          const { id, image, title } = item;
          return (
            <div
              key={id}
              className='rounded-sm overflow-hidden cursor-pointer transition relative'
            >
              <img src={image} alt={title} />
              <div className='absolute top-0 left-0 w-full h-full'></div>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};

export default Homepage;
