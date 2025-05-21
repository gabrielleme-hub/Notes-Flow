export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex bg-[#28262E]">{children}</main>;
}
