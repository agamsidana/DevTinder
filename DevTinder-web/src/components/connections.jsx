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
    <div className="flex justify-center bg-gradient-to-br from-[#0F0C29] via-[#6D28D9] to-[#EC4899] min-h-[90vh] py-5">
      <div className="w-1/2 ">
        {connections && (
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold text-white">
              Connections
            </h1>
            {connections.map((connection) => (
              <li
                className="list-row bg-gradient-to-r from-[#2E1065]/90 via-[#4C1D95]/85 to-[#6D28D9]/80
backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(168,85,247,0.35)]"
                key={connection._id}
              >
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={connection.photo_url}
                  />
                </div>
                <div>
                  <div className="text-white">
                    {connection.firstName + " " + connection.lastName}
                  </div>
                  {connection.age && connection.gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {connection.age + "," + connection.gender}
                    </div>
                  )}
                </div>
                {connection.about && (
                  <p className="list-col-wrap text-xs">{connection.about}</p>
                )}
                <Link to={`/chat/${connection._id}`}>
                  <button
                    class="btn bg-pink-500 hover:bg-pink-600
shadow-lg shadow-pink-500/40
text-white"
                  >
                    Chat
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Connections;
