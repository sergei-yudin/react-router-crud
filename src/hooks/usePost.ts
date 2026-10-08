import { useEffect, useState } from "react";
import { fetchPost } from "../services/postsApi";
import type { Post } from "../types";

type PostResult = {
  id: number;
  post: Post | null;
  error: string;
};

export function usePost(id: number) {
  const [result, setResult] = useState<PostResult | null>(null);

  useEffect(() => {
    let active = true;

    fetchPost(id)
      .then((post) => {
        if (active) setResult({ id, post, error: "" });
      })
      .catch(() => {
        if (active) {
          setResult({
            id,
            post: null,
            error: "Не удалось загрузить публикацию.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const currentResult = result?.id === id ? result : null;
  return {
    post: currentResult?.post ?? null,
    error: currentResult?.error ?? "",
    loading: currentResult === null,
  };
}
