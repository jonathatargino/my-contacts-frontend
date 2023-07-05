"use client";

import { Button, Input, InputWrapper, Select } from "@/app/components";
import { IContact } from "@/provider/contact";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import formatPhone from "@/utils/phone/formatPhone";
import unformatPhone from "@/utils/phone/unformatPhone";

interface ContactsFormProps {
  buttonLabel: string;
}

type ContactsFormFields = Omit<IContact, "id">;

export default function ContactsForm({ buttonLabel }: ContactsFormProps) {
  const schema = z.object({
    name: z.string().nonempty({ message: "Este campo é obrigatório" }),
    email: z.string().nonempty({ message: "Este campo é obrigatório" }).email({ message: "Este email é inválido" }),
    phone: z
      .string()
      .nonempty({ message: "Este campo é obrigatório" })
      .transform((phoneNumber) => unformatPhone(phoneNumber)),
    category: z.string().nonempty({ message: "Este campo é obrigatório" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactsFormFields>({ resolver: zodResolver(schema) });

  const handlePhoneChange = (e: any) => {
    e.target.value = formatPhone(e.target.value);
  };

  const onSubmit = (data: ContactsFormFields) => {
    console.log(data);
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

        <InputWrapper errorMessage={errors?.category?.message}>
          <Select placeholder="Categoria *" {...register("category")} error={!!errors.category}>
            <option value="1">Instagram</option>
            <option value="2">Facebook</option>
            <option value="3">LinkedIn</option>
          </Select>
        </InputWrapper>
      </div>
      <Button disabled={existFieldErrors} type="submit" className="w-full">
        {buttonLabel}
      </Button>
    </form>
  );
}
