import "../../../globals.css";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
};

export default AdminLayout;
