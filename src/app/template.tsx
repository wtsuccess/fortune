import Footer from "@/components/layouts/Footer";
import { PropsWithChildren } from "react";

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
