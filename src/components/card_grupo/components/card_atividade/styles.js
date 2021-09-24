import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 90%;
  background-color: white;
  margin: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid #7f8c8d;

  h3 {
    color: black;
    word-break: break-all;
  }

  ${(props) =>
    props.isDragging &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursor: grabbing;
      p,
      h3,
      div {
        opacity: 0;
      }
    `}
`

export const ContainerStatus = styled.div`
  min-width: 40%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: black;
  border-radius: 4px;
  border: ${(props) => (props.concluida ? '1px solid black' : '')};
  background-color: ${(props) =>
    props.background === 1
      ? '#00FF00'
      : props.background === 2
      ? '#F85846'
      : ''};

  @media screen and (min-width: 1250px) and (max-width: 1500px) {
    min-width: 50%;
  }

  @media screen and (min-width: 1050px) and (max-width: 1250px) {
    min-width: 80%;
  }

  @media screen and (max-width: 1049px) {
    min-width: 60%;
  }
`
