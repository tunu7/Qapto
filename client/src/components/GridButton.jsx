const GridButton = ({
  onClick,
  Icon: IconComponent, // ✅ Rename here
  label,
  color = 'gray',
  hide = false,
}) => {
  if (hide) return null;

  return (
    <button
      onClick={onClick}
      className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition"
    >
      {/* ✅ Use renamed IconComponent here */}
      <IconComponent className={`w-6 h-6 text-${color}-600 group-hover:text-${color}-700`} />
      <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
    </button>
  );
};

export default GridButton;
