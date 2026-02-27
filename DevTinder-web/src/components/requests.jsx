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
    <div className="flex justify-center mt-10">
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
                <li key={request._id} className="list-row bg-base-300">
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
                      className="btn btn-primary btn-sm"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
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
