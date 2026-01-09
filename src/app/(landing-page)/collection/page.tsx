import { Suspense } from "react";
import BausastraSaku from "./BausastraSaku";
import { Loader } from "lucide-react";

export default function Page() {
  return (
    <Suspense fallback={<section className="w-full min-h-screen flex justify-center items-center"><Loader /></section>}>
      <BausastraSaku />
    </Suspense>
  );
}
