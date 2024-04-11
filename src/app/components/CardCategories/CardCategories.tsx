import styled from "styled-components";

const StyledCardCategories = styled.div`
  padding: 12px;
  border: 1px solid grey;
`;

interface CardCategoriesProps {
  id: string;
  name: string;
  description: string;
  category: string;
}

const CardCategories = (props: CardCategoriesProps) => {
  return (
    <StyledCardCategories>
      <p>Categorias</p>
    </StyledCardCategories>
  );
};

export default CardCategories;
