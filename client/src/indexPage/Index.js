import { useEffect, useState } from "react";
import Posts from "../Posts"

export default function Index() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5000/post";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      {post.length > 0 && post.map(data => (
        <Posts {...data} key={data._id} />
      ))}
    </>
  );
}
