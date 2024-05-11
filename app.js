let url = "https://api.genderize.io?name=";
const wrapper = document.querySelector("#wrapper");
const predictGender = () => {
    const nameInput = document.querySelector("#name");
    let name = nameInput.value;
    const error = document.querySelector("#error");
    let finalUrl = url + name;
    wrapper.innerHTML = "";
    error.innerHTML = "";

    if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
        fetch(finalUrl)
            .then(res => res.json())
            .then(data => {
                let div = document.createElement("div");
                div.setAttribute("id", "info");
                div.innerHTML = `<h2 id="result-name">${data.name}</h2>
                <img src="" id="gender-icon"/>
                <h1 id="gender">${data.gender}</h1>
                <h4 id="prob">Probability : ${data.probability}</h4>`;
                wrapper.appendChild(div);
                if (data.gender === "female") {
                    div.classList.add("female");
                    document.querySelector("#gender-icon")
                        .setAttribute("src", "female.svg")
                } else {
                    div.classList.add("male");
                    document.querySelector("#gender-icon")
                        .setAttribute("src", "male.svg")
                }
            });
        document.querySelector("#name").value = "";
    } else {
        error.innerHTML = "Enter a valid name with no spaces";
    }
}

document.querySelector("#submit").addEventListener("click", predictGender);
document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        predictGender();
    }
})