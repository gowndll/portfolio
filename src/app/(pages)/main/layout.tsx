export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
