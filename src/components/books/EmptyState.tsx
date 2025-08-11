type Props = { title?: string; description?: string; onRefresh?: () => void };

export default function EmptyState({
  title = "Không có sách để hiển thị",
  description = "Thử thay đổi bộ lọc hoặc tìm kiếm khác.",
  onRefresh,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border p-8 text-center">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {onRefresh && (
        <button onClick={onRefresh} className="btn btn-outline mt-4">Tải lại</button>
      )}
    </div>
  );
}
