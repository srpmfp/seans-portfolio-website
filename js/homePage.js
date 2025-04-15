document.addEventListener("DOMContentLoaded", () => {
    const elementsToObserve = document.querySelectorAll(".instDes, .effCom");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: .1 // Trigger when 10% of the element is visible
    });

    elementsToObserve.forEach((element) => {
        observer.observe(element);
    });
});
