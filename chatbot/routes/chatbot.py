from fastapi import APIRouter
from pydantic import BaseModel
from graph.travel_graph import graph

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chatbot")
async def chatbot(req: ChatRequest):

    result = graph.invoke({
        "user_input": req.message
    })

    return {
        "success": True,
        "response": result["response"]
    }