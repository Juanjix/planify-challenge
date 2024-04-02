import styled from "styled-components";

const StyledCardDates = styled.div``;

interface CardDatesProps {
  date: Date;
  serviceId: number;
  availableTimeslots: string[];
}

const CardDates = (props: CardDatesProps) => {
  return <StyledCardDates></StyledCardDates>;
};

export default CardDates;
