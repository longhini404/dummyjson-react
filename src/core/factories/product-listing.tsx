import React from 'react'
import { ProductListing } from 'pages'
import { ToastService } from 'data/services/toast'
import { ReadProductsService } from 'data/services/products'

export const MakeProductListingFactory = () => {
  const readProductsService = new ReadProductsService()
  const toastService = new ToastService()
  return (
    <ProductListing readProducts={readProductsService} toast={toastService} />
  )
}
