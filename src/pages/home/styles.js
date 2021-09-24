import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContainerGrupos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media screen and (max-width: 1049px) {
    justify-content: center;
  }
`

export const NewGroupDiv = styled.div`
  width: 18%;
  min-height: 55px;
  background-color: whitesmoke;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 1% 0.5%;

  @media screen and (max-width: 1050px) {
    width: 40%;
  }

  @media screen and (max-width: 500px) {
    width: 80%;
  }

  input:focus {
    outline: none;
  }
`

export const ButtonNewGroup = styled.button`
  width: 90%;
  height: 45px;
  color: blue;
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 1.5em;
  font-weight: 500;
`

export const InputNewGroup = styled.input`
  width: 90%;
  height: 45px;
`
