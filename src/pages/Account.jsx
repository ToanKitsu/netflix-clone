import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/aa5a0cda-c48e-443d-a54b-ed77fd14340a/VN-en-20231009-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="/"
          className="w-full h-[400px] object-cover"
        />
      </div>
      <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
      <div className="absolute top-[20%] p-4 md:p-8 ">
        <h1 className="text-white text-3xl font-bold">My Shows</h1>
      </div>
      <SavedShows />
    </>
  );
};
export default Account;
