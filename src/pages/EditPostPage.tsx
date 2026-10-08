import { Link, useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import { usePost } from "../hooks/usePost";
import { updatePost } from "../services/postsApi";

export function EditPostPage() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const { post, loading, error } = usePost(postId);

  if (loading) return <main className="card">Загрузка публикации…</main>;
  if (error) return <main className="card error">{error}</main>;
  if (!post) {
    return (
      <main className="card">
        Пост не найден. <Link to="/">На главную</Link>
      </main>
    );
  }

  const savePost = async (content: string) => {
    await updatePost(post, content);
    navigate(`/posts/${post.id}`);
  };

  return (
    <PostForm
      title="Редактировать публикацию"
      initialContent={post.content}
      submitLabel="Сохранить"
      onSubmit={savePost}
      onCancel={() => navigate(`/posts/${post.id}`)}
    />
  );
}
