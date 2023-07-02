"use client";

import { Button, Input, InputWrapper, Select } from "@/app/components";

interface ContactsFormProps {
  buttonLabel: string;
}

export default function ContactsForm({ buttonLabel }: ContactsFormProps) {
  return (
    <form>
      <div className="mb-6 flex flex-col gap-4">
        <InputWrapper>
          <Input placeholder="Nome" />
        </InputWrapper>

        <InputWrapper>
          <Input placeholder="E-mail" />
        </InputWrapper>

        <InputWrapper>
          <Input placeholder="Telefone" />
        </InputWrapper>

        <InputWrapper>
          <Select placeholder="Categoria">
            <option value="1">Instagram</option>
            <option value="2">Facebook</option>
            <option value="3">LinkedIn</option>
          </Select>
        </InputWrapper>
      </div>
      <Button type="submit" className="w-full">
        {buttonLabel}
      </Button>
    </form>
  );
}
