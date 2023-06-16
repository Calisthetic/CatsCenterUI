import { useEffect, useRef, useState } from "react";

const apiUrl = "https://localhost:7288/api/"

const CheckCats = () => {

  let currentCatId = useRef(6881);
  const catIdRef = useRef();
  const isKittyInputRef = useRef();
  const isKittyRef = useRef(false)
  const breedInputRef = useRef();
  const breedRef = useRef();
  const felidaeInputRef = useRef();
  const felidaeRef = useRef();
  
  // Current cat image (first)
  const [currentCatImage, setCurrentCatImage] = useState(apiUrl + "Cats/" + currentCatId.current + ".jpeg");
  let [catInfoData, setCatInfoData] = useState();
  useEffect(() => {
    fetch(apiUrl + "Cats/Info/" + currentCatId.current, {method: 'GET'})
    .then(response => response.json())
    .then(data => setCatInfoData(data))
  }, []);

  // Fetch breeds
  const [breedsData, setBreedsData] = useState([{}])
  useEffect(() => {
    fetch(apiUrl + "Classifications/breeds", {method: 'GET'})
    .then(response => response.json())
    .then(data => {setBreedsData(data)})
  }, []);

  // Fetch felids
  const [felidsData, setFelidsData] = useState([{}])
  useEffect(() => {
    fetch(apiUrl + "Classifications/felids", {method: 'GET'})
    .then(response => response.json())
    .then(data => {setFelidsData(data)})
  }, []);

  // Fetch categories
  const [categoriesData, setCategoriesData] = useState([{}])
  useEffect(() => {
    fetch(apiUrl + "Classifications/ctg", {method: 'GET'})
    .then(response => response.json())
    .then(data => {let obg = {active: false}; data.map((item) => item = Object.assign(item, obg)); setCategoriesData(data)})
  }, []);

  // Update images and cat data
  async function RefreshCat() {
    if (Number.isInteger(currentCatId.current) && currentCatId.current > 0) {
      await fetch(apiUrl + "Cats/Info/" + currentCatId.current, {
        method: 'GET',
      }).then(response => response.json())
        .then(json => {
          setCatInfoData(json); 
          isKittyRef.current = json.is_kitty;
          breedRef.current = json.classification !== null ? (json.classification.type !== "Felidae" ? json.classification.name : "felidae") : "select"
          felidaeRef.current = json.classification !== null ? (json.classification.type !== "Breed" ? json.classification.name : "breed") : "select"
        })
        .catch(error => console.log('Failed: ' + error.message));
      setCurrentCatImage(apiUrl + "Cats/" + currentCatId.current + ".jpeg")
      isKittyInputRef.current.checked = isKittyRef.current
      breedInputRef.current.value = breedRef.current
      felidaeInputRef.current.value = felidaeRef.current
    }
  }
  function OnCatIdChanged() {
    currentCatId.current = (parseInt(catIdRef.current.value))
    RefreshCat()
  }
  function OnCategoryClick(e) {
    let ctg_id = parseInt(e.target.id.split('_')[1])
    let currentCategoryId = e.target.dataset.id
    if (currentCategoryId >= 0 && ctg_id >= 0) {
      if (categoriesData[currentCategoryId].active === true) {
        e.target.style.backgroundColor = "rgb(24 24 27)"
        categoriesData[currentCategoryId].active = false
      } else {
        e.target.style.backgroundColor = "rgb(40 43 49)"
        categoriesData[currentCategoryId].active = true
      }
    }
  }
  function NextCat() {
    currentCatId.current = (parseInt(currentCatId.current) + 1)
    catIdRef.current.value = currentCatId.current
    RefreshCat()
    ClearCategories()
  }
  function PreviousCat() {
    currentCatId.current = (parseInt(currentCatId.current) - 1)
    catIdRef.current.value = currentCatId.current
    RefreshCat()
    ClearCategories()
  }
  // After next/previous/delete car
  function ClearCategories() {
    for (let i = 0; i < categoriesData.length; i++) {
      if (categoriesData[i].active === true) {
        document.getElementById("category_" + categoriesData[i].category_id).style.backgroundColor = "rgb(24 24 27)"
        categoriesData[i].active = false
      }
    }
  }
  function DeleteCat() {
    console.log(catInfoData)
    ClearCategories()
    NextCat()
  }
  function OnKittyChanged() {
    console.log(isKittyInputRef.current.checked)
  }

  return (
    <div className=" grid grid-rows-checkCatsLG grid-cols-1 w-full overflow-x-hidden h-auto min-h-screen lg:h-screen lg:overflow-hidden">
      {/* Header */}
      <input ref={catIdRef} defaultValue={currentCatId.current} onInput={OnCatIdChanged} type="text" 
        className=" h-12 w-screen text-xl focus:rounded-none text-center focus:border-0 focus:outline-none text-white bg-Main"></input>

      {/* Main grid - 2 cols */}
      <div className=" grid grid-cols-1 grid-rows-checkCats lg:grid-rows-1 lg:grid-cols-checkCats h-full">
        {/* Image part */}
        <div className="flex bg-gray-50 dark:bg-zinc-900 w-full items-center justify-center">
          {(catInfoData === undefined || catInfoData.length === 0) ? (
            <div className="flex items-center justify-center w-full h-full my-16 lg:my-0 bg-gray-50 dark:bg-zinc-900">
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>) : (
              <img src={currentCatImage} alt="cat" className=" lg:max-h-100 w-full lg:w-auto"></img>
          )}
        </div>

        {/* Settings part */}
        <div className="dark:bg-zinc-900 dark:text-white border-t-4 lg:border-t-0 lg:border-l-4 border-Main lg:overflow-y-auto ">
          <div className="grid grid-cols-2">
            {/* Render categories in grid - 2 cols */}
            {(categoriesData.length === 1 || categoriesData === undefined) ? (
              <div></div>
              ) : (
                categoriesData.map((item, index) => (
                  <div id={"category_" + item.category_id} data-id={index} onClick={OnCategoryClick} 
                    className=" select-none w-full h-8 flex justify-center items-center hover:shadow-ctgHover hover:dark:shadow-ctgHoverDark transition-all cursor-pointer" key={index}>
                    {item.name}
                  </div>
                ))
            )}
          </div>

          {/* Other cat data render */}
          {(catInfoData === undefined) ? (
            <div className=" w-full flex gap-3 flex-col h-full justify-center">
              <div className="px-3 py-1 text-xs font-medium leading-none text-center h-5 mx-2 text-blue-800 bg-blue-200 rounded-full w-3/4 animate-pulse dark:bg-slate-800 dark:text-blue-200"></div>
              <div className="px-3 py-1 text-xs font-medium leading-none text-center h-5 mx-4 text-blue-800 bg-blue-200 rounded-full w-2/3 animate-pulse dark:bg-slate-800 dark:text-blue-200"></div>
              <div className="px-3 py-1 text-xs font-medium leading-none text-center h-5 mx-6 text-blue-800 bg-blue-200 rounded-full w-5/6 animate-pulse dark:bg-slate-800 dark:text-blue-200"></div>
              <div className="px-3 py-1 text-xs font-medium leading-none text-center h-5 mx-2 text-blue-800 bg-blue-200 rounded-full w-8/12 animate-pulse dark:bg-slate-800 dark:text-blue-200"></div>
              <div className="px-3 py-1 text-xs font-medium leading-none text-center h-5 mx-4 text-blue-800 bg-blue-200 rounded-full w-9/12 animate-pulse dark:bg-slate-800 dark:text-blue-200"></div>
            </div>
          ) : (
            <div className="flex items-center w-full justify-center mt-4 flex-col">
              {/* Kitty */}
              <label className="relative inline-flex items-center mb-4 cursor-pointer">
                <input ref={isKittyInputRef} onInput={OnKittyChanged} type="checkbox" value="" defaultChecked={catInfoData.is_kitty} className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3  font-medium text-gray-900 dark:text-gray-300">Is it Kitty?</span>
              </label>
              {/* Select breeds */}
              {breedsData !== undefined && (
                <div className="w-11/12 my-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select breed</label>
                  <select ref={breedInputRef} id="countries" defaultValue="select" className="bg-gray-50 border transition-all border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {breedsData.sort((a, b) => {
                      if (a.name > b.name) {
                        return 1;
                      } else if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                    }).map((item, key) => (<option key={key} value={item.name} data-id={item.classification_id}>{item.name}</option>))}
                    <option value="select">Choose a breed</option>
                    <option value="felidae">Better choose felidae!</option>
                  </select>
                </div>
              )}
              {/* Select felids */}
              {felidsData !== undefined && (
                <div className="w-11/12 my-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select felidae</label>
                  <select ref={felidaeInputRef} id="countries" defaultValue="select" className="bg-gray-50 border transition-all border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {felidsData.sort((a, b) => {
                      if (a.name > b.name) {
                        return 1;
                      } else if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                    }).map((item, key) => (<option key={key} value={item.name} data-id={item.classification_id}>{item.name}</option>))}
                    <option value="select">Choose a felidae</option>
                    <option value="breed">Better choose breed!</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Footer buttons */}
      <div className="text-xl  dark:bg-Main h-auto flex gap-2 items-center justify-center">
        <div onClick={PreviousCat} className="inline-flex items-center select-none cursor-pointer p-2 sm:px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg aria-hidden="true" className="w-5 h-5 mr-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"></path></svg>
          Previous
        </div>
        <div onClick={DeleteCat} className="inline-flex items-center cursor-pointer px-2 sm:px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
        <div className="inline-flex items-center cursor-pointer px-2 sm:px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        </div>
        <div onClick={NextCat} className="inline-flex items-center select-none cursor-pointer px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
          <svg aria-hidden="true" className="w-5 h-5 ml-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default CheckCats;