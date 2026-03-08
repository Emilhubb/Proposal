import { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";
import HeartAnimation from "./HeartAnimation";

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

    const vW = video.videoWidth;
    const vH = video.videoHeight;

    let angle = 0;
    if (screen.orientation) angle = screen.orientation.angle;
    else if (window.orientation) angle = window.orientation;

    // Həmişə portrait (dik) bir çərçivə istəyirik
    const padding = 20;
    const bottomSpace = 90;

    // Şəklin sensor ölçüləri (dik olacaq şəkildə təyin edirik)
    // Əgər telefon yandırsa, videonun hündürlüyü bizim yeni enimiz olur
    const isLandscape = angle === 90 || angle === 270 || angle === -90;

    // Canvas həmişə dik formada qalır
    const finalImgW = isLandscape ? vH : vW;
    const finalImgH = isLandscape ? vW : vH;

    canvas.width = finalImgW + padding * 2;
    canvas.height = finalImgH + padding + bottomSpace;

    // 1. Ağ fon
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // 2. Şəklin mərkəzini Polaroidin foto sahəsinə köçürürük
    ctx.translate(canvas.width / 2, (finalImgH + padding * 2) / 2);

    // 3. Əsas məntiq: Əgər telefon yan tutulubsa, görüntünü dik hala gətirmək üçün fırlat
    if (isLandscape) {
      // 90 dərəcə sağa tutanda sola fırlat, sola tutanda sağa
      const rotationAdjustment = angle === 90 ? -90 : 90;
      ctx.rotate((rotationAdjustment * Math.PI) / 180);
    }

    // Selfie üçün güzgü effekti
    ctx.scale(-1, 1);

    // 4. Şəkli çək
    ctx.drawImage(video, -vW / 2, -vH / 2, vW, vH);
    ctx.restore();

    // 5. Yazı
    ctx.fillStyle = "#4b5563";
    ctx.textAlign = "center";
    ctx.font = "bold 28px 'Dancing Script', cursive";
    ctx.fillText(
      "Our first photo together! ❤️",
      canvas.width / 2,
      canvas.height - 35,
    );

    const data = canvas.toDataURL("image/png");
    setPhoto(data);
    setHasPhoto(true);
    setSelfie(data);

    if (video.srcObject) {
      video.srcObject.getTracks().forEach((t) => t.stop());
    }
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
      <HeartAnimation />
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
          <div className="flex flex-col items-center">
            {/* Polaroid Çərçivə */}
            <div className="bg-white p-3 pb-12 rounded-sm shadow-2xl transform rotate-1 transition-transform hover:rotate-0">
              {/* Şəkil sahəsi */}
              <div className="w-72 h-72 overflow-hidden border border-gray-200">
                <img
                  src={photo}
                  alt="selfie"
                  className="w-full h-full object-cover"
                  style={{ filter: "sepia(0.2) contrast(1.1)" }} // Vintage filter toxunuşu
                />
              </div>

              {/* Şəklin altındakı yazı sahəsi */}
              <div className="mt-6 text-center">
                <h2
                  className="text-2xl text-gray-700 opacity-80"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontWeight: "bold",
                  }}
                >
                  Our first photo together! ❤️
                </h2>
              </div>
            </div>
          </div>
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
