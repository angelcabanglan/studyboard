export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-24 pt-16">
      <p className="mb-6 text-sm uppercase tracking-wide">
        StudyBoard / Groups
      </p>

      {children}
    </div>
  );
}
