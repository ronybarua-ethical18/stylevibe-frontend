import React from "react";
import ImageGallery from "react-image-gallery";
// import PlaceHolderImage from "../../../../assets/placeholder.jpg"

export default function ProductImageGallery({ singleProduct }:any) {
  const images:any = [];
  singleProduct?.images?.forEach((image:any) => {
    const img = {
      original: image.src,
      thumbnail: image.src,
      // originalHeight: "350px",
      thumbnailHeight: "90px"
     };
    images.push(img);
  });

  return (
    <div>
      {images?.length !== 0 ? (
        <ImageGallery
        //   onErrorImageURL={PlaceHolderImage}
          onClick={(event:any) => {
            const clickedImageSrc = event.target.getAttribute("src");
            console.log("Clicked image src:", clickedImageSrc);
          }}
          indexSeparator="false"
          showNav={false}
          autoPlay={false}
          items={images}
          // useBrowserFullscreen={false}
          showPlayButton={false}
          showFullscreenButton={true}
        />
      ) : (
        <div
          style={{
            height: "410px",
            border: "1px dashed lightgray",
            padding: "26px",
            borderRadius: "5px",
            display: "grid",
            placeItems: "center",
            // textAlign: "center",
          }}
        >
          <h4 style={{color:"lightgray", fontWeight:600}}>No image found</h4>
        </div>
      )}
    </div>
  );
}
