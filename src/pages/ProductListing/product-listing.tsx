import React, { memo, useEffect, useState } from 'react'
import { Toast } from 'domain/interfaces/toast'
import { DeleteProduct, ReadProducts } from 'domain/interfaces/products'
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
import { useHistory } from 'react-router-dom'

type ProductListingProps = {
  deleteProduct: DeleteProduct
  readProducts: ReadProducts
  toast: Toast
}

const ProductListing = ({
  readProducts,
  deleteProduct,
  toast,
}: ProductListingProps) => {
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [getProducts, setProducts] = useState<Products>()
  const [getSelectedProduct, setSelectedProduct] = useState<Product>()

  const handleEdit = (id: number) => {
    history.push(`/cadastrar-produtos?id=${id}`)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct.delete(id)
      toast.success({
        message: 'Produto deletado com sucesso',
        duration: 5000,
      })
      fetchProducts()
    } catch (error) {
      toast.error({
        message: 'Erro ao deletar produto.',
        duration: 5000,
      })
    }
  }

  const fetchProducts = async () => {
    try {
      const products = await readProducts.read()
      setProducts(products as Products)
    } catch (error) {
      toast.error({
        message: 'Erro ao listar produtos.',
        duration: 5000,
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
        message: 'Erro ao listar detalhes do produto.',
        duration: 5000,
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
        Listar Produtos
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Thumbnail</Th>
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
                  style={{ width: '5rem', height: '5rem' }}
                />
              </Td>
              <Td>{product.title}</Td>
              <Td>{product.description}</Td>
              <Td>{product.price}</Td>
              <Td>{product.rating}</Td>
              <Td>
                <Flex flexDirection="column">
                  <Button onClick={() => openModal(product.id)} my="0.25rem">
                    Detalhes
                  </Button>
                  <Button onClick={() => handleEdit(product.id)} my="0.25rem">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(product.id)} my="0.25rem">
                    Deletar
                  </Button>
                </Flex>
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
            {getSelectedProduct && (
              <>
                <Text>Título: {getSelectedProduct.title}</Text>
                <Text>Descrição: {getSelectedProduct.description}</Text>
                <Text>Preço: {getSelectedProduct.price}</Text>
                <Text>Classificação: {getSelectedProduct.rating}</Text>
                <Text>Estoque: {getSelectedProduct.stock}</Text>
                <Text>Marca: {getSelectedProduct.brand}</Text>
                <Text>Categoria: {getSelectedProduct.category}</Text>

                <Text>Imagens:</Text>
                <Flex wrap="wrap">
                  {getSelectedProduct.images.map((image, index) => (
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
          <ModalFooter justifyContent="space-between">
            <Button
              mx="1rem"
              onClick={() => handleEdit(getSelectedProduct?.id || 0)}
            >
              Editar
            </Button>
            <Button
              mx="1rem"
              onClick={async () => {
                handleDelete(getSelectedProduct?.id || 0)
                closeModal()
              }}
            >
              Deletar
            </Button>
            <Button mx="1rem" onClick={closeModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default memo(ProductListing)
