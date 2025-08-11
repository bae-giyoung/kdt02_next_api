import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { // RestFull API는 export default가 아닌 export로!
    return NextResponse.json([{msg: "안녕하세요"}, {msg: "안녕하세요"}]);
}