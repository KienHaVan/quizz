import React from 'react';
import Backdrop from '@mui/material/Backdrop';

const ImagePreview = ({
  openImagePreview,
  setOpenImagePreview,
}: {
  openImagePreview: {
    open: boolean;
    imageUrl: string;
  };
  setOpenImagePreview: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      imageUrl: string;
    }>
  >;
}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={openImagePreview.open}
      onClick={() =>
        setOpenImagePreview({
          open: false,
          imageUrl: '',
        })
      }
    >
      <img
        src={openImagePreview.imageUrl}
        alt=""
        style={{
          maxHeight: '50%',
          maxWidth: '90%',
          objectFit: 'cover',
        }}
      />
    </Backdrop>
  );
};

export default ImagePreview;
