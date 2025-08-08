// 방법1
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/product";
export async function GET(request: NextRequest) {
    console.log(products); // 서버에서 실행되므로 서버의 콘솔에 찍히는 것을 볼 수 있다! 
    return NextResponse.json(products);
}