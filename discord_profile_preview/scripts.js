const avatarUpload = document.getElementById("avatarUpload");
const bannerUpload = document.getElementById("bannerUpload");
const avatarContainer = document.getElementById("avatar");
const bannerContainer = document.getElementById("banner");
const modal = document.getElementById("modal");
const imageToEdit = document.getElementById("imageToEdit");
const closeModal = document.getElementById("closeModal");
const applyChanges = document.getElementById("applyChanges");
const themeColorInput = document.getElementById("themeColor");

let cropper;
let currentImageType = '';

// Function to initialize the cropper for the uploaded image
function initializeCropper(image, aspectRatio, isBanner = false) {
    cropper = new Cropper(image, {
        aspectRatio: aspectRatio, // Square for avatar, free for banner
        viewMode: 1, // Restrict the image to the canvas size
        autoCropArea: 0.8, // Allow a larger crop area
        zoomable: true, // Allow zooming
        scalable: true, // Allow resizing
        cropBoxMovable: true, // Allow moving the crop box
        cropBoxResizable: true, // Allow resizing the crop box
        ready: function () {
            if (currentImageType === 'avatar') {
                const cropperElement = this.cropper.container;
                cropperElement.querySelector('.cropper-face').style.borderRadius = '50%';
                cropperElement.querySelector('.cropper-view-box').style.borderRadius = '50%';
            }

            if (isBanner) {
                const cropperElement = this.cropper.container;
                cropperElement.querySelector('.cropper-face').style.borderRadius = '0';
                cropperElement.querySelector('.cropper-view-box').style.borderRadius = '0';
            }
        }
    });
}

// Function to apply the theme color to the profile container
function updateThemeColor(color) {
    document.documentElement.style.setProperty("--theme-color", color);  // Update theme color globally
    avatarContainer.style.borderColor = color;  // Avatar container border color
    avatarContainer.style.border = `4px solid ${color}`;  // Avatar border color
    bannerContainer.style.borderColor = color;  // Banner container border color

    // Ensure buttons don't get affected by this color (keep the default button color)
    // You can separately adjust button colors using a different variable or just leave them as-is
}

// Open the modal when the user uploads a profile picture
avatarUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (cropper) {
                cropper.destroy();
            }

            imageToEdit.src = e.target.result;
            modal.style.display = "flex";

            currentImageType = 'avatar';
            initializeCropper(imageToEdit, 1);
        };
        reader.readAsDataURL(file);
    }
});

// Open the modal when the user uploads a banner
bannerUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (cropper) {
                cropper.destroy();
            }

            imageToEdit.src = e.target.result;
            modal.style.display = "flex";

            currentImageType = 'banner';
            initializeCropper(imageToEdit, NaN, true);
        };
        reader.readAsDataURL(file);
    }
});

// Close modal without saving changes
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
    if (cropper) cropper.destroy();
});

// Apply the changes and display the cropped image in the profile container
applyChanges.addEventListener("click", function() {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        const croppedImageUrl = canvas.toDataURL();

        if (currentImageType === 'avatar') {
            avatarContainer.style.backgroundImage = `url(${croppedImageUrl})`;
        } else if (currentImageType === 'banner') {
            bannerContainer.style.backgroundImage = `url(${croppedImageUrl})`;
        }

        modal.style.display = "none";
        cropper.destroy();
    }
});

// Listen to theme color changes and update the profile colors
themeColorInput.addEventListener("input", function() {
    const selectedColor = themeColorInput.value;
    updateThemeColor(selectedColor);
});