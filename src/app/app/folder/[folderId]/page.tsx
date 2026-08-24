"use client";

import { useParams } from "next/navigation";
import TaskArea from "@/sections/TaskArea";

const FolderPage = () => {
  const { folderId } = useParams<{ folderId: string }>();

  return <TaskArea scopeType="folder" scopeId={folderId} />;
};

export default FolderPage;
