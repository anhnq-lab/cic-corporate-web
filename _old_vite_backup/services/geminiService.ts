
export const sendMessageToGemini = async (text: string) => {
    // Mock response stream
    return [
        { text: "This is a mock response from the Gemini AI service. " },
        { text: "The actual service is not yet connected." }
    ];
};
