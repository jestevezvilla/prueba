const Carrousel = () => {
  const API_URL = "https://swapi.co/api/people/1/";
  const main = document.querySelector(".MyLittleAccordeon");
  const contents = Array.prototype.slice.call(
    document.getElementsByClassName("MyLittleAccordeon-content")
  );
  const headers = Array.prototype.slice.call(
    document.getElementsByClassName("MyLittleAccordeon-header")
  );

  const createHeader = () => {
    const header = document.createElement("dt");
    header.className = "MyLittleAccordeon-header";
    header.innerHTML = "Section 4";
    main.appendChild(header);

    headers.push(header);
  };

  const createContent = text => {
    const content = document.createElement("dd");
    content.className = "MyLittleAccordeon-content";
    content.innerHTML = `<p>${text}</p>`;
    main.appendChild(content);

    contents.push(content);
  };

  const setVisibility = pos => {
    headers.map((header, idx) => {
      header.classList.toggle("show", pos === idx);
    });
  };

  const getContent = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", API_URL);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const { name } = JSON.parse(xhr.responseText);
        createHeader();
        createContent(name);
      } else {
        console.error("Request failed.  Returned status of " + xhr.status);
      }
    };
    xhr.send();
  };

  const init = () => {
    main.addEventListener("click", ({ srcElement: header }) => {
      if (header.tagName !== "DT") return;
      setVisibility(headers.indexOf(header));
    });
  };

  return {
    getContent,
    init
  };
};

const myCarrousel = Carrousel();
myCarrousel.init();
myCarrousel.getContent();
