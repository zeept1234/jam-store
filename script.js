const menuImages = [
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_1.jpg",
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_2.jpg",
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_3.jpg",
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_4.jpg",
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_5.jpg",
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_6.jpg",
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_7.jpg",
  "https://kangnambbq.com.au/images/kangnam_bbq_epping_8.jpg"
];

const menuGrid = document.getElementById("menuGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

menuImages.forEach((src, index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "menu-card";
  card.innerHTML = `<img loading="lazy" src="${src}" alt="Kangnam Epping menu page ${index + 1}" /><p>Menu Page ${index + 1}</p>`;
  card.addEventListener("click", () => {
    lightboxImage.src = src;
    lightboxImage.alt = `Kangnam Epping menu page ${index + 1} full size`;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
  menuGrid.appendChild(card);
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
});

const form = document.getElementById("orderForm");
const orderText = document.getElementById("orderText");
const smsButton = document.getElementById("smsButton");
const pickupPhone = "+61431668828";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const name = (formData.get("name") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const pickupTimeRaw = (formData.get("pickupTime") || "").toString();
  const items = (formData.get("items") || "").toString().trim();
  const notes = (formData.get("notes") || "").toString().trim();

  const pickupTime = pickupTimeRaw
    ? new Date(pickupTimeRaw).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" })
    : "Not provided";

  const message = [
    "Hi Kangnam BBQ Epping, I'd like to place a PICKUP order.",
    "",
    `Name: ${name}`,
    `Mobile: ${phone}`,
    `Pickup Time: ${pickupTime}`,
    "",
    "Order Items:",
    items,
    "",
    `Notes: ${notes || "None"}`,
    "",
    "Please confirm availability and total price. Thank you!"
  ].join("\n");

  orderText.textContent = message;
  smsButton.href = `sms:${pickupPhone}?body=${encodeURIComponent(message)}`;
  smsButton.classList.remove("btn-disabled");
  smsButton.setAttribute("aria-disabled", "false");
});
