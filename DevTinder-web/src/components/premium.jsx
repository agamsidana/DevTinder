import axios from "axios";

import { BASE_URL } from "../utils/constant";

function Premium() {
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
    <div className="flex gap-7 justify-center mt-5 items-center">
      <div className="card bg-base-100 w-96 shadow-sm">
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
              className="btn btn-secondary"
              onClick={() => handlePremium("Silver")}
            >
              Buy Silver
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-sm">
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
              className="btn btn-primary"
              onClick={() => handlePremium("Gold")}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
