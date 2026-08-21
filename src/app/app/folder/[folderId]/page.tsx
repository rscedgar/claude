"use client";

import { useParams } from "next/navigation";
import ListViewSection from "@/sections/ListViewSection";

const FolderPage = () => {
  const { folderId } = useParams<{ folderId: string }>();

  return <ListViewSection scopeType="folder" scopeId={folderId} />;
};

export default FolderPage;
