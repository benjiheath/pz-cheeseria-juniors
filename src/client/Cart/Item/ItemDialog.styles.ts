import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px 30px 0;
  width: 400px;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;

  p {
    margin: 25px 0 35px;
  }
`;

export const TitleAndPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ItemImg = styled.img`
  max-height: 200px;
  width: 100%;
  object-fit: cover;
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CategoryTag = styled.label`
  border-radius: 4px;
  background-color: #edeff7;
  padding: 3px 6px;
  display: inline-block;
  margin-right: 6px;
`;
