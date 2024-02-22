"use server";
import TransformationForm from "@/components/TransformationForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function GenerativeFillPage() {
  const userId = auth().userId || "";
  // console.log("userId is: ");
  // console.log(userId);

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserById(userId);
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <TransformationForm
      action="Add"
      type="fill"
      userId={user._id}
      creditBalance={user.creditBalance}
    />
  );
  // return <div>GenerativeFillPage</div>;
}
