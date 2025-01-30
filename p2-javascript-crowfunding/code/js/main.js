const template = document.getElementById("templateFinal");
const showForm = document.getElementById("response");
const goalAmount = document.getElementById("goalAmount");
const form = document.querySelector(".responseForm");
const resultDiv = document.getElementById("result");
const progressBar = document.getElementById("progressBar");
const submitButton = document.querySelector("button[type='submit']");
const goal = 600000;
const slides = document.querySelectorAll(".carousel-container img");
const totalSlides = slides.length;

let currentSlide = 0;

document.addEventListener("DOMContentLoaded", function() {

    let totalDonations = localStorage.getItem("totalDonations") ? parseFloat(localStorage.getItem("totalDonations")) : 0;

    try {
       
        function updateProgress() {
            let progress = (totalDonations / goal) * 100;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + "%";
            progressBar.textContent = `${progress.toFixed(1)}%`;
            goalAmount.textContent = `We need only $${goal - totalDonations}. Come on!!`;

            if (totalDonations >= goal) {
                submitButton.disabled = true;
                submitButton.textContent = "Goal achieved - thanks for your support!";
                submitButton.style.backgroundColor = "#ccc";
                submitButton.style.cursor = "not-allowed";
            }
        }

        updateProgress();
    
        form.addEventListener("submit", function(event){
            event.preventDefault();

            if (totalDonations >= goal) {
                alert("Goal achieved - thanks for your support!");
                return;
            }

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const money = parseFloat(document.getElementById("number").value);

            if (!money || money <= 0) {
                alert("Please, introduce a valid amount");
                return;
            }

            if (totalDonations + money > goal) {
                alert(`We need only $${goal - totalDonations} to reach our goals.`);
                return;
            }

            totalDonations += money;
            goalAmount.textContent = `$${totalDonations} / $${goal}`;
            
    
            localStorage.setItem("totalDonations", totalDonations);
            updateProgress();
    
            resultDiv.innerHTML = `
            
                <h3>Thanks, ${name}! 😊</h3>
                <p>You have donated <strong>$${money}</strong>.</p>
                <p>We will send you a confirmation to: <strong>${email}</strong></p>
            
            `;

            form.classList.add("hidden");
            resultDiv.classList.remove("hidden");
        })
    } catch (error) {
        console.error("Error: ", error);
    } finally {

    }
})

function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0; 
    }

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; 
    }

    updateCarousel();
}

function updateCarousel() {
    const carouselContainer = document.querySelector(".carousel-container");
    const offset = -currentSlide * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
}
