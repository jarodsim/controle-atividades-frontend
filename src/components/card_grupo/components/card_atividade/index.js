import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
  memo,
} from 'react'
import { MdSchedule } from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Container, ContainerStatus } from './styles'

import HomeContext from '../../../../pages/home/context'
import GroupContext from '../../context'

function CardAtividade({ atividade, index, groupIndex }) {
  const ref = useRef()
  const agora = new Date()
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const { move, updateAtividade } = useContext(HomeContext)
  const { setShowModalUpdateAtividade, setIdAtividade } =
    useContext(GroupContext)

  const [atrasada, setAtrasada] = useState(false)
  const [concluida, setConcluida] = useState(atividade.concluida)
  const [backgroundStatus, setBackgroundStatus] = useState(
    atividade.concluida ? 1 : 3
  )

  const data_entrega_formated =
    atividade.dataEntrega === null
      ? null
      : new Date(atividade.dataEntrega.replace(/-/g, '/'))

  // Verify if the atividade is late
  const handleVerifyAtividadeAtrasada = useCallback(() => {
    if (atividade.dataEntrega === null) return

    if (
      data_entrega_formated.setHours(0, 0, 0, 0) < agora.setHours(0, 0, 0, 0)
    ) {
      setAtrasada(true)
      setBackgroundStatus(2)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    handleVerifyAtividadeAtrasada()
  }, [handleVerifyAtividadeAtrasada])

  // Change the background color according to the delivery date situation
  function handleAtividadeConcluida() {
    setConcluida((prev) => !prev)
    setBackgroundStatus(() => {
      if (!concluida) {
        return 1
      } else if (
        concluida &&
        data_entrega_formated !== null &&
        data_entrega_formated.setHours(0, 0, 0, 0) < agora.setHours(0, 0, 0, 0)
      ) {
        return 2
      }
    })

    updateAtividade({
      id: atividade.id,
      descricao: atividade.descricao,
      dataEntrega: atividade.dataEntrega,
      concluida: !concluida,
    })
  }

  // Drag'n drop
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: {
      id: atividade.id,
      index: index,
      content: atividade,
      groupIndex: groupIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop(item, monitor) {
      const draggedgroupIndex = item.groupIndex
      const targetgroupIndex = groupIndex

      const draggedIndex = item.index
      const targetIndex = index

      if (
        draggedIndex === targetIndex &&
        draggedgroupIndex === targetgroupIndex
      ) {
        return
      }

      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2

      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset.y - targetSize.top

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return
      }

      move(draggedgroupIndex, targetgroupIndex, draggedIndex, targetIndex)
      item.index = targetIndex
      item.groupIndex = targetgroupIndex
    },
  })

  dragRef(dropRef(ref))

  return (
    <Container ref={ref} isDragging={isDragging}>
      <h3
        onClick={() => {
          setIdAtividade(atividade.id)
          setShowModalUpdateAtividade(true)
        }}
      >
        {atividade.descricao}
      </h3>
      <ContainerStatus background={backgroundStatus}>
        <input
          type='checkbox'
          id='scales'
          name='scales'
          checked={concluida}
          value={concluida}
          onChange={handleAtividadeConcluida}
        ></input>
        {atividade.dataEntrega !== null ? (
          <>
            <MdSchedule color='black' />
            <p>
              {dayjs(atividade.dataEntrega)
                .tz('America/Fortaleza')
                .locale(ptBR)
                .format('DD/MMM/YY')}
            </p>
          </>
        ) : null}
      </ContainerStatus>
    </Container>
  )
}

export default memo(CardAtividade)
