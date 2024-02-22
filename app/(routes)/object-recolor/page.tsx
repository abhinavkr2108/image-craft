"use server";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TransformationForm from "@/components/TransformationForm";
import React from "react";
import { Heading, Text } from "@chakra-ui/react";

export default async function ObjectRecolorPage() {
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
      <Heading fontSize={"2xl"}>Object Recolor</Heading>
      <Text fontWeight={"semibold"} color={"gray.500"}>
        Recolor Object in an Image
      </Text>
      <TransformationForm
        action="Add"
        type="recolor"
        userId={user._id}
        creditBalance={user.creditBalance}
      />
    </div>
  );
}
