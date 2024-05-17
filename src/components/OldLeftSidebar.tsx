const LeftSidebar = () => {
  return (
    <div className="inline-block w-1/5 h-screen absolute top-0 border-r-4">
        <h1 className="text-center sm:text-left sm:ml-8 mt-4 mb-8 text-3xl font-bold">
            <span className="text-gray-500">One</span><span className="text-blue-500">Tech</span>
        </h1>

        <div className="w-52 h-12 ml-12 mt-4 bg-white hover:bg-gray-100 hover:cursor-pointer">
            <img 
                className="inline scale-50"
                src='/sidebar1.png'
                alt="my image"
            />
            <p className="inline-block text-lg">
                Home
            </p>
        </div>

        <div className="w-52 h-12 ml-12 mt-4 bg-white hover:bg-gray-100 hover:cursor-pointer">
            <img 
                className="inline scale-50"
                src='/sidebar2.png'
                alt="my image"
            />
            <p className="inline-block text-lg">
                Explore
            </p>
        </div>

        <div className="w-52 h-12 ml-12 mt-4 bg-white hover:bg-gray-100 hover:cursor-pointer">
            <img 
                className="inline scale-50"
                src='/sidebar3.png'
                alt="my image"
            />
            <p className="inline-block text-lg">
                Messages
            </p>
        </div>

        <div className="w-52 h-12 ml-12 mt-4 bg-white hover:bg-gray-100 hover:cursor-pointer">
            <img 
                className="inline scale-50"
                src='/sidebar4.png'
                alt="my image"
            />
            <p className="inline-block text-lg">
                Notifications
            </p>
        </div>
        <div className="w-52 h-12 ml-12 mt-4 bg-white hover:bg-gray-100 hover:cursor-pointer">
            <img 
                className="inline scale-50"
                src='/sidebar5.png'
                alt="my image"
            />
            <p className="inline-block text-lg">
                Create
            </p>
        </div>
    </div>
  )
}

export default LeftSidebar