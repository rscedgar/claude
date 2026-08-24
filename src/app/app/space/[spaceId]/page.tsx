"use client";

import { useParams } from "next/navigation";
import SpaceActionsHeader from "@/components/layout/SpaceActionsHeader";
import TaskArea from "@/sections/TaskArea";

const SpacePage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();

  return (
    <div className="flex h-full flex-col">
      <SpaceActionsHeader spaceId={spaceId} />
      <div className="min-h-0 flex-1">
        <TaskArea scopeType="space" scopeId={spaceId} />
      </div>
    </div>
  );
};

export default SpacePage;
