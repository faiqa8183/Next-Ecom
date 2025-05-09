// pages/edit-product/[id].js

import { getSingleProduct } from "@/pages/api/products/[id]";
import EditproductForm from "@/components/Editproductform";

const EditProductPage = ({ product }) => {
   return(
      <div className="container">
         <div><EditproductForm product={product}/></div>
      </div>

   ); 
 };
 
 export async function getServerSideProps(context) {
   const { id } = context.params;
   const product = await getSingleProduct(id);
   console.log(product)
   if (!product) {
      return { notFound: true };
    }
  
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)), // Serialize if needed
      },
   }
 };
 
export default EditProductPage;
 