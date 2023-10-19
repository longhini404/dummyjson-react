import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Container } from 'components/container'

const LayoutSigned = ({ children }: any) => (
  <Flex direction="column">
    <Flex direction="row">
      <Container>
        <Flex as="main" justify="center">
          {children}
        </Flex>
      </Container>
    </Flex>
  </Flex>
)

export default LayoutSigned
