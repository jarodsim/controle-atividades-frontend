import { useState, useContext, useRef } from 'react'
import { useDrop } from 'react-dnd'
import CardAtividade from './components/card_atividade'
import { Container, Header, PNovoCard } from './styles'

import HomeContext from '../../pages/home/context'
import ModalNovoCard from './components/modal_novo_card'
import ModalUpdate from './components/modal_update_card'

import GroupContext from './context'

export default function CardGrupo({ grupo, index: groupIndex }) {
  const [showModalUpdateAtividade, setShowModalUpdateAtividade] =
    useState(false)
  const [idAtividade, setIdAtividade] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const { move } = useContext(HomeContext)

  // Drag'n drop
  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      if (item.groupIndex === groupIndex && grupo.atividades.length !== 0) {
        return
      }

      move(item.groupIndex, groupIndex, item.index, 0)
    },
  })

  function openModal() {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <GroupContext.Provider
        value={{
          idAtividade,
          setIdAtividade,
          showModalUpdateAtividade,
          setShowModalUpdateAtividade,
        }}
      >
        <Container ref={dropRef}>
          <Header>
            <h2>{grupo.nome}</h2>
          </Header>
          {grupo.atividades.map((atividade, index) => (
            <CardAtividade
              atividade={atividade}
              key={atividade.id}
              index={index}
              groupIndex={groupIndex}
            />
          ))}

          <PNovoCard onClick={() => openModal()}>Novo Card +</PNovoCard>
        </Container>
        <ModalNovoCard
          showModal={showModal}
          setShowModal={setShowModal}
          groupIndex={groupIndex}
        />
        {showModalUpdateAtividade ? <ModalUpdate /> : ''}
      </GroupContext.Provider>
    </>
  )
}
