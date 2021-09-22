import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;

  img {
    max-width: 120px;
    margin-right: 20px;
    border-radius: 12px;
  }
`;

export const TitleAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    line-height: 0;
  }
`;
