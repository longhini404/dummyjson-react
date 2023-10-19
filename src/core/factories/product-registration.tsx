import React from 'react'
import { ProductRegistration } from 'pages'
import { ToastService } from 'data/services/toast'
import { CreateProductService } from 'data/services/products'

export const MakeProductRegistrationFactory = () => {
  const createProductService = new CreateProductService()
  const toastService = new ToastService()
  return (
    <ProductRegistration
      createProduct={createProductService}
      toast={toastService}
    />
  )
}
