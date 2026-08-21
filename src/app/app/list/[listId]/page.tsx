"use client";

import { useParams } from "next/navigation";
import ListViewSection from "@/sections/ListViewSection";

const ListPage = () => {
  const { listId } = useParams<{ listId: string }>();

  return <ListViewSection scopeType="list" scopeId={listId} />;
};

export default ListPage;
