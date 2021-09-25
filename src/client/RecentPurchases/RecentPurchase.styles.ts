import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px 0;

  h3 {
    line-height: 2px;
    font-size: 16px;
  }
`;

export const IndividualItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px min-content 1fr 80px;
  align-items: center;

  img {
    max-width: 40px;
    margin-right: 10px;
    border-radius: 6px;
  }
`;

export const ItemPrice = styled.span`
  justify-self: flex-end !important;
  justify-self: flex-end;
`;

export const TitleAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Amount = styled.span`
  background-color: #edeff7;
  border-radius: 4px;
  margin-right: 10px;
  padding: 3px 4px;
`;

export const TotalPrice = styled(Amount)`
  background-color: #e5ffe0;
  margin: 0 0 0 6px;
`;

export const TotalWrapper = styled.div<{ mt?: string }>`
  margin-top: ${({ mt }) => mt};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
