import React, { memo } from 'react'
import { Flex } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Text } from 'components/text'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { CreateProduct } from 'domain/interfaces/products'
import { Toast } from 'domain/interfaces/toast'
import { Product } from 'domain/models'

const schema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.number().required('Required'),
  discountPercentage: yup.number().required('Required'),
  rating: yup.number().required('Required'),
  stock: yup.number().required('Required'),
  brand: yup.string().required('Required'),
  category: yup.string().required('Required'),
  thumbnail: yup.string().required('Required'),
})

type ProductRegistrationProps = {
  createProduct: CreateProduct
  toast: Toast
}

const ProductRegistration = ({
  createProduct,
  toast,
}: ProductRegistrationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<Product>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Product> = async product => {
    try {
      await createProduct.create(product)
      toast.success({
        message: 'Produto cadastrado com sucesso',
        duration: 5000,
      })
    } catch (error: any) {
      toast.error({
        message: 'Erro ao cadastrar produto.',
        duration: 5000,
      })
    }
  }

  return (
    <Flex
      p={8}
      m={16}
      w="80vw"
      as="form"
      direction="column"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="product-registration-form"
    >
      <Flex direction="column" align="center">
        <Flex
          mb="24"
          w="80vw"
          boxShadow="base"
          borderRadius={5}
          bgColor="gray.700"
          direction="column"
        >
          <Text gRole="title" ml="1rem" my="1rem">
            Cadastrar Produto
          </Text>
          <Flex align="flex-start" direction="column" p="1rem">
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Título"
                  data-testid="title-input"
                  error={errors.title?.message}
                  {...register('title')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Descrição"
                  data-testid="description-input"
                  error={errors.description?.message}
                  {...register('description')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Preço"
                  type="number"
                  data-testid="price-input"
                  error={errors.price?.message}
                  {...register('price')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Porcentagem de desconto"
                  type="number"
                  data-testid="discountPercentage-input"
                  error={errors.discountPercentage?.message}
                  {...register('discountPercentage')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Classificação"
                  type="number"
                  data-testid="rating-input"
                  error={errors.rating?.message}
                  {...register('rating')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Estoque"
                  type="number"
                  data-testid="stock-input"
                  error={errors.stock?.message}
                  {...register('stock')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" wrap="wrap" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="Marca"
                  data-testid="brand-input"
                  error={errors.brand?.message}
                  {...register('brand')}
                />
              </Flex>
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="Categoria"
                  data-testid="category-input"
                  error={errors.category?.message}
                  {...register('category')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" w="100%" mb="0.5rem">
              <Flex flex={2} mr={{ base: '0', sm: '1rem' }} minW="13.75rem">
                <Input
                  placeholder="URL da Thumbnail"
                  data-testid="thumbnail-input"
                  error={errors.thumbnail?.message}
                  {...register('thumbnail')}
                />
              </Flex>
            </Flex>
            <Flex justify="flex-start" w="100%" mb="1rem">
              <Flex flex={2} minW="13.75rem">
                <Input
                  placeholder="URL das Imagens (separadas por vírgula)"
                  data-testid="images-input"
                  {...register('images')}
                />
              </Flex>
            </Flex>
            <Flex
              w="100%"
              mb="1rem"
              alignItems="center"
              justify="space-between"
              data-testid="buttons-flexbox"
            >
              <Button
                h="3.25rem"
                type="submit"
                isLoading={isSubmitting}
                data-testid="submit-button"
                disabled={!isDirty || isSubmitting}
                backgroundColor="gray.600"
                _hover={{
                  filter: 'brightness(1.1)',
                  transition: '0.2s',
                }}
                color="white"
              >
                Cadastrar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(ProductRegistration)
