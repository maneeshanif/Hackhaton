const skillparent = document.querySelector(".skil-parent") as HTMLElement;
const Heading = document.querySelector("#skill-heading") as HTMLElement;


Heading.addEventListener("click",()=>{
    skillparent.classList.toggle("display")
})
