import styled from 'styled-components'

export const Container = styled.div`
  width: 18%;
  min-height: 100px;
  background-color: whitesmoke;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin: 1% 0.5%;

  @media screen and (max-width: 1050px) {
    width: 40%;
  }

  @media screen and (max-width: 500px) {
    width: 80%;
  }
`

export const Header = styled.div`
  width: 100%;
  padding: 10px;
  background-color: blue;

  h2 {
    text-align: center;
    font-size: 1.5em;
  }
`

export const PNovoCard = styled.p`
  width: 90%;
  color: blue;
  font-size: 1.5em;
  font-weight: 500;
  align-self: flex-start;
  margin: auto 5%;
  cursor: pointer;
`
