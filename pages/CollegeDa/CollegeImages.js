import { Box, ImageList, ImageListItem } from "@mui/material";
import React from "react";
const CollegeImages = ({ images }) => {
  try {
    return (
      <div className="">
        {images.length == 0 ? (
          <div className="py-5 border font-semibold text-sm text-center">
            No Images Found
          </div>
        ) : (
          <Box sx={{ height: 1000, overflowY: "scroll" }}>
            <ImageList variant="masonry" cols={4} gap={8}>
              {images.map((item, index) => (
                <ImageListItem key={index}>
                  <img src={`${item}`} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </div>
    );
  } catch (error) {
    return <div className=" text-center font-semibold">Error Occured</div>;
  }
};

export default CollegeImages;
