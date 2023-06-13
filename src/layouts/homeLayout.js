const HomeLayout = ({ children }) => {
  return (
    <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        <div className="container">{children}</div>
      </div>
    </div>
  )
}

export default HomeLayout
