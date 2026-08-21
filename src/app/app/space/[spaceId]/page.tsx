"use client";

import { useParams } from "next/navigation";
import ListViewSection from "@/sections/ListViewSection";

const SpacePage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();

  return <ListViewSection scopeType="space" scopeId={spaceId} />;
};

export default SpacePage;
