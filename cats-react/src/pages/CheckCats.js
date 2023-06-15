import { useRef, useState } from "react";

const apiUrl = "https://localhost:7288/api/"

const CheckCats = () => {
  let currentImageSrc
  let currentCatId = useRef(10000);
  
  const [currentCatImage, setCurrentCatImage] = useState(apiUrl + "Cats/" + currentCatId.current + ".jpeg");

  const catIdRef = useRef();

  async function RefreshCat() {
    await fetch(apiUrl + "Cats/Info/" + currentCatId.current, {
      method: 'GET',
    }).then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log('Authorization failed : ' + error.message));
    currentImageSrc = apiUrl + "Cats/" + currentCatId.current + ".jpeg"
    setCurrentCatImage(currentImageSrc)
  }
  function OnCatIdChanged() {
    currentCatId.current = (parseInt(catIdRef.current.value))
    setTimeout(() => {
      RefreshCat()
    }, 500);
  }
  function NextCat() {
    currentCatId.current = (parseInt(currentCatId.current) + 1)
    catIdRef.current.value = currentCatId.current
    RefreshCat()
  }
  function PreviousCat() {
    currentCatId.current = (parseInt(currentCatId.current) - 1)
    console.log(currentCatId.current)
    catIdRef.current.value = currentCatId.current
    RefreshCat()
  }

  return (
    <div className=" grid grid-rows-checkCats grid-cols-1 w-full overflow-x-hidden h-auto lg:h-screen lg:overflow-hidden">
      <input ref={catIdRef} defaultValue="10000" onInput={OnCatIdChanged} type="text" 
        className=" h-12 w-screen text-xl focus:rounded-none text-center focus:border-0 focus:outline-none text-white bg-Main"></input>
      <div className=" grid grid-cols-1 lg:grid-cols-3 h-full">
        <div className="flex w-full items-center col-span-1 lg:col-span-2 justify-centers">
            <img src={currentCatImage} alt="cat" className=" lg:max-h-screen w-full lg:w-auto col-span-1 lg:col-span-1"></img>
        </div>
        <div className="bg-slate-500 col-span-2 lg:col-span-1">
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
          <div>sasa</div>
        </div>
      </div>
      <div className="text-xl bg-slate-600 h-auto flex items-center justify-center">
        <div onClick={PreviousCat} className="inline-flex items-center cursor-pointer px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg aria-hidden="true" className="w-5 h-5 mr-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"></path></svg>
          Previous
        </div>
        <div className="inline-flex items-center cursor-pointer px-4 py-2 text-sm font-medium mr-3 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
        <div className="inline-flex items-center cursor-pointer px-4 py-2 text-sm font-medium mr-3 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        </div>
        <div onClick={NextCat} className="inline-flex items-center cursor-pointer px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
          <svg aria-hidden="true" className="w-5 h-5 ml-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default CheckCats;