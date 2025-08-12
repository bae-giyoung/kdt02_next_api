'use client';
import { useRef } from "react";

interface ProductFormProps {
  url: string,
  method: string
}

export default function ProductForm({url, method} : ProductFormProps) {
  const cateRf = useRef<HTMLSelectElement>(null);
  const nameRf = useRef<HTMLInputElement>(null);
  const descRf = useRef<HTMLInputElement>(null);
  const priceRf = useRef<HTMLInputElement>(null);

  return (
    <form className="mt-5 grid grid-cols-4 gap-2" action={url} method={method}>
      <div className="flex flex-col gap-2">
        <label htmlFor="category">카테고리</label>
        <select ref={cateRf} name="category" id="category" defaultValue="">
          <option value="">===== 선택 =====</option>
          <option value="shoes">shoes</option>
          <option value="clothes">clothes</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name">제품명</label>
        <input id="name" name="name" ref={nameRf} type="text"
            className="border-1" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description">제품설명</label>
        <input id="description" name="description" ref={descRf} type="text"
            className="border-1" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price">가격</label>
        <input id="price" name="price" ref={priceRf} type="text"
            className="border-1" />
      </div>
      <button type="submit">추가</button>
    </form>
  );
}