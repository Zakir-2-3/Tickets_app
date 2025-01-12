import "./FilterAirlinesSidebar.scss";

interface FilterAirlinesSidebarProps {
  airlinesFilter: string[];
  setAirlinesFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterAirlinesSidebar = ({
  airlinesFilter,
  setAirlinesFilter,
}: FilterAirlinesSidebarProps) => {
  const handleChange = (value: string) => {
    setAirlinesFilter(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Убираем значение, если оно уже есть
          : [...prev, value] // Добавляем значение, если его нет
    );
  };

  return (
    <aside className="filter-airlines filter-transfers">
      <h2 className="filter-transfers__title">Компании</h2>
      <div className="filter-airlines__checkbox-container filter-transfers__checkbox-container">
        <div>
          <input
            type="checkbox"
            id="pobeda"
            value="pobeda"
            checked={airlinesFilter.includes("Победа")}
            onChange={() => handleChange("Победа")}
          />
          <label htmlFor="pobeda">Победа</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="red-wings"
            value="red-wings"
            checked={airlinesFilter.includes("Red Wings")}
            onChange={() => handleChange("Red Wings")}
          />
          <label htmlFor="red-wings">Red Wings</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="s7-airlines"
            value="s7-airlines"
            checked={airlinesFilter.includes("S7 Airlines")}
            onChange={() => handleChange("S7 Airlines")}
          />
          <label htmlFor="s7-airlines">S7 Airlines</label>
        </div>
      </div>
    </aside>
  );
};

export default FilterAirlinesSidebar;
