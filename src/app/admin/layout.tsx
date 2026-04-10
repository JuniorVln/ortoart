import { auth } from "@/auth-server";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <AdminLayoutWrapper
      userName={session?.user?.name}
      userEmail={session?.user?.email}
    >
      {children}
    </AdminLayoutWrapper>
  );
}
