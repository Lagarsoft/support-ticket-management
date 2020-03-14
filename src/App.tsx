import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import FloorPlan from 'components/FloorPlan/FloorPlan'
import './App.css';
import { Row, Col, Layout, Select, Button, Divider } from 'antd';
import TicketList from 'components/TicketList/TicketList';
import moment from 'moment'
import { tickets, assignSpacesToTickets } from 'data/ticketsData'
import { TicketsState, initTickets, setTickets } from 'reducers/tickets';
const { Header, Footer, Content } = Layout;
const { Option } = Select

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}

const App = (props: Props) => {
  const [spaceSelected, setSpaceSelected] = useState<any>(undefined)
  const [ticketsFiltered, setTicketsFiltered] = useState<any[]>([])
  const [sceneId, setSceneId] = useState<any>()

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scene = urlParams.get('scene');
    const demoSceneId = scene || '415a1828-3aab-4559-a060-55713a1360c8';
    setSceneId(demoSceneId)
  }, [])


  useEffect(() => {
    if (!spaceSelected) {
      return
    }
    const spaceTickets = props.originalTickets.filter((space) => space.spaceId === spaceSelected.id)
    props.setTickets(spaceTickets)
  }, [spaceSelected])

  const onSpaceSelected = (space: any) => {
    setSpaceSelected(space)
  }

  const onClearFilters = () => {
    props.setTickets(props.originalTickets)
    setSpaceSelected(undefined)
  }

  const disableClearFilters = (): boolean => {
    return spaceSelected === undefined
  }

  const onSpacesLoaded = (spaces: any[]) => {
    const tickets = assignSpacesToTickets(spaces)
    props.initTickets(tickets)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Ticket Management</div>
      </Header>
      <Content className="content">
        <Row style={{ height: '100%' }} gutter={[0, 0]}>
          <Col span={16} style={{ height: '100%' }} >
            {sceneId &&
              <FloorPlan
                sceneId={sceneId}
                onSpaceSelected={onSpaceSelected}
                spaceSelected={spaceSelected}
                tickets={props.tickets}
                onSpacesLoaded={onSpacesLoaded}
              />
            }
          </Col>
          <Col span={8} className="side">
            <Row>
              <Col span={24} className="filters-container">
                <Select style={{ width: 120 }} placeholder="Show" size="small" >
                  <Option value="all">All</Option>
                  <Option value="open">Open</Option>
                  <Option value="resolved">Resolved</Option>
                </Select>
                <Divider type="vertical" />
                <Select style={{ width: 120 }} placeholder="Time range" size="small" >
                  <Option value="0-24">0 - 24 hours</Option>
                  <Option value="24-36">24 - 36 hours</Option>
                  <Option value="36-48">36 - 48 hours</Option>
                  <Option value="48-72">48 - 72 hours</Option>
                  <Option value="72-more">> 72 hours</Option>
                </Select>
                <Divider type="vertical" />
                <Button size="small" danger onClick={onClearFilters} disabled={disableClearFilters()}>Clear Filters</Button>
              </Col>
              <Col span={24}>
                <TicketList tickets={props.tickets} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

interface RootState {
  tickets: TicketsState
}

const mapState = (state: RootState) => ({
  tickets: state.tickets.tickets,
  originalTickets: state.tickets.originalTickets
})

const mapDispatch = {
  initTickets,
  setTickets
}

const connector = connect(mapState, mapDispatch)
export default connector(App);
