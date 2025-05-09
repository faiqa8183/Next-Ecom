import { useRouter } from "next/router";
import { useState } from "react";

const EditproductForm =({product})=>{
    const router = useRouter()
    const { id } = router.query;
    const [products , setProduct] = useState(product)
    const handleChange = (e) => {
        setProduct({ ...products, [e.target.name]: e.target.value });
      };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });

    if (res.ok) {
      alert("Product updated!");
      router.push("/admin/dashboard");
    } else {
      alert("Update failed.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
  
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        router.push("/admin/dashboard");
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the product.");
    }
  };
  return(
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
    <form  className="space-y-4" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={products.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <label>Price</label>
        <input
          name="price"
          value={products.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <label>Quantity</label>
        <input
          name="quantity"
          value={products.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full p-2 border rounded"
        />
        <label>Discription</label>
        <textarea
          name="description"
          value={products.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={()=>handleDelete(products._id)}
        >
          Delete Product
        </button>
      </form>
    </div>
  );
}
export default EditproductForm;