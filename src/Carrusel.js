import { useEffect, useState } from "react";

function Carrusel({ image, image2, image3 }) {
  const [imageSelected, setImageSelected] = useState(image);
  const [id, setId] = useState(0);
  

  useEffect(function changeImage() {

    if (id === 0) {
      setImageSelected(image);
    }
    if (id === 1) {
      setImageSelected(image2);
    }
    if (id === 2) {
      setImageSelected(image3);
    }
    
  },[id,image,image2,image3]);
  return (
    <>
      <div>
        <span
          onClick={() => {
            if (id === 0) {
              setId(2);
            } else {
              setId((t) => t - 1);
            }
            
          }}
          className="Left-Arrow"
        ></span>

        <img className="image" alt="Imagen de taxis" src={imageSelected} />

        <span
          onClick={() => {
            if (id === 2) {
              setId(0);
            } else {
              setId((t) => t + 1);
            }
          }}
          className="Right-Arrow"
        ></span>
      </div>
    </>
  );
}
export default Carrusel;
