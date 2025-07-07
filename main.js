
const API_KEY = 'AIzaSyD6oznrl4VCv-fVVYbSdsPpve3CIvOtoFY'; 

async function chatgptclone() {
    const questionInput = document.getElementById("question");
    const answerBox = document.getElementById("answerbox"); // Corrected ID

    const question = questionInput.value.trim(); // Get value and trim whitespace

    if (!question) {
        answerBox.innerHTML = "Please enter a question.";
        return;
    }

    answerBox.innerHTML = "Fetching answer..."; // Provide user feedback

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: question }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            answerBox.innerHTML = `Error: ${errorData.error.message || 'Could not fetch answer.'}`;
            return;
        }

        const data = await response.json();

        // Check if data.candidates[0] and data.candidates[0].content exist
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            const finalanswer = data.candidates[0].content.parts[0].text;
            answerBox.innerHTML = finalanswer;
        } else {
            answerBox.innerHTML = "No answer found or unexpected API response format.";
            console.warn("Unexpected API response:", data);
        }

    } catch (error) {
        console.error("Fetch error:", error);
        answerBox.innerHTML = "An error occurred while connecting to the API. Please try again.";
    }
}