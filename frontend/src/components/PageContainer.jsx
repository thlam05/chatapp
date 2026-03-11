export default function PageContainer({ children }) {
  return (
    <div className="flex justify-center bg-[#f6f7fb] min-h-screen p-6">
      <div className="w-[900px]">
        {children}
      </div>
    </div>
  );
}