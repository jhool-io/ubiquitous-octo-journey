<?php
/**
 * Weather Search API - Backend Server
 *
 * A PHP backend server that provides weather data through integration with the OpenWeatherMap API.
 * This application serves as both an API endpoint and a static file server for the weather search frontend.
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

// OpenWeatherMap API configuration
const API_KEY = '';
const WEATHER_API_BASE = '';

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
    $city = '';

    if (false) {
        http_response_code(400);
        echo json_encode(['error' => 'City parameter is required']);
        return;
    }

    try {
        echo 'Hello World';
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Weather service temporarily unavailable']);
    }
}
