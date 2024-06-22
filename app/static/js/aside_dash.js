
document.addEventListener('DOMContentLoaded', function() {
    var toggles = document.querySelectorAll('.toggle');
    
    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});

