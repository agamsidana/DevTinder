import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequestById } from "../utils/requestsSlice";
import { useEffect } from "react";

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
    <div className="flex justify-center bg-gradient-to-br from-[#0F0C29] via-[#6D28D9] to-[#EC4899] min-h-[90vh] py-5">
      <div className="w-1/2 ">
       {!requests.length && <h1 className="text-2xl text-center font-bold">No Requests Found</h1>}
        {requests.length > 0 && (
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold">
              Connection Requests
            </h1>
            {requests.map((request) => {
              const { firstName, lastName, photo_url, age, gender, about } =
                request.fromUserId;
              return (
                <li key={request._id} className="list-row bg-gradient-to-r from-[#2E1065]/90 via-[#4C1D95]/85 to-[#6D28D9]/80
backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(168,85,247,0.35)]">
                  <div>
                    <img className="size-10 rounded-box" src={photo_url} />
                  </div>
                  <div>
                    <div>{firstName + " " + lastName}</div>
                    {age && gender && (
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {age + "," + gender}
                      </div>
                    )}
                  </div>
                  {about && <p className="list-col-wrap text-xs">{about}</p>}

                  <div className="flex gap-3 items-center">
                    <button
                      className="btn btn-sm bg-indigo-600 hover:bg-indigo-700
text-white
shadow-lg shadow-indigo-500/40"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn text-white btn-sm bg-pink-500 hover:bg-pink-600
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
        )}
      </div>
    </div>
  );
}

export default Requests;
