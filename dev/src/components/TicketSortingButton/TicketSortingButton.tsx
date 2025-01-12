import "./TicketSortingButton.scss";

type SortingBtnTitle = {
  title: string; // Описание кнопки
  isActive: boolean; // Указывает, активна ли кнопка
  onClick: (title: string) => void; // Функция-обработчик клика
};

const TicketSortingButton = ({ title, isActive, onClick }: SortingBtnTitle) => {
  return (
    <button
      className={`ticket-sorting-button ${
        isActive ? "ticket-sorting-button--active" : ""
      }`}
      onClick={() => onClick(title)}
    >
      {title}
    </button>
  );
};

export default TicketSortingButton;
