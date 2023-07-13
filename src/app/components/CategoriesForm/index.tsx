"use client";

import { Button, Input, InputWrapper } from "@/app/components";
import useToast from "@/hooks/useToast";
import { CategoryService } from "@/services";
import { ICategory, ICategoryRequestBody } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CategoriesFormProps {
  category?: ICategory;
}

export default function CategoriesForm({ category }: CategoriesFormProps) {
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
      if (category) {
        return CategoryService.updateById(category.id, data);
      }

      return CategoryService.create(data);
    },
    onSuccess: (data: ICategory) => {
      if (category) {
        return useToast({ type: "success", text: `Sucesso ao renomear a categoria ${data.name}` });
      }
      useToast({ type: "success", text: `Sucesso ao criar a categoria ${data.name}` });
      reset();
    },
    onError: () => {
      if (category) {
        return useToast({ type: "danger", text: "Erro ao renomear uma categoria" });
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
