"use client";

import { Button, Input, InputWrapper } from "@/app/components";
import APIError from "@/errors/APIError";
import useToast from "@/hooks/useToast";
import { CategoryService } from "@/services";
import { ICategory, ICategoryRequestBody } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CategoriesFormProps {
  category?: ICategory;
}

export default function CategoriesForm({ category }: CategoriesFormProps) {
  const authToken = getCookie("authToken")?.valueOf() as string;

  const router = useRouter();
  const editingCategory = category !== undefined;

  const schema = z.object({
    name: z.string().nonempty({ message: "Este campo é obrigatório" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategoryRequestBody>({
    resolver: zodResolver(schema),
    defaultValues: category ? { name: category.name } : undefined,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: ICategoryRequestBody) => {
      if (editingCategory) {
        return CategoryService.updateById({ id: category.id, body: data, authToken });
      }

      return CategoryService.create({ body: data, authToken });
    },
    onSuccess: (data: ICategory) => {
      if (editingCategory) {
        router.push("/categories");
        router.refresh();
        return useToast({ type: "success", text: `Sucesso ao renomear a categoria ${data.name}` });
      }
      useToast({ type: "success", text: `Sucesso ao criar a categoria ${data.name}` });
      reset();
    },
    onError: (error) => {
      if (error instanceof APIError) {
        return useToast({ type: "danger", text: error.message });
      }

      if (editingCategory) {
        return useToast({ type: "danger", text: "Erro ao renomear a categoria" });
      }
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
        {category ? "Salvar alterações" : "Cadastrar nova categoria"}
      </Button>
    </form>
  );
}
