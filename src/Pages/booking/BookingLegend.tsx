export default function BookingLegend() {
  return (
    <div className="grid grid-cols-3 mx-auto max-w-[380px] py-4 place-items-center">
      <div className="flex items-center gap-1">
        <p className="w-4 h-4 border border-gray-400"></p>
        <span>Ledig</span>
      </div>
      <div className="flex items-center gap-1">
        <p className="w-4 h-4 bg-green-800 border border-gray-400"></p>
        <span>Valgt</span>
      </div>
      <div className="flex items-center gap-1">
        <p className="w-4 h-4 bg-red-800 border border-gray-400"></p>
        <span>Optaget</span>
      </div>
    </div>
  );
}
