import { useNavigate } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import { createPost } from "../services/postsApi";

export function NewPostPage() {
  const navigate = useNavigate();

  const savePost = async (content: string) => {
    await createPost(content);
    navigate("/");
  };

  return (
    <PostForm
      title="Новая публикация"
      submitLabel="Опубликовать"
      onSubmit={savePost}
      onCancel={() => navigate("/")}
    />
  );
}
