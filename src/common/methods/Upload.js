import React from "react";
import styles from "./Upload.module.css";

export const Upload = (props) => {
  const {
    height,
    setImage,
    style,
    profileImg,
    setProfileImg,
    isUpload,
    setIsUpload,
  } = props;

  // const [profileImg, setProfileImg] = useState("");
  // const [isUpload, setIsUpload] = useState(true);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
        setImage(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setIsUpload(!isUpload);
  };

  const closeImage = () => {
    setProfileImg("");
    setImage("");
    setIsUpload(true);
  };

  return (
    <div className="page" style={{ minHeight: height }}>
      <div className={styles.img_holder}>
        {!isUpload && (
          <img
            src={profileImg}
            alt=""
            id="img"
            className="img"
            width="100%"
            style={style}
          />
        )}
        {!isUpload && (
          <div onClick={closeImage} className={styles.img_holder_close}>
            X
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        name="image-upload"
        id="input"
        onChange={imageHandler}
        hidden
      />
      {isUpload && (
        <div className={styles.label}>
          <label
            className={styles.image_upload}
            htmlFor="input"
            style={{ height: height }}
          >
            Chọn ảnh
          </label>
        </div>
      )}
    </div>
  );
};

export default Upload;
