"use client";

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { ChangeEvent } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Button, Input, InputWrapper, Select } from "@/app/components";
import { IContact, IContactRequestBody, ICategory } from "@/types";
import { ContactService } from "@/services";
import { unformatPhone, formatPhone } from "@/utils";
import useToast from "@/hooks/useToast";
import APIError from "@/errors/APIError";

interface ContactsFormProps {
  buttonLabel: string;
  categories: Array<ICategory>;
  contact?: IContact;
}

export default function ContactsForm({ buttonLabel, categories, contact }: ContactsFormProps) {
  const authToken = getCookie("authToken")?.valueOf() as string;
  const router = useRouter();

  const editingContact = contact !== undefined;

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: IContactRequestBody) => {
      if (editingContact) {
        return ContactService.updateById({ id: contact.id, body: data, authToken });
      }
      return ContactService.create({ body: data, authToken });
    },
    onSuccess: (data: IContact) => {
      if (editingContact) {
        router.push("/contacts");
        router.refresh();
        return useToast({ type: "success", text: `Sucesso ao editar o contato ${data.name}` });
      }

      useToast({ type: "success", text: `Sucesso ao cadastrar o contato ${data.name}` });
      reset();
    },
    onError: (error) => {
      if (error instanceof APIError) {
        return useToast({ type: "danger", text: error.message });
      }

      if (editingContact) {
        return useToast({ type: "danger", text: "Erro ao renomear o contato" });
      }
      useToast({ type: "danger", text: "Erro ao criar uma categoria" });
    },
  });

  const schema = z.object({
    name: z.string().nonempty({ message: "Este campo é obrigatório" }),
    email: z
      .string()
      .email({ message: "Este email é inválido" })
      .optional()
      .or(z.literal(""))
      .transform((email) => {
        if (email === "") {
          return null;
        }
      }),
    phone: z.string().transform((phoneNumber) => {
      if (phoneNumber !== "") {
        return unformatPhone(phoneNumber);
      }

      return null;
    }),
    category_id: z.string().nonempty({ message: "Este campo é obrigatório" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContactRequestBody>({
    resolver: zodResolver(schema),
    defaultValues: editingContact
      ? {
          category_id: contact.category_id,
          email: contact.email ? contact.email : "",
          name: contact.name,
          phone: contact.phone ? formatPhone(contact.phone) : "",
        }
      : undefined,
  });

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatPhone(e.target.value);
  };

  const onSubmit = (data: IContactRequestBody) => {
    mutate(data);
  };

  const existFieldErrors = Object.values(errors).length !== 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6 flex flex-col gap-4">
        <InputWrapper errorMessage={errors?.name?.message}>
          <Input
            placeholder="Nome *"
            {...register("name")}
            error={!!errors.name}
            autoComplete="off"
            disabled={isLoading}
          />
        </InputWrapper>

        <InputWrapper errorMessage={errors?.email?.message}>
          <Input
            type="email"
            placeholder="E-mail"
            {...register("email")}
            error={!!errors.email}
            autoComplete="off"
            disabled={isLoading}
          />
        </InputWrapper>

        <InputWrapper errorMessage={errors?.phone?.message}>
          <Input
            type="tel"
            placeholder="Telefone"
            {...register("phone", { onChange: handlePhoneChange })}
            error={!!errors.phone}
            autoComplete="off"
            maxLength={15}
            disabled={isLoading}
          />
        </InputWrapper>

        <InputWrapper errorMessage={errors?.category_id?.message}>
          <Select
            placeholder="Categoria *"
            {...register("category_id")}
            error={!!errors.category_id}
            disabled={isLoading}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </InputWrapper>
      </div>
      <Button disabled={existFieldErrors} isLoading={isLoading} type="submit" className="w-full">
        {buttonLabel}
      </Button>
    </form>
  );
}
