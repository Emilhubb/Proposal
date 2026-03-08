import { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";

const BuildUp = ({ next, setSelfie }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = video.videoWidth;
    const height = video.videoHeight;

    let angle = 0;
    if (screen.orientation) angle = screen.orientation.angle;
    else if (window.orientation) angle = window.orientation;

    // canvas ölçüləri default
    canvas.width = width;
    canvas.height = height;

    // önəmli: transformları təmizlə
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (angle === 0) {
      // portrait düz
      ctx.drawImage(video, 0, 0, width, height);
    } else if (angle === 180) {
      // portrait tərs → 180 rotate
      ctx.translate(width, height);
      ctx.rotate(Math.PI);
      ctx.drawImage(video, 0, 0, width, height);
    } else if (angle === 90) {
      // landscape sağ → rotate -90
      canvas.width = height;
      canvas.height = width;
      ctx.translate(canvas.width, 0);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(video, 0, 0, width, height);
    } else if (angle === -90 || angle === 270) {
      // landscape sol → rotate 90
      canvas.width = height;
      canvas.height = width;
      ctx.translate(0, canvas.height);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(video, 0, 0, width, height);
    }

    const data = canvas.toDataURL("image/png");
    setPhoto(data);
    setHasPhoto(true);
    setSelfie(data);

    // Kamera dayandırılır
    video.srcObject.getTracks().forEach((t) => t.stop());
  };
  const saveImage = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "firstSelfie.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pink-200 text-center p-6">
      <h2 className="text-3xl font-bold mb-6">
        Let's make this moment a little more memorable!
      </h2>

      {!hasPhoto ? (
        <>
          <p className="mb-8 text-lg">
            Let's create a special photo together to capture this moment.
            <br /> Click the button below, and we'll take a picture that we can
            cherish forever!
          </p>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-72 h-72 rounded-lg border mb-4 transform scale-x-[-1] object-cover"
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={takePhoto}
            style={{ textTransform: "none", fontSize: "1.2rem" }}
          >
            Take Photo
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">
            Our first photo together! ❤️
          </h2>
          <img
            src={photo}
            alt="selfie"
            className="w-72 h-72 rounded-lg border object-cover mb-4"
          />

          <div className="flex gap-4 justify-center mt-4">
            {hasPhoto && (
              <Button
                variant="contained"
                color="success"
                style={{
                  textTransform: "none",
                  fontSize: "1.2rem",
                  width: "auto",
                }}
                onClick={() => saveImage(photo)}
              >
                Save
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                if (photo) next();
              }}
              style={{
                textTransform: "none",
                fontSize: "1.2rem",
                width: "auto",
              }}
            >
              Continue
            </Button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default BuildUp;
