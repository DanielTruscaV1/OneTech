//Import the CSS module file for this specific component
import styles from './ProblemsetStyle.module.css';

//Import the react components
import TopSidebar from './TopSidebar';
import LeftSidebar from './LeftSidebar';
import Footer from './Footer';

const Problemset = () => {
  return (
    <>
        <TopSidebar/>
        <LeftSidebar/>
        <div className={styles.problems}>
            <h1 className='inline-block pl-4 pt-4 text-3xl text-gray-600'>
                Problemset
            </h1>
            <div className={styles.problem}>
                <h1 className='inline-block pl-4 pt-2 text-xl text-gray-600'>
                    1. Two Sum
                </h1>
                <p className='inline-block pl-2 text-xl text-green-400 font-semibold'>
                    Easy - 52.6%
                </p>
                <button>
                <svg width="30px" height="30px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff" stroke-width="1.1199999999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z" fill="#ffffff"> </path> <path d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z" fill="#ffffff"> </path> </g></svg>
                </button>
            </div>
            <div className={styles.problem}>
                <h1 className='inline-block pl-4 pt-2 text-xl text-gray-600'>
                    2. Add Two Numbers
                </h1>
                <p className='inline-block pl-2 text-xl text-orange-400 font-semibold'>
                    Medium 42.9%
                </p>
                <button>
                <svg width="30px" height="30px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff" stroke-width="1.1199999999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z" fill="#ffffff"> </path> <path d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z" fill="#ffffff"> </path> </g></svg>
                </button>
            </div>
        </div>
        <div className={styles.calendar}>
            <h1 className='inline-block pl-4 pt-2 text-xl text-gray-600'>
                Day 18
            </h1>
            <p className='inline-block pl-2 text-l text-gray-400'>
                Time left: 13:24:29
            </p>
            <svg width="70px" className='ml-2' height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="3.696"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#64c8ff" stroke-width="1.2" stroke-linecap="round"></path> </g></svg>
            
            <br/>
            <span className='ml-6 text-xl text-gray-400'>
                S
            </span>
            <span className='ml-6 text-xl text-gray-400'>
               M 
            </span>
            <span className='ml-6 text-xl text-gray-400'>
               T 
            </span>
            <span className='ml-6 text-xl text-gray-400'>
                W
            </span>
            <span className='ml-6 text-xl text-gray-400'>
                T
            </span>
            <span className='ml-6 text-xl text-gray-400'>
                F
            </span>
            <span className='ml-6 text-xl text-gray-400'>
                S
            </span>
            
        </div>
        <Footer/>
    </>
  )
}

export default Problemset