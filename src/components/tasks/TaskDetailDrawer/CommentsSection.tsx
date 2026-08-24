"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { useTaskStore } from "@/stores/task-store";
import { useCurrentUser, useUserStore } from "@/stores/user-store";
import { formatRelativeTime } from "@/utils/date";
import { styles } from "./styles";

interface CommentsSectionProps {
  taskId: string;
}

const CommentsSection = ({ taskId }: CommentsSectionProps) => {
  const comments = useTaskStore((state) => state.comments);
  const addComment = useTaskStore((state) => state.addComment);
  const users = useUserStore((state) => state.users);
  const currentUser = useCurrentUser();

  const [draft, setDraft] = useState("");

  const taskComments = comments
    .filter((comment) => comment.taskId === taskId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const submit = () => {
    const trimmed = draft.trim();
    if (!trimmed || !currentUser) return;
    addComment(taskId, currentUser.id, trimmed);
    setDraft("");
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Comentarios</h3>

      <div className="flex items-start gap-2.5">
        {currentUser && <Avatar user={currentUser} size="sm" />}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          placeholder="Escribe un comentario…"
          className={styles.addInput}
          aria-label="Nuevo comentario"
        />
      </div>

      <div className="mt-1 flex flex-col gap-3">
        {taskComments.map((comment) => {
          const author = users.find((user) => user.id === comment.authorId);
          return (
            <div key={comment.id} className={styles.commentRow}>
              {author && <Avatar user={author} size="sm" />}
              <div className={styles.commentContent}>
                <p className="text-xs">
                  <span className="font-semibold text-ebony-100">
                    {author?.name ?? "Usuario"}
                  </span>{" "}
                  <span className="text-ebony-500">
                    · {formatRelativeTime(comment.createdAt)}
                  </span>
                </p>
                <p className="mt-0.5 whitespace-pre-wrap text-sm leading-relaxed text-ebony-200">
                  {comment.content}
                </p>
              </div>
            </div>
          );
        })}
        {taskComments.length === 0 && (
          <p className="text-xs text-ebony-500">Aún no hay comentarios.</p>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
