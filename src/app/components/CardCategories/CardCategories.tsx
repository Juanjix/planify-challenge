import styled from "styled-components";

const StyledCardCategories = styled.div``;

interface CardCategoriesProps {
  id: string;
  name: string;
  description: string;
  category: string;
}

const CardCategories = (props: CardCategoriesProps) => {
  return <StyledCardCategories></StyledCardCategories>;
};

export default CardCategories;
