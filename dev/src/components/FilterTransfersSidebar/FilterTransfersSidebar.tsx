import "./FilterTransfersSidebar.scss";

interface FilterTransfersSidebarProps {
  transfersFilter: number[];
  setTransfersFilter: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilterTransfersSidebar = ({
  transfersFilter,
  setTransfersFilter,
}: FilterTransfersSidebarProps) => {
  const handleChange = (value: number) => {
    setTransfersFilter(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Убираем значение, если оно уже есть
          : [...prev, value] // Добавляем значение, если его нет
    );
  };

  return (
    <aside className="filter-transfers">
      <h2 className="filter-transfers__title">Количество пересадок</h2>
      <div className="filter-transfers__checkbox-container">
        <div>
          <input
            type="checkbox"
            id="no-transfers"
            value="0"
            checked={transfersFilter.includes(0)}
            onChange={() => handleChange(0)}
          />
          <label htmlFor="no-transfers">Без пересадок</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="one-transfer"
            value="1"
            checked={transfersFilter.includes(1)}
            onChange={() => handleChange(1)}
          />
          <label htmlFor="one-transfer">1 пересадка</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="two-transfers"
            value="2"
            checked={transfersFilter.includes(2)}
            onChange={() => handleChange(2)}
          />
          <label htmlFor="two-transfers">2 пересадки</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="three-transfers"
            value="3"
            checked={transfersFilter.includes(3)}
            onChange={() => handleChange(3)}
          />
          <label htmlFor="three-transfers">3 пересадки</label>
        </div>
      </div>
    </aside>
  );
};

export default FilterTransfersSidebar;
