import React, { memo, useEffect, useState } from 'react'
import { Toast } from 'domain/interfaces/toast'
import { DeleteProduct, ReadProducts } from 'domain/interfaces/products'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { Product, Products } from 'domain/models'
import { Button } from 'components/button'
import { useHistory } from 'react-router-dom'
import { StarIcon } from '@chakra-ui/icons'

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
    <Box w="90%" p="2rem" m="4rem" mx="auto" bg="gray.700" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" mb="2rem">
        Listar Produtos
      </Text>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={4}
      >
        {getProducts?.products.map(product => (
          <GridItem key={product.id}>
            <Box
              p="2"
              bg="gray.800"
              height="20rem"
              boxShadow="md"
              borderRadius="md"
            >
              <Text
                fontSize="lg"
                cursor="pointer"
                fontWeight="bold"
                onClick={() => openModal(product.id)}
              >
                {product.title.length > 16
                  ? `${product.title.substring(0, 16)}...`
                  : product.title}
              </Text>
              <img
                src={product.thumbnail}
                style={{
                  width: '20rem',
                  height: '10rem',
                  borderRadius: '0.25rem',
                }}
                alt={`Thumbnail de ${product.title}`}
              />
              {Array.from({ length: product.rating }).map(() => (
                <StarIcon color="yellow.400" mt="0.25rem" />
              ))}
              <Text fontSize="lg" fontWeight="bold" mt="0.25rem">
                R$ {product.price}
              </Text>
              <Flex justifyContent="center" mt="0.5rem">
                <Button mx="0.5rem" onClick={() => handleEdit(product.id)}>
                  Editar
                </Button>
                <Button mx="0.5rem" onClick={() => handleDelete(product.id)}>
                  Deletar
                </Button>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>

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
                <Text>Preço: R$ {getSelectedProduct.price}</Text>
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
          <ModalFooter justifyContent="center">
            {getSelectedProduct && (
              <Button
                mx="0.5rem"
                onClick={() => handleEdit(getSelectedProduct.id)}
              >
                Editar
              </Button>
            )}
            {getSelectedProduct && (
              <Button
                mx="0.5rem"
                onClick={async () => {
                  handleDelete(getSelectedProduct.id)
                  closeModal()
                }}
              >
                Deletar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default memo(ProductListing)
