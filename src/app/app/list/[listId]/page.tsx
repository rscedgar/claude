"use client";

import { useParams } from "next/navigation";
import TaskArea from "@/sections/TaskArea";

const ListPage = () => {
  const { listId } = useParams<{ listId: string }>();

  return <TaskArea scopeType="list" scopeId={listId} />;
};

export default ListPage;
