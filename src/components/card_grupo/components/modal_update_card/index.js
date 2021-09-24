/* eslint-disable react-hooks/exhaustive-deps */
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
import GroupContext from '../../context'

import api from '../../../../services/api'

export default function ModalUpdate() {
  const today = new Date()
  const today_formated = today.toISOString().slice(0, 10).replace(/-/g, '-')
  const modalRef = useRef()

  const { updateAtividade } = useContext(HomeContext)
  const { idAtividade, showModalUpdateAtividade, setShowModalUpdateAtividade } =
    useContext(GroupContext)

  const [descricao, setDescricao] = useState('')
  const [concluida, setConcluida] = useState('')
  const [dataEntrega, setDataEntrega] = useState(null)

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setDescricao('')
      setShowModalUpdateAtividade(false)
    }
  }

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModalUpdateAtividade) {
        setShowModalUpdateAtividade(false)
      }
    },
    [setShowModalUpdateAtividade, showModalUpdateAtividade]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [])

  // Load the atividade
  async function getData() {
    const { data } = await api.get(`/atividade/${idAtividade}`)

    setDataEntrega(data.dataEntrega)
    setDescricao(data.descricao)
    setConcluida(data.concluida)
  }

  // Save the atividade
  function saveCard() {
    if (descricao.length <= 0) return

    if (dataEntrega === null) {
      updateAtividade({
        id: idAtividade,
        descricao: descricao,
        dataEntrega: null,
        concluida: concluida,
      })

      setDescricao('')
      setShowModalUpdateAtividade(false)
    } else {
      const entrega_formated = new Date(dataEntrega.replace(/-/g, '/'))
      if (entrega_formated >= today.setHours(0, 0, 0, 0))
        updateAtividade({
          id: idAtividade,
          descricao: descricao,
          dataEntrega: dataEntrega,
          concluida: false,
        })

      setDescricao('')
      setShowModalUpdateAtividade(false)
    }
  }

  return (
    <>
      {showModalUpdateAtividade ? (
        <Background ref={modalRef} onClick={(e) => closeModal(e)}>
          <ModalWraper showModal={showModalUpdateAtividade}>
            <Header>
              <h2>Editar Atividade</h2>
              <button
                onClick={() => {
                  setShowModalUpdateAtividade(false)
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
                  value={dataEntrega ? dataEntrega : ''}
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
