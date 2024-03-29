import { React, useState } from "react";
import FadeAnimation from "../modules/FadeAnimation";
import "../styles.css";

function CarouselCard({ animal, userID }) {
  const availabilityBadge =
    animal.availability === "Available"
      ? "badge-success"
      : animal.availability === "Pending"
      ? "badge-warning"
      : animal.availability === "Not Available"
      ? "badge-error"
      : "bg-[#D6D6D6] text-[#fff]";

  const [show, setShow] = useState(true);
  const [inactive, setInactive] = useState(false);

  // Add animal or delete from user's account depending on button state
  const handleSelect = async (e) => {
    setInactive(true);
    try {
      const response = await fetch(`/api/users/${userID}/${animal.id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to add animal");
      }

      const confirmation = await response.json();
      console.log(confirmation);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // if (!show) return <FadeAnimation show={show}>{null}</FadeAnimation>;

  return (
    <>
      <FadeAnimation show={show}>
        {/* TO DO: Use the class "z-50 bg-black bg-opacity-30 backdrop-blur-sm" to toggle background for activate state */}
        <div className="w-full gap-4 flex-wrap flex justify-center items-center">
          {/* <!-- CARD --> */}
          <div
            className={`flex w-[50rem] h-[400px] p-0 m-8 rounded-[30px] bg-white ${
              inactive ? "blur-[2px] opacity-95" : "shadow-lg hover:shadow-xl"
            }`}
          >
            {/* !------ LEFT COLUMN FOR PET IMAGE -----> */}
            <div className="relative flex flex-col basis-1/2 justify-center p-2">
              {/* LEFT COLUMN - IMAGE CAROUSEL */}
              <div className="carousel w-full h-full rounded-[28px]">
                {animal.avatars?.map((image, i) => (
                  <div
                    id={`${animal.name}/${i}`}
                    className="carousel-item w-full"
                  >
                    <img className="object-cover w-full" src={image} alt="" />
                  </div>
                ))}
              </div>

              {/* LEFT COLUMN - CAROUSEL BUTTONS */}
              <div className="absolute bottom-2 justify-center w-full py-2 space-x-4">
                {animal.avatars?.map((image, i) => (
                  <a
                    
                    href={`#${animal.name}/${i}`}
                    className={`rounded-full text-[12px] px-2 bg-white shadow-md hover:shadow-lg opacity-70 ${inactive ? "disabled" : ""}`}
                  >
                    {" "}
                  </a>
                ))}
              </div>
            </div>

            {/* <!------RIGHT COLUMN FOR PET INFO ------> */}
            <div className="flex flex-col relative basis-1/2 p-8 space-y-2 justify-start justify-items-start text-start">
              {/* <!-- 1st ROW - NAME --> */}
              <h2 className="font-bold text-xl text-black capitalize">
                {animal.name}
              </h2>

              {/* <!-- 2nd ROW - POST DATE --> */}
              <p className="text-[14px] text-light-grey">
                Post date: {animal.added.slice(0, 10)}
              </p>

              {/* <!-- 3rd ROW - AVAILABILITY, SPECIES, BREED --> */}
              <div className="flex flex-row flex-wrap gap-2 justify-start content-start capitalize">
                <p className={`badge badge-lg ${availabilityBadge}`}>
                  {animal.availability}
                </p>
                <p className="badge badge-info badge-lg capitalize">
                  {animal.species}
                </p>
                <p className="badge badge-primary badge-lg capitalize">
                  {animal.breed}
                </p>
              </div>

              {/* <!-- 4th ROW - DISPOSITIONS LIST --> */}
              <ul className="text-[15px] text-grey">
                {animal.dispositions?.map((description, i) => (
                  <li>{description}</li>
                ))}
              </ul>

              {/* <!-- 5th ROW - CALL TO ACTION BUTTON --> */}
              <div className="absolute bottom-4 right-4">
                {/* Opt 1: Like Button for "browse" cardType */}
                {inactive ? (
                  <button className="btn btn-success no-animation btn-circle shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="#FFF1EE"
                      viewBox="0 0 24 24"
                      stroke="#FFF1EE"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelect()}
                    className="btn bg-hot-pink hover:btn-success btn-circle shadow-md hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#FFF1EE"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeAnimation>
    </>
  );
}

export default CarouselCard;
