import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../Client";
import MasonryLayout from "../Components/MasonryLayout";
import Spinner from "../Components/Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(true);

  if (loading)
    return <Spinner message='We are adding new ideas to your feed' />;

  return <div className='p-5'>Feed</div>;
};

export default Feed;
