import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-primary">
      <aside className="fixed left-0 top-0 h-full z-50">
        <AdminSidebar />
      </aside>
      <main className="ml-64 flex-1 h-full overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}