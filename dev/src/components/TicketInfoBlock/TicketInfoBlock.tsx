import { Ticket } from "../../api/ticketsData";

import "./TicketInfoBlock.scss";

interface TicketInfoBlockProps {
  ticket: Ticket;
}

const TicketInfoBlock = ({ ticket }: TicketInfoBlockProps) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString("ru-RU");
  };

  return (
    <div className="ticket-info-block">
      <div className="ticket-info-block__price">
        {formatPrice(ticket.price)} ₽
      </div>
      <div className="ticket-info-block__company">
        <img
          src={ticket.airline.logo}
          alt={ticket.airline.name}
          className="ticket-info-block__logo"
        />
      </div>
      <div className="ticket-info-block__details">
        <div className="ticket-info-block__details-from-to-time">
          <p>Время:</p>
          <p>
            {ticket.departureTime} - {ticket.arrivalTime}
          </p>
        </div>
        <div className="ticket-info-block__details-total-time">
          <p>В пути:</p>
          <p>{ticket.duration}</p>
        </div>
        <div className="ticket-info-block__details-transplants">
          <p>Пересадки</p>
          <p>
            {ticket.stops > 0
              ? `${ticket.stops} ${
                  ticket.stops === 1 ? "пересадка" : "пересадки"
                }`
              : "Без пересадок"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketInfoBlock;
