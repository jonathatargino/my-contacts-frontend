"use client";

import { Button, Input, InputWrapper, Select } from "@/app/components";
import { IContact, IContactRequestBody } from "@/provider/contact";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import formatPhone from "@/utils/phone/formatPhone";
import unformatPhone from "@/utils/phone/unformatPhone";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { ICategory } from "@/provider/category";

interface ContactsFormProps {
  buttonLabel: string;
  categories: Array<ICategory>;
}

export default function ContactsForm({ buttonLabel, categories }: ContactsFormProps) {
  const sendHttpRequest = useFetch<IContact>({ endpoint: "contacts", method: "POST" });

  const mutation = useMutation({
    mutationFn: sendHttpRequest<IContactRequestBody>,
    onSuccess: () => console.log("DEU BOM"),
    onError: () => console.log("DEU RUIM"),
  });

  const schema = z.object({
    name: z.string().nonempty({ message: "Este campo é obrigatório" }),
    email: z.string().nonempty({ message: "Este campo é obrigatório" }).email({ message: "Este email é inválido" }),
    phone: z
      .string()
      .nonempty({ message: "Este campo é obrigatório" })
      .transform((phoneNumber) => unformatPhone(phoneNumber)),
    category_id: z.string().nonempty({ message: "Este campo é obrigatório" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactRequestBody>({ resolver: zodResolver(schema) });

  const handlePhoneChange = (e: any) => {
    e.target.value = formatPhone(e.target.value);
  };

  const onSubmit = (data: IContactRequestBody) => {
    mutation.mutate(data);
  };

  const existFieldErrors = Object.values(errors).length !== 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6 flex flex-col gap-4">
        <InputWrapper errorMessage={errors?.name?.message}>
          <Input placeholder="Nome *" {...register("name")} error={!!errors.name} autoComplete="off" />
        </InputWrapper>

        <InputWrapper errorMessage={errors?.email?.message}>
          <Input type="email" placeholder="E-mail *" {...register("email")} error={!!errors.email} autoComplete="off" />
        </InputWrapper>

        <InputWrapper errorMessage={errors?.phone?.message}>
          <Input
            type="tel"
            placeholder="Telefone *"
            {...register("phone", { onChange: handlePhoneChange })}
            error={!!errors.phone}
            autoComplete="off"
            maxLength={15}
          />
        </InputWrapper>

        <InputWrapper errorMessage={errors?.category_id?.message}>
          <Select placeholder="Categoria *" {...register("category_id")} error={!!errors.category_id}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </InputWrapper>
      </div>
      <Button disabled={existFieldErrors} type="submit" className="w-full">
        {buttonLabel}
      </Button>
    </form>
  );
}
