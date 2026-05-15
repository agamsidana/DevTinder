import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequestById } from "../utils/requestsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Requests() {
  const requests = useSelector((state) => state.request);

  const dispatch = useDispatch();
  const fetchConnectionRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequestById(id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  return (
    <div className="flex justify-center bg-[#FFF1F2] min-h-[90vh] py-5">
      <div className="w-1/2 ">
        {requests.length > 0 ? (
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl text-slate-900 font-bold">
              Connection Requests
            </h1>
            {requests.map((request) => {
              const { firstName, lastName, photo_url, age, gender, about } =
                request.fromUserId;
              return (
                <li
                  key={request._id}
                  className="list-row bg-white
backdrop-blur-xl border border-pink-100 shadow-[0_10px_40px_rgba(244,63,94,0.08)] hover:-translate-y-1
hover:shadow-2xl
transition-all duration-300"
                >
                  <div>
                    <img className="size-10 rounded-box" src={photo_url} />
                  </div>
                  <div>
                    <div className="text-slate-900">
                      {firstName + " " + lastName}
                    </div>
                    {age && gender && (
                      <div className="text-xs uppercase font-semibold text-slate-500">
                        {age + "," + gender}
                      </div>
                    )}
                  </div>
                  {about && <p className="list-col-wrap text-xs">{about}</p>}

                  <div className="flex gap-3 items-center">
                    <button
                      className="btn btn-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-200 shadow-lg "
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn text-white btn-sm bg-rose-500 hover:bg-rose-600
shadow-lg shadow-pink-500/40"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col gap-1.5 justify-center h-full items-center">
            <h1 className="text-4xl font-bold text-slate-900">
              No Requests Yet!
            </h1>
            <p className="text-[14px] text-slate-700">
              You don't have any connection requests right now.
            </p>
            <p className="text-[14px] text-slate-700">
              Check back later for new ones.
            </p>
            <Link to="/feed" className="btn bg-rose-500 hover:bg-rose-600">
              Explore Developers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;
