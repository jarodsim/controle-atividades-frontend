import { useCallback, useEffect, useState } from 'react'
import CardGrupo from '../../components/card_grupo'
import Header from '../../components/header'
import Loading from '../../components/loading'
import {
  ButtonNewGroup,
  Container,
  ContainerGrupos,
  InputNewGroup,
  NewGroupDiv,
} from './styles'
import HomeContext from './context'
import produce from 'immer'
import api from '../../services/api'

export default function Home() {
  const [isLoading, setLoading] = useState(true)
  const [newGroup, setNewGroup] = useState(false)
  const [nomeNewGroup, setNomeNewGroup] = useState('')
  const [grupos, setGrupos] = useState([{}])

  let memTime = 0
  async function move(fromList, toList, from, to) {
    setGrupos(
      produce(grupos, (draft) => {
        const dragged = draft[fromList].atividades[from]
        draft[fromList].atividades.splice(from, 1)
        draft[toList].atividades.splice(to, 0, dragged)
      })
    )
    var date = new Date()
    var now = date.getTime()
    if (memTime === 0) memTime = now

    // Save in database
    if (fromList === toList) {
      console.log(
        `mesmo grupo\n tamanho do grupo ${grupos[fromList].atividades.length}\n index atual: ${from}\n novo index: ${to}`
      )

      const { data } = await api.put(
        `/grupos/mover/${grupos[fromList].id}/${grupos[fromList].id}/${grupos[fromList].atividades[from].id}/${from}/${to}`
      )
      console.log(data)
    } else {
      console.log('grupo diferente')
    }
  }

  async function updateAtividade(atividade) {
    await api.put(`/atividade`, {
      id: atividade.id,
      descricao: atividade.descricao,
      dataEntrega: atividade.dataEntrega,
      concluida: atividade.concluida,
    })

    getGrupos()
  }

  async function newAtividade(groupIndex, atividade) {
    const { id: idGrupo } = grupos[groupIndex]

    const { data: newAtividadeSaved } = await api.post(
      `/atividade/${idGrupo}`,
      atividade
    )

    setGrupos(
      produce(grupos, (draft) => {
        draft[groupIndex].atividades.push(newAtividadeSaved)
      })
    )
  }

  function saveNewGroup(e) {
    if (
      (e.keyCode === 13) &
      (e.shiftKey === false) &
      (nomeNewGroup.length > 0)
    ) {
      const newGroupSkelleton = {
        nome: nomeNewGroup,
        atividades: [],
      }
      setGrupos(
        produce(grupos, (draft) => {
          draft.push(newGroupSkelleton)
        })
      )

      api.post('/grupos', newGroupSkelleton)
      setNomeNewGroup('')
      setNewGroup(false)
    }
  }
  const getGrupos = useCallback(async () => {
    const { data } = await api.get('/grupos')

    setGrupos(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    getGrupos()
  }, [getGrupos])

  return (
    <HomeContext.Provider
      value={{
        grupos,
        move,
        updateAtividade,
        newAtividade,
      }}
    >
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <ContainerGrupos>
              {grupos.map((grupo, index) => (
                <CardGrupo grupo={grupo} key={grupo.id} index={index} />
              ))}
              <NewGroupDiv>
                {newGroup ? (
                  <InputNewGroup
                    type='text'
                    onChange={(e) => setNomeNewGroup(e.target.value)}
                    onKeyDown={(e) => saveNewGroup(e)}
                  ></InputNewGroup>
                ) : (
                  <ButtonNewGroup onClick={() => setNewGroup(true)}>
                    Novo Grupo +{' '}
                  </ButtonNewGroup>
                )}
              </NewGroupDiv>
            </ContainerGrupos>
          </>
        )}
      </Container>
    </HomeContext.Provider>
  )
}
