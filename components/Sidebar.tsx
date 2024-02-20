"use client";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  List,
  ListItem,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { FiMenu } from "react-icons/fi";
import {
  FcEditImage,
  FcHome,
  FcLightAtTheEndOfTunnel,
  FcRemoveImage,
  FcSynchronize,
  FcCamera,
} from "react-icons/fc";

interface MenuItemsProps {
  name: string;
  icon: IconType;
  href: string;
}
export default function Sidebar() {
  const user = useUser();
  const btnRef: any = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user.isLoaded) return <Spinner />;
  const menuItems: MenuItemsProps[] = [
    {
      name: "Home",
      icon: FcHome,
      href: "/home",
    },
    { name: "Image Restore", icon: FcEditImage, href: "/image-restore" },
    {
      name: "Generative Fill",
      icon: FcLightAtTheEndOfTunnel,
      href: "/generative-fill",
    },
    { name: "Object Remove", icon: FcRemoveImage, href: "/object-remove" },
    { name: "Object Recolor", icon: FcSynchronize, href: "/object-recolor" },
    { name: "Background Remove", icon: FcCamera, href: "/background-remove" },
  ];
  return (
    <aside>
      <Box
        h={"100vh"}
        bg="gray.100"
        w={{ base: 0, md: 60 }}
        display={{ base: "none", md: "flex" }}
        flexDir={"column"}
        justifyContent={"space-between"}
      >
        <Box p={4} h="full">
          <div>
            <Heading fontSize="2xl">Pic-Craft</Heading>
          </div>
          <div className="mt-10">
            <List spacing={6}>
              {menuItems.map((item) => (
                <ListItem key={item.name}>
                  <Link href={item.href} className="flex items-center">
                    <item.icon />
                    <span className="ml-2">{item.name}</span>
                  </Link>
                </ListItem>
              ))}
            </List>
          </div>
        </Box>
        <div className="bg-gray-100 flex items-center justify-between gap-2 rounded-md p-4">
          <VStack align={"start"}>
            <p className="font-semibold">{user.user?.fullName} </p>
          </VStack>
          <UserButton afterSignOutUrl="/" />
        </div>
      </Box>
      <Box display={{ base: "flex", md: "none" }}>
        <IconButton
          as={Button}
          aria-label="menu"
          icon={<FiMenu />}
          ref={btnRef}
          onClick={onOpen}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Pic-Craft</DrawerHeader>
            <DrawerBody>
              <List spacing={6}>
                {menuItems.map((item) => (
                  <ListItem key={item.name} onClick={onClose}>
                    <Link href={item.href} className="flex items-center">
                      <item.icon />
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </DrawerBody>
            <DrawerFooter>
              <HStack>
                <VStack align={"start"}>
                  <p className="font-semibold">{user.user?.fullName} </p>
                </VStack>
                <UserButton afterSignOutUrl="/" />
              </HStack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </aside>
  );
}
