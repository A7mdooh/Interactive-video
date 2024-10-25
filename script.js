/* style.css */
body {
    background-color: #1e1e1e;
    color: #fff;
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    transition: background-color 1s;
}

.scene, .result {
    display: none;
    padding: 50px;
}

.visible {
    display: block;
}

.hidden {
    display: none;
}

.result-green {
    background-color: #4CAF50;
    color: #fff;
    font-size: 24px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.result-red {
    background-color: #FF6347;
    color: #fff;
    font-size: 24px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 10px 5px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.2s;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
}

iframe {
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

#timer {
    font-size: 24px;
    color: #FFD700;
    margin-top: 20px;
    padding: 10px;
    background-color: #333;
    border-radius: 8px;
    display: inline-block;
}

#score {
    position: fixed;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background-color: #333;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

h1 {
    font-size: 28px;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    margin-bottom: 20px;
}
