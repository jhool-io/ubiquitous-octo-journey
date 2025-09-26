<?php
/**
 * Weather Search API - Backend Server
 * 
 * This is the main PHP backend file for the weather search application.
 * Candidates need to implement OpenWeatherMap API integration.
 */

// Enable CORS for frontend development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// TODO: Add your OpenWeatherMap API key here
// Get your free API key from: https://openweathermap.org/api
const API_KEY = ''; // TODO: Replace with your actual API key

// TODO: Set the OpenWeatherMap API base URL
const WEATHER_API_BASE = ''; // TODO: Complete this URL

/**
 * Main API endpoint handler
 */
try {
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    // Route handling
    if ($path === '/api/weather' && $method === 'GET') {
        handleWeatherRequest();
    } else {
        // Serve static files or return 404
        if ($path === '/' || $path === '/index.html') {
            header('Content-Type: text/html');
            readfile('public/index.html');
            exit();
        } elseif (preg_match('/\.(css|js)$/', $path)) {
            $file = 'public' . $path;
            if (file_exists($file)) {
                $ext = pathinfo($file, PATHINFO_EXTENSION);
                $contentType = $ext === 'css' ? 'text/css' : 'application/javascript';
                header("Content-Type: $contentType");
                readfile($file);
                exit();
            }
        }
        
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
}

/**
 * Handle weather API requests
 */
function handleWeatherRequest() {
    // TODO: Get the city parameter from the request
    $city = ''; // TODO: Extract city from $_GET parameters
    
    // TODO: Validate the city parameter
    if (false /* TODO: Add validation condition */) {
        http_response_code(400);
        echo json_encode(['error' => 'City parameter is required']);
        return;
    }
    
    // TODO: Sanitize the city input
    $cleanCity = ''; // TODO: Clean and validate city input
    
    try {
        // TODO: Build the complete API URL
        $apiUrl = ''; // TODO: Construct URL with API_KEY, city, and units
        
        // TODO: Make the API request to OpenWeatherMap
        $weatherData = ''; // TODO: Use cURL or file_get_contents to fetch data
        
        // TODO: Handle API response
        if (false /* TODO: Check if API request was successful */) {
            // TODO: Decode JSON response
            $data = ''; // TODO: json_decode the response
            
            // TODO: Extract and structure the response data
            $response = [
                'city' => '', // TODO: Get city name from API response
                'country' => '', // TODO: Get country from API response
                'temperature' => '', // TODO: Get temperature from API response
                'description' => '', // TODO: Get weather description
                'humidity' => '', // TODO: Get humidity percentage
                'windSpeed' => '', // TODO: Get wind speed
                'icon' => '' // TODO: Get weather icon code
            ];
            
            echo json_encode($response);
        } else {
            // TODO: Handle API error response
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch weather data']);
        }
        
    } catch (Exception $e) {
        // TODO: Add proper error logging
        http_response_code(500);
        echo json_encode(['error' => 'Weather service temporarily unavailable']);
    }
}

/**
 * Helper function to make HTTP requests
 * TODO: Implement this function to make cURL requests
 */
function makeHttpRequest($url) {
    // TODO: Initialize cURL
    $curl = ''; // TODO: curl_init()
    
    // TODO: Set cURL options
    // curl_setopt($curl, CURLOPT_URL, $url);
    // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($curl, CURLOPT_TIMEOUT, 10);
    // curl_setopt($curl, CURLOPT_USERAGENT, 'Weather-App/1.0');
    
    // TODO: Execute request and handle response
    $response = ''; // TODO: curl_exec($curl)
    $httpCode = ''; // TODO: curl_getinfo($curl, CURLINFO_HTTP_CODE)
    
    // TODO: Close cURL and return results
    // curl_close($curl);
    
    return [
        'data' => $response,
        'http_code' => $httpCode
    ];
}
?>