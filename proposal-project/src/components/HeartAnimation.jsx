import React from "react";
import "../styles/App.css";

const HeartAnimation = () => {
  const hearts = Array.from({ length: 10 });
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => (
        <span
          key={i}
          className="floating-heart text-pink-400"
          style={{
            left: `${Math.random() * 100}%`, // Ekranın fərqli yerlərindən çıxsın
            fontSize: `${Math.random() * 10 + 10}px`, // Ölçüləri fərqli olsun
            animationDuration: `${Math.random() * 10 + 5}s`, // Sürətləri fərqli olsun (5-10 saniyə)
            animationDelay: `${Math.random() * 4}s`, // Başlama vaxtları fərqli olsun
            opacity: Math.random() * 0.5 + 0.3, // Şəffaflıqları fərqli olsun
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default HeartAnimation;
