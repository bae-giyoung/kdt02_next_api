import Link from "next/link";
import ProductForm from "../ProductForm";

export default async function ProductNewPage() {
  return (
    <div className='w-full p-5'>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-semibold text-2xl">
          상품 추가 페이지
        </h2>
        <Link href='/supaproducts'>
          <div className="inline-block font-medium
                    after:block after:w-full after:h-[1px]
                  after:bg-black after:mt-1
                    before:block before:w-full before:h-[1px]
                  before:bg-black before:mb-[5px]">
            목록으로
          </div>
        </Link>
      </div>
      <ProductForm />
    </div>
  );
}