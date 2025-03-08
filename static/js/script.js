document.addEventListener('DOMContentLoaded', function() {
    // Elements for file upload
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadPreview = document.getElementById('upload-preview');
    const uploadButton = document.getElementById('upload-button');
    const uploadForm = document.getElementById('upload-form');
    
    // Elements for camera capture
    const cameraView = document.getElementById('camera-view');
    const cameraCanvas = document.getElementById('camera-canvas');
    const cameraStartBtn = document.getElementById('camera-start');
    const cameraCaptureBtn = document.getElementById('camera-capture');
    const cameraRetakeBtn = document.getElementById('camera-retake');
    const cameraPreview = document.getElementById('camera-preview');
    const cameraClassifyBtn = document.getElementById('camera-classify');
    
    // Result elements
    const resultsCard = document.getElementById('results-card');
    const resultImage = document.getElementById('result-image');
    const resultClass = document.getElementById('result-class');
    const resultConfidence = document.getElementById('result-confidence');
    const classifyAnotherBtn = document.getElementById('classify-another');
    
    // Error elements
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');
    
    // Tab elements
    const cameraTab = document.getElementById('camera-tab');
    const uploadTab = document.getElementById('upload-tab');
    
    let stream = null;
    let capturedImage = null;
    let uploadedFile = null;
    
    // File Upload Logic
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Handle drag events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        }, false);
    });
    
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            handleFiles(files);
        }
    }
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFiles(fileInput.files);
        }
    });
    
    function handleFiles(files) {
        uploadedFile = files[0];
        
        if (!isImageFile(uploadedFile)) {
            showError('Please select a valid image file (JPG, PNG, GIF).');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadPreview.src = e.target.result;
            uploadPreview.parentElement.classList.remove('d-none');
            document.querySelector('#upload-tab-pane .upload-prompt').classList.add('d-none');
            uploadButton.disabled = false;
        };
        reader.readAsDataURL(uploadedFile);
    }
    
    function isImageFile(file) {
        return file && file['type'].split('/')[0] === 'image';
    }
    
    // Upload form submit
    uploadButton.addEventListener('click', () => {
        if (!uploadedFile) {
            showError('Please select an image to classify.');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', uploadedFile);
        
        classifyImage(formData, '/upload');
    });
    
    // Camera Logic
    cameraTab.addEventListener('click', () => {
        resetResults();
    });
    
    uploadTab.addEventListener('click', () => {
        stopCamera();
        resetResults();
    });
    
    cameraStartBtn.addEventListener('click', startCamera);
    
    function startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            })
            .then(function(s) {
                stream = s;
                cameraView.srcObject = s;
                cameraStartBtn.classList.add('d-none');
                cameraCaptureBtn.classList.remove('d-none');
            })
            .catch(function(error) {
                showError('Unable to access camera: ' + error.message);
            });
        } else {
            showError('Your browser does not support camera access.');
        }
    }
    
    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
            cameraView.srcObject = null;
            stream = null;
            
            // Reset UI
            cameraStartBtn.classList.remove('d-none');
            cameraCaptureBtn.classList.add('d-none');
            cameraRetakeBtn.classList.add('d-none');
            cameraClassifyBtn.classList.add('d-none');
            cameraPreview.parentElement.classList.add('d-none');
        }
    }
    
    cameraCaptureBtn.addEventListener('click', captureImage);
    
    function captureImage() {
        const context = cameraCanvas.getContext('2d');
        cameraCanvas.width = cameraView.videoWidth;
        cameraCanvas.height = cameraView.videoHeight;
        context.drawImage(cameraView, 0, 0, cameraCanvas.width, cameraCanvas.height);
        
        capturedImage = cameraCanvas.toDataURL('image/jpeg');
        cameraPreview.src = capturedImage;
        cameraPreview.parentElement.classList.remove('d-none');
        
        // Update UI
        cameraCaptureBtn.classList.add('d-none');
        cameraRetakeBtn.classList.remove('d-none');
        cameraClassifyBtn.classList.remove('d-none');
        cameraView.classList.add('d-none');
    }
    
    cameraRetakeBtn.addEventListener('click', retakeImage);
    
    function retakeImage() {
        capturedImage = null;
        cameraPreview.parentElement.classList.add('d-none');
        
        // Update UI
        cameraCaptureBtn.classList.remove('d-none');
        cameraRetakeBtn.classList.add('d-none');
        cameraClassifyBtn.classList.add('d-none');
        cameraView.classList.remove('d-none');
    }
    
    cameraClassifyBtn.addEventListener('click', () => {
        if (!capturedImage) {
            showError('Please capture an image first.');
            return;
        }
        
        // Convert base64 to blob
        fetch(capturedImage)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
                const formData = new FormData();
                formData.append('image', file);
                
                classifyImage(formData, '/classify-camera');
            });
    });
    
    // Classify function
    function classifyImage(formData, endpoint) {
        // Reset previous results before classifying a new image
        resetResults();
    
        // Show loading state
        uploadButton.disabled = true;
        cameraClassifyBtn.disabled = true;
    
        // Create a loading spinner on the button
        const originalBtnText = endpoint === '/upload' ? uploadButton.innerHTML : cameraClassifyBtn.innerHTML;
        const loadingSpinner = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
    
        if (endpoint === '/upload') {
            uploadButton.innerHTML = loadingSpinner;
        } else {
            cameraClassifyBtn.innerHTML = loadingSpinner;
        }
    
        // Hide any previous errors
        hideError();
    
        fetch(endpoint, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Reset button state
            if (endpoint === '/upload') {
                uploadButton.innerHTML = originalBtnText;
                uploadButton.disabled = false;
            } else {
                cameraClassifyBtn.innerHTML = originalBtnText;
                cameraClassifyBtn.disabled = false;
            }
    
            if (data.success === false) {
                showError(data.error || 'An error occurred during classification.');
                return;
            }
    
            // Display results
            resultImage.src = data.image_path;
            resultClass.textContent = data.result.item || 'Unknown';
    
            // Show results card with animation
            resultsCard.classList.remove('d-none');
    
            // Scroll to results
            resultsCard.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            // Reset button state
            if (endpoint === '/upload') {
                uploadButton.innerHTML = originalBtnText;
                uploadButton.disabled = false;
            } else {
                cameraClassifyBtn.innerHTML = originalBtnText;
                cameraClassifyBtn.disabled = false;
            }
    
            showError('Network error: ' + error.message);
        });
    }
    
    
    // Classify another button
    classifyAnotherBtn.addEventListener('click', () => {
        resetResults();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Error handling
    function showError(message) {
        errorMessage.textContent = message;
        errorAlert.classList.remove('d-none');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideError();
        }, 5000);
    }
    
    function hideError() {
        errorAlert.classList.add('d-none');
    }
    
    // Reset results
    function resetResults() {
        resultsCard.classList.add('d-none');  // Hide results card
        resultImage.src = '';                 // Clear previous image
        resultClass.textContent = '';          // Clear previous classification
        hideError();                           // Hide error messages
    }
    
});