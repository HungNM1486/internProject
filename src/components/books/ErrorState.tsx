type Props = { message?: string; onRetry?: () => void };

export default function ErrorState({
  message = "Có lỗi xảy ra khi tải dữ liệu.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border p-8 text-center text-red-600">
      <h4 className="text-lg font-semibold">Lỗi</h4>
      <p className="mt-1 text-sm">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn btn-error mt-4">Thử lại</button>}
    </div>
  );
}
