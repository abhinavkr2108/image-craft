"use server";
import TransformationForm from "@/components/TransformationForm";
import { getUserById } from "@/lib/actions/user.action";
import { Heading, Text } from "@chakra-ui/react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function BackgroundRemovePage() {
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
    <div>
      <Heading fontSize={"2xl"}>Background Remove</Heading>
      <Text fontWeight={"semibold"} color={"gray.500"}>
        Remove the background from Image
      </Text>
      <TransformationForm
        action="Add"
        type="removeBackground"
        userId={user._id}
        creditBalance={user.creditBalance}
      />
    </div>
  );
}
