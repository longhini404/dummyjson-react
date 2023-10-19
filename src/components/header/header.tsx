import React, { memo } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signOut } from 'core/store/modules/auth/actions'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleProductsListing = () => {
    history.push('/listar-produtos')
  }

  const handleProductsRegistration = () => {
    history.push('/cadastrar-produtos')
  }

  return (
    <Flex
      alignItems="center"
      p="0.625rem 1.25rem"
      borderBottom="0.125rem solid gray.600"
      bgGradient="linear(to-r, gray.800, gray.700, gray.600)"
    >
      <Text
        fontSize="xl"
        color="white"
        cursor="pointer"
        onClick={handleProductsListing}
      >
        Listar Produtos
      </Text>
      <Text
        mx="2rem"
        fontSize="xl"
        color="white"
        cursor="pointer"
        onClick={handleProductsRegistration}
      >
        Cadastrar Produto
      </Text>
      <Button
        onClick={() => dispatch(signOut())}
        colorScheme="white"
        variant="outline"
        ml="auto"
      >
        Sair
      </Button>
    </Flex>
  )
}

export default memo(Header)
