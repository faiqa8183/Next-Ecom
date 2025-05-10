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
    <div className = "flex flex-col md:flex-row gap-8 p-8  min-h-screen">
     
  {/* <div className="flex flex-col md:flex-row gap-8 p-8  min-h-screen"> */}
  
  {/* Left: Image Section */}
  <div className="md:w-1/2 flex justify-center items-center bg-[#F5F5F5]">
    <img src="/images/banner3.jpg" alt="Product Banner" className="max-h-full object-contain" />
  </div>

  {/* Right: Form Section */}
  <div className="md:w-1/2 bg-white p-8 shadow border border-[#8B5E3C] text-[#8B5E3C] overflow-auto">
    <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
    
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1">Title</label>
        <input
          name="title"
          value={products.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border border-[#8B5E3C] text-[#8B5E3C] focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1">Price</label>
        <input
          name="price"
          value={products.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border border-[#8B5E3C] text-[#8B5E3C] focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1">Quantity</label>
        <input
          name="quantity"
          value={products.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full p-2 border border-[#8B5E3C] text-[#8B5E3C] focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={products.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-[#8B5E3C] text-[#8B5E3C] focus:outline-none"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="bg-[#8B5E3C] text-white px-6 py-2 hover:bg-white hover:text-[#8B5E3C] border border-[#8B5E3C] transition"
        >
          Update Product
        </button>

        <button
          type="button"
          onClick={() => handleDelete(products._id)}
          className="bg-[#8B5E3C] text-white px-6 py-2 hover:bg-white hover:text-[#8B5E3C] border border-[#8B5E3C] transition"
        >
          Delete Product
        </button>
      </div>
    </form>
  </div>
{/* </div> */}
   
    </div>
  );
}
export default EditproductForm;

{/* <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
      </form> */}
  {/* <div className="flex flex-col md:flex-row gap-8 p-8  min-h-screen"> */}