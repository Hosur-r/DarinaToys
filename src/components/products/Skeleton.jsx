import React from "react"
import ContentLoader from "react-content-loader"

const ProductsSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={282}
    height={408}
    viewBox="0 0 282 408"
    backgroundColor="#f2c1c1"
    foregroundColor="#edced4">
    <rect x="0" y="0" rx="10" ry="10" width="282" height="408" />
  </ContentLoader>
)

export default ProductsSkeleton