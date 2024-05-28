const IDESettings = () => {
  return (
    <div 
      className="IDESettings"
      style={{
        width: "100vw",
        height: "17vh",
      }}
    >
      <h1 className="ml-3 mt-4 text-xl">
        IDE Settings
      </h1>
      <button 
        className="ml-3 mt-6 px-3 h-10"
        style={{
          backgroundColor: "#E8E8E8",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        &#x25BC; C++
      </button>
      <button 
        className="ml-3 mt-6 px-3 h-10"
        style={{
          backgroundColor: "#E8E8E8",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        &#x25BC; 14px
      </button>
      <button 
        className="ml-3 mt-6 px-3 h-10"
        style={{
          backgroundColor: "#E8E8E8",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        <img 
          src="/IDE_icon_1.png"
          className="inline-block ml-1 mr-1 mt-0 w-4 h-4"
        /> Format
      </button>
      <button 
        className="ml-3 mt-6 px-3 h-10"
        style={{
          backgroundColor: "#E8E8E8",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        <img 
          src="/IDE_icon_2.png"
          className="inline-block ml-1 mr-1 mt-0 w-4 h-4"
        /> Expand
      </button>
      <div className="absolute inline-block ml-0 mt-2 px-3 h-10">
        <img 
          src="/nav88.png"
          width="24px" 
          height="24px" 
          className="inline-block ml-2"
        />
        <img 
          src="/nav99.png"
          width="17px" 
          height="17px" 
          className="inline-block float-right ml-1 mt-1"
        />
        <div className="ml-4 mt-2 w-14 h-4 bg-gray-300 rounded">
          <div className="w-4 h-4 bg-gray-400 rounded-3xl cursor-pointer">

          </div>
        </div>
      </div>
    </div>
  )
}

export default IDESettings