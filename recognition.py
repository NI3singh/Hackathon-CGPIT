import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from retinaface import RetinaFace
from io import BytesIO
from PIL import Image
import clip
import torch
from PIL import Image

# FastAPI app instance
app = FastAPI()

# Enable CORS to allow requests from other domains (e.g., Flask app)
origins = [
    "http://localhost:5000",  # Flask app URL
    "http://127.0.0.1:5000",  # Allow the same URL for local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from Flask app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Product Classification API",
        "usage": "Send a POST request with an image file to /classify-product endpoint"
    }

device = 'cpu'
model, preprocess = clip.load("ViT-B/32", device=device)

def prediction_of_class(image: Image.Image) -> str:
    """Classify if the image is real or cartoon using CLIP."""
    try:
        device = 'cpu'
        # Prepare inputs for CLIP
        image_input = preprocess(image).unsqueeze(0).to(device)
        text_labels = ["Shoes", "T-shirt", "Sunglasses", "Watch"]  # Correct labels
        texts_input = clip.tokenize(text_labels).to(device)

        with torch.no_grad():
            image_features = model.encode_image(image_input)
            text_features = model.encode_text(texts_input)

        # Get predictions
        logits_per_image, logits_per_text = model(image_input, texts_input)
        probs = logits_per_image.softmax(dim=-1).detach().to(device).numpy()[0]

        max_index = probs.argmax()  # Get index of highest probability
        max_label = text_labels[max_index]  # Get corresponding text label
        max_prob = probs[max_index]  # Highest probability value

        print(f"Predicted Label: {max_label}, Probability: {max_prob}")

        return max_label

    except Exception as e:
        raise ValueError("No Human Face Detected, Try again with Human Face Image")

@app.post("/classify-product/")
async def predict_gender(file: UploadFile = File(...)):
    try:    
        # Read the image file
        image_bytes = await file.read()
        image = Image.open(BytesIO(image_bytes))
        
        # Check if the image is in RGB mode
        if image.mode != "RGB":
            image = image.convert("RGB")  # Convert to RGB
        
        # Get CLIP classification result
        try:
            predicted_class = prediction_of_class(image)
        except ValueError as e:
            return JSONResponse(
                status_code=422,
                content={"message": "No human face detected, only human faces are supported"}
            )

        return JSONResponse(content={"item": predicted_class})
    
    except Exception as e:
        return JSONResponse(
            status_code=422,
            content={"message": "An error occurred while processing the image. Please try again."}
        )
