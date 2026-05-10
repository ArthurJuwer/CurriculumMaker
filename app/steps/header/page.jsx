import { Suspense } from "react";
import HeaderForm from "@/components/Steps/header/HeaderForm";

export default function HeaderPage() {
  return (
    <Suspense fallback={null}>
      <HeaderForm />
    </Suspense>
  );
}
