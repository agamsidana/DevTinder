import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

function Connections() {
  const connections = useSelector((state) => state.connections);

  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex justify-center bg-[#FFF1F2] min-h-[90vh] py-5">
      <div className="w-1/2 ">
        {connections.length ? (
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold text-slate-900">
              Connections
            </h1>
            {connections.map((connection) => (
              <li
                className="list-row bg-white
backdrop-blur-xl border border-pink-100 shadow-[0_10px_35px_rgba(244,63,94,0.08)] hover:-translate-y-1
hover:shadow-xl
transition-all duration-300"
                key={connection._id}
              >
                <div>
                  <img
                    className="size-10 rounded-box "
                    src={connection.photo_url}
                  />
                </div>
                <div>
                  <div className="text-slate-900">
                    {connection.firstName + " " + connection.lastName}
                  </div>
                  {connection.age && connection.gender && (
                    <div className="text-xs uppercase text-slate-500">
                      {connection.age + "," + connection.gender}
                    </div>
                  )}
                </div>
                {connection.about && (
                  <p className="list-col-wrap text-xs">{connection.about}</p>
                )}
                <Link to={`/chat/${connection._id}`}>
                  <button class="btn bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-200x">
                    Chat
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-1.5 justify-center h-full items-center">
            <h1 className="text-4xl font-bold text-slate-900">No Connections found</h1>
            <p className="text-[14px] text-slate-700">
              You haven't connected with anyone yet.
            </p>
            <p className="text-[14px] text-slate-700">
              Start Exploring and connect with awesome Developers!
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

export default Connections;
