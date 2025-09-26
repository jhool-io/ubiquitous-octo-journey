# Weather Search App -  Assessment Overview

![Weather App Screenshot](weatherappscreenshot.png)


**Technology Stack:** PHP + React (CDN) + OpenWeatherMap API
**Goal:** Build a functional weather search app where users can enter a city name and see current weather data.

## 🚀 Getting Started

### Prerequisites
- Basic PHP and React knowledge
- Internet connection for API calls
- Modern web browser

### 1. Get Your API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API Keys" section
4. Copy your API key

### 2. Complete the Implementation
Follow the TODO comments in each file to implement the required functionality.

## 📁 Project Structure

```
├── index.php              # PHP backend with API endpoints
├── public/
│   ├── index.html         # HTML structure with React CDN
│   ├── app.js             # React components and frontend logic
│   └── style.css          # Professional CSS styling
└── README.md              # This file
```

## 🔧 Technical Requirements

### API Integration
- Use OpenWeatherMap Current Weather API
- API Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Required parameters: `q` (city), `appid` (API key), `units=metric`
- **API Documentation:** [OpenWeather One Call API 3.0](https://openweathermap.org/api/one-call-3) - Complete guide and reference

### Expected API Response Structure
```json
{
  "city": "London",
  "country": "GB",
  "temperature": 15.5,
  "description": "clear sky",
  "humidity": 60,
  "windSpeed": 3.2,
  "icon": "01d"
}
```

### Error Handling
- Validate city input (required, minimum 2 characters)
- Handle API errors (invalid city, network issues)
- Display user-friendly error messages
- Implement loading states

## 🧪 Testing Your Implementation

1. **Start the PHP server:**
   ```bash
   php -S 0.0.0.0:5000 index.php
   ```

2. **Open your browser:** Navigate to the provided URL

3. **Test the application:**
   - Enter a valid city name (e.g., "London", "New York")
   - Verify weather data displays correctly
   - Test error cases (empty input, invalid city)
   - Check loading states work properly

## 🛠️ Development Tips

### PHP Backend
- Use `$_GET['city']` to get the city parameter
- Use `filter_var()` or `htmlspecialchars()` for input sanitization
- Use `cURL` or `file_get_contents()` for API requests
- Set proper CORS headers for frontend integration

### React Frontend
- Use `fetch()` for API calls to your PHP backend
- Implement proper async/await error handling
- Use state variables to manage loading and error states
- Validate form input before submitting

### Common Gotchas
- Remember to encode city names for URL (use `urlencode()` in PHP)
- Handle cities with spaces or special characters
- Set appropriate timeout for API requests
- Check API response status before processing data
