import { logoIcon } from "@/assets/images";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src={logoIcon} alt="myContacts" />
    </>
  );
}
