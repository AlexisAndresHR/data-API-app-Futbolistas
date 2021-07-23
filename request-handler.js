/**
 * This file contains the actions to process the client (app) requests
 */
const url = require('url');// Using Node JS 'url' module
const stringDecoder = require('string_decoder').StringDecoder;// To use the 'string_decoder' module

/**
 * Arrow function for the request processing
 * @param req request object
 * @param res response object
 */
module.exports = (req, res) => {
    // Through the req object, the URL is obtained
    const navUrl = req.url;
    const parsedUrl = url.parse(navUrl, true);// Convert/parse the URL to get multiple data properties

    // Obtains the route (/something)
    const route = parsedUrl.pathname;
    // Removes the slash symbol of the route, using a JS regular expression
    const cleanedRoute = route.replace(/^\/+|\/+$/g, "");

    // Obtains the request method (GET, POST, PUT, DELETE)
    const requestMethod = req.method.toLowerCase();

    // With a destructuring expression, obtains the data parameters in the URL
    const { urlParameters = {} } = parsedUrl;

    // Obtains the URL headers (detailed info)
    const { urlHeaders = {} } = req;

    // If exists, obtains the payload stream (to special actions in the data API)
    const decoder = new stringDecoder("utf-8");
    let buffer = "";

    // Cumulates the payload stream in a buffer var
    req.on("data", (data) => {
        buffer += decoder.write(data);
    });
    // When the payload stream ends, close the decoder process
    req.on("end", () => {
        buffer += decoder.end();

        if (urlHeaders["content-type"] === "application/json") {// Defines the content type (JSON) for the API response
            buffer = JSON.parse(buffer);
        }

        // Verifies if the URL has sub-routes to ...
        if (cleanedRoute.indexOf("/") > -1) {
            var [mainRoute, index] = cleanedRoute.split("/");
        }
        // Sorts the request data within an object
        const data = {
            index,
            route: mainRoute || cleanedRoute,
            urlParameters,
            requestMethod,
            urlHeaders,
            payload: buffer,
        };

        console.log({ data });

    });

};
