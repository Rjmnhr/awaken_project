import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useApplicationContext } from '../../context/app-context';

const SuccessfulRegistration: React.FC = () => {
   
    const [seconds, setSeconds] = useState<number>(5);
    const navigate = useNavigate();
    const { setIsSignIn } = useApplicationContext();

    useEffect(() => {
       
          const countdown = setInterval(() => {
            if (seconds > 0) {
              setSeconds(seconds - 1);
            } else {
              clearInterval(countdown);
              setIsSignIn(true)
              navigate("/");
            }
          }, 1000);
    
          return () => {
            clearInterval(countdown);
          };
    //eslint-disable-next-line
      }, [seconds, navigate]);
  return (
    <>
    <div
      className="sr-root"
      style={{
        display: "grid",
        justifyItems: "center",
        height: "100vh",
        alignContent: "center",
      }}
    >
      {/* <div className="sr-section completed-view">
      <div className="sr-callout">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div> */}

      <div className="sr-content p-3 col-12 col-lg-8">
        <div>
            
            <>
              {" "}
              <h1>Your Account is ready </h1>{" "}

              <h3>Log in with your credentials</h3>
              <p>
                You will be redirecting automatically in {seconds} seconds
              </p>{" "}
              or <a href="/">Click here</a>{" "}
            </>
          
     
        </div>
      </div>
    </div>
  </>
  )
}

export default SuccessfulRegistration
