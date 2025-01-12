export interface Ticket {
  id: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  airline: {
    name: string;
    logo: string;
  };
}

// Данные билетов
export const tickets: Ticket[] = [
  {
    id: "1",
    price: 12680,
    departureTime: "12:00",
    arrivalTime: "16:30",
    duration: "4 ч 30 мин",
    stops: 1,
    airline: {
      name: "Победа",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pobeda_logo.svg/2560px-Pobeda_logo.svg.png",
    },
  },
  {
    id: "2",
    price: 21500,
    departureTime: "14:00",
    arrivalTime: "16:00",
    duration: "2 ч 0 мин",
    stops: 0,
    airline: {
      name: "Red Wings",
      logo: "https://samolety.org/wp-content/uploads/2018/02/red_wings_logo.png",
    },
  },
  {
    id: "3",
    price: 23995,
    departureTime: "04:50",
    arrivalTime: "13:30",
    duration: "8 ч 40 мин",
    stops: 2,
    airline: {
      name: "S7 Airlines",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/S7_new_logo.svg/2560px-S7_new_logo.svg.png",
    },
  },
];

// Имитация API
export const fetchTickets = (): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tickets);
    }, 1000);
  });
};
