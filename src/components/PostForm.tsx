import { useState, type FormEvent } from "react";

type Props = {
  title: string;
  initialContent?: string;
  submitLabel: string;
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
};

export function PostForm({
  title,
  initialContent = "",
  submitLabel,
  onSubmit,
  onCancel,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    setSaving(true);
    setError("");
    try {
      await onSubmit(trimmedContent);
    } catch {
      setError("Не удалось сохранить публикацию.");
      setSaving(false);
    }
  };

  return (
    <main className="card">
      <button className="close" type="button" onClick={onCancel}>
        ×
      </button>
      <h2>{title}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={(event) => void handleSubmit(event)}>
        <textarea
          aria-label="Текст поста"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          autoFocus
        />
        <button className="primary" disabled={saving || !content.trim()}>
          {saving ? "Сохранение…" : submitLabel}
        </button>
      </form>
    </main>
  );
}
