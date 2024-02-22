"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { Button, Input, Select } from "@chakra-ui/react";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import { updateCredits } from "@/lib/actions/user.action";

const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export default function TransformationForm({
  action,
  type,
  userId,
  creditBalance,
  data = null,
  config = null,
}: TransformationFormProps) {
  const transformationType = transformationTypes[type];

  const [image, setImage] = useState(data);
  const [removeRecolor, setRemoveRecolor] = useState("");
  const [recolor, setRecolor] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [removeBackground, setRemoveBackground] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transConfig, setTransConfig] = useState(config);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];
    setImage((prev: any) => ({
      ...prev,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);
    return onChangeField(value);
  };
  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prev: any) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
      return onChangeField(value);
    }, 1000);
  };
  const onTransformHandler = async () => {
    setIsTransforming(true);
    const newConfig = {
      ...transConfig,
      ...newTransformation,
    };
    // setTransConfig(deepMergeObjects(newTransformation,transConfig));
    setTransConfig(newConfig);
    setIsTransforming(false);
    startTransition(async () => {
      // await updateCredits(userId,creditFee)
    });
  };
  return (
    <div>
      <form action="" className="my-6">
        <Input placeholder="Title" w={"full"} />
      </form>

      {/** Generative Fill */}
      {type === "fill" && (
        <div>
          <label
            htmlFor="aspectRatio"
            className="text-[18px] font-semibold text-gray-700"
          >
            Aspect Ratio
          </label>
          <Select
            placeholder="Select Size"
            onChange={(e) =>
              onSelectFieldHandler(e.target.value, setAspectRatio)
            }
            value={aspectRatio}
          >
            {Object.keys(aspectRatioOptions).map((key) => (
              <option key={key} value={key}>
                {aspectRatioOptions[key as AspectRatioKey].label}
              </option>
            ))}
          </Select>
        </div>
      )}

      {/** Object Remove or recolor */}
      {(type === "remove" || type === "recolor") && (
        <form className="flex flex-col gap-3">
          <label>
            {type === "remove" ? "Object To Remove" : "Object To Recolor"}
          </label>
          <Input
            placeholder={
              type === "remove" ? "Object To Remove" : "Object To Recolor"
            }
            value={removeRecolor}
            onChange={(e) =>
              onInputChangeHandler("prompt", e.target.value, type, setRecolor)
            }
          />
          {type === "recolor" && (
            <div>
              <label>Replacement Color</label>
              <Input
                placeholder="Replacement Color"
                value={recolor}
                onChange={(e) =>
                  onInputChangeHandler(
                    "color",
                    e.target.value,
                    "recolor",
                    setRemoveRecolor
                  )
                }
              />
            </div>
          )}
          <div className="flex flex-col gap-3 mt-4">
            <Button
              colorScheme="purple"
              type="button"
              isDisabled={isTransforming || newTransformation === null}
              onClick={onTransformHandler}
            >
              {isTransforming ? "Transforming..." : "Apply Transformation"}
            </Button>
            <Button colorScheme="purple" type="submit" isLoading={isSubmit}>
              {isSubmit ? "Submiting..." : "Save Image"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
