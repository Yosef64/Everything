import {collection,query,where,getDocs} from "firebase/firestore";
import {db} from "@/fireconfig/fireBaseConfig";
import {NextResponse} from "next/server";

export async function GET(req,{params}){
    const {id} = await params;

    try {
        const {id} = params;

        const q = query(collection(db, "posts"), where("id", "==", id));

        const querySnapshot = await getDocs(q);

        const post = querySnapshot.docs[0].data();
        return NextResponse.json({post});
    }catch (error){
        return NextResponse.json({error})
    }
}