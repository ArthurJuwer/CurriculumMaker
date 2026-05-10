import { Suspense } from "react";
import HeaderForm from "@/components/steps/header/HeaderForm";

export default function HeaderPage() {
  return (
    <Suspense fallback={null}>
      <HeaderForm />
    </Suspense>
  );
}
