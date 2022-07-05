export const displayMessages = (error: string, success?: string) => {
  return (<div>
    {error === "" ? "" : <div className="alert alert-danger" role="alert">
      {error}
    </div>}
    {success === "" || success === undefined ? "" : <div className="alert alert-primary" role="alert">
      {success}
    </div>}
  </div>)
}