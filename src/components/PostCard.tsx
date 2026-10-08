import { Link } from "react-router-dom";
import type { Post } from "../types";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  return (
    <Link className="post" to={`/posts/${post.id}`}>
      <b>Пользователь</b>
      <time>{new Date(post.created).toLocaleString("ru-RU")}</time>
      <p>{post.content}</p>
    </Link>
  );
}
