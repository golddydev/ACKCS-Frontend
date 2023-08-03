import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const Uploader = ({handleImageChange}) => {
  // specify upload params and url for your files
  // const getUploadParams = ({ meta }) => {
  //   return { url: "https://httpbin.org/post" };
  // };

  // called every time a file's `status` changes
  // const handleChangeStatus = ({ meta, file }, status) => {
  //   console.log(status, meta, file);
  // };

  // receives array of files that are done uploading when submit button is clicked
  // const handleSubmit = (files) => {
  //   console.log(files.map((f) => f.meta));
  // };

  return (
    <Dropzone
      multiple={false}
      onChangeStatus={handleImageChange}
      accept="image/*,audio/*,video/*"
      inputContent="Upload"
    />
  );
};

export default Uploader;
