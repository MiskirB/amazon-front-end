import axios from "axios";

const axiosInstance = axios.create({
	//local instance of firebase function
	// deployed version of firebase functions
	baseURL: "http://127.0.0.1:5001/clone-mb/us-central1/api",
	
	// baseURL:"https://amazon-api-deploy-xvzi.onrender.com/",
// deployed version of amzazon server on render.com
	
});

export { axiosInstance };
