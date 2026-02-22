function Toast({title}){
  return(
    <div className="toast toast-center toast-middle mt-15">
  <div className="alert alert-success">
    <span>{title}</span>
  </div>
</div>
)
}

export default Toast;
