'use server'
import { supabase } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface FormStatus {
    message: string
}

export async function createProductAction(prevState: FormStatus, formData: FormData) : Promise<FormStatus> {
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price') ?? '0'))
    const description = formData.get('description');

    console.log('createProductAction', name);

    const newId = Date.now().toString();
    await supabase.from('products').insert({
        id: newId,
        name: name,
        category: category,
        price: price,
        description: description
    });
    
    // 캐시를 갱신하여 새 데이터 즉시 반영
    revalidatePath('/supaproducts');
    // 제품 목록 페이지로 이동
    redirect('/supaproducts');
}

export async function updateProductAction(prevState: FormStatus, formData: FormData) : Promise<FormStatus> {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const price = parseInt(String(formData.get('price') ?? '0')) as number;
    const description = formData.get('description') as string;

    console.log('createProductAction', name);
    
    await supabase.from('products')
                .update({name, category, price, description})
                .eq('id', id);
    
    // 캐시를 갱신하여 새 데이터 즉시 반영
    revalidatePath('/supaproducts');
    revalidatePath(`/supaproducts/${id}`);

    // 제품 목록 페이지로 이동
    redirect(`/supaproducts/${id}`);
}