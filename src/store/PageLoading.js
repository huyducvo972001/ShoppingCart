import React, { useEffect, useState } from "react";

const PageLoading = () => {
  const [isLoadPage, setIsLoadPage] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadPage(false);
    }, 500);
  }, []);
  return (
    <>
      {isLoadPage && (
        <div className="pageLoad" id="pageLoading">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageLoading;
