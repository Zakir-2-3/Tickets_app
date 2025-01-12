import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import {
  loadTickets,
  ticketsSelectors,
  addMoreTickets,
} from "./store/ticketsSlice";

import FilterTransfersSidebar from "./components/FilterTransfersSidebar/FilterTransfersSidebar";
import FilterAirlinesSidebar from "./components/FilterAirlinesSidebar/FilterAirlinesSidebar";
import TicketSortingButton from "./components/TicketSortingButton/TicketSortingButton";
import TicketInfoBlock from "./components/TicketInfoBlock/TicketInfoBlock";

import "./styles/App.scss";

import headerImg from "./assets/images/header-logo-img.png";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux-состояние
  const tickets = useSelector(ticketsSelectors.selectAll);
  const loading = useSelector((state: RootState) => state.tickets.loading);
  const error = useSelector((state: RootState) => state.tickets.error);

  // Локальное состояние
  const [activeButton, setActiveButton] = useState<string>("Самый дешевый"); // Активная кнопка сортировки
  const [transfersFilter, setTransfersFilter] = useState<number[]>([]); // Фильтр по пересадкам
  const [airlinesFilter, setAirlinesFilter] = useState<string[]>([]); // Фильтр по авиакомпаниям
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Состояние открытия сайдбара

  // Загрузка билетов при монтировании
  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

  // Обновление активной кнопки сортировки
  const handleButtonClick = (title: string) => {
    setActiveButton(title);
  };

  // Применение сортировки
  const getSortedTickets = (): typeof tickets => {
    let sortedTickets = [...tickets];
    if (activeButton === "Самый дешевый") {
      sortedTickets.sort((a, b) => a.price - b.price);
    } else if (activeButton === "Самый быстрый") {
      sortedTickets.sort((a, b) => {
        const [hoursA, minutesA] = a.duration
          .split("ч")
          .map((x) => parseInt(x, 10) || 0);
        const [hoursB, minutesB] = b.duration
          .split("ч")
          .map((x) => parseInt(x, 10) || 0);
        return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
      });
    }
    return sortedTickets;
  };

  // Применение фильтров
  const getFilteredTickets = (): typeof tickets => {
    let filteredTickets = getSortedTickets();
    if (transfersFilter.length > 0) {
      filteredTickets = filteredTickets.filter((ticket) =>
        transfersFilter.includes(ticket.stops)
      );
    }
    if (airlinesFilter.length > 0) {
      filteredTickets = filteredTickets.filter((ticket) =>
        airlinesFilter.includes(ticket.airline.name)
      );
    }
    return filteredTickets;
  };

  const sortedAndFilteredTickets = getFilteredTickets();

  // Обработка загрузки дополнительных билетов (с новым ID)
  const loadMoreTickets = () => {
    const additionalTickets = tickets.map((ticket, index) => ({
      ...ticket,
      id: `${ticket.id}-${Date.now()}-${index}`, // Генерация нового уникального ID
    }));

    dispatch(addMoreTickets(additionalTickets)); // Вызываем действие для добавления билетов
  };

  // Обработка клика для открытия/закрытия сайдбара
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Переключаем состояние
  };

  if (loading) {
    return <div className="load">Загрузка...</div>;
  }
  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <>
      <main className="main">
        <div className="main-container">
          <div className="main-container__header">
            <div className="main-container__header-img">
              <img src={headerImg} className="header-img" alt="header-img" />
            </div>
            <div className="main-container__header-title">
              <h1 className="header-title">Поиск авиабилетов</h1>
            </div>
          </div>
          <div className="main-container__wrapper">
            <div
              className={`main-container__sidebar-drop-down ${
                isSidebarOpen ? "main-container__sidebar-drop-down--active" : ""
              }`}
            >
              <p>Любая авиакомпания, любое кол-во пересадок</p>
              <button onClick={toggleSidebar}>Открыть настройки</button>
              <div
                className={`main-container__sidebar ${
                  isSidebarOpen ? "main-container__sidebar--active" : ""
                }`}
              >
                <FilterTransfersSidebar
                  transfersFilter={transfersFilter}
                  setTransfersFilter={setTransfersFilter}
                />
                <FilterAirlinesSidebar
                  airlinesFilter={airlinesFilter}
                  setAirlinesFilter={setAirlinesFilter}
                />
              </div>
            </div>
            <div className="main-container__sorting">
              <TicketSortingButton
                title={"Самый дешевый"}
                isActive={activeButton === "Самый дешевый"}
                onClick={handleButtonClick}
              />
              <TicketSortingButton
                title={"Самый быстрый"}
                isActive={activeButton === "Самый быстрый"}
                onClick={handleButtonClick}
              />
              <TicketSortingButton
                title={"Самый оптимальный"}
                isActive={activeButton === "Самый оптимальный"}
                onClick={handleButtonClick}
              />
            </div>
            <div className="main-container__tickets">
              <div className="main-container__tickets-wrapper">
                {sortedAndFilteredTickets.map((ticket) => (
                  <TicketInfoBlock key={ticket.id} ticket={ticket} />
                ))}
              </div>
              <button
                className="main-container__tickets-load-tickets"
                onClick={loadMoreTickets}
              >
                Загрузить еще билеты
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
