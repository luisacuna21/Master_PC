class Product {
  construnctor(
    productName,
    productShortName,
    brandId,
    categoryId,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reorderLevel,
    discontinued,
    productDescription,
    productPhotos
  ) {
    this.productName = productName;
    this.productShortName = productShortName;
    this.brandId = brandId;
    this.categoryId = categoryId;
    this.unitPrice = unitPrice;
    this.unitsInStock = unitsInStock;
    this.unitsOnOrder = unitsOnOrder;
    this.reorderLevel = reorderLevel;
    this.discontinued = discontinued;
    this.productDescription = productDescription;
    this.productPhotos = productPhotos;
  }
}

// class ProductPhotos{
//     constructor(
//         productId,
//         photoBase64
//     ){
//         this.productId = productId;
//         this.photoBase64 = photoBase64;
//     }
// }

export { Product };
