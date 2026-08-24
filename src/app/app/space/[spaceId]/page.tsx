"use client";

import { useParams } from "next/navigation";
import TaskArea from "@/sections/TaskArea";

const SpacePage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();

  return <TaskArea scopeType="space" scopeId={spaceId} />;
};

export default SpacePage;
