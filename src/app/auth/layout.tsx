
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center">
      <div className="w-full sm:w-[380px] px-10">
        {children}
      </div>
    </main>
  );
}