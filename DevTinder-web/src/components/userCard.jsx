
function UserCard({user}){
    const {firstName,lastName,photo_url,age,gender,about}=user;
    return(
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photo_url}
      alt="photo"
      className="h-70" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {about && <p>{about}</p>}
    {age && gender && <p>{age + "," +gender}</p>}
    <div className="card-actions justify-center">
        <button className="btn btn-primary">ignored</button>
      <button className="btn btn-secondary">intrested</button>
    </div>
  </div>
</div>
    )

}

export default UserCard;