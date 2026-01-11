import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useEffect, useCallback } from "react";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = useCallback(async () => {
    if (feed?.length) return;

    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
      // console.log(res.data.data);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    }
  }, [feed, dispatch]);

  useEffect(() => {
    getFeed();
  }, []);

  return feed && (
    <div>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
