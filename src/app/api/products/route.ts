import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product";

import path from "path"; // path 모듈
import { promises as fs } from "fs"; // fs 모듈

// CRUD를 구현할 JSON 파일의 경로 만들기
const dataPath = path.join(process.cwd(), 'src/data/product.json'); // process.cwd(): 이 프로젝트의 절대경로를 반환


// GET: 데이터 가져오기
export async function GET(request: NextRequest) {

    try {
        // JSON 파일 읽어오기
        const jsonData = await fs.readFile(dataPath, 'utf-8');

        // 불러온 파일을 JSON 파싱을 통해 Product 배열로 만들기
        const products : Product[] = JSON.parse(jsonData);

        // URL의 쿼리 스트링 체크해서 category 키 값을 가지고 옴
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        // URL 쿼리스트링에 category 값이 있는 경우는 해당하는 category 값만 조회
        if(category) {
            const cProducts = products.filter(item => item.category === category);
            return NextResponse.json(cProducts);
        }

        return NextResponse.json(products);

    } catch (error) {
        console.error("파일 불러오기 오류: ", error);
        return NextResponse.json({message: "서버 오류"}, {status: 500});
    }
}

// POST: 데이터 추가
export async function POST(request: NextRequest) {
    try {
        // json 파일 불러오기
        const jsonData = await fs.readFile(dataPath, 'utf-8');
        // 불러온 파일을 JSON
        const products: Product[] = JSON.parse(jsonData);

        // 요청시 전달한 json 자료 가져오기 (id는 제외하고 받아옴)
        const { name, category, price, description } = await request.json();

        // 추가될 자료의 ID 생성
        const newId = Date.now().toString();

        // 추가될 Product 객체
        const newProduct: Product = {
            id: newId,
            name: name,
            category: category,
            price: price,
            description: description
        }

        // 전체 상품 목로 배열에 추가
        products.push(newProduct);

        // json에 쓰기
        await fs.writeFile(dataPath, JSON.stringify(products, null, 2));

        return NextResponse.json(
            {product: newProduct},
            {status: 200}
        ); // 메세지 또는 newProduct를 반환해줘도 됨!

    } catch (error) {
        console.error("파일 추가 요청 중 오류 발생: ", error);
        return NextResponse.json({message: "요청 오류"}, {status: 400});
    }
}