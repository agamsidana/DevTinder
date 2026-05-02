import axios from "axios";

import { BASE_URL } from "../utils/constant";

import { useSelector } from "react-redux";

function Premium() {

  const payment=useSelector((state)=>state.payment);
  

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
    {payment ? <div className="flex gap-7 justify-center  items-center bg-gradient-to-br from-[#0F0C29] via-[#6D28D9] to-[#EC4899] h-[80vh]">
      <div className="card bg-gradient-to-br from-[#2E1065]/90 via-[#4C1D95]/85 to-[#6D28D9]/80
backdrop-blur-xl
border border-white/10
shadow-[0_0_30px_rgba(168,85,247,0.4)]
rounded-2xl w-96">
        <div className="card-body items-center">
          <h2 className="card-title font-bold text-xl">Silver Membership</h2>
          <ul className="list">
            <l1>Chat with other people</l1>
            <l1>100 connection requests per day</l1>
            <l1>Blue tick</l1>
            <l1>3 months</l1>
          </ul>
          <div className="card-actions">
            <button
              className="btn bg-pink-500 hover:bg-pink-600
text-white
font-semibold transition duration-300
shadow-lg shadow-pink-500/40"
              onClick={() => handlePremium("Silver")}
            >
              Buy Silver
            </button>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-gradient-to-br from-[#2E1065]/90 via-[#4C1D95]/85 to-[#6D28D9]/80
backdrop-blur-xl
border border-white/10
shadow-[0_0_40px_rgba(236,72,153,0.6)]
rounded-2xl">
        <div className="card-body items-center">
          <h2 className="card-title font-bold text-xl">Gold Membership</h2>
          <ul className="list">
            <l1>Chat with other people</l1>
            <l1>infinite connection requests per day</l1>
            <l1>Blue tick</l1>
            <l1>6 months</l1>
          </ul>
          <div className="card-actions">
            <button
              className="btn bg-gradient-to-r from-purple-500 to-pink-500
hover:from-purple-600 hover:to-pink-600
text-white
font-semibold transition duration-300
shadow-lg shadow-pink-500/40"
              onClick={() => handlePremium("Gold")}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div> : <h1>you already have premium</h1>}
    </>
  );
}

export default Premium;
