
document.addEventListener('DOMContentLoaded', () => {
    displayProfileInfo();
    loadProfilePicture();
    displayOrderHistory();
    

    function loadProfilePicture() {
        const profileImage = document.getElementById('profile-image');
        const imageUpload = document.getElementById('image-upload');
    
        const currentUser = localStorage.getItem('currentUser'); 
    
        if (currentUser) {
            const storedImage = localStorage.getItem(`profilePicture_${currentUser}`); 
            if (storedImage) {
                profileImage.src = storedImage;
            }
    
    
    
            imageUpload.addEventListener('change', (event) => {
                const file = event.target.files[0];
        
                if (file) { 
                    const reader = new FileReader();
        
                    reader.onload = (e) => {
                        profileImage.src = e.target.result;
                        localStorage.setItem('profilePicture', e.target.result); 
                    };
                    reader.readAsDataURL(file);
                }
                localStorage.setItem(`profilePicture_${currentUser}`, e.target.result);
            });
        }
    }
});


function displayProfileInfo() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === currentUser);


        if (user) {
            document.getElementById('profile-info').innerHTML = `
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
            `;
            document.getElementById('profile-phone').textContent = user.phone; 

        } else {
            localStorage.removeItem('currentUser'); 
            window.location.href = 'index.html'; 
        }
    } else {
        window.location.href = 'index.html'; 

    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(`profilePicture_${currentUser}`);
    window.location.href = 'index.html'; 
}