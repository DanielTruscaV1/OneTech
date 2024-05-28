import Footer from "./Footer"
import LeftSidebar from "./LeftSidebar"

import styles from "./RankingsStyle.module.css"

const Rankings = () => {
  return (
    <div>
        <LeftSidebar/>
        <div className={styles.solo}>
            <h1 className="pl-4 pt-4 text-xl">
                Solo Ranking
            </h1>
            <button className="absolute right-20 top-4 border-2 p-1 rounded">
                This week
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13,0,10,3h2.3v9h1.4V3H16ZM5,5.7h6V4.3H5Zm0,3h6V7.3H5Zm0,3h6V10.3H5ZM3.7,4H2.3v9H0l3,3,3-3H3.7Z"></path> </g></svg>
            </button>
            <img 
                src="/rankings1.png"
                className="absolute right-2 top-0 scale-75"
            />
        </div>
        <div className={styles.teams}>
            <h1 className="pl-4 pt-4 text-xl">
                Team Ranking
            </h1>
            <button className="absolute right-20 top-4 border-2 p-1 rounded">
                This week
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13,0,10,3h2.3v9h1.4V3H16ZM5,5.7h6V4.3H5Zm0,3h6V7.3H5Zm0,3h6V10.3H5ZM3.7,4H2.3v9H0l3,3,3-3H3.7Z"></path> </g></svg>
            </button>
            <img 
                src="/rankings1.png"
                className="absolute right-2 top-0 scale-75"
            />
            <br/>
            <div className={styles.team}>
                <img 
                    src="/daerian1.png"
                />
                <h1 className="inline-block pl-0 pt-2 text-xl">
                    Team: Daerian Studios
                </h1>
                <br/>
                <svg width="40px" height="40px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M993.763 493.538v35c0 13.331-6.04 26.664-18.135 37.137-140.149 121.422-280.35 242.795-420.49 364.219-11.813 10.237-25.813 15.501-42.454 15.501v-35c16.644 0 30.641-5.264 42.454-15.501C695.28 773.47 835.474 652.092 975.628 530.677c12.095-10.475 18.135-23.803 18.135-37.139z" fill="#EDC259"></path><path d="M30.239 528.367v-3.5-1.75-3.5-3.5-1.75-3.5-3.5-1.75-3.5-3.5-1.75-3.5c0 14.707 6.701 29.313 19.037 40.019 138.448 120.064 277.049 239.996 415.562 360.02 13.002 11.26 28.74 16.466 47.853 16.994v35c-19.108-0.528-34.851-5.734-47.853-16.994C326.325 808.382 187.725 688.45 49.276 568.386c-12.337-10.705-19.037-25.312-19.037-40.019z" fill="#EDC259"></path><path d="M510.786 76.601c16.263 0 32.546 5.362 44.946 16.097 139.949 121.188 279.9 242.376 419.818 363.586 24.241 20.995 24.295 53.413 0.079 74.396C835.48 652.101 695.28 773.478 555.141 894.898c-11.814 10.238-25.813 15.502-42.451 15.502-19.109-0.528-34.853-5.734-47.854-16.994C326.324 773.382 187.724 653.45 49.275 533.386c-19.581-16.987-24.96-43.81-11.895-65.251 3.919-6.438 8.669-11.829 14.465-16.849C189.954 331.734 328.024 212.152 466.107 92.567c12.296-10.639 28.478-15.966 44.679-15.966z" fill="#F4E269"></path><path d="M349.928 373.951v16.8h-58.917v-16.8h58.917z" fill="#E19C49"></path><path d="M349.928 373.951v16.8h-58.917v-16.8h58.917" fill="#E19C49"></path><path d="M733.875 374.023v16.8H674.18v-16.8h59.695z" fill="#E19C49"></path><path d="M733.875 374.023v16.8H674.18v-16.8h59.695" fill="#E19C49"></path><path d="M733.875 374.021c-0.322 3.808-0.438 7.611-0.438 11.413-0.002 8.428 0.55 16.832 0.557 25.191 0.01 8.849-0.586 17.645-3.083 26.354-6.531 22.817-31.895 41.125-56.729 41.91V374.02l59.693 0.001z" fill="#F6DC82"></path><path d="M349.93 373.951v105.442c-4.255-0.88-8.578-1.475-12.662-2.651-28.134-8.138-45.339-27.708-46.621-54.115-0.278-5.806-0.368-11.621-0.368-17.439-0.001-9.696 0.243-19.401 0.258-29.098 0-0.628 0.261-1.248 0.473-2.138l58.92-0.001z" fill="#F6DC82"></path><path d="M393.912 323.914c10.505 0.055 20.546 0.089 30.592 0.111 9.874 0.021 19.756 0.027 29.63 0.027 10.247 0 19.511-0.006 28.771-0.013 9.862-0.007 19.722-0.012 29.583-0.012 9.56 0 19.117 0.005 28.677 0.011 9.276 0.004 18.557 0.008 27.833 0.009 11.005 0 20.662-0.005 30.323-0.022 10.241-0.017 20.487-0.046 30.729-0.094 5.427 0.04 6.966 1.318 6.957 5.927-0.114 26.729-0.139 53.455-0.137 80.18 0 20.788 0.016 41.573 0.016 62.355-0.011 58.306-52.579 105.749-119.802 108.15-2.614 0.077-3.915 0.094-5.208 0.094-64.126-0.321-117.172-41.87-123.583-97.305-0.575-4.967-0.896-9.986-0.906-14.98-0.07-46.058 0.04-92.122-0.161-138.18 0.067-4.815 1.486-6.215 6.686-6.258z" fill="#FAECBA"></path><path d="M768.727 397.482V414.277c0 4.84-0.041 9.68-0.177 14.518-0.311 11.26-0.171 22.792-2.934 33.678-9.354 36.881-49.733 64.336-93.33 64.493-3.851 0.021-5.613 0.732-6.966 4.294-19.203 50.623-58.585 82.364-118.813 94.245-5.404 1.064-10.989 1.423-16.695 2.13v-16.8c5.706-0.709 11.29-1.066 16.695-2.131 60.229-11.881 99.608-43.621 118.813-94.244 1.353-3.561 3.115-4.276 6.966-4.294 43.597-0.157 83.976-27.61 93.33-64.493 2.763-10.885 2.623-22.417 2.934-33.678 0.136-4.837 0.177-9.674 0.177-14.513z" fill="#E19C49"></path><path d="M768.727 397.478v16.8c0 4.84-0.041 9.68-0.177 14.518-0.15 5.525-0.194 11.117-0.526 16.665v-16.8c0.332-5.547 0.376-11.14 0.526-16.665 0.136-4.838 0.177-9.678 0.177-14.518M768.021 428.66v16.8c-0.345 5.757-1 11.47-2.405 17.014-2.759 10.878-8.216 20.935-15.658 29.713v-16.8c7.44-8.778 12.899-18.836 15.658-29.713 1.405-5.545 2.062-11.257 2.405-17.014" fill="#E19C49"></path><path d="M749.959 475.389v16.801c-5.871 6.923-12.979 13.051-20.967 18.161v-16.8c7.989-5.111 15.095-11.239 20.967-18.162M728.992 493.549v16.8a104.738 104.738 0 0 1-20.289 10.038v-16.8c7.196-2.644 14.015-6.025 20.289-10.038M708.703 503.588v16.8a107.456 107.456 0 0 1-22.518 5.606v-16.8a107.549 107.549 0 0 0 22.518-5.606" fill="#E19C49"></path><path d="M686.188 509.194v16.8c-4.573 0.624-9.22 0.955-13.9 0.972-0.82 0.006-1.546 0.038-2.191 0.129v-16.8c0.646-0.089 1.371-0.123 2.191-0.127a105.89 105.89 0 0 0 13.9-0.974M670.095 510.294v16.8a6.876 6.876 0 0 0-1.497 0.354v-16.8c0.448-0.166 0.943-0.28 1.497-0.354M668.595 510.647v16.8c-0.323 0.12-0.627 0.268-0.907 0.446v-16.8c0.28-0.178 0.583-0.327 0.907-0.446M667.688 511.094v16.8a4.482 4.482 0 0 0-1.007 0.888v-16.8c0.304-0.36 0.637-0.651 1.007-0.888M666.681 511.981v16.8c-0.52 0.611-0.958 1.421-1.359 2.479-6.238 16.445-14.605 30.896-25.125 43.322v-16.8c10.521-12.427 18.887-26.878 25.125-43.322 0.402-1.058 0.839-1.866 1.359-2.479M640.195 557.783v16.801c-8.771 10.36-19.036 19.313-30.813 26.835v-16.8c11.778-7.524 22.045-16.473 30.813-26.836" fill="#E19C49"></path><path d="M609.385 584.619v16.8c-9.455 6.041-19.883 11.163-31.295 15.354v-16.801c11.41-4.19 21.84-9.312 31.295-15.353M578.09 599.973v16.801c-9.803 3.6-20.33 6.515-31.581 8.732a79.986 79.986 0 0 1-4.587 0.752v-16.8a79.7 79.7 0 0 0 4.587-0.752c11.254-2.219 21.778-5.134 31.581-8.733M541.922 609.458v16.8c-3.958 0.54-8 0.868-12.106 1.378v-16.8c4.106-0.51 8.148-0.838 12.106-1.378" fill="#E19C49"></path><path d="M255.245 415.835v-1.68-0.841-1.679-1.679-0.841-1.679-1.679-0.841-1.679-1.68-0.84-1.679c0 11.985 0.24 23.955 1.221 35.881 3.389 41.266 46.732 75.064 94.441 75.168 5.481 0.02 6.964 1.721 8.546 5.814 18.335 47.261 55.017 78.067 110.77 91.275 7.833 1.859 16.008 2.628 24.172 3.931v16.8c-8.164-1.302-16.338-2.07-24.172-3.93-55.752-13.211-92.433-44.016-110.77-91.276-1.582-4.095-3.065-5.797-8.546-5.814-47.709-0.104-91.052-33.902-94.441-75.167-0.982-11.928-1.221-23.9-1.221-35.885z" fill="#E19C49"></path><path d="M494.395 611.108v16.8c-8.166-1.302-16.339-2.07-24.173-3.931-55.753-13.21-92.433-44.015-110.77-91.275-1.582-4.095-3.065-5.797-8.546-5.814-47.708-0.103-91.053-33.902-94.441-75.167-0.98-11.928-1.222-23.897-1.222-35.883v-16.801c0 11.985 0.242 23.958 1.222 35.884 3.388 41.265 46.733 75.065 94.441 75.168 5.481 0.02 6.964 1.721 8.546 5.814 18.335 47.261 55.017 78.067 110.77 91.275 7.834 1.86 16.008 2.629 24.173 3.93" fill="#E19C49"></path><path d="M768.752 363.031c-0.363 16.315 0.255 32.648-0.202 48.965-0.311 11.26-0.171 22.792-2.934 33.678-9.354 36.881-49.733 64.337-93.33 64.493-3.851 0.018-5.613 0.732-6.966 4.294-19.203 50.622-58.585 82.363-118.813 94.244-5.404 1.063-10.989 1.423-16.695 2.13v75.905h5.971c13.861 0 27.729-0.021 41.593-0.021 10.399 0 20.797 0.011 31.194 0.043 16.208 0.054 27.659 10.346 27.619 24.365 0 4.033-1.674 5.883-6.521 5.875-39.19-0.029-78.383-0.039-117.578-0.039-39.193 0-78.387 0.012-117.576 0.029-4.527 0-6.211-1.746-6.291-5.585-0.282-14.248 11.189-24.608 27.74-24.652 11.114-0.021 22.23-0.028 33.393-0.028 14.885 0 29.855 0.014 45.038 0.014v-75.633c-8.165-1.303-16.338-2.07-24.172-3.931-55.752-13.21-92.433-44.016-110.77-91.275-1.582-4.095-3.065-5.795-8.546-5.814-47.709-0.103-91.052-33.903-94.441-75.168-2.025-24.608-0.897-49.409-1.006-74.131-0.04-8.792 9.536-17.574 20.923-17.574 10.161 0.297 19.656 0.379 29.15 0.379 13.463 0 26.928-0.167 40.395-0.167h6.703c0-7.412-0.019-14.465 0-21.52 0.051-16.333 13.527-28.083 32.407-28.091 42.366-0.012 84.729-0.02 127.092-0.02 42.365 0 84.729 0.008 127.095 0.02 18.81 0.009 32.396 11.803 32.548 28.118 0.071 6.932 0.012 13.871 0.012 21.493h6.188c13.372 0 26.757 0.211 40.131 0.211 9.205 0 18.406-0.102 27.597-0.438 13.933-0.021 23.297 8.967 23.052 19.831zM636.886 472.395c0-20.783-0.017-41.567-0.017-62.355-0.001-26.727 0.022-53.453 0.139-80.181 0.009-4.609-1.531-5.888-6.551-5.926-10.648 0.048-20.896 0.077-31.138 0.094-9.657 0.017-19.319 0.022-28.979 0.022-10.62 0-19.901-0.005-29.176-0.009-9.56-0.004-19.119-0.01-28.677-0.01-9.863 0-19.723 0.007-29.583 0.012-9.264 0.007-18.527 0.012-27.787 0.012-10.859 0-20.742-0.005-30.614-0.027-10.044-0.02-20.088-0.055-30.133-0.11-5.661 0.044-7.078 1.444-7.145 5.819 0.2 46.495 0.088 92.561 0.16 138.618 0.01 4.993 0.332 10.013 0.906 14.98 6.412 55.437 59.457 96.98 122.812 97.304 2.07 0.001 3.361-0.016 4.668-0.051 68.537-2.443 121.105-49.889 121.115-108.192m-286.958 7.001V373.953h-58.917c-0.213 0.89-0.474 1.51-0.474 2.138-0.014 9.695-0.258 19.402-0.258 29.099 0 5.817 0.089 11.634 0.369 17.438 1.279 26.409 18.487 45.979 46.622 54.115 4.081 1.178 8.403 1.771 12.658 2.653m380.983-42.417c2.498-8.711 3.093-17.505 3.085-26.354-0.009-8.357-0.559-16.763-0.557-25.191 0-3.802 0.112-7.606 0.438-11.411h-59.695V478.89c24.836-0.786 50.198-19.093 56.729-41.911" fill="#F3C052"></path><path d="M388.216 727.693v-16.801c0 0.173 0.001 0.343 0.005 0.517 0.081 3.839 1.763 5.585 6.291 5.585 39.19-0.019 78.385-0.029 117.576-0.029 39.195 0 78.389 0.013 117.579 0.037 4.848 0.01 6.521-1.84 6.521-5.873v16.8c0 4.033-1.674 5.883-6.521 5.873-39.19-0.026-78.382-0.036-117.578-0.036-39.192 0-78.388 0.012-117.577 0.028-4.527 0-6.21-1.746-6.291-5.585-0.002-0.174-0.005-0.343-0.005-0.516z" fill="#E19C49"></path><path d="M636.189 711.13v16.8c0 0.264-0.009 0.517-0.021 0.762v-16.801c0.014-0.245 0.021-0.498 0.021-0.761M636.168 711.891v16.801c-0.088 1.442-0.437 2.566-1.134 3.389v-16.8c0.699-0.823 1.048-1.947 1.134-3.39" fill="#E19C49"></path><path d="M635.036 715.279v16.8c-0.248 0.29-0.537 0.543-0.874 0.758v-16.8c0.337-0.215 0.626-0.468 0.874-0.758" fill="#E19C49"></path><path d="M634.162 716.037v16.8a4.875 4.875 0 0 1-0.955 0.468v-16.8a4.82 4.82 0 0 0 0.955-0.468M633.207 716.505v16.8a7.763 7.763 0 0 1-1.62 0.387V716.89a7.8 7.8 0 0 0 1.62-0.385M631.587 716.89v16.802a14.09 14.09 0 0 1-1.919 0.112c-39.19-0.026-78.383-0.037-117.578-0.037-39.193 0-78.387 0.012-117.576 0.028-4.527 0-6.211-1.745-6.291-5.585a29.57 29.57 0 0 1-0.005-0.515v-16.802c0 0.174 0.001 0.343 0.005 0.517 0.079 3.839 1.763 5.585 6.291 5.585 39.19-0.019 78.386-0.028 117.576-0.028 39.195 0 78.388 0.011 117.578 0.037a14.07 14.07 0 0 0 1.919-0.114" fill="#E19C49"></path></g></svg>
                <h1 className="inline-block pl-0 pt-2 text-xl">
                    Rank: 1
                </h1>
                <br/>
                <svg width="40px" height="40px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0802 7.89712C11.1568 5.96571 11.6952 5 12.5 5C13.3048 5 13.8432 5.96571 14.9198 7.89712L15.1984 8.3968C15.5043 8.94564 15.6573 9.22007 15.8958 9.40114C16.1343 9.5822 16.4314 9.64942 17.0255 9.78384L17.5664 9.90622C19.6571 10.3793 20.7025 10.6158 20.9512 11.4156C21.1999 12.2153 20.4872 13.0487 19.0619 14.7154L18.6932 15.1466C18.2881 15.6203 18.0856 15.8571 17.9945 16.1501C17.9034 16.443 17.934 16.759 17.9953 17.3909L18.051 17.9662C18.2665 20.19 18.3742 21.3019 17.7231 21.7962C17.072 22.2905 16.0932 21.8398 14.1357 20.9385L13.6292 20.7053C13.073 20.4492 12.7948 20.3211 12.5 20.3211C12.2052 20.3211 11.927 20.4492 11.3708 20.7053L10.8643 20.9385C8.90677 21.8398 7.928 22.2905 7.27688 21.7962C6.62575 21.3019 6.7335 20.19 6.94899 17.9662L7.00474 17.3909C7.06597 16.759 7.09659 16.443 7.00548 16.1501C6.91438 15.8571 6.71186 15.6203 6.30683 15.1466L5.93808 14.7154C4.51276 13.0487 3.8001 12.2153 4.04881 11.4156C4.29751 10.6158 5.34288 10.3793 7.43361 9.90622L7.9745 9.78384C8.56862 9.64942 8.86568 9.5822 9.1042 9.40114C9.34272 9.22007 9.4957 8.94565 9.80165 8.3968L10.0802 7.89712Z" stroke="#ffd700" stroke-width="2.4"></path> <path d="M4.98987 2C4.98987 2 5.2778 3.45771 5.90909 4.08475C6.54037 4.71179 8 4.98987 8 4.98987C8 4.98987 6.54229 5.2778 5.91525 5.90909C5.28821 6.54037 5.01013 8 5.01013 8C5.01013 8 4.7222 6.54229 4.09091 5.91525C3.45963 5.28821 2 5.01013 2 5.01013C2 5.01013 3.45771 4.7222 4.08475 4.09091C4.71179 3.45963 4.98987 2 4.98987 2Z" stroke="#ffd700" stroke-linejoin="round"></path> <path d="M18 5H20M19 6L19 4" stroke="#ffd700" stroke-width="2.4" stroke-linecap="round"></path> </g></svg>
                <h1 className="inline-block pl-0 pt-2 text-xl">
                    Score: 5173
                </h1>
                <br/>
                <button>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0001 13.5V9M15.0001 9H10.5001M15.0001 9L9.00024 14.9999M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Rankings