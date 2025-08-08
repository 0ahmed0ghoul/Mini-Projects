document.addEventListener("DOMContentLoaded", function() {
    const div = document.getElementsByClassName('myDiv');
    setTimeout(() => {
        div.style.opacity = '1';
        div.style.transform = 'scale(1)';
    }, 100); // Delay added to ensure the transition is visible
});

document.addEventListener('DOMContentLoaded', function() {
    const myDiv = document.querySelector('.in-content div');
    myDiv.classList.add('fadeIn');
});


document.querySelector('.langs').addEventListener('click', function() {
    const div = document.querySelector('.langs');
    // Toggle height
    if (div.style.height == '280px'){
        div.style.height = '100px'; 
    } else {
        div.style.height = '280px';
    }
    // Animate each progress bar
    document.querySelectorAll('.skill-per').forEach(bar => {
        // Remove the animation class if it was added before
        bar.classList.remove('move');
        
        // Trigger reflow to restart the animation
        void bar.offsetWidth;
        
        // Add the animation class to start the animation
        bar.classList.add('move');
    });
});

document.querySelectorAll('.frameworks').forEach(div => {
    div.addEventListener('click', function() {
        if (div.style.height == '200px'){
            div.style.height = '100px';
        } else{
             div.style.height = '200px';
            }
    });
});

document.querySelectorAll('.achive').forEach(div => {
    div.addEventListener('click', function() {
        if (div.style.height == '200px'){
            div.style.height = '100px';
        } else{
             div.style.height = '200px';
             document.getElementsByClassName('skill-per').style.animation ='progress 2s ease-in-out forwards';
            }
    });
});

document.querySelectorAll('.skills').forEach(div => {
    div.addEventListener('click', function() {
        if (div.style.height == '200px'){
            div.style.height = '100px';
        } else{
             div.style.height = '200px';
            }
    });
});

document.querySelectorAll('.hobbies').forEach(div => {
    div.addEventListener('click', function() {
        if (div.style.height == '200px'){
            div.style.height = '100px';
        } else{
             div.style.height = '200px';
            }
    });
});
document.querySelectorAll('.contact').forEach(div => {
    div.addEventListener('click', function() {
        if (div.style.height == '200px'){
            div.style.height = '100px';
        } else{
             div.style.height = '200px';
            }
    });
});
