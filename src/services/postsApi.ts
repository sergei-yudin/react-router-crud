import type { Post } from "../types";

const apiUrl = "http://localhost:7070/posts";
const storageKey = "router-crud-posts";

export const isDemoMode = location.hostname.endsWith("github.io");

function readLocalPosts(): Post[] {
  return JSON.parse(localStorage.getItem(storageKey) || "[]") as Post[];
}

function saveLocalPosts(posts: Post[]) {
  localStorage.setItem(storageKey, JSON.stringify(posts));
}

async function request(path = "", options?: RequestInit) {
  const response = await fetch(`${apiUrl}${path}`, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

export async function fetchPosts(): Promise<Post[]> {
  if (isDemoMode) return readLocalPosts();
  return (await request()).json() as Promise<Post[]>;
}

export async function fetchPost(id: number): Promise<Post | null> {
  if (isDemoMode) {
    return readLocalPosts().find((post) => post.id === id) ?? null;
  }

  const data = (await request(`/${id}`).then((response) =>
    response.json(),
  )) as {
    post?: Post;
  };
  return data.post ?? null;
}

export async function createPost(content: string): Promise<void> {
  if (isDemoMode) {
    const posts = readLocalPosts();
    saveLocalPosts([
      { id: Date.now(), content, created: Date.now() },
      ...posts,
    ]);
    return;
  }

  await request("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 0, content }),
  });
}

export async function updatePost(post: Post, content: string): Promise<void> {
  if (isDemoMode) {
    saveLocalPosts(
      readLocalPosts().map((item) =>
        item.id === post.id ? { ...item, content } : item,
      ),
    );
    return;
  }

  await request(`/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: post.id, content }),
  });
}

export async function deletePost(id: number): Promise<void> {
  if (isDemoMode) {
    saveLocalPosts(readLocalPosts().filter((post) => post.id !== id));
    return;
  }

  await request(`/${id}`, { method: "DELETE" });
}
