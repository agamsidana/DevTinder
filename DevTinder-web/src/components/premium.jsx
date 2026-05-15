import axios from "axios";

import { BASE_URL } from "../utils/constant";

import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

function Premium() {
  const payment = useSelector((state) => state.payment);

  async function handlePremium(type) {
    const res = await axios.post(
      BASE_URL + "/create-order",
      { memberShipType: type },
      { withCredentials: true },
    );
    const session_url = res.data.session_url;

    //navigate to session_url
    window.location.href = session_url;
  }

  return (
    <>
      {payment ? (
        <div className="flex gap-7 justify-center  items-center bg-[#FFF1F2] h-[80vh]">
          <div
            className="card bg-white
backdrop-blur-xl
border border-pink-100
shadow-[0_0_30px_rgba(168,85,247,0.4)]
rounded-2xl w-96 hover:-translate-y-1
hover:shadow-2xl
transition-all duration-300"
          >
            <div className="card-body items-center">
              <Icon
                    icon="material-symbols:star-outline"
                    width={50}
                    className="text-rose-500 bg-pink-100/40 rounded-full p-2"
                />
              <h2 className="card-title font-bold text-xl text-slate-900">
                Silver Membership
              </h2>
              <ul className="list text-slate-700">
                <l1 className="flex gap-2 items-center">
                  <span>
                    <Icon
                      icon="mdi:chat-outline"
                      width={20}
                      className="text-rose-500"
                    />
                  </span>
                  <span>Chat with other people</span>
                </l1>
                <l1 className='flex gap-2 items-center'>
                      <Icon
                      icon="fa7-solid:user-friends"
                      width={20}
                      className="text-rose-500"
                    />
                  <span>100 connection requests per day</span>
                  </l1>
                <l1 className="flex gap-2 items-center">
                  <Icon
                    icon="mdi:tick-circle"
                    width={20}
                    className="text-rose-500"
                  />
                  <span>Blue tick</span>
                </l1>
                <l1 className='flex gap-2 items-center'>
                  <Icon
                    icon="uil:calender"
                    width={20}
                    className="text-rose-500"
                  />
                  <span>3 months</span>
                </l1>
              </ul>
              <div className="card-actions">
                <button
                  className="btn bg-white border border-rose-300
text-rose-500 hover:bg-rose-50
font-semibold transition duration-300
shadow-lg"
                  onClick={() => handlePremium("Silver")}
                >
                  Buy Silver
                </button>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-white backdrop-blur-xl border border-pink-100 shadow-[0_0_40px_rgba(236,72,153,0.6)] rounded-2xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center">
               <Icon
                    icon="material-symbols-light:crown-outline"
                    width={50}
                    className="text-rose-500 bg-pink-100/40 rounded-full p-2"
                  />
              <h2 className="card-title font-bold text-xl text-slate-900">
                Gold Membership
              </h2>
              <ul className="list text-slate-700">
                <l1 className="flex gap-2 items-center">
                  <span>
                    <Icon
                      icon="mdi:chat-outline"
                      width={20}
                      className="text-rose-500"
                    />
                  </span>
                  <span>Chat with other people</span>
                </l1>
                <l1 className="flex gap-2 items-center">
                  <Icon
                    icon="boxicons:infinite"
                    width={20}
                    className="text-rose-500"
                  />
                  <span>infinite connection requests per day</span>
                </l1>
                <l1 className="flex gap-2 items-center">
                  <Icon
                    icon="mdi:tick-circle"
                    width={20}
                    className="text-rose-500"
                  />
                  <span>Blue tick</span>
                </l1>
                <l1 className='flex gap-2 items-center'>
                  <Icon
                    icon="uil:calender"
                    width={20}
                    className="text-rose-500"
                  />
                  <span>6 months</span>
                </l1>
              </ul>
              <div className="card-actions">
                <button
                  className="btn bg-rose-500 hover:bg-rose-600
text-white
font-semibold transition duration-300
shadow-md shadow-rose-200"
                  onClick={() => handlePremium("Gold")}
                >
                  Buy Gold
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>you already have premium</h1>
      )}
    </>
  );
}

export default Premium;
