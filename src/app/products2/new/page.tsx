import ProductForm from "../ProductForm";

export default async function ProductNewPage() {
  return (
    <div className='w-full'>
      <h2>상품 추가 페이지</h2>
      <ProductForm url="/api/products" method="POST" />
    </div>
  );
}