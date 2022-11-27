products.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add(
      "container",
      "group",
      "relative",
      "rounded-lg",
      "shadow-sm",
      "shadow-gray-400",
      "p-1"
    );

    let cardPhotoDiv = document.createElement("div");
    cardPhotoDiv.classList.add(
      "flex",
      "items-center",
      "sm:h-56",
      "group-hover:opacity-75"
    );

    let cardPhoto = document.createElement("img");
    cardPhoto.classList.add("object-fill");
    cardPhoto.src =
      "data:image/jpeg;base64," + hexToBase64(product.firstPhoto.photo);

    cardPhotoDiv.appendChild(cardPhoto);
    card.appendChild(cardPhotoDiv);

    let cardInfoDiv = document.createElement("div");
    cardInfoDiv.classList.add("flex", "flex-wrap", "justify-between", "p-1");

    let cardInfoDetailsDiv = document.createElement("div");

    let h3 = document.createElement("h3");
    h3.classList.add("text-sm", "text-gray-700");

    let label = document.createElement("label");
    label.classList.add("hidden");
    label.innerText = product.id;

    h3.appendChild(label);

    let a = document.createElement("a");
    a.href = "#";

    let span = document.createElement("span");
    span.ariaHidden = true;
    span.classList.add("absolute", "inset-0");

    a.appendChild(span);

    let pProductName = document.createElement("p");
    pProductName.classList.add("text-justify");
    pProductName.innerText = product.ProductName;

    a.appendChild(pProductName);
    h3.appendChild(a);
    cardInfoDetailsDiv.appendChild(h3);

    let pProductPrice = document.createElement("p");
    pProductPrice.classList.add(
      "text-md",
      "font-medium",
      "text-gray-900",
      "mt-1"
    );
    pProductPrice.innerText = `USD ${product.unitPrice}`;

    cardInfoDiv.appendChild(cardInfoDetailsDiv);
    cardInfoDiv.appendChild(pProductPrice);

    card.appendChild(cardInfoDiv);

    productsDiv.innerHTML = card;
  });