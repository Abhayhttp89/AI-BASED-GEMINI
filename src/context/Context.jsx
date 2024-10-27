import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext ();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");//save input data
    const [recentPrompt,setRecentPrompt] = useState("");// click send data and saved in recent prompt and display in main component
    const [prevPrompts,setPrevPrompts] = useState([]); // store all the input history and display it in recent tab
    const [showResult,setShowResult] = useState(false);//if once true hide the boxes or cards and show results
    const [loading,setLoading] = useState(false);//if this true loading animation 
    const [resultData,setResultData] = useState("");// use to display or result on web pages





    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await run(input)
        setResultData(response)
        setLoading(false)
        setInput("")
    }

   

    const contextValue = {
         prevPrompts,
         setPrevPrompts,
         onSent,
         setRecentPrompt,
         recentPrompt,
         showResult,
         loading,
         resultData,
         input,
         setInput,

     }

      return(
            <Context.Provider value = {contextValue}>
            {props.children}
            </Context.Provider>
        )
    }

    export default ContextProvider;
