const ProductPreview = ({ formData }) => {
    const { title, description, price, discountPrice, category, quantity, image } = formData;
  
    return (
      <div className="p-4 border rounded-lg shadow bg-white w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Product Preview</h2>
  
        <div className="space-y-2">
          <img
            src={image || '/default-product-image.jpg'}
            alt={title}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-lg font-bold">{title || 'Product Title'}</h3>
          <p className="text-gray-700">{description || 'Product Description'}</p>
          <p className="text-sm"><span className="font-medium">Category:</span> {category}</p>
          <p className="text-sm"><span className="font-medium">Quantity:</span> {quantity}</p>
          <p className="text-sm">
            <span className="font-medium">Price: </span>
            {discountPrice ? (
              <>
                <span className="line-through text-red-500">${price}</span>
                <span className="ml-2 text-green-600 font-semibold">${discountPrice}</span>
              </>
            ) : (
              `$${price}`
            )}
          </p>
        </div>
      </div>
    );
  };
  
  export default ProductPreview;
  