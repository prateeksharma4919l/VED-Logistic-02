import { redirect } from "next/navigation";

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  void children;
  redirect("/admin/riders");
}
