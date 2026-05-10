from fastapi import FastAPI
from routes.chatbot import router as chatbot_router

app = FastAPI()

app.include_router(
    chatbot_router,
    prefix="/api"
)