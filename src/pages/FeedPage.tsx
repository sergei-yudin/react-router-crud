import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { isDemoMode } from "../services/postsApi";
import { usePosts } from "../hooks/usePosts";

export function FeedPage() {
  const { posts, loading, error } = usePosts();

  return (
    <main>
      <header>
        <h1>Posts</h1>
        <Link className="primary" to="/posts/new">
          Создать пост
        </Link>
      </header>
      {isDemoMode && (
        <p className="mode">Демо-режим: данные хранятся в браузере</p>
      )}
      {loading && <p>Загрузка публикаций…</p>}
      {error && <p className="error">{error}</p>}
      <section className="feed">
        {posts?.length === 0 && <p>Постов пока нет</p>}
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
