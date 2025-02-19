import Navbar from "@/app/components/admin/NavBar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "../globals.css";

export const metadata: Metadata = {
  title: "Nexa - Tecnologia e Comunicação",
  description: "",
};

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="overflow-y-auto ml-56 p-3 bg-gray-50 h-screen">
        <div className="lg:max-w-3xl xl:max-w-5xl mx-auto h-full  p-4 rounded-2xl max-h-full">
          {children}
        </div>
      </div>
    </>
  );
}
