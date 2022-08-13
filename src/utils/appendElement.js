import avator from "../assets/avator.jpg";

export function appendImgELement() {
  const img = new Image(100);
  img.src = avator;
  // document.body.appendChild(img);

  return img;
}
