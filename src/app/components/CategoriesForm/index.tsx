"use client";

import { Button, Input, InputWrapper } from "@/app/components";
import useToast from "@/hooks/useToast";
import { CategoryService } from "@/services";
import { ICategory, ICategoryRequestBody } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CategoriesForm() {
  const schema = z.object({
    name: z.string().nonempty({ message: "Este campo é obrigatório" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategoryRequestBody>({ resolver: zodResolver(schema) });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: ICategoryRequestBody) => CategoryService.create(data),
    onSuccess: (data: ICategory) => {
      useToast({ type: "success", text: `Sucesso ao criar a categoria ${data.name}` });
      reset();
    },
    onError: () => {
      useToast({ type: "danger", text: "Erro ao criar uma categoria" });
    },
  });

  function onSubmit(data: ICategoryRequestBody) {
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper errorMessage={errors.name?.message}>
        <Input placeholder="Nome *" {...register("name")} error={Boolean(errors.name)} autoComplete="off" />
      </InputWrapper>
      <Button className="mt-6 w-full" isLoading={isLoading}>
        Cadastrar nova categoria
      </Button>
    </form>
  );
}
