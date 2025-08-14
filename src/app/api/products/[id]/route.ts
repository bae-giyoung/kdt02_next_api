import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product";

// 파일을 r/w 하기 위한 모듈 추가
import path from "path";
import { promises as fs } from "fs";

// src/data/product.json 파일 경로 만들기
const dataPath = path.join(process.cwd(), 'src/data/product.json'); //process.cwd() => 현재 프로젝트의 절대 경로

// 읽어오는 함수: src/data/product.json 파일 읽어오는 함수
async function getProducts() : Promise<Product[]> {
    const jsonData = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(jsonData);
}

// 저장하는 함수
async function saveProducts(products: Product[]) {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}


// GET: (동적 라우팅) 데이터 가져오기
export async function GET(
    request: NextRequest, 
    {params} : {params: Promise<{id: string}>} // 매우 중요! 타입을 interface로 뽑지 말고, 인라인으로 타입을 넣으라는 권고!
) {

    try {
        // 요청한 데이터의 id 받아오기 (비동기 완료될 때까지 기다리기)
        const {id} = await params;

        // 불러온 파일을 JSON 파싱을 통해 Product 배열로 만들기
        const products : Product[] = await getProducts();
        const product = products.filter(item => item.id == id);

        if(!product.length)
            return NextResponse.json({message: "상품이 존재하지 않습니다."}, {status: 404});

        return NextResponse.json(product);

    } catch (error) {
        console.error("데이터를 읽는 중 오류 발생: ", error);
        return NextResponse.json({message: "서버 오류"}, {status: 500});
    }
}


// PUT: 함수
export async function PUT(request: NextRequest, {params} : {params: Promise<{id: string}>}) {
    try {
        // 요청한 데이터의 id 받아오기 (비동기 완료될 때까지 기다리기)
        const {id} = await params;

        // 불러온 파일을 JSON 파싱을 통해 Product 배열로 만들기
        const products : Product[] = await getProducts();

        // 수정할 ID의 인덱스 값을 찾기
        const idx = products.findIndex(item => item.id === id);

        // 상품이 없는 경우
        if(idx === -1)
            return NextResponse.json({message: "상품이 존재하지 않습니다."}, {status: 404});

        // 수정할 자료
        const updateProduct = await request.json();

        // 전체 자료에 해당 자료 수정
        products[idx] = { id: id, ...updateProduct }; // 같은 속성이 있으면 일어나는 일! -> 덮어씀

        // 전체 자료 저장
        await saveProducts(products);


        return NextResponse.json(
            {product: products[idx]},
            {status: 200}
        );

    } catch (error) {
        console.error("파일 추가 요청 중 오류 발생: ", error);
        return NextResponse.json({message: "요청 오류"}, {status: 400});
    }
}


// PATCH: 일부 데이터만 수정하는 함수
export async function PATCH(request: NextRequest, {params} : {params: Promise<{id: string}>}) {
    try {
        const {id} = await params;

        const products : Product[] = await getProducts();

        const idx = products.findIndex(item => item.id === id);

        if(idx === -1)
            return NextResponse.json({message: "상품이 존재하지 않습니다."}, {status: 404});

        // Partial
        const updateProduct : Partial<Product> = await request.json();

        // id가 들어오는 것은 막기!!!!!!

        // 수정된것 덮어쓰기
        products[idx] = { ...products[idx], ...updateProduct };

        // 전체 자료 저장
        await saveProducts(products);


        return NextResponse.json(
            {product: products[idx]},
            {status: 200}
        );

    } catch (error) {
        console.error("파일 추가 요청 중 오류 발생: ", error);
        return NextResponse.json({message: "요청 오류"}, {status: 400});
    }
}


// DELETE: 함수
export async function DELETE(request: NextRequest, {params} : {params: Promise<{id: string}>}) {
    try {
        const {id} = await params;

        const products : Product[] = await getProducts();

        // 삭제할 것이 존재하는 지 확인
        const idx = products.findIndex(item => item.id === id);

        // 삭제할 데이터 존재하지 않으면 얼리 리턴
        if(idx === -1)
            return NextResponse.json({message: "상품이 존재하지 않습니다."}, {status: 404});

        // 기존 데이터에서 해당하는 아이디만 제외
        const updateProduct : Product[] = products.filter(item => item.id !== id);

        // 전체 자료 저장
        await saveProducts(updateProduct);


        return NextResponse.json(
            {message: "상품 삭제 성공"},
            {status: 200}
        );

    } catch (error) {
        console.error("파일 추가 요청 중 오류 발생: ", error);
        return NextResponse.json({message: "요청 오류"}, {status: 400});
    }
}