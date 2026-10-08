import { Link, useNavigate, useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { deletePost } from "../services/postsApi";

export function PostPage() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const { post, loading, error } = usePost(postId);

  const removePost = async () => {
    if (!post) return;
    await deletePost(post.id);
    navigate("/");
  };

  if (loading) return <main className="card">Загрузка публикации…</main>;
  if (error) return <main className="card error">{error}</main>;
  if (!post) {
    return (
      <main className="card">
        Пост не найден. <Link to="/">На главную</Link>
      </main>
    );
  }

  return (
    <main className="card">
      <Link className="close" to="/">
        ×
      </Link>
      <b>Пользователь</b>
      <time>{new Date(post.created).toLocaleString("ru-RU")}</time>
      <p>{post.content}</p>
      <div>
        <Link className="primary" to={`/posts/${post.id}/edit`}>
          Редактировать
        </Link>
        <button className="danger" onClick={() => void removePost()}>
          Удалить
        </button>
      </div>
    </main>
  );
}
