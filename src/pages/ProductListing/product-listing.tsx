import React, { memo, useEffect, useState } from 'react'
import { Toast } from 'domain/interfaces/toast'
import { ReadProducts as ReadProductsInterface } from 'domain/interfaces/products'
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Product, Products } from 'domain/models'
import { Button } from 'components/button'

type ProductListingProps = {
  readProducts: ReadProductsInterface
  toast: Toast
}

const ProductListing = ({ readProducts, toast }: ProductListingProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [getProducts, setProducts] = useState<Products>()
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const fetchProducts = async () => {
    try {
      const products = await readProducts.read()
      setProducts(products as Products)
    } catch (error) {
      toast.error({
        message: 'Erro ao buscar produtos.',
      })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const openModal = async (id: number) => {
    try {
      const product = await readProducts.read(id)
      setSelectedProduct(product as Product)
      setIsModalOpen(true)
    } catch (error) {
      toast.error({
        message: 'Erro ao buscar detalhes do produto.',
      })
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Box
      w="80%"
      p="2rem"
      m="4rem"
      mx="auto"
      bg="gray.700"
      boxShadow="md"
      borderRadius="md"
    >
      <Text fontSize="xl" fontWeight="bold" mb="2rem">
        Lista de Produtos
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>TThumbnail</Th>
            <Th>Título</Th>
            <Th>Descrição</Th>
            <Th>Preço</Th>
            <Th>Classificação</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getProducts?.products.map(product => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>
                <img
                  src={product.thumbnail}
                  alt={`Thumbnail de ${product.title}`}
                  style={{ width: '50px', height: '50px' }}
                />
              </Td>
              <Td>{product.title}</Td>
              <Td>{product.description}</Td>
              <Td>{product.price}</Td>
              <Td>{product.rating}</Td>
              <Td>
                <Button onClick={() => openModal(product.id)}>
                  Ver Detalhes
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader>Detalhes do Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct && (
              <>
                <Text>Título: {selectedProduct.title}</Text>
                <Text>Descrição: {selectedProduct.description}</Text>
                <Text>Preço: {selectedProduct.price}</Text>
                <Text>Classificação: {selectedProduct.rating}</Text>
                <Text>Estoque: {selectedProduct.stock}</Text>
                <Text>Marca: {selectedProduct.brand}</Text>
                <Text>Categoria: {selectedProduct.category}</Text>

                <Text>Imagens:</Text>
                <Flex wrap="wrap">
                  {selectedProduct.images.map((image, index) => (
                    <Box m={2}>
                      <img
                        src={image}
                        alt={`Imagem ${index}`}
                        style={{ maxWidth: '10rem' }}
                      />
                    </Box>
                  ))}
                </Flex>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default memo(ProductListing)
