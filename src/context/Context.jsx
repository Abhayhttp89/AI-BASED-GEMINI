import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(""); // Save input data
    const [recentPrompt, setRecentPrompt] = useState(""); // Display in main component
    const [prevPrompts, setPrevPrompts] = useState([]); // Store input history for recent tab
    const [showResult, setShowResult] = useState(false); // Toggle between prompt and result view
    const [loading, setLoading] = useState(false); // Show loading animation
    const [resultData, setResultData] = useState(""); // Display result on page

    

    const onSent = async () => {
        if (!input.trim()) return; // Prevent empty inputs

        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts([...prevPrompts, input]); // Add input to history

        try {
            const response = await runChat(input); // Fetch response
            setResultData(response || "No result available.");
        } catch (error) {
            console.error("Error fetching data:", error);
            setResultData("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            setInput(""); // Clear input after sending
        }
    };

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
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
