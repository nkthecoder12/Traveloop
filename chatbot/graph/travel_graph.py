from langgraph.graph import StateGraph, END
from models.schemas import ChatState
from services.llm_service import llm


def chatbot_node(state: ChatState):

    prompt = f"""
    You are an intelligent travel assistant.

    User Request:
    {state['user_input']}

    Help the user with:
    - trip planning
    - itinerary
    - travel budget
    - destinations
    - activities
    """

    result = llm.invoke(prompt)

    return {
        "response": result.content
    }


builder = StateGraph(ChatState)

builder.add_node("chatbot", chatbot_node)

builder.set_entry_point("chatbot")

builder.add_edge("chatbot", END)

graph = builder.compile()