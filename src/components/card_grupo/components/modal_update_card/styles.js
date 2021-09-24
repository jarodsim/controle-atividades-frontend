import styled from 'styled-components'

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Header = styled.div`
  width: 100%;
  padding: 10px;
  background-color: blue;
  display: flex;
  justify-content: space-between;

  h2 {
    text-align: center;
    font-size: 1.5em;
  }

  button {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`

export const ModalWraper = styled.div`
  width: 18%;
  min-height: 150px;
  background-color: whitesmoke;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
  border-radius: 3px;

  textarea {
    width: 95%;
    min-height: 90px;
    margin-top: 2px;
    resize: none;
  }

  textarea:focus {
    outline: none;
  }

  @media screen and (max-width: 1050px) {
    width: 40%;
  }

  @media screen and (max-width: 500px) {
    width: 80%;
  }
`

export const ContainerButtons = styled.div`
  width: 95%;
  margin: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Button = styled.button`
  width: 40%;
  height: 40px;
  cursor: pointer;
`
export const DatePickerWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.9em;
    color: black;
  }

  input {
    cursor: pointer;
  }
`
