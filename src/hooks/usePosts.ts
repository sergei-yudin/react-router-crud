import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postsApi";
import type { Post } from "../types";

export function usePosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchPosts()
      .then((data) => {
        if (active) setPosts(data);
      })
      .catch(() => {
        if (active) setError("Не удалось загрузить публикации.");
      });

    return () => {
      active = false;
    };
  }, []);

  return { posts, error, loading: posts === null && !error };
}
