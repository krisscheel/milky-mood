import React, { useState } from 'react'
import Footer from './components/Footer'
import { GlobalStyle, ImageContainer, Wrapper, Button } from './styles'
import ImageBox from './components/ImageBox'
import styled from 'styled-components'
import { ReactComponent as LogoSVG } from './components/_Header/logo.svg'
import Modal from './components/Modal'
import ModalInner from './components/ModalInner'
//import Header from './components/Header'

export const Logo = styled(LogoSVG)`
  height: auto;
  max-width: 760px;
  width: 100%;
`
export const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  pointer-events: none;
  position: fixed;
  width: 100vw;
  z-index: 1;
  justify-content: center;
  padding: 30px;
`

const HeaderComponent = () => (
  <Header>
    <Logo title="Milky Mood Logo" />
  </Header>
)

const matrix = [
  //prettier-ignore
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 3],
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [0, 5],
  [1, 5],
  [2, 5],
  [3, 5]
]

const App = () => {
  const [distance, setDistance] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const easing = (num) => Math.pow(num, 3)

  const calculateDistance = ([x, y]) => {
    const center = [window.innerWidth / 2, window.innerHeight / 2]
    const maxHypot = Math.hypot(center[0], center[1])
    const hypot = Math.hypot(center[0] - x, center[1] - y)
    const distance = hypot / maxHypot
    const easeDistance = easing(distance)
    setDistance(easeDistance)
  }

  const handleMove = ({ clientX, clientY }) => {
    calculateDistance([clientX, clientY])
  }

  const handleTouchMove = ({ touches }) => {
    calculateDistance([touches[0].clientX, touches[0].clientY])
  }

  const toggleModal = () => {
    setShowModal((showModal) => !showModal)
  }

  return (
    <>
      <GlobalStyle />
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <ModalInner />
        </Modal>
      )}
      <HeaderComponent />
      <Footer />
      <Wrapper
        onMouseMove={handleMove}
        onTouchMove={handleTouchMove}
        $color={Math.round(240 - distance * 40)}
      >
        <ImageContainer $isTogether={distance < 0.001}>
          <Button onClick={toggleModal}>Sign up for updates</Button>
          {matrix.map(([x, y], index) => (
            <ImageBox key={index} x={x} y={y} percent={distance} />
          ))}
        </ImageContainer>
      </Wrapper>
    </>
  )
}

export default App
