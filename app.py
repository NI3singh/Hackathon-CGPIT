from flask import Flask, render_template, request, jsonify
import requests
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# API endpoint configuration
API_URL = "http://localhost:8000/classify-product/"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Send to FastAPI
        try:
            with open(filepath, 'rb') as f:
                response = requests.post(
                    API_URL,
                    files={"file": (filename, f, "image/jpeg")}
                )
            
            if response.status_code == 200:
                result = response.json()
                return jsonify({
                    'success': True, 
                    'result': result, 
                    'image_path': f'/static/uploads/{filename}'
                })
            else:
                return jsonify({
                    'success': False,
                    'error': response.json().get('message', 'API error')
                })
                
        except requests.RequestException as e:
            return jsonify({'success': False, 'error': f'API connection error: {str(e)}'}), 500
    
    return jsonify({'error': 'Invalid file type. Allowed: png, jpg, jpeg, gif'}), 400

@app.route('/classify-camera', methods=['POST'])
def classify_camera():
    if 'image' not in request.files:
        return jsonify({'error': 'No image data'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'Empty image data'}), 400
    
    # Save the captured image
    filename = 'camera_capture.jpg'
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    # Send to FastAPI
    try:
        with open(filepath, 'rb') as f:
            response = requests.post(
                API_URL,
                files={"file": (filename, f, "image/jpeg")}
            )
        
        if response.status_code == 200:
            result = response.json()
            return jsonify({
                'success': True, 
                'result': result, 
                'image_path': f'/static/uploads/{filename}'
            })
        else:
            return jsonify({
                'success': False,
                'error': response.json().get('message', 'API error')
            })
            
    except requests.RequestException as e:
        return jsonify({'success': False, 'error': f'API connection error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)