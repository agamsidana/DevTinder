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
    <div className="flex justify-center mt-10">
      <div className="w-1/2 ">
        {connections && (
          <ul className="list flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold">Connections</h1>
            {connections.map((connection) => (
              <li className="list-row bg-base-300" key={connection._id}>
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={connection.photo_url}
                  />
                </div>
                <div>
                  <div>{connection.firstName + " " + connection.lastName}</div>
                  {connection.age && connection.gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {connection.age + "," + connection.gender}
                    </div>
                  )}
                </div>
                {connection.about && (
                  <p className="list-col-wrap text-xs">{connection.about}</p>
                )}
                <Link to={`/chat/${connection._id}`}><button class="btn btn-success">Chat</button></Link>
              </li>
              
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Connections;
