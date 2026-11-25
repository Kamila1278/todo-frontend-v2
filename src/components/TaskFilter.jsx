export default function TaskFilter({
  filter,
  onChange
}) {
  const options = [
    ['all', 'Барлығы'],
    ['active', 'Белсенді'],
    ['completed', 'Орындалған']
  ];

  return (
    <div className="filters">
      {options.map(([value, label]) => (
        <button
          key={value}
          className={
            filter === value
              ? 'filter selected'
              : 'filter'
          }
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}