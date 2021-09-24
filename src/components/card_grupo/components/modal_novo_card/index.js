import { useCallback, useRef, useEffect, useState, useContext } from 'react'
import { MdClose } from 'react-icons/md'

import {
  Background,
  ContainerButtons,
  Header,
  ModalWraper,
  Button,
  DatePickerWrapper,
} from './styles'

import HomeContext from '../../../../pages/home/context'

export default function ModalNovoCard({ showModal, setShowModal, groupIndex }) {
  const today = new Date()
  const today_formated = today.toISOString().slice(0, 10).replace(/-/g, '-')
  const modalRef = useRef()

  const { newAtividade } = useContext(HomeContext)

  const [descricao, setDescricao] = useState('')
  const [dataEntrega, setDataEntrega] = useState(null)

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setDescricao('')
      setShowModal(false)
    }
  }

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
      }
    },
    [setShowModal, showModal]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  // Validate the infos and save the card on database
  function saveCard() {
    if (descricao.length <= 0) return
    if (dataEntrega === null) {
      newAtividade(groupIndex, {
        descricao: descricao,
        dataEntrega: null,
        concluida: false,
      })

      setDescricao('')
      setShowModal(false)
    } else {
      const date_data_entrega = new Date(dataEntrega.replace(/-/g, '/'))
      if (date_data_entrega.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0))
        newAtividade(groupIndex, {
          descricao: descricao,
          dataEntrega: dataEntrega,
          concluida: false,
        })

      setDescricao('')
      setShowModal(false)
    }
  }

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={(e) => closeModal(e)}>
          <ModalWraper showModal={showModal}>
            <Header>
              <h2>Nova atividade</h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setDescricao('')
                }}
              >
                <MdClose />
              </button>
            </Header>
            <textarea
              name='descricao'
              id='descricao'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
            <ContainerButtons>
              <DatePickerWrapper>
                <label htmlFor='dataEntrega'>DATA DE ENTREGA</label>
                <input
                  id='dataEntrega'
                  name='dataEntrega'
                  type='date'
                  min={today_formated}
                  onChange={(e) => setDataEntrega(e.target.value)}
                />
              </DatePickerWrapper>
              <Button onClick={saveCard}>SALVAR</Button>
            </ContainerButtons>
          </ModalWraper>
        </Background>
      ) : null}
    </>
  )
}
