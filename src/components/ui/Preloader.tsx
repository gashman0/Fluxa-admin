const Preloader = () => {
  return (
    <div
      className="
        flex h-screen w-full
        items-center justify-center
        bg-black
      "
    >
      <img
        src="/Group.svg"
        alt="Fluxa"
        className="
          h-20 w-20
          animate-pulse
        "
      />
    </div>
  );
};

export default Preloader;