import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function ButtonDefault() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "WebAppAssets/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `WebAppAssets/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
        alert("Image Uploaded");
      })
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      });
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <Button onClick={uploadImage} className="mt-[500px] mx-auto">
        Upload
      </Button>
      {imageList.map((url) => {
        return <img src={url}/>
      })}
    </div>
  );
}
