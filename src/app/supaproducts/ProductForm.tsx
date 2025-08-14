'use client';
import { Product } from "@/types/product";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import type { FormStatus } from "./actions";
import { updateProductAction, createProductAction } from "./actions";

interface ProductFormProps {
  product?: Product
}

export default function ProductForm({product} : ProductFormProps) {
  const isEditMode = product != null; // 수정인지 입력인지 구분
  const actionUse =  isEditMode ? updateProductAction : createProductAction;
  const initState : FormStatus = {message: ''};
  const [_, formAction] = useActionState(actionUse, initState); // [status, formAction]
  
  return (
    <form className="mt-8 grid grid-cols-4 gap-2" action={formAction} >
      {isEditMode && <input type="hidden" name="id" value={product.id}/>}
      <div className="flex flex-col gap-2">
        <label htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">카테고리</label>
        <input id="category" name="category" type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500" placeholder="Category..." required
            defaultValue={isEditMode ? product.category : ""} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">제품명</label>
        <input id="name" name="name" type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500" placeholder="Product Name..." required
            defaultValue={isEditMode ? product.name : ""} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">제품설명</label>
        <input id="description" name="description" type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500" placeholder="Description..." required
            defaultValue={isEditMode ? product.description : ""} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">가격</label>
        <input id="price" name="price" type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500" placeholder="Price..." required
            defaultValue={isEditMode ? product.price : ""} />
      </div>
      <div className="col-span-4 flex justify-end">
        <SubmitButton isEditMode={isEditMode} />
      </div>
    </form>
  );
}