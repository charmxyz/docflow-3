export default function TestTypeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full bg-white">
      {children}
    </div>
  );
} 